import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import Dashboard from "../components/Dashboard";

const HomePage = lazy(() => import("../Layout/Home"));
const TransactionsPage = lazy(() => import("../components/Transactions"));
const ProductPage = lazy(() => import("../components/Product"));
const CustomerPage = lazy(() => import("../components/Customer"));
const LoginPage = lazy(() => import("../auth/Login"));
const RegisterPage = lazy(() => import("../auth/Register"));
const DetailTransactionsPage = lazy(() =>
  import("../actions/DetailTransactions")
);

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Redirect dari "/" ke "/dashboard" */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rute utama untuk /dashboard */}
      <Route
        path="/dashboard"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          )
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="transactions"
          element={
            <Suspense fallback={<Loader />}>
              <TransactionsPage />
            </Suspense>
          }
        />
        <Route
          path="transactions/detail/:id"
          element={
            <Suspense fallback={<Loader />}>
              <DetailTransactionsPage />
            </Suspense>
          }
        />
        <Route
          path="products"
          element={
            <Suspense fallback={<Loader />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="customers"
          element={
            <Suspense fallback={<Loader />}>
              <CustomerPage />
            </Suspense>
          }
        />
      </Route>

      {/* Rute untuk register */}
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Suspense fallback={<Loader />}>
              <RegisterPage />
            </Suspense>
          )
        }
      />

      {/* Rute untuk login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          )
        }
      />

      {/* Rute fallback untuk not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
