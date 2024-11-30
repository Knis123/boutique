import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import AuthProvider from "./Context/AuthContext";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./Pages/Home";

import Product from "./Pages/Product";

import Layout from "./Components/Client/Layout";

function App() {
  function ProtectedRoute({ element: Element, ...props }) {
    const { user } = useContext(AuthContext);
    return user ? <Element {...props} /> : <Navigate to="/login" />;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      
          {/* BrowserRouter should only be here in the root component */}
          <BrowserRouter>
            <Routes>
              {/* Pages that show the Navbar */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
             
              <Route
                path="/product/:productId"
                element={
                  <Layout>
                    <Product />
                  </Layout>
                }
              />
             

              {/* Pages that hide the Navbar (Admin-related) */}
              <Route
                path="/register"
                element={
                  <Layout hideNavbar={true}>
                    <Register />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout hideNavbar={true}>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Layout hideNavbar={true}>
                    <ProtectedRoute element={Dashboard} />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
      
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
