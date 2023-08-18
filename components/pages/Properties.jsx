import React, { useEffect, useState } from "react";
import SplashScreen from "../SplashScreen";
import TopCard from "../UI/TopCard";
import Footer from "../UI/Footer";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import { Container } from "@mui/system";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../UI/InputField";
import cities_arr, { state_arr } from "../utils/CityDropdown";
import { Search } from "@mui/icons-material";
import PropertyCard from "../UI/PropertyCard";
import { getAllAcceptedAndActiveProperty } from "../services/userServices";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [propertyFor, setPropertyFor] = useState("All");
  const [allProperty, setAllProperty] = useState([]);
  const [allPropertyAfterFilter, setAllPropertyAfterFilter] =
    useState(allProperty);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    setPropertyFor(url.get("type"));
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const fetchProperty = async () => {
      const allProperties = await getAllAcceptedAndActiveProperty();
      if (allProperties.status === 200) {
        setAllProperty(allProperties?.data);
        setAllPropertyAfterFilter(allProperties?.data)
      }
    };
    fetchProperty();
  }, [propertyFor]);
  useEffect(() => {
    if (propertyFor === "For Rent") {
      const allRents = allProperty?.filter(
        (property) => property?.motive === "rent"
      );
      setAllPropertyAfterFilter(allRents);
      return;
    }
    if (propertyFor === "For Sale") {
      const allRents = allProperty?.filter(
        (property) => property?.motive === "sale"
      );
      setAllPropertyAfterFilter(allRents);
     
    }
    setAllPropertyAfterFilter(allProperty);
  }, [propertyFor, allProperty]);
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

  // const [propertyList, setPropertyList] = useState([
  //   {
  //     image: assets.storageFacilities,
  //     title: "Los Angeles Long Plot",
  //     price: 10000,
  //     period: "Month",
  //     location: "Saudi Arab Lane 01",
  //     type: "House",
  //     owner: "John Dow",
  //     area: "150 sq. ft",
  //   },
  //   {
  //     image: assets.storageFacilities,
  //     title: "Los Angeles Long Plot",
  //     price: 10000,
  //     period: "Month",
  //     location: "Saudi Arab Lane 01",
  //     type: "House",
  //     owner: "John Dow",
  //     area: "150 sq. ft",
  //   },
  //   {
  //     image: assets.storageFacilities,
  //     title: "Los Angeles Long Plot",
  //     price: 10000,
  //     period: "Month",
  //     location: "Saudi Arab Lane 01",
  //     type: "House",
  //     owner: "John Dow",
  //     area: "150 sq. ft",
  //   },
  //   {
  //     image: assets.storageFacilities,
  //     title: "Los Angeles Long Plot",
  //     price: 10000,
  //     period: "Month",
  //     location: "Saudi Arab Lane 01",
  //     type: "House",
  //     owner: "John Dow",
  //     area: "150 sq. ft",
  //   },
  // ]);

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
                <div className="flex sticky top-0 flex-col gap-4 p-3 shadow-inner">
                  <div className="bg-secondary grid grid-cols-3 justify-between overflow-hidden rounded-sm">
                    <button
                      className={`p-2 text-white ${
                        propertyFor === "All" && "bg-primary"
                      }`}
                      onClick={() => setPropertyFor("All")}
                    >
                      All
                    </button>
                    <button
                      className={`p-2 text-white ${
                        propertyFor === "For Rent" && "bg-primary"
                      }`}
                      onClick={() => setPropertyFor("For Rent")}
                    >
                      For Rent
                    </button>
                    <button
                      className={`p-2 text-white ${
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
                            uni="format"
                            labelName="Format"
                            fieldRequired={true}
                            inputClass={"bg-quat rounded-sm"}
                          >
                            <>
                              <option value="BTS (Build To Suite)">
                                BTS (Build To Suite)
                              </option>
                              <option value="Under Construction">
                                Under Construction
                              </option>
                              <option value="Ready To Move">
                                Ready To Move
                              </option>
                            </>
                          </InputField>
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
                  {allProperty?.length > 0 &&
                    allPropertyAfterFilter?.map((item) => (
                      <PropertyCard
                        property={item.property}
                        img={item.img}
                        activity={item.activity}
                        motive={item?.motive}
                      />
                    ))}
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
