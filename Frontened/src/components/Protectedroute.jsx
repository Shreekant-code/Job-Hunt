// import { Navigate } from "react-router-dom";
// // 

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const token = localStorage.getItem("token");

//   if (!token) return <Navigate to="/jobseeker" />;

//   let role;
//   try {
//     const decoded = jwt_decode(token);
//     role = decoded.role; // "user" or "admin"
//   } catch {
//     return <Navigate to="/jobseeker" />;
//   }

//   if (adminOnly && role !== "admin") {
//     return <Navigate to="/userdashboard" />;
//   }

//   // Optional: if you want user-only route
//   // if (!adminOnly && role !== "user") return <Navigate to="/admindashboard" />;

//   return children;
// };

// export default ProtectedRoute;
