import {
  Check,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Menu,
  Phone,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets";
import AuthContext from "../store/AuthContext";
import { toast } from "react-toastify";
import cities_arr from "../utils/CityDropdown";
import { useRouter } from "next/router";

const ResponsiveDrawer = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(true);
  const authCtx = useContext(AuthContext);
  const [allCities, setAllCities] = useState([]);
  const [state, setState] = useState(
    router.query.state ? +router.query.state : "",
  );
  const [zone, setZone] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [format, setFormat] = useState("");
  const [type, setType] = useState("");
  const [mobileSearchButtons, setMobileSearchButtons] = useState({
    state: false,
    city: false,
    type: false,
    zone: false,
    category: false,
    format: false,
  });

  const openMenuHandler = () => {
    document.getElementById("menu").style.width = "100%";
    document.getElementById("menu").style.left = "0px";
  };

  const closeMenuHandler = () => {
    document.getElementById("menu").style.width = "0";
    document.getElementById("menu").style.left = "-200px";
  };

  const MenuButton = ({ children, href, className }) => {
    return (
      <Link
        href={href}
        className={`text-black p-2 hover:cursor-pointer hover:bg-warehouseBlue hover:text-white flex justify-start w-[100%] ${className}`}
      >
        {children}
      </Link>
    );
  };

  useEffect(() => {
    const queryParams = {};
    if (state) queryParams.state = state;
    if (city) queryParams.city = city;
    if (zone) queryParams.zone = zone;
    if (format) queryParams.format = format;
    if (category) queryParams.category = category;
    if (type) queryParams.type = type;

    const searchParams = new URLSearchParams(queryParams);
    if (searchParams.toString())
      router.push(`/warehouses?${searchParams.toString()}`);
    // }, [format]);
  }, [state, city, zone, format, category, type]);

  useEffect(() => {
    let temp = [];
    // cities_arr[3].map((item)=>temp.push(item));
    // cities_arr[4].map((item)=>temp.push(item));
    // cities_arr[6].map((item)=>temp.push(item));
    // cities_arr[10].map((item)=>temp.push(item));
    // cities_arr[12].map((item)=>temp.push(item));
    // cities_arr[13].map((item)=>temp.push(item));
    // cities_arr[14].map((item)=>temp.push(item));
    // cities_arr[15].map((item)=>temp.push(item));
    // cities_arr[27].map((item)=>temp.push(item));
    // cities_arr[28].map((item)=>temp.push(item));
    // cities_arr[32].map((item)=>temp.push(item));
    // cities_arr[33].map((item)=>temp.push(item));

    state ? cities_arr[state].map((item) => temp.push(item)) : "";

    temp.sort();
    setAllCities(temp);
  }, [state]);

  const MobileButton = ({ href, children }) => {
    return (
      <Link href={href}>
        <button
          onClick={() => closeMenuHandler()}
          className=" bg-secondary text-white p-2 hover:bg-secondary w-60"
        >
          {children}
        </button>
      </Link>
    );
  };

  return (
    <>
      <div className="h-[80px]  sticky w-[100%] top-0 flex justify-between items-center bg-white  text-black z-20 ">
        {/* <h2 id='LuckiestGuy' className='text-2xl md:text-4xl font-bold'>SIKKAWAREHOUSE</h2> */}
        <Link className="hover:scale-105 duration-200 ease-linear" href="/">
          <Image
            src={assets.logo}
            alt="Logo"
            className="h-[50px] md:h-[60px] w-auto p-2"
          />
        </Link>

        {/* Row Menu */}
        <div className="hidden lg:flex gap-2 ">
          <Link href="/">
            <button className=" hover:underline  text-black p-2 ">HOME</button>
          </Link>
          <Link href="/about">
            <button className=" hover:underline  text-black p-2 ">
              ABOUT US
            </button>
          </Link>
          {/* <Link href='/warehouses'><button  className=' hover:underline  text-black p-2 '>WAREHOUSES</button></Link> */}
          {/* <Link href='/services'><button onClick={()=>closeMenuHandler()} className=' hover:underline  text-black p-2 '>SERVICES</button></Link> */}

          {authCtx.isLoggedIn && (
            <div className="group/parent relative group-hover/parent:bg-red-400  text-center h-[100%] flex flex-col items-center justify-center">
              <Link
                href={`${authCtx.isLoggedIn ? "/addproperty" : "/login"}`}
                className="group/item border-b-2 border-transparent hover:border-black duration-500 h-10"
              >
                <button className="text-black p-2 ">
                  ACCOUNT
                  {!authCtx.isLoggedIn && <KeyboardArrowDown />}
                </button>
              </Link>
              <div className="group/item2 invisible absolute top-2 mt-8  group-hover/parent:visible space-y-1 flex flex-col ">
                <div className=" bg-white shadow-lg border-black w-[240px] flex flex-col">
                  {!authCtx.isLoggedIn && (
                    <>
                      <MenuButton href="/login">LOGIN</MenuButton>
                      <MenuButton href="/login">SIGNUP</MenuButton>
                    </>
                  )}

                  {!authCtx.isLoggedIn && (
                    <button
                      onClick={() => {
                        authCtx.logout();
                        toast.success("Logged out successfully");
                      }}
                      className="text-black p-2 hover:cursor-pointer hover:bg-warehouseBlue hover:text-white flex justify-start w-[100%]"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <div className="group/parent relative group-hover/parent:bg-red-400  text-center h-[100%] flex flex-col items-center justify-center">
        <button  className="group/item border-b-2 border-transparent hover:border-black duration-500 h-10">SERVICES<KeyboardArrowDown/></button>
          <div className="group/item2 invisible absolute top-2 mt-8  group-hover/parent:visible space-y-1 flex flex-col " >
            <div className=" bg-white shadow-lg border-black w-[240px] flex flex-col">
            <MenuButton href='/services'>Services</MenuButton>
            <MenuButton href='/rentAndLease'>Rent and lease</MenuButton>
          <MenuButton href='/storageFacilities'>Storage Facilities</MenuButton>
          </div>
          </div>
      </div> */}

          <div>
            <div className="group/parent relative group-hover/parent:bg-red-400  text-center h-[100%] flex flex-col items-center justify-center">
              <button className=" border-b-2 border-transparent hover:border-black duration-500 h-10">
                PROPERTIES
                <KeyboardArrowDown />
              </button>
              <div className=" invisible absolute top-2 mt-8  group-hover/parent:visible  flex flex-col ">
                <div className=" bg-white shadow-lg border-black w-[240px] flex flex-col">
                  <div className="group/parent2 flex  ">
                    <Link
                      className={`text-black  p-2 hover:cursor-pointer hover:bg-warehouseBlue hover:text-white flex justify-start w-[100%] `}
                      href={"/properties"}
                    >
                      For Rent
                    </Link>
                  </div>
                  <Link
                    className={`text-black  p-2 hover:cursor-pointer hover:bg-warehouseBlue hover:text-white flex justify-start w-[100%] `}
                    href={"/properties"}
                  >
                    For Sale
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* <Link href='/director'><button className=' hover:underline  text-black p-2 '>DIRECTOR</button></Link> */}
          <Link href="/gallery">
            <button className=" hover:underline  text-black p-2 ">
              GALLERY
            </button>
          </Link>
          <Link href="/listwarehouse">
            <button className=" hover:underline  text-black p-2 ">
              LIST WAREHOUSE
            </button>
          </Link>
          <Link href="/contact">
            <button className=" hover:underline  text-black p-2 ">
              CONTACT
            </button>
          </Link>
        </div>

        <div className="hidden lg:flex h-[100%]">
          <div className="w-0 h-0 border-[40px] border-warehouseBlue border-l-transparent"></div>
          <div className="bg-warehouseBlue text-xl h-[100%] px-4 ">
            <div className="h-[100%] bg-warehouseBlue text-white text-xl font-bold flex justify-center items-center gap-4">
              <Phone sx={{ color: "white", fontSize: "32px" }} />
              <a href="tel:+918191802837">+918191802837</a>
            </div>
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="flex lg:hidden gap-2">
          <IconButton onClick={() => openMenuHandler()}>
            <Menu fontSize="large" />
          </IconButton>
        </div>
      </div>

      <div className="relative ">
        <div
          id="menu"
          className="  fixed top-0 left-[-200px] w-[0%] h-[100vh]  z-20 bg-white text-black duration-500 flex flex-col justify-center items-center"
        >
          <div className="max-h-[70vh] overflow-auto pr-4">
            <button
              onClick={() => closeMenuHandler()}
              className="absolute top-4 right-4 rounded-full bg-secondary p-2 cursor-pointer"
            >
              <Close sx={{ color: "white" }} fontSize="large" />
            </button>
            <div className="flex flex-col gap-2 md:gap-4">
              <Link href="/">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  HOME
                </button>
              </Link>
              <Link href="/about">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  ABOUT US
                </button>
              </Link>
              <Link href="/login">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  LOGIN
                </button>
              </Link>
              <Link href="/signup">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  SIGNUP
                </button>
              </Link>
              {/* <Link href='/director'><button onClick={()=>closeMenuHandler()} className=' bg-primary text-white p-2 hover:bg-secondary w-60'>DIRECTOR&apos;S MESSAGE</button></Link> */}
              <Link href="/warehouses">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  WAREHOUSES
                </button>
              </Link>
              {authCtx.isLoggedIn && (
                <>
                  <Link href="/dashboard">
                    <button
                      onClick={() => closeMenuHandler()}
                      className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                    >
                      DASHBOARD
                    </button>
                  </Link>
                  <Link href="/dashboard/addwarehouse">
                    <button
                      onClick={() => closeMenuHandler()}
                      className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                    >
                      ADD WAREHOUSE
                    </button>
                  </Link>
                  <Link href="/dashboard/addwarehouse">
                    <button
                      onClick={() => closeMenuHandler()}
                      className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                    >
                      GALLERY IMAGES
                    </button>
                  </Link>
                  <Link href="/dashboard/requestlisting">
                    <button
                      onClick={() => closeMenuHandler()}
                      className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                    >
                      REQUEST LISTING
                    </button>
                  </Link>
                </>
              )}
              {authCtx.isLoggedIn && (
                <Link href="/dashboard/addwarehouse">
                  <button
                    onClick={() => closeMenuHandler()}
                    className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                  >
                    ADD WAREHOUSE
                  </button>
                </Link>
              )}
              {/* <Link href='/services'><button onClick={()=>closeMenuHandler()} className=' bg-primary text-white p-2 hover:bg-secondary w-60'>SERVICES</button></Link> */}
              {/* <Link href='/rentAndLease'><button onClick={()=>closeMenuHandler()} className=' bg-primary text-white p-2 hover:bg-secondary w-60'>RENT AND LEASE</button></Link> */}
              {/* <Link href='/storageFacilities'><button onClick={()=>closeMenuHandler()} className=' bg-primary text-white p-2 hover:bg-secondary w-60'>STORAGE AND FACILITIES</button></Link> */}
              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    state: !mobileSearchButtons.state,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>STATE</span>
                {mobileSearchButtons.state ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>
              {mobileSearchButtons.state && (
                <>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 33 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(33);
                      setCity("");
                    }}
                  >
                    Uttarakhand
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 32 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(32);
                      setCity("");
                    }}
                  >
                    Uttar Pradesh
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 13 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(13);
                      setCity("");
                    }}
                  >
                    Himachal Pradesh
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 27 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(27);
                      setCity("");
                    }}
                  >
                    Punjab
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 12 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(12);
                      setCity("");
                    }}
                  >
                    Haryana
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 28 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(28);
                      setCity("");
                    }}
                  >
                    Rajasthan
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 4 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(4);
                      setCity("");
                    }}
                  >
                    Bihar
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 3 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(3);
                      setCity("");
                    }}
                  >
                    Assam
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 25 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(25);
                      setCity("");
                    }}
                  >
                    Odisha
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 15 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(15);
                      setCity("");
                    }}
                  >
                    Jharkhand
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 6 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(6);
                      setCity("");
                    }}
                  >
                    Chhattisgarh
                  </button>
                  <button
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      state === 10 ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => {
                      setState(10);
                      setCity("");
                    }}
                  >
                    Goa
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    city: !mobileSearchButtons.city,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>CITY</span>
                {mobileSearchButtons.city ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>

              {mobileSearchButtons.city &&
                allCities.map((item, i) => (
                  <button
                    key={i}
                    className={`p-2 hover:cursor-pointer text-white flex justify-center w-[100%] ${
                      city === item ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setCity(item)}
                  >
                    {item}
                  </button>
                ))}

              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    type: !mobileSearchButtons.type,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>TYPE</span>
                {mobileSearchButtons.type ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>
              {mobileSearchButtons.type && (
                <>
                  {/* <MobileButton href={`/warehouses?type=Prefab Structure`}>Prefab</MobileButton> */}
                  {/* <MobileButton href={`/warehouses?type=Semi Prefab Structure`}>Semi Prefab</MobileButton> */}
                  {/* <MobileButton href={`/warehouses?type=RCC`}>RCC</MobileButton> */}
                  {/* <MobileButton href={`/warehouses?type=Shed`}>Shed</MobileButton> */}
                  {/* <MobileButton href={`/warehouses?type=Land`}>Land</MobileButton> */}
                  {/* <MobileButton href={`/warehouses?type=Multi Store`}>Multi Store</MobileButton> */}

                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "Prefab"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("Prefab")}
                  >
                    Prefab
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "Semi Prefab"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("Semi Prefab")}
                  >
                    Semi Prefab
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "RCC"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("RCC")}
                  >
                    RCC
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "Shed"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("Shed")}
                  >
                    shed
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "Land"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("Land")}
                  >
                    land
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      type === "Multi Store"
                        ? "bg-warehouseBlue text-white"
                        : "bg-secondary"
                    }`}
                    onClick={() => setType("Multi Store")}
                  >
                    Multi Store
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    zone: !mobileSearchButtons.zone,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>ZONE</span>
                {mobileSearchButtons.zone ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>
              {mobileSearchButtons.zone && (
                <>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Normal" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Normal")}
                  >
                    Normal
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Red" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Red")}
                  >
                    Red
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Blue" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Blue")}
                  >
                    Blue
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Green" ? "bg-warehouseBluee" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Green")}
                  >
                    Green
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Yellow" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Yellow")}
                  >
                    Yellow
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Purple" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setZone("Purple")}
                  >
                    Purple
                  </button>
                  <button
                    className={`text-center p-2 hover:bg-warehouseBlue text-white ${
                      zone === "Industrial"
                        ? "bg-warehouseBlue"
                        : "bg-secondary"
                    }`}
                    onClick={() => setZone("Industrial")}
                  >
                    Industrial
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    category: !mobileSearchButtons.category,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>CATEGORY</span>
                {mobileSearchButtons.category ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>
              {mobileSearchButtons.category && (
                <>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      category === "Approved"
                        ? "bg-warehouseBlue"
                        : "bg-secondary"
                    }`}
                    onClick={() => setCategory("Approved")}
                  >
                    Approved
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      category === "Non-Approved"
                        ? "bg-warehouseBlue"
                        : "bg-secondary"
                    }`}
                    onClick={() => setCategory("Non-Approved")}
                  >
                    Non Approved
                  </button>
                  <button
                    className={`p-2 hover:bg-warehouseBlue text-white ${
                      category === "Both" ? "bg-warehouseBlue" : "bg-secondary"
                    }`}
                    onClick={() => setCategory("Both")}
                  >
                    Both
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setMobileSearchButtons({
                    ...mobileSearchButtons,
                    format: !mobileSearchButtons.format,
                  })
                }
                className=" bg-red-500 text-white p-2 hover:bg-red-500 w-60 flex justify-between"
              >
                <span></span>
                <span>FORMAT</span>
                {mobileSearchButtons.format ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </button>
              {mobileSearchButtons.format && (
                <>
                  <>
                    <button
                      className={`p-2 hover:bg-warehouseBlue text-white ${
                        format === "BTS" ? "bg-warehouseBlue" : "bg-secondary"
                      }`}
                      onClick={() => setFormat("BTS (build to suite)")}
                    >
                      BTS
                    </button>
                    <button
                      className={`p-2 hover:bg-warehouseBlue hover:text-white text-white ${
                        format === "Under Construction"
                          ? "bg-warehouseBlue "
                          : "bg-secondary"
                      }`}
                      onClick={() => setFormat("Under Construction")}
                    >
                      Under Construction
                    </button>
                    <button
                      className={`p-2 hover:bg-warehouseBlue text-white ${
                        format === "Ready to Move"
                          ? "bg-warehouseBlue"
                          : "bg-secondary"
                      }`}
                      onClick={() => setFormat("Ready to Move")}
                    >
                      Ready to Move
                    </button>
                  </>
                </>
              )}

              <Link href="/gallery">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  GALLERY
                </button>
              </Link>
              <Link href="/contact">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  CONTACT
                </button>
              </Link>
              <Link href="/listwarehouse">
                <button
                  onClick={() => closeMenuHandler()}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  LIST WAREHOUSE
                </button>
              </Link>
              {authCtx.isLoggedIn && (
                <button
                  onClick={() => {
                    authCtx.logout();
                    toast.success("Logged out successfully");
                    closeMenuHandler();
                  }}
                  className=" bg-primary text-white p-2 hover:bg-secondary w-60"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveDrawer;
