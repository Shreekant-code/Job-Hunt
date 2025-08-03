
import {Route,Routes} from "react-router-dom"

import { Home } from "./Home";
import { CreateJob } from "./Pages/CreateJob";
import { Update } from "./Pages/Update";
const App=()=>{

  return(
    <>

<Routes>
<Route path="/" element={<Home />} />

<Route path="/create/jobs" element={<CreateJob />} />
   <Route path="/update/jobs/:id" element={<Update />} />


</Routes>  
</>
    
    
    
    
 
  )
}

export default App;