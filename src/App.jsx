import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routeNames } from "./Routes/routeNames";
import GeneralLayout from "./Layout/GeneralLayout";
import { AddService } from "./Pages/Services/AddService";
import ViewServices from "./Pages/Services/ViewSerivces";
import { AddProject } from "./Pages/Projects/AddProject";
import ViewProjects from "./Pages/Projects/ViewProjects";
import { AddProduct } from "./Pages/Products/AddProduct";
import ViewProducts from "./Pages/Products/ViewProducts";
import { AddJob } from "./Pages/Jobs/AddJob";
import ViewJobs from "./Pages/Jobs/ViewJobs";
import ViewQuotes from "./Pages/Quotes/ViewQuotes";
import { AddTeam } from "./Pages/Team/AddTeam";
import ViewTeams from "./Pages/Team/ViewTeamMembers";
import ViewXTeams from "./Pages/Team/ViewXTeamMembers";

import { AddBlog } from "./Pages/Blog/AddBlog";
import ViewBlogs from "./Pages/Blog/ViewBlogs";
import { Settings } from "./Pages/Settings";
import { AboutUs } from "./Pages/AboutUs";
import { Login } from "./Pages/Login";
import { ForgetPassword } from "./Pages/ForgotPassword";
import { Dashboard } from "./Pages/Dashboard";
import ViewJobApplications from "./Pages/Jobs/JobApplications";
import { AddTestimonial } from "./Pages/Testimonial/AddTestimonial";
import ViewTestimonial from "./Pages/Testimonial/ViewTestimonials";
// import { AddJobCategory } from "./Pages/Jobs/AddJobCategory";
// import ViewJobCategory from "./Pages/Jobs/ViewJobCategory";
// import ViewPrivacyPolicy from "./Pages/PrivacyPolicy/ViewPrivacyPolicy";

import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import { TermsAndConditions } from "./Pages/TermsAndConditions";
// import ViewTermsAndConditions from "./Pages/TermsAndConditions/ViewTermsAndConditions";
import { ResetPassword } from "./Pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path={routeNames.general.login} element={<Login />} />
      <Route
        path={routeNames.general.forgetPassword}
        element={<ForgetPassword />}
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path={routeNames.general.landing} element={<GeneralLayout />}>
        <Route path={routeNames.general.landing} element={<Dashboard />} />
        <Route path={routeNames.general.addService} element={<AddService />} />
        <Route
          path={routeNames.general.viewService}
          element={<ViewServices />}
        />
        <Route path={routeNames.general.addProject} element={<AddProject />} />
        <Route
          path={routeNames.general.viewProjects}
          element={<ViewProjects />}
        />
        <Route path={routeNames.general.addProduct} element={<AddProduct />} />
        <Route
          path={routeNames.general.viewProducts}
          element={<ViewProducts />}
        />
        <Route path={routeNames.general.addJob} element={<AddJob />} />
        {/* <Route
          path={routeNames.general.addJobCategory}
          element={<AddJobCategory />}
        /> */}
        <Route path={routeNames.general.viewJobs} element={<ViewJobs />} />
        {/* <Route
          path={routeNames.general.viewJobCategory}
          element={<ViewJobCategory />}
        /> */}
        <Route path={routeNames.general.addTeam} element={<AddTeam />} />
        <Route path={routeNames.general.viewTeams} element={<ViewTeams />} />
        <Route path={routeNames.general.viewXTeams} element={<ViewXTeams />} />

        <Route path={routeNames.general.settings} element={<Settings />} />
        <Route path={routeNames.general.aboutUs} element={<AboutUs />} />
        <Route path={routeNames.general.addBlog} element={<AddBlog />} />
        <Route path={routeNames.general.viewBlogs} element={<ViewBlogs />} />
        <Route path={routeNames.general.addBlog} element={<AddBlog />} />
        <Route path={routeNames.general.viewBlogs} element={<ViewBlogs />} />
        <Route
          path={routeNames.general.addTermsAndConditions}
          element={<TermsAndConditions />}
        />
        {/* <Route
          path={routeNames.general.viewTermsAndConditions}
          element={<ViewTermsAndConditions />}
        /> */}
        <Route
          path={routeNames.general.addPrivacyPolicy}
          element={<PrivacyPolicy />}
        />
        {/* <Route
          path={routeNames.general.viewPrivacyPolicy}
          element={<ViewPrivacyPolicy />}
        /> */}
        <Route
          path={routeNames.general.jobApplications}
          element={<ViewJobApplications />}
        />
        <Route
          path={routeNames.general.addTestimonial}
          element={<AddTestimonial />}
        />
        <Route
          path={routeNames.general.viewTestimonial}
          element={<ViewTestimonial />}
        />
        <Route path={routeNames.general.viewQuotes} element={<ViewQuotes />} />
      </Route>
    </Routes>
  );
}

export default App;
