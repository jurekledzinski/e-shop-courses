import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import "./ContentAdminPage.scss";

const AddCourse = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/AddCourse")
);
const EditCourse = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/EditCourse")
);
const RemoveCourse = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/RemoveCourse")
);
const ListUsers = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/ListUsers")
);
const UserCourses = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/UserCourses")
);
const ManagementOrders = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/ManagementOrders")
);
const ManagementSlider = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/ManagementSlider")
);
const RemoveAdvertsSlider = lazy(() =>
  import("../adminDashboard/contentAdmin/adminOptions/RemoveAdvertsSlider")
);

import { Role } from "../../../../../helpers/roles";
import { ProtectAdmin } from "../../../../../protectedRoutes/ProtectedRouteAdmin";
import DotsAnimation from "../../../../others/dotsAnimation/DotsAnimation";

const ContentAdminPage = ({ path, location }) => {
  const welcomeTitleadminPanel =
    location.pathname === "/admin" ? (
      <h2 className="admin-content__title">Welcome to your admin dashboard</h2>
    ) : null;
  return (
    <div className="admin-wrapper__admin-content admin-content">
      {welcomeTitleadminPanel}
      <Suspense fallback={<DotsAnimation />}>
        <Switch>
          <ProtectAdmin
            path={`${path}/add-course`}
            roles={[Role.Admin]}
            component={AddCourse}
          />
          <ProtectAdmin
            path={`${path}/edit-course`}
            roles={[Role.Admin]}
            component={EditCourse}
          />
          <ProtectAdmin
            path={`${path}/remove-course`}
            roles={[Role.Admin]}
            component={RemoveCourse}
          />
          <ProtectAdmin
            path={`${path}/list-users`}
            roles={[Role.Admin]}
            component={ListUsers}
          />
          <ProtectAdmin
            path={`${path}/user-courses`}
            roles={[Role.Admin]}
            component={UserCourses}
          />
          <ProtectAdmin
            path={`${path}/management-orders`}
            roles={[Role.Admin]}
            component={ManagementOrders}
          />
          <ProtectAdmin
            path={`${path}/management-shop`}
            roles={[Role.Admin]}
            component={ManagementSlider}
          />
          <ProtectAdmin
            path={`${path}/remove-adverts`}
            roles={[Role.Admin]}
            component={RemoveAdvertsSlider}
          />
        </Switch>
      </Suspense>
    </div>
  );
};

export default ContentAdminPage;
