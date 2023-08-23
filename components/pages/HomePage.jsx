import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "../assets";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import Footer from "../UI/Footer";
import {
  Agriculture,
  CarRental,
  Delete,
  Email,
  Facebook,
  FoodBank,
  Hardware,
  HealthAndSafety,
  Instagram,
  Liquor,
  LocalDining,
  LocalShipping,
  MobileFriendly,
  Phone,
  Refresh,
  ShoppingCart,
  Twitter,
  Warehouse,
  Search,
  LocationOn,
  BookmarkBorder,
  Person,
  Map,
  SingleBedOutlined,
  BathtubOutlined,
  Message,
} from "@mui/icons-material";
import SplashScreen from "../SplashScreen";
import Link from "next/link";
import { Container, IconButton, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../../node_modules/swiper/modules/pagination.css";
import "../../node_modules/swiper/modules/navigation.css";
import "../../node_modules/swiper/modules/navigation.css";
import "../../node_modules/swiper/swiper.css";
import { Form, Formik } from "formik";
import Gap from "../UI/Gap";
import FormWrapper from "../UI/FormWrapper";
import InputField from "../UI/InputField";
import * as Yup from "yup";
import cities_arr, { state_arr } from "../utils/CityDropdown";
import { getAllFeaturedItemsforHomePage } from "../services/userServices";
import PropertyCard from "../UI/PropertyCard";

const HomePage = () => {

  const [loading, setLoading] = useState(true);
  const [fetchingProperties, setFetchingProperties] = useState(true)
  const [allFeaturedProperties, setAllFeaturedProperties] = useState(null)
  const [search, setSearch] = useState({
    city: "",
    state: "",
    type: "",
    category: "",
    zone: "",
    format: "",
  });
  const [propertyFor, setPropertyFor] = useState("For Sale");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const getFeatueedItems = async () => {
      const response = await getAllFeaturedItemsforHomePage();
      if (response.status === 200) {
        setAllFeaturedProperties(response?.data);
        setFetchingProperties(false)
      } else {
        setFetchingProperties(false)
      }
    }
    getFeatueedItems()
  }, [])

  const warehouses = [
    {
      title: "Warehouse Provide",
      para: "If you are looking for a reliable and efficient solution for your business warehousing and distribution needs.",
      img: assets.warehouse.warehouse_1,
    },
    {
      title: "Warehouse Rent and Lease",
      para: "Warehouse Services offer you to the rental or leasing of a commercial storage facility.",
      img: assets.warehouse.warehouse_2,
    },
    {
      title: "Storage Facilities	",
      para: "Storage facilities are physical spaces where individuals or businesses can rent units to store their belongings or inventory. ",
      img: assets.warehouse.warehouse_3,
    },
  ];

  const Card1 = ({ item }) => {
    return (
      <div
        data-aos="zoom-in-down"
        className="col-span-1 bg-white rounded-2xl overflow-hidden shadow-xl "
      >
        <div className="">
          <Image
            src={item.img}
            alt="Card"
            className="w-[100%]  object-cover"
          ></Image>
          <div className="p-4 flex flex-col gap-4">
            <h3 Warehouse className="text-2xl text-secondary font-bold">
              {item.title}
            </h3>
            <p>{item.para}</p>
            {/* <button className='p-2 w-32 bg-secondary  text-white mt-auto'>KNOW MORE</button> */}
          </div>
        </div>
      </div>
    );
  };

  const featuredList = [
    {
      image: assets.warehouse.warehouse_gallery_01,
      title: "Single House Near, Los Angeles",
      price: 30000,
      period: "Month",
      location: "1911 Sunset Blvd Los Angeles, CA 90026",
      type: "House",
      owner: "James Carlos",
      area: "105 sq.ft",
      bedroom: 1,
      bathroom: 2,
    },
    {
      image: assets.warehouse.warehouse_gallery_01,
      title: "Double Flat",
      price: 10000,
      period: "Month",
      location: "1911 Sunset Blvd Los Angeles, CA 90026",
      type: "House",
      owner: "John Doe",
      area: "185 sq.ft",
      bedroom: 3,
      bathroom: 2,
    },
    {
      image: assets.warehouse.warehouse_gallery_01,
      title: "Single House Near, Los Angeles",
      price: 30000,
      period: "Month",
      location: "1911 Sunset Blvd Los Angeles, CA 90026",
      type: "House",
      owner: "John Doe",
      area: "105 sq.ft",
      bedroom: 3,
      bathroom: 2,
    },
    {
      image: assets.warehouse.warehouse_gallery_01,
      title: "Single House Near, Los Angeles",
      price: 2000,
      location: "1911 Sunset Blvd Los Angeles, CA 90026",
      type: "House",
      owner: "John Doe",
      area: "15 sq.ft",
      bedroom: 3,
      bathroom: 2,
    },
  ];
  const FeaturedProperty = ({
    image,
    title,
    price,
    period,
    location,
    type,
    owner,
    area,
    bedroom,
    bathroom,
  }) => {
    return (
      <div className="flex flex-col gap-2 bg-quat shadow-md rounded overflow-hidden h-full justify-between">
        <Image src={image} alt={"Not Found"} className="h-52" />
        <div className="p-3 flex flex-col gap-2">
          <p className="w-20 bg-primary shadow-sm text-sm p-1 rounded-full text-center text-white font-bold">
            For Sale
          </p>
          <h2 className="text-xl font-bold">{title}</h2>
          <p>
            Rs {price.toLocaleString("en-US")}{" "}
            <b className="text-primary">/ {period ? period : "-"}</b>
          </p>
          <div className="flex gap-2">
            <LocationOn sx={{ color: "orange" }} />
            <p>{location}</p>
          </div>
          <div className="flex gap-2">
            <BookmarkBorder sx={{ color: "orange" }} />
            <p>{type}</p>
          </div>
          <div className="flex gap-2">
            <Person sx={{ color: "orange" }} />
            <p>{owner}</p>
          </div>
        </div>
        <div className="bg-primary px-3 p-1 text-white flex justify-between text-sm shadow-inner">
          <div className="flex gap-1 items-center">
            <Map />
            <p>{area}</p>
          </div>
          <div className="flex gap-1 items-center">
            <SingleBedOutlined />
            <p>{bedroom}</p>
          </div>
          <div className="flex gap-1 items-center">
            <BathtubOutlined />
            <p>{bathroom}</p>
          </div>
        </div>
      </div>
    );
  };

  const DealsIn = ({ title, image }) => {
    return (
      <div className="bg-white shadow-md rounded overflow-hidden w-48 my-10 mx-10">
        <Image src={image} alt={"Not Found"} className="h-32" />
        <p className="text-xl text-center my-3">{title}</p>
      </div>
    );
  };

  const taskList = [
    { title: "Warehouse", image: assets.dealsIn.warehouse },
    { title: "Industrial Shed", image: assets.dealsIn.industrialShed },
    { title: "Hotel", image: assets.dealsIn.hotel },
    { title: "Call Center", image: assets.dealsIn.callCenter },
    { title: "Restaurant", image: assets.dealsIn.restaurant },
    { title: "Factory", image: assets.dealsIn.factory },
    { title: "Showroom", image: assets.dealsIn.showroom },
    { title: "Corporate Office", image: assets.dealsIn.corporate },
    { title: "Co-working Space", image: assets.dealsIn.co_working },
  ];

  const clientList = [
    assets.HDFC,
    assets.Ola,
    assets.Delhivery,
    assets.IDP,
    assets.NU,
    assets.Bihani,
    assets.Bata,
    assets.V_MART,
  ];

  const initialValues = {
    type: "",
    title: "",
    address: "",
    bedroom: "Any Bedrooms",
    minPrice: 1000,
    max: 50000,
    size: "10",
    landarea: "100",
  };
  const validationSchema = Yup.object({
    type: Yup.string(),
    title: Yup.string(),
    address: Yup.string(),
    bedroom: Yup.string(),
    minPrice: Yup.string(),
    max: Yup.string(),
    size: Yup.string(),
    landarea: Yup.string(),
  });

  const onSubmitHandler = ({ values }) => {
    console.log(values);
  };

  const UserTestimonialData = [
    {
      index: 0,
      user: "Robby Sharifah",
      designation: "CEO",
      title: "Most Value For Money",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis bcaecati repellendus iusto officia! Architecto harum corrupti voluptatem animi incidunt numquam odit, eveniet illo, nam non onsequuntur cumque rerum commodi. Provident libero quo praesentium olorem quam corrupti ipsa deserunt sunt voluptatibus.",
      image: assets.feedback_img,
    },
    {
      index: 1,
      user: "Johnny James",
      designation: "Manager",
      title: "Most knowledgable",
      testimonial:
        "Lorem ipsum dolor caecati repellendus iusto officia! Architecto harum corrupti voluptatem animi incidunt numquam odit, eveniet illo, nam non onsequuntur cumque rerum commodi. Provident libero quo praesentium olorem quam corrupti ipsa deserunt sunt voluptatibus.",
      image: assets.feedback_img,
    },
    {
      index: 2,
      user: "Robby Sharifah",
      designation: "CEO",
      title: "Most Value For Money",
      testimonial:
        "eveniet illo, nam non onsequuntur cumque rerum commodi. Provident libero quo praesentium olorem quam corrupti ipsa deserunt sunt voluptatibus.",
      image: assets.feedback_img,
    },
  ];

  const UserTestimonial = ({
    user,
    designation,
    title,
    testimonial,
    image,
  }) => {
    return (
      <div className="flex flex-col justify-center items-center p-4 gap-2 max-w-sm">
        <div className="bg-quat w-20 aspect-square flex justify-center items-center text-primary rounded-full">
          <Image src={image} />
        </div>
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-xl">{user}</h2>
          <p> {designation} </p>
          <p>
            {testimonial.substring(0, 170)}
            <button className="text-primary">...Read More </button>
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div id="Ubuntu" className="text-black z-10">
          {/* <div className='h-[600px] md:h-[100vh] relative'>
      <div className='bg-gradient-to-tr  from-primary to-secondary opacity-40 z-10 h-[100vh] absolute top-0 w-[100%]'></div>
      <div className='absolute top-0 left-0 text-white z-10 border-b-2 border-white w-[100%] p-4 flex justify-between backdrop-brightness-50 md:px-40'>
        <h2 id='LuckiestGuy' className='text-4xl font-bold'>SIKKAWAREHOUSE</h2>
        <div className='flex gap-2'>
          <button>HOME</button>
          <button>HOME</button>
          <button>HOME</button>
          <button>HOME</button>
        </div>
      </div>

      <div className='absolute top-20 z-10 text-white h-[calc(100vh-_-74px)] w-[100%] flex justify-center items-center'>
        <div>
          <h2 className='text-8xl'>Industry</h2>
          <h2 className='text-8xl'>Solutions</h2>
        </div>
      </div>
      <Image alt='Hero Section' className='h-[100%] overflow-hidden brightness-50' src={assets.bg_01} />

      </div> */}

          <div className="bg-primary flex-col  p-1 flex gap-2 justify-between ">
            <div className="flex flex-col gap-2">
              <div className="flex text-white gap-1 justify-between">
                <div className="flex text-white gap-1">
                  <Phone sx={{ color: "white" }} />
                  <a href="tel:+918191802837">+918191802837</a>
                </div>
                <div className=" flex-1 hidden md:flex text-white gap-1">
                  <Email sx={{ color: "white" }} />
                  <a href="mailto:warehouseservicez@gmail.com">
                    warehouseservicez@gmail.com
                  </a>
                </div>
                <div className="flex gap-1 ">
                  <IconButton
                    size="small"
                    onClick={() => {
                      window.open(
                        "https://www.facebook.com/warehouseservicez",
                        "_blank",
                      );
                    }}
                  >
                    <Facebook fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      window.open(
                        "https://instagram.com/warehouse.services?igshid=NTc4MTIwNjQ2YQ==",
                        "_blank",
                      );
                    }}
                  >
                    <Instagram fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      window.open(
                        "https://twitter.com/warehouseservi3",
                        "_blank",
                      );
                    }}
                  >
                    <Twitter fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                </div>
              </div>

              <div className="flex visible md:hidden text-white gap-1">
                <Email sx={{ color: "white" }} />
                <a href="mailto:warehouseservicez@gmail.com">
                  warehouseservicez@gmail.com
                </a>
              </div>
            </div>
          </div>
          <ResponsiveDrawer />
          <div className="h-max">
            <Swiper
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
              }}
              className="h-[100vh]"
            >
              <SwiperSlide>
                <Image
                  data-aos="zoom-in-up"
                  src={assets.bg_01}
                  alt="Hero Section"
                  className="w-full h-full m-auto object-cover overflow-x-hidden"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  data-aos="zoom-in-up"
                  src={assets.bg_01}
                  alt="Hero Section"
                  className="w-full h-full m-auto object-cover overflow-x-hidden"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Section 1 */}
          {/*
          <div className='bg-gradient-to-tr from-primary to-secondary py-8 overflow-hidden relative' >
              <div className="absolute top-[20vh] md:top-[40vh] left-0 right-0 mx-auto bottom-0 z-10 flex flex-col gap-8">
                  <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-right">MINIMUM THE RENTAL</h1>
                  <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-left">LONGER THE SURVIVAL</h1>
              </div>
              <div className='w-[90%] md:w-[100vh] m-auto h-[400px] md:h-auto'>
                  <Image data-aos='zoom-in-up' src={assets.bg_02} alt='Hero Section' className='w-[80%] m-auto object-cover overflow-x-hidden' />
              </div>
          </div>*/}

          {/* Section 2*/}
          <div className="bg-ter min-h-[300px] w-[100vw] flex">
            <div className="min-h-full bg-secondary p-5 flex flex-col justify-center">
              <p className="text-lg">Discover Your</p>
              <p className="text-3xl font-bold">Dream</p>
              <p className="text-3xl font-bold">House</p>
            </div>
            <div className="p-5 w-full">
              <div className="p-2 flex gap-3">
                <button
                  className={`w-20 p-2 rounded ${propertyFor === "For Sale" && "bg-quat"
                    }`}
                  onClick={() => setPropertyFor("For Sale")}
                >
                  For Sale
                </button>
                <button
                  className={`w-20 p-2 rounded ${propertyFor === "For Rent" && "bg-quat"
                    }`}
                  onClick={() => setPropertyFor("For Rent")}
                >
                  For Rent
                </button>
              </div>
              <hr />
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                  onSubmit={onSubmitHandler}
                >
                  {({ values }) => {
                    return (
                      <Form>
                        <FormWrapper>
                          <InputField
                            override={true}
                            as="select"
                            uni="type"
                            labelName="Type"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            {propertyFor === "For Rent" ? (
                              <>
                                <option value="Hotels">Hotels</option>
                                <option value="Food Court">Food court</option>
                                <option value="Office Space">
                                  Office space
                                </option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="Factory">Factory</option>
                                <option value="Schools">Schools</option>
                                <option value="Banks">Banks</option>
                                <option value="Hospitals">Hospitals</option>
                                <option value="Call center">Call center</option>
                                <option value="Land">Land</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Mall">Mall</option>
                                <option value="Multiplex">Multiplex</option>
                              </>
                            ) : (
                              <>
                                <option value="Resedential">Resedential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Pre-lease">Pre-lease</option>
                              </>
                            )}
                          </InputField>
                          <InputField
                            override={true}
                            as="select"
                            labelName="State"
                            uni="state"
                            placeholder="Uttarakhand"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            <option disabled value="">
                              Choose
                            </option>
                            {state_arr.map((item, i) => (
                              <option key={i} value={i}>
                                {item}
                              </option>
                            ))}
                          </InputField>
                          <InputField
                            override={true}
                            as="select"
                            labelName="City"
                            uni="city"
                            placeholder="Dehradun"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            <option disabled value="">
                              Choose
                            </option>
                            {cities_arr[values.state]?.map((item, i) => (
                              <option key={i} value={`${item}`}>
                                {item}
                              </option>
                            ))}
                          </InputField>

                          <InputField
                            override={true}
                            as="select"
                            labelName="Format"
                            uni="format"
                            placeholder="Dehradun"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            <option disabled value="">
                              Choose
                            </option>
                            <option value="BTS">BTS(Build To Suite)</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="Ready to Move">Ready to Move</option>
                          </InputField>
                          {/* 
                          <InputField
                            uni="title"
                            placeholder="Title"
                            labelName="Title"
                            inputClass={"bg-quat rounded-sm"}
                          />
                          <InputField
                            uni="address"
                            placeholder="Address"
                            labelName="Address"
                            inputClass={"bg-quat rounded-sm"}
                          />
                          <InputField
                            uni="bedroom"
                            placeholder="Bedroom"
                            labelName="Bedroom"
                            inputClass={"bg-quat rounded-sm"}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <InputField
                              uni="minPrice"
                              placeholder="Min Price"
                              labelName="Min Price"
                              inputClass={"bg-quat rounded-sm"}
                            />
                            <InputField
                              uni="max"
                              placeholder="Max Price"
                              labelName="Max Price"
                              inputClass={"bg-quat rounded-sm"}
                            />
                          </div>
                          <InputField
                            uni="size"
                            placeholder="Size"
                            labelName="Size"
                            inputClass={"bg-quat rounded-sm"}
                          />
                          <InputField
                            uni="landarea"
                            placeholder="Land Area"
                            labelName="Land Area"
                            inputClass={"bg-quat rounded-sm"}
                          />
                            */}
                        </FormWrapper>

                        <div className="flex justify-end">
                          {/* {!buttonLoading ? ( */}
                          <Link
                            type="submit"
                            className={`bg-primary rounded-sm text-white w-32 h-10 flex justify-center items-center gap-3`}
                            href="/properties"
                          >
                            {/* {id ? "UPDATE" : "SUBMIT"} */}
                            <Search /> Search
                          </Link>
                          {/* ) : ( */}
                          {/* <Spinner size={40} /> */}
                          {/* )} */}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
          <div className="bg-white py-10">
            <div className="w-[80%] m-auto">
              <h1 className="text-3xl my-3">Find A Property</h1>
              <hr className="my-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 my-3 gap-4">
                {!fetchingProperties ? (allFeaturedProperties && allFeaturedProperties?.length > 0 && allFeaturedProperties.map((item) => (
                  // <FeaturedProperty key={property.title} {...property} />
                  <PropertyCard
                    property={item.property}
                    img={item.img}
                    activity={item.activity}
                    motive={item?.motive}
                  />
                ))) : 
                <>
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    
                  
                </> 
                }
              </div>
              <div className="flex justify-center">
                <Link href={'/properties'}>
                  <button className="col-span-full w-40 p-2 rounded-sm hover:bg-primary hover:text-white font-bold text-primary border border-primary justify-self-center">
                    Show More
                  </button>
                </Link>

              </div>
              {/*<Swiper
                spaceBetween={20}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  "@0.75": {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  "@1.50": {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
              >
                <SwiperSlide>
                  <FeaturedProperty />
                </SwiperSlide>
                <SwiperSlide>
                  <FeaturedProperty />
                </SwiperSlide>
                <SwiperSlide>
                  <FeaturedProperty />
                </SwiperSlide>
                <SwiperSlide>
                  <FeaturedProperty />
                </SwiperSlide>
              </Swiper>*/}
            </div>
          </div>

          {/* <div id='parallex_1'  className='h-[calc(100vh_-_122px)] bg-cover md:bg-fixed flex flex-col justify-center items-center gap-16  bg-no-repeat  bg-center  bg-secondary text-5xl md:text-8xl text-white font-bold text-center'> */}
          {/* <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-right">MINIMUM THE RENTAL</h1> */}
          {/* <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-left">LONGER THE SURVIVAL</h1> */}
          {/* </div> */}

          {/* <div className='bg-cover md:bg-fixed flex flex-col justify-center items-center gap-16 py-9  bg-no-repeat bg-center text-5xl md:text-8xl text-white font-bold text-center' style={{background: `url(${assets.warehouse})`}}> */}
          {/* <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-right">MINIMUM THE RENTAL</h1> */}
          {/* <h1 id='LuckiestGuy' className='text-5xl md:text-8xl text-white font-bold text-center' data-aos="fade-left">LONGER THE SURVIVAL</h1> */}
          {/* <Image src={assets.bg_02} alt='Image Not Found' /> */}
          {/* </div> */}

          {/* <div className=" min-h-[600px]"
              style={{ background: `url('${assets.bg_02.src}')` }}

          >
            <div
              className="bg-primary bg-opacity-60 bg-cover md:bg-fixed flex flex-col justify-center items-center gap-16 py-9  bg-no-repeat bg-center text-5xl md:text-8xl text-black font-bold text-center h-[600px]"
            >
              <h1
                id="LuckiestGuy"
                className="text-5xl drop-shadow-md md:text-8xl text-white font-bold text-center"
                data-aos="fade-right"
              >
                MINIMUM THE RENTAL
              </h1>
              <h1
                id="LuckiestGuy"
                className="text-5xl md:text-8xl drop-shadow-md text-white font-bold text-center"
                data-aos="fade-left"
              >
                LONGER THE SURVIVAL
              </h1> */}
          {/* <Image src={assets.bg_02} alt='Image Not Found' className='relative' /> */}
          {/* </div>
          </div> */}
          {/* <div className='min-h-[100vh]' style={{backgroundImage: `url('${assets.bg_02.src}')`}}> */}
          {/* {console.log(assets.bg_02.src)} */}
          {/* Hello */}
          {/* </div> */}

          {/* Search Warehouse */}

          {/* <div className='bg-orange-500 p-10 m-4 md:m-auto lg:w-[1080px] translate-y-[-100px] rounded-xl flex flex-col items-center '>
        <h3 id='LuckiestGuy' className='text-4xl text-white text-center font-bold'>SEARCH WAREHOUSE</h3>
       <FormWrapper className='w-[100%]' >
            <div  className="flex flex-col">
            <label className='text-white' htmlFor="search_state" >State</label>
            <select value={search.state} onChange={(e)=>setSearch({...search,state:e.target.value})} name="search_state" className="bg-white p-[10px] rounded-lg">
            <option  value=''>All</option>
              {state_arr.map((item, i) =>
                <option key={i} value={i}>{item}</option>
              )}
            </select>
            </div>

  

            <div className="flex flex-col">
            <label className='text-white' htmlFor="search_city">City</label>
            <input value={search.city} placeholder="Enter City" onChange={(e)=>setSearch({...search,city:e.target.value})} type="text" className="bg-white p-2 rounded-lg" name="search_city" list="options_city"/>

             <datalist  id="options_city">
              {cities_arr.map((item, i) =>
              item.map((item2,j)=>
              <option key={j} value={item2}>{item2}</option>
              )
              )}
              </datalist> 
            </div>

            <div className="flex flex-col">
            <label className='text-white' htmlFor="search_type">Type</label>
            <select value={search.type} onChange={(e)=>setSearch({...search,type:e.target.value})}   className="bg-white p-[10px] rounded-lg">
             <option  value=''>All</option>
              <option value='Prefab Structure'>Prefab Structure</option>
              <option value='Semi Prefab Structure'>Semi Prefab Structure</option>
              <option value='RCC'>RCC</option>
              <option value='Shed'>Shed</option>
              <option value='Land'>Land</option>
              <option value='Multi Store'>Multi Store</option>
              </select>
            </div>

            <div className="flex flex-col">
            <label className='text-white' htmlFor="search_type">Zone</label>
            <select value={search.zone} onChange={(e)=>setSearch({...search,zone:e.target.value})}   className="bg-white p-[10px] rounded-lg">
             <option value=''>All</option>
             <option value='Normal'>Normal</option>
             <option value='Red'>Red</option>
             <option value='Blue'>Blue</option>
             <option value='Green'>Green</option>
             <option value='Yellow'>Yellow</option>
             <option value='Purple'>Purple</option>
              </select>
            </div>

            <div className="flex flex-col">
            <label className='text-white' htmlFor="search_type">Category</label>
            <select value={search.category} onChange={(e)=>setSearch({...search,category:e.target.value})}  className="bg-white  p-[10px] rounded-lg">
             <option  value=''>All</option>
             <option value='Approved'>Approved</option>
             <option value='Non-Approved'>Non-Approved</option>
             <option value='Both'>Both</option>
            </select>
            </div>

            <div className="flex flex-col">
            <label className='text-white' htmlFor="search_type">Format</label>
            <select onChange={(e)=>setSearch({...search,format:e.target.value})} value={search.format}  className="bg-white p-[10px] rounded-lg">
             <option  value=''>All</option>
             <option value='BTS'>BTS</option>
              <option value='Ready to Move'>Ready to Move</option>
            </select>
            </div>


        </FormWrapper>
        <Link href={`/warehouses?state=${search.state}&city=${search.city}&type=${search.type}&category=${search.category}&zone=${search.zone}&format=${search.format}`} className='rounded-lg bg-white p-2 w-[100%] md:w-[200px] text-center  my-4 md:mx-auto'>SEARCH</Link>
      </div> */}

          <div className="bg-quat p-[10%] m-auto shadow-inner">
            <h1 className="text-3xl">We Deals In Commercial Space</h1>
            <hr className="my-3" />
            <Swiper
              spaceBetween={20}
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              id="commercial"
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                "@1.50": {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
            >
              {taskList.map((item) => (
                <SwiperSlide key={item.title}>
                  <DealsIn {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Section 2 */}
          <div className="bg-white px-4 py-20 lg:px-40 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-hidden">
            <div
              data-aos="fade-right"
              className="flex flex-col gap-4 overflow-x-hidden"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Know About Sikka and Associates
              </h2>
              <p>
                Sikka and Associates are committed to providing their clients
                with top-notch commercial properties that are tailored to their
                unique needs. With 20 years of experience in the real estate
                industry,We have built a reputation for excellence and are
                dedicated to delivering outstanding services to our clients. We
                Deals In All Type of Commercial Space On Rent/Lease.
              </p>
              <p>
                We Provide Space For Retail store, Showroom, Land, Corporate
                Office , Schools/Hostel, Hotel , Restaurant , Co-working space,
                Call center, Warehouse, Industrial Shed, Factory etc
              </p>
              <Link
                href="/services"
                className="bg-secondary text-white w-40 p-2 text-center rounded-sm"
              >
                KNOW MORE
              </Link>
            </div>
            <div className="overflow-x-hidden" data-aos="fade-left">
              <Image
                alt="Hero Section"
                className="h-[100%] overflow-hidden object-cover rounded-sm"
                src={assets.bg_01}
              />
            </div>
          </div>

          {/* Section 3 */}
          {/*
          <div className="px-4 py-20 lg:px-40 bg-gradient-to-tr from-primary  to-secondary flex flex-col overflow-x-hidden">
            <h1
              id="LuckiestGuy"
              className="text-5xl md:text-7xl text-white font-bold text-center"
              data-aos="zoom-out"
            >
              OUR SERVICES
            </h1>
            <h2
              id="Ubuntu"
              className="text-white text-2xl text-center mb-8"
              data-aos="zoom-in"
            >
              Our experts offer a full range of warehouse services
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {warehouses.map((item, i) => (
                <Card1 key={i} item={item} />
              ))}
            </div>
          </div>
        */}

          {/* Section 4 */}
          {/* 
          <div className="px-4 py-20 lg:px-40 bg-gray-600 text-white flex flex-col gap-8 overflow-x-hidden ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h3 data-aos="fade-right" id="Ubuntu" className="text-3xl">
                Provides High Performance Services For Multiple Industries And
                Technologies!
              </h3>
              <div data-aos="fade-left" className="flex flex-col gap-2">
                <p className="text-gray-200">
                  Industic Engineering has been built on engineering excellence
                  crafted through unstinted dedication to quality, innovation
                  and a constant objective to serve the global market & decade
                  young industry expertise.
                </p>
                <Link
                  href="/services"
                  className="bg-secondary text-white w-40 p-2 text-center"
                >
                  KNOW MORE
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <ShoppingCart sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">E-Commerce</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <LocalShipping sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Logistics</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <FoodBank sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">FMCG</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <HealthAndSafety sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Healthcare/Pharma</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <LocalDining sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Food Supply Chain</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <Hardware sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Hardware</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <CarRental sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Automobiles</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <Agriculture sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Agriculture</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <Warehouse sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">CA Cold Store</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <Liquor sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Liquor</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <MobileFriendly sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">E-Waste</p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="flex flex-col items-center bg-white p-4 py-16 rounded-xl text-black"
              >
                <Delete sx={{ color: "#764BA2" }} fontSize="large" />
                <p className="uppercase font-bold">Recycle</p>
              </div>
            </div>
          </div>
     */}
          <div className="bg-quat p-[10%] m-auto shadow-inner">
            <h1 className="text-3xl">We Serve</h1>
            <hr className="my-3" />
            <Swiper
              spaceBetween={40}
              modules={[Pagination, Autoplay, Navigation, Pagination]}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              id="commercial"
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                },
                "@0.75": {
                  slidesPerView: 2,
                },
                "@1.00": {
                  slidesPerView: 3,
                },
                "@1.50": {
                  slidesPerView: 4,
                },
              }}
            >
              {clientList.map((item, i) => (
                <SwiperSlide className="my-10 flex" key={i}>
                  <Image src={item} className="w-1/2 mx-16" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Testimonials */}
          <div className="bg-white p-[10%] m-auto">
            <h1 className="text-3xl">Testimonials</h1>
            <hr className="my-3" />
            <Swiper
              spaceBetween={20}
              modules={[Pagination, Autoplay, Navigation, Pagination]}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              id="commercial"
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@1.00": {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                "@1.50": {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {UserTestimonialData.map((item) => (
                <SwiperSlide className="m-3 my-10">
                  <UserTestimonial {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Section 5 */}

          <div className="flex flex-col justify-center items-center bg-white text-black overflow-hidden">
            <h4 data-aos="zoom-out" className="text-4xl font-bold m-10 ">
              OUR LOCATION
            </h4>
            <iframe
              className="w-full h-[300px] md:h-[400px]"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.2067707735296!2d78.0095323763292!3d30.31663590562165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092925e963de41%3A0xaa1fcaa43e5c52cb!2sWarehouse%20Servicez!5e0!3m2!1sen!2sin!4v1683894184725!5m2!1sen!2sin"
            ></iframe>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomePage;
