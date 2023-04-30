// TITLE
// -----
// LAYOUT: SIDEBAR AND NAVBAR, visible irrespective of pages




// Packages
// --------


// NPM PACKAGES
import React, { useState} from "react";
import {Box ,useMediaQuery} from "@mui/material";
import { Outlet } from "react-router-dom";









// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";






// REDUX STORE
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";





const Layout=() => {
  



    // REDUCER
    // -------

    //grabbing userId from index.js of state folder  
    const userId= useSelector((state)=> state.global.userId);

    // using grabbed userId for api call from redux use
    const { data } = useGetUserQuery(userId);
    
    
    
    
    
    
    
      
    // USESTATES
    // ---------
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    
    
    
    
    
    // INSTANCES 
    // ---------
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    
    
    
    
    
    
      
    
    
    
    
    
      
    
    // METHODS
    // -------
    
    
    
    
    
    
    
    
    // BACKEND CALL , REQUEST , RESPONE METHODS: API CALL
    // --------------------------------------------------
        
    // fuction
      
    //Api Calls(reques) and  Response from backend
    
    
    
    
    
    
      
    
    
    
    
    
    // USEEFFECT
    // ---------
    
    
    
    
      return (

        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* flex grow will let navbar take full width */}
        <Box flexGrow={1}>
          <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>

      );
    }
    
    export default Layout;
    
    
    
    
    // note:
    // -----