import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
   <header>
<div className="img-container">
  <img src="/job_logo.png" alt="image_logo"/>

</div>
<div className="heading">
  <h1>The Job Portal</h1>
  <p>Connecting Talent with Opportunities</p>
</div>



   </header>
  );
};
