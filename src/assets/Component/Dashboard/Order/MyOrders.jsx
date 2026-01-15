import React from "react";

const loggedInUserId = "USER001";

const demoOrders = [
  {
    _id: "ORD001",
    userId: "USER001",
    paymentId: "PAY123",
    amount: 80,
    status: "paid",
    createdAt: "2026-01-15T10:30:00Z",
    items: [
      { productId: "P1", qty: 2, name: "Queen Victoria Penny Black" },
      { productId: "P2", qty: 1, name: "Independence Anniversary" },
    ],
  },
  {
    _id: "ORD003",
    userId: "USER001",
    paymentId: "PAY789",
    amount: 45,
    status: "shipped",
    createdAt: "2026-01-12T14:00:00Z",
    items: [{ productId: "P4", qty: 1, name: "Royal Coronation Issue" }],
  },
];

const MyOrders = () => {
  const myOrders = demoOrders.filter((order) => order.userId === loggedInUserId);

  // Helper for status styling
  const getStatusStyle = (status) => {
    const base = { padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" };
    if (status === "paid") return { ...base, backgroundColor: "#e6fffa", color: "#2c7a7b" };
    if (status === "shipped") return { ...base, backgroundColor: "#ebf8ff", color: "#2b6cb0" };
    return { ...base, backgroundColor: "#f7fafc", color: "#4a5568" };
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "24px", color: "#1a202c" }}>Order History</h2>

      {myOrders.map((order) => (
        <div key={order._id} style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          overflow: "hidden"
        }}>
          {/* Header Section */}
          <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "14px", color: "#718096" }}>Order ID: </span>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>#{order._id}</span>
              <div style={{ fontSize: "12px", color: "#a0aec0", marginTop: "4px" }}>
                Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </div>
            </div>
            <span style={getStatusStyle(order.status)}>{order.status}</span>
          </div>

          {/* Items Section */}
          <div style={{ padding: "16px" }}>
            {order.items.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <div style={{ color: "#4a5568" }}>
                  <span style={{ fontWeight: "500" }}>{item.name || `Product ${item.productId}`}</span>
                  <span style={{ marginLeft: "8px", color: "#718096" }}>x{item.qty}</span>
                </div>
                <div style={{ fontWeight: "500" }}>—</div>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div style={{ padding: "16px", borderTop: "1px solid #f1f5f9", textAlign: "right" }}>
            <span style={{ color: "#718096", marginRight: "8px" }}>Total Amount:</span>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#2d3748" }}>${order.amount.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;