import React, { lazy, Suspense, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import "./Content.scss";

import { StoreContext } from "../../store/StoreProvider.js";
import { Role } from "../../helpers/roles";

import { ProtectAdmin } from "../../protectedRoutes/ProtectedRouteAdmin";
import { ProtectUser } from "../../protectedRoutes/ProtectedRouteUser";
import { Protect } from "../../protectedRoutes/ProtectRoute";
import { ProtectMyProducts } from "../../protectedRoutes/ProtectedRouteMyProducts";
import { ProtectLoginPage } from "../../protectedRoutes/ProtectLogin";

import Courses from "./courses/Courses";
import InternalServerError from "./internalServerError/InternalServerError";
import PageNotFound from "./pageNotFound/PageNotFound";

const Adminpage = lazy(() => import("./adminpage/wrapperAdminPage/Adminpage"));
const DetailsProduct = lazy(() => import("./detailsProduct/DetailsProduct"));
const DetailsOrderPaidAdmin = lazy(() =>
  import("./detailsOrderPaid/DetailsOrderPaidAdmin")
);
const DetailOrderPaidUser = lazy(() =>
  import("./detailsOrderPaid/DetailsOrderPaidUser")
);
const EditProductPageMobile = lazy(() =>
  import("./editFormProduct/EditProductPageMobile")
);
const LoginMobilePage = lazy(() => import("./loginForm/LoginPageMobile"));
const Order = lazy(() => import("./afterProceedCheckout/order/Order"));
const Payment = lazy(() => import("./afterProceedCheckout/payment/Payment"));
const PlaceOrder = lazy(() =>
  import("./afterProceedCheckout/placeOrder/PlaceOrder")
);
const ProfileAdmin = lazy(() => import("./profileUser/profile/ProfileAdmin"));
const ProfileUser = lazy(() => import("./profileUser/profile/ProfileUser"));
const RegisterPageMobile = lazy(() =>
  import("./registrationForm/RegisterPageMobile")
);
const ShoppingCart = lazy(() => import("./shoppingCart/Cart"));
const ShippingPage = lazy(() =>
  import("./afterProceedCheckout/shippingPage/ShippingPage")
);
const TermsPolicyShop = lazy(() => import("./termsPolicyShop/TermsPolicyShop"));
const UserCourses = lazy(() => import("./usercourses/UserCourses"));

import DotsAnimation from "../others/dotsAnimation/DotsAnimation";

const Content = () => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);

  return (
    <main className="main">
      <Switch>
        <Route path="/" exact render={() => <Courses />} />
        <Suspense fallback={<DotsAnimation />}>
          {isUserLogged && (
            <ProtectMyProducts
              path="/user-courses/:id"
              roles={[Role.Admin]}
              component={UserCourses}
            />
          )}
          <ProtectUser path="/profile/:id" component={ProfileUser} />
          <ProtectAdmin
            path="/admin-profile/:id"
            roles={[Role.Admin]}
            component={ProfileAdmin}
          />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <ProtectAdmin
            path="/admin"
            roles={[Role.Admin]}
            component={Adminpage}
          />
          <Route path="/details/:id" component={DetailsProduct} />
          <Protect path="/shipping" component={ShippingPage} />
          <Protect path="/payment" component={Payment} />
          <Protect path="/place-order" component={PlaceOrder} />
          <Route path="/terms-shop" component={TermsPolicyShop} />
          <Protect path="/order/:id" component={Order} />
          <Protect path="/details-order/:id" component={DetailOrderPaidUser} />
          <ProtectAdmin
            path="/admin-details-order/:id"
            roles={[Role.Admin]}
            component={DetailsOrderPaidAdmin}
          />
          <Route path="/register" component={RegisterPageMobile} />
          <ProtectLoginPage path="/login" component={LoginMobilePage} />
          <ProtectAdmin
            path="/edit-product"
            roles={[Role.Admin]}
            component={EditProductPageMobile}
          />
        </Suspense>
        <Route path="*" component={PageNotFound} />
        <Route component={InternalServerError} />
      </Switch>
    </main>
  );
};

export default Content;
