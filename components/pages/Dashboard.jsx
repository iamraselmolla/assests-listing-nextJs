import React, { useContext, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { List, ListItemButton, ListItemIcon } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import PanelWrapper from "../UI/PanelWrapper";
import SplashScreen from "../SplashScreen";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AuthContext from "../store/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { assets } from "../assets";
import Image from "next/image";
import { ChecklistRtl, Newspaper, Photo } from "@mui/icons-material";
import { getAllProperty } from "../services/userServices";
import { userDataActions } from "../store/user-data-slice";
import { useDispatch, useSelector } from "react-redux";

export const adminMenu = [
  {
    name: "Dashboard",
    pageLink: "/dashboard",
    icon: <DashboardIcon />,
    showAlways: false,
  },
  {
    name: "Add Property",
    pageLink: "/dashboard/addproperty",
    icon: <WarehouseIcon />,
    showAlways: false,
  },
  {
    name: "Gallery Images",
    pageLink: "/dashboard/gallery",
    icon: <Photo />,
    showAlways: false,
  },
  {
    name: "Request Listing",
    pageLink: "/dashboard/requestlisting",
    icon: <ChecklistRtl />,
    showAlways: false,
  },
  {
    name: "Blog",
    pageLink: "/dashboard/blog",
    icon: <Newspaper />,
    showAlways: false,
  },
];
const Dashboard = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const route = useRouter();
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  // const { refresh } = useSelector((state) => state.userData);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      toast.warn("User not logged in");
      route.push("/adminpanel");
    }
  }, [authCtx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // useEffect(() => {
  //   const getAllPropertyByAdmin = async () => {
  //     dispatch(userDataActions.setPropertyFetching(true))
  //    try{
  //     const response = await getAllProperty();
  //     console.log("refetched");

  //     if (authCtx.role === "admin") {
  //       dispatch(userDataActions.setALlProperties(response?.data));
  //       dispatch(userDataActions.setPropertyFetching(false))
  //     } else {
  //       dispatch(userDataActions.setUserProperty(response?.data));
  //       dispatch(userDataActions.setPropertyFetching(false))

  //     }
  //    }catch(err){
  //     dispatch(userDataActions.setPropertyFetching(false))
  //    }

  //   };
  //   getAllPropertyByAdmin();
  // }, [authCtx.role, refresh]);

  const PAGES = [];

  return (
    <div className="relative">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {authCtx.isLoggedIn ? (
            <>
              <ResponsiveDrawer />
              <div className="flex flex-row h-[calc(100vh_-_120px)] max-w-[100%] md:h-[calc(100vh_-_120px)] pb-8  bg-primary">
                <div className="min-w-[300px]  h-[calc(100vh_-_150px)] mdrev:hidden bg-white  overflow-y-auto rounded-xl mt-4 ml-4">
                  <div className="flex flex-col items-center  p-4 gap-1">
                    <div className="bg-white  w-[200px] h-[200px]  rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={assets.director}
                        className="w-[100%] h-[100%] "
                        alt="Director"
                      />
                    </div>
                    <h1 className="font-bold  mt-4 text-black">Harish Sikka</h1>
                    <h1 className="bg-sec text-white p-1 rounded-sm bg-primary">
                      {authCtx.role}
                    </h1>
                  </div>

                  <List className="flex flex-col items-center gap-4">
                    {adminMenu.map((item, index) => (
                      <Link
                        href={item.pageLink}
                        key={index}
                        className="bg-secondary rounded-lg text-white"
                      >
                        <ListItemButton sx={{ width: 240 }}>
                          <ListItemIcon
                            sx={{
                              color: "white",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>

                          <h1 className="p-1">{item.name}</h1>
                        </ListItemButton>
                      </Link>
                    ))}

                    <ListItemButton
                      sx={{
                        width: 240,
                        background: "#614385",
                        borderRadius: "8px",
                        color: "white",
                        ":hover": { background: "#614385" },
                      }}
                      onClick={() => {
                        authCtx.logout();
                        toast.warn("Logged out successfully");
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <h1 className="p-1">Logout</h1>
                    </ListItemButton>
                  </List>
                </div>
                <PanelWrapper>{children}</PanelWrapper>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
