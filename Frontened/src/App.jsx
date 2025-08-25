import { Header } from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Feature } from "./components/Feature";
import { Choose } from "./components/Choose";
import { FeaturedCompanies } from "./components/Company";
import NewsletterCTA from "./components/Footer";
import { LoginRegisterUser } from "./Pages/LoginAll";
import { Userdashboard } from "./Pages/Userdashboard";
import { Admindashboard } from "./Pages/AdminDashboard";
import { CreateJob } from "./Pages/Createjob";
import { LoginRegisterAdmin } from "./Pages/AdminLogin";
import { ManageJob } from "./Pages/Managejob";
import { JobProvider } from "./components/JobContext";
import { Applicants } from "./Pages/Applicants";

const App = () => {
  return (
    <JobProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Feature />
              <Choose />
              <FeaturedCompanies />
              <NewsletterCTA />
            </>
          }
        />

        <Route path="/jobseeker" element={<LoginRegisterUser />} />
        <Route path="/adminlogin" element={<LoginRegisterAdmin />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/post-login" element={<LoginRegisterAdmin />} />

        <Route path="/admindashboard/*" element={<Admindashboard />}>
          <Route index element={<h2>Dashboard Home</h2>} />
          <Route path="post-job" element={<CreateJob />} />
          <Route path="manage-jobs" element={<ManageJob />} />
          <Route path="jobs/applicants/:jobId" element={<Applicants />}/>
          <Route path="reports" element={<h2>Reports & Analytics</h2>} />
          <Route path="details" element={<h2>Settings Page</h2>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </JobProvider>
  );
};

export default App;
