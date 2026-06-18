import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const quantities = location.state?.quantities || {};

  // Additional info state
  const [billingDetails, setBillingDetails] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: ""
  });

  const totalPrice = cart.reduce((total, item) => {
    const qty = quantities[item._id] ?? 1;
    return total + Number(item.price) * qty;
  }, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { total: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => console.error(err));
    }
  }, [axiosSecure, totalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: billingDetails.name || "anonymous",
        email: billingDetails.email || "anonymous",
        address: {
          line1: billingDetails.address,
          city: billingDetails.city,
          postal_code: billingDetails.zip,
        }
      }
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: billingDetails.name || "anonymous",
          email: billingDetails.email || "anonymous",
          address: {
            line1: billingDetails.address,
            city: billingDetails.city,
            postal_code: billingDetails.zip,
          }
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Save payment
      const paymentData = {
        userId: user?.uid,
        paymentId: paymentIntent.id,
        items: cart.map(item => ({
          productId: item.productId || item._id,
          qty: quantities[item._id] ?? 1,
          name: item.name,
          price: item.price
        })),
        amount: totalPrice,
        paymentMethod: "stripe",
        status: "paid",
        createdAt: new Date(),
        shippingInfo: billingDetails
      };

      try {
        await axiosSecure.post("/order", paymentData);
        // Clear cart individually
        await Promise.all(
          cart.map(item => axiosSecure.delete(`/cart/${item._id}`))
        );
        refetch();
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Transaction ID: ${paymentIntent.id}`,
        });
        navigate("/payment-success");
      } catch (err) {
        console.error(err);
      }
    }
  };

  if(!cart.length) {
     return <div className="p-10 text-center text-xl">Your Cart is empty</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-white rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Complete Payment</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input type="text" name="name" value={billingDetails.name} onChange={handleInputChange} required className="mt-1 w-full border border-slate-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email Address</label>
          <input type="email" name="email" value={billingDetails.email} onChange={handleInputChange} required className="mt-1 w-full border border-slate-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Street Address</label>
          <input type="text" name="address" value={billingDetails.address} onChange={handleInputChange} required className="mt-1 w-full border border-slate-300 rounded-md p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">City</label>
            <input type="text" name="city" value={billingDetails.city} onChange={handleInputChange} required className="mt-1 w-full border border-slate-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Postal / Zip Code</label>
            <input type="text" name="zip" value={billingDetails.zip} onChange={handleInputChange} required className="mt-1 w-full border border-slate-300 rounded-md p-2" />
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-md mb-6">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4', },
            },
            invalid: { color: '#9e2146', },
          },
        }} />
      </div>
      
      <button type="submit" disabled={!stripe || !clientSecret} className="w-full bg-[#103C6B] text-white py-3 rounded-md font-semibold hover:bg-slate-800 transition disabled:opacity-50">
        Pay £{totalPrice.toFixed(2)}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {transactionId && <p className="text-green-500 mt-4 text-center border p-2 bg-green-50 rounded">Transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
