// TITLE
// -----




// Packages
// --------


// NPM PACKAGES
import React , {useState} from "react"
import { LightModeOutlined,DarkModeOutlined, Menu as MenuIcon,Search,SettingsOutlined,ArrowDropDownOutlined, } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";







// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import FlexBetween from "./FLexBetween";
import profileImage from "assets/profile.gif";






// REDUX STORE
import {useDispatch} from "react-redux";
import { setMode } from "state";







const Navbar = ({user,isSidebarOpen,setIsSidebarOpen}) => {
  



    // REDUCER
    // -------
    const dispatch = useDispatch();

    
    
    
    
      
    // USESTATES
    // ---------
    // setting our drop menu when we click on user (MUI)
    const [anchorEl, setAnchorEl] = useState(null);

    
    
    
    
    
    
    // INSTANCES 
    // ---------
    const theme = useTheme();
    const isOpen = Boolean(anchorEl);
    
    
    
    
      
    
    
    
    
    
      
    
    // METHODS
    // -------

    // for dropdown menu logout in anc
    const handleClick =(event) =>setAnchorEl(event.currentTarget);
    const handleClose= () => setAnchorEl(null);
    




    // BACKEND CALL , REQUEST , RESPONE METHODS: API CALL
// --------------------------------------------------
    
// fuction
  
//Api Calls(reques) and  Response from backend






  





// USEEFFECT
// ---------




// Appbar is from material ui. here we use it for navbar
  return (
<AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">

          {/* using redux changing button for dark and light mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>

            {/* for dropdown logout*/}
            <Menu
            // look at mui doc
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >

              {/* we arenot going to have log out funcionality  */}
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;




// note:
// -----