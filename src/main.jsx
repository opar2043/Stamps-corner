import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./assets/Component/Root/Root";
import Error from "./assets/Component/Root/Error";
import Home from "./assets/Component/Root/Home";
import Dashboad from "./assets/Component/Dashboard/Dashboad";
import About from "./assets/Component/Root/About";
import AlCollection from "./assets/Component/Products/AlCollection";
import Login from "./assets/Component/Firebase/Login";
import Register from "./assets/Component/Firebase/Register";
import AuthProvider from "./assets/Component/Firebase/AuthProvider";
import Overview from "./assets/Component/Dashboard/Overview";
import AddProducts from "./assets/Component/Dashboard/AddProducts/Addproducts";
import AllProducts from "./assets/Component/Dashboard/AddProducts/AllProducts";
import Users from "./assets/Component/Dashboard/Users/Users";
import EditProducts from "./assets/Component/Dashboard/AddProducts/EditProducts";
import PaymentSuccess from "./assets/Component/Payment/PaymentSuccess";
import PaymentFailed from "./assets/Component/Payment/PaymentFailed";
import MyOrders from "./assets/Component/Dashboard/Order/MyOrders";
import Orders from "./assets/Component/Dashboard/Order/Orders";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/collection",
        element: <AlCollection></AlCollection>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      //  Payment
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-failed", element: <PaymentFailed /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboad></Dashboad>,
    children: [
      {
        path: "/dashboard",
        element: <Overview></Overview>,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/dashboard/all-product",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/edit-products/:id",
        element: <EditProducts></EditProducts>,
      },

      {
        path: "/dashboard/orders",
        element: <Orders></Orders>,
      },
      // {
      //   path: "/dashboard/my-orders",
      //   element: <MyOrders></MyOrders>,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
