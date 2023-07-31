import React, { useEffect, useState } from "react";
import SplashScreen from "../SplashScreen";
import TopCard from "../UI/TopCard";
import Footer from "../UI/Footer";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import { Container } from "@mui/system";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormWrapper from "../UI/FormWrapper";
import InputField from "../UI/InputField";
import {
  BathtubOutlined,
  BookmarkBorder,
  LocationOn,
  Map,
  Person,
  Search,
  SingleBedOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { assets } from "../assets";
const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [propertyFor, setPropertyFor] = useState("For Rent");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  const [propertyList, setPropertyList] = useState([
    {
      image: assets.storageFacilities,
      title: "Los Angeles Long Plot",
      price: 10000,
      period: "Month",
      location: "Saudi Arab Lane 01",
      type: "House",
      owner: "John Dow",
      area: "150 sq. ft",
    },
    {
      image: assets.storageFacilities,
      title: "Los Angeles Long Plot",
      price: 10000,
      period: "Month",
      location: "Saudi Arab Lane 01",
      type: "House",
      owner: "John Dow",
      area: "150 sq. ft",
    },
    {
      image: assets.storageFacilities,
      title: "Los Angeles Long Plot",
      price: 10000,
      period: "Month",
      location: "Saudi Arab Lane 01",
      type: "House",
      owner: "John Dow",
      area: "150 sq. ft",
    },
    {
      image: assets.storageFacilities,
      title: "Los Angeles Long Plot",
      price: 10000,
      period: "Month",
      location: "Saudi Arab Lane 01",
      type: "House",
      owner: "John Dow",
      area: "150 sq. ft",
    },
  ]);
  const PropertyCard = ({
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
      <div className="flex flex-col gap-2 bg-quat shadow-md rounded overflow-hidden justify-between h-fit">
        <Image src={image} alt={"Not Found"} className="h-52" />
        <div className="p-3 flex flex-col gap-2">
          <p className="w-20 bg-primary shadow-sm text-sm p-1 rounded-full text-center text-white font-bold">
            For Sale
          </p>
          <h2 className="text-xl font-bold">{title}</h2>
          <p>
            Rs {price.toLocaleString("en-US")}
            <b className="text-primary"> / {period ? period : "-"}</b>
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

  return (
    <div className="relative">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <ResponsiveDrawer />
          <TopCard title="Properties" />
          <div className="py-20 bg-white text-black ">
            <Container>
              <div className="grid grid-cols-3 my-10 gap-3">
                <div className="flex flex-col gap-4 p-3 shadow-inner">
                  <div className="bg-secondary flex rounded-sm overflow-hidden">
                    <button
                      className={`p-2 w-32 text-white ${
                        propertyFor === "For Rent" && "bg-primary"
                      }`}
                      onClick={() => setPropertyFor("For Rent")}
                    >
                      For Rent
                    </button>
                    <button
                      className={`p-2 w-32 text-white ${
                        propertyFor === "For Sale" && "bg-primary"
                      }`}
                      onClick={() => setPropertyFor("For Sale")}
                    >
                      For Sale
                    </button>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={onSubmitHandler}
                  >
                    {({ values }) => {
                      return (
                        <Form className="flex flex-col gap-4">
                          <InputField
                            override={true}
                            as="select"
                            uni="type"
                            labelName="Type"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            <option disabled value="">
                              Choose
                            </option>
                            <option value="Prefab Structure">
                              Prefab Structure
                            </option>
                            <option value="Semi Prefab Structure">
                              Semi Prefab Structure
                            </option>
                            <option value="RCC">RCC</option>
                            <option value="Shed">Shed</option>
                            <option value="Land">Land</option>
                            <option value="Multi Store">Multi Store</option>
                          </InputField>
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

                          <div className="flex justify-end">
                            {/* {!buttonLoading ? ( */}
                            <button
                              type="submit"
                              className={`bg-primary rounded-sm text-white w-32 h-10 flex justify-center items-center gap-3`}
                            >
                              {/* {id ? "UPDATE" : "SUBMIT"} */}
                              <Search /> Search
                            </button>
                            {/* ) : ( */}
                            {/* <Spinner size={40} /> */}
                            {/* )} */}
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div className="shadow-lg col-span-2 bg-quat p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {propertyList &&
                    propertyList.map((item) => <PropertyCard {...item} />)}
                </div>
              </div>
            </Container>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Properties;
