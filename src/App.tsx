import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import { Outlet } from "react-router-dom";
import AppWrapper from "./components/atoms/AppWrapper";
import EmailNoticePage from "./pages/EmailNotice/EmailNoticePage";
import UserVerification from "./pages/UserVerification/UserVerification";
import AddAddressPage from "./pages/AddAddress/AddAddressPage";
import AddressListPage from "./pages/AddressList/AddressListPage";
import MenuPage from "./pages/Menu/ProfilePage";
import MyDetailsPage from "./pages/MyDetails/MyDetails";
import SignupPage from "./pages/SignUp/SignupPage";
import UpdateAddressPage from "./pages/AddAddress/UpdateAddress";
import DummyLoginPage from "./pages/DummyLogin/DummyLoginPage";
import LandingPage from "./pages/LadingPage/LandingPage";
import PrivateRoute from "./components/atoms/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/Admin/Products/ProductsPage";
import AddProductPage from "./pages/Admin/Products/AddProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProduct";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UserManegement from "./pages/UserManagement/UserManagement";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path='/email-notice' element={<EmailNoticePage />} />
        <Route
          path='/user-verification/:verifyToken'
          element={<UserVerification />}
        />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='login' element={<DummyLoginPage />} />
        <Route
          path='/menu'
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/my-details'
          element={
            <PrivateRoute>
              <MyDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/my-address'
          element={
            <PrivateRoute>
              <AddressListPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/add-address'
          element={
            <PrivateRoute>
              <AddAddressPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/update-address/:id'
          element={
            <PrivateRoute>
              <UpdateAddressPage />
            </PrivateRoute>
          }
        />
        <Route path='/dashboard' element={<DashboardPage />}>
          <Route
            path='/dashboard/user-management'
            element={<UserManegement />}
          ></Route>
          <Route path='/dashboard/products' element={<ProductsPage />} />
          <Route path='/dashboard/add-product' element={<AddProductPage />} />
          <Route
            path='/dashboard/update-product/:id'
            element={<UpdateProductPage />}
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='/admin' element={<Outlet />}>
        <Route path='products' element={<ProductsPage />} />
        <Route path='add-product' element={<AddProductPage />} />
        <Route path='update-product/:id' element={<UpdateProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
