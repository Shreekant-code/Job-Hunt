import {Header} from "./components/Header"
import { Route,Routes } from "react-router-dom"
import "./App.css"
import { Home } from "./components/Home"
import {Feature} from "./components/Feature"
import { Choose } from "./components/Choose"
import { FeaturedCompanies } from "./components/Company"
import NewsletterCTA from "./components/Footer"
import { LoginRegister } from "./Pages/LoginAll"


const App=()=>{
    const token = localStorage.getItem("token");
  return(
    <>
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

      <Route path="/jobseeker" element={<LoginRegister />} />
<Route path ="/recruiter" element={<LoginRegister />}/>
      



    </Routes>
    


    
    
    </>
  )
}

export default App;
