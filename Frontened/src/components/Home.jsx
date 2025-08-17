import "./Home.css"
import { NavLink } from "react-router-dom"
export const Home=()=>{
    return(
        <>
        <main className="home-container">
<div className="img-1">
    <img src="/imageone.png" alt="image" />
</div>
<div className="img-2">
    <img src="/imagetwo.png" alt="image" />
</div>
<div className="img-3">
    <img src="/imagethree.png" alt="image" />
</div>

<h1>Find Your Next Big Opportunity</h1>
<p>Where employers discover talent, and talent discovers their dream job.</p>
<div className="btn-all">
  <NavLink to="/jobseeker">
  <button className="nav-btn">Browse Jobs</button>
</NavLink>
<NavLink to="/post-login">
  <button className="nav-btn2">Post a Job</button>
</NavLink>

   
</div>


        </main>
        
        
        </>
    )
}
