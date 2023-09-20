
import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospital from "./pages/Dashboard/Hospital";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Dashboard/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/AdminPages/DonarList";
import HospitalList from "./pages/AdminPages/HospitalList";
import OrgList from "./pages/AdminPages/OrgList";
import AdminHome from "./pages/AdminPages/AdminHome";

function App() {
  return (
    <div className="App">
      
        <> 
        <Routes>
          <Route  path="/" element={  
               
               <ProtectedRoute>

                  <HomePage/>
               </ProtectedRoute>
                 
          
          } />   
                   <Route  path="/analytics" element={  
               
               <ProtectedRoute>

                  <Analytics/>
               </ProtectedRoute>
                 
          
          } />
          
          <Route  path="/admin" element={  
               
               <ProtectedRoute>

                  <AdminHome/>
               </ProtectedRoute>
                 
          
          } />
           
<Route  path="/donar-list" element={  
               
               <ProtectedRoute>

                  <DonarList/>
               </ProtectedRoute>
                 
          
          } />
          <Route  path="/hospital-list" element={  
               
               <ProtectedRoute>

                  <HospitalList/>
               </ProtectedRoute>
                 
          
          } />
          <Route  path="/org-list" element={  
               
               <ProtectedRoute>

                  <OrgList/>
               </ProtectedRoute>
                 
          
          } />



             <Route  path="/donar" element={  
               
               <ProtectedRoute>

                  <Donar/>
               </ProtectedRoute>
                 
          
          } />
                 <Route  path="/hospital" element={  
               
               <ProtectedRoute>

                  <Hospital/>
               </ProtectedRoute>
                 
          
          } />
                <Route  path="/organisation" element={  
               
               <ProtectedRoute>

                  <Organisation/>
               </ProtectedRoute>
                 
          
          } />
              <Route  path="/consumer" element={  
               
               <ProtectedRoute>

                  <Consumer/>
               </ProtectedRoute>
                 
          
          } />

      <Route  path="/donation" element={  
               
               <ProtectedRoute>

                  <Donation/>
               </ProtectedRoute>
                 
          
          } />

          <Route path="/login" element={  
                
               <PublicRoute>     
                 <Login/>
               </PublicRoute>
          
          } />
          <Route path="/signup" element={

              <PublicRoute>
                 <Signup/>
              </PublicRoute>
          } />

        </Routes>


        <ToastContainer />
         
        </>
    </div>
  );
}

export default App;
