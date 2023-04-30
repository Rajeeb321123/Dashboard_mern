// TITLE
// -----




// Packages
// --------


// NPM PACKAGES
import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";







// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import FlexBetween from "./FLexBetween";
import profileImage from "assets/profile.gif";






// REDUX STORE






//LIST OF NAV ITEM: we are going to loop through and map it below
const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        // it is null because it is just name of tiltle of  topic 
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];


const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {




    // REDUCER
    // -------






    // USESTATES
    // ---------

    // active is set according the url or page we are on
    const [active, setActive] = useState("");









    // INSTANCES 
    // ---------

    // to grab the current path or url ( means what page we are on)
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();











    // METHODS
    // -------








    // BACKEND CALL , REQUEST , RESPONE METHODS: API CALL
    // --------------------------------------------------

    // fuction

    //Api Calls(reques) and  Response from backend












    // USEEFFECT
    // ---------
    useEffect(() => {

        // setting active with current url or page
        setActive(pathname.substring(1));


    }, [pathname])





    return (
        <Box component="nav">
          {isSidebarOpen && (
            <Drawer
              open={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              variant="persistent"
              anchor="left"
              
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                // customizing our default drawer style 
                '& .MuiDrawer-paper': {
                  color: theme.palette.secondary[200],
                  backgroundColor: theme.palette.background.alt,
                  boxSixing: "border-box",
                  borderWidth: isNonMobile ? 0 : "2px",
                  width: drawerWidth,
                },
              }}
            >
              <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                  <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                      <Typography variant="h4" fontWeight="bold">
                        Personal Dash_Board
                      </Typography>
                    </Box>
    
                     {/* for mobile screen we can close the sidebar */}
                    {!isNonMobile && (
                      <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <ChevronLeft />
                      </IconButton>
                    )}
                  </FlexBetween>
                </Box>
    
                {/* in list we will have each of the nave items */}
                <List>
                    {/* looping through navitems we created above */}
                  {navItems.map(({ text, icon }) => {
    
                    // for those items with no icon : means for titles
                    if (!icon) {
                      return (
                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                          {text}
                        </Typography>
                      );
                    }
                    const lcText = text.toLowerCase();
    
                    return (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                         // navigating to pages
                          onClick={() => {
                            navigate(`/${lcText}`);
                            // setting active state with page name
                            setActive(lcText);
                          }}
    
                          // setting color to golden yellow for active page
                          sx={{
                            backgroundColor:
                              active === lcText
                                ? theme.palette.secondary[300]
                                : "transparent",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[100],
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "2rem",
                               // setting color according to active state value
                              color:
                                active === lcText
                                  ? theme.palette.primary[600]
                                  : theme.palette.secondary[200],
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {active === lcText && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                          )}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
    
              <Box position="realative" bottom="2rem">
                <Divider />
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.9rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      fontSize="0.8rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {user.occupation}
                    </Typography>
                  </Box>
                  <SettingsOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px ",
                    }}
                  />
                </FlexBetween>
              </Box>
            </Drawer>
          )}
        </Box>
      );
}

export default Sidebar;




    // note:
    // -----