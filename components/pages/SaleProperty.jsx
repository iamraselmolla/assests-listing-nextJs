import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormWrapper from "../UI/FormWrapper";
import { Input } from "postcss";
import InputField from "../UI/InputField";
import Gap from "../UI/Gap";
import cities_arr, { state_arr } from "../utils/CityDropdown";
import Spinner from "../UI/Spinner";
import { Add, Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { addProperty } from "../services/userServices";
// import cloudinary from '../utils/cloudinary'
const SaleProperty = () => {
  const router = useRouter();
  const { id } = router.query;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [image, setImage] = useState([]);
  const [propertyType, setPropertyType] = useState(null);
  const [fetchedValues, setFetchedValues] = useState({
    motive: "",
    property: {
      type: "",
      format: "",
      city: "",
      state: "",
    },
    owner: {
      name: "",
      email: "",
      mobile1: "",
      mobile2: "",
    },
    img: "",
    // address: "",
    // description: "",
    // size: "",
    // zone: "",
    // category: "",
    // partlyAvailable: "",
    // price: "",
  });

  useEffect(() => {
    const fetchWarehouse = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/warehouse?id=${id}`);
          const item = response.data.warehouse;
          setPreview([item.imageUrl]);
          setFetchedValues(item);
        } catch (err) {
          toast.error(err);
        }
      }
    };
    fetchWarehouse();

    return () => {
      setFetchedValues({
        motive: "",
        property: {
          type: "",
          format: "",
          city: "",
          state: "",
        },
        owner: {
          name: "",
          email: "",
          mobile1: "",
          mobile2: "",
        },
        img: "",
        // address: "",
        // description: "",
        // size: "",
        // zone: "",
        // category: "",
        //
        // partlyAvailable: "",
        // price: "",
      });
    };
  }, [id]);

  const validationSchema = Yup.object({
    property: Yup.object().shape({
      type: Yup.string().required("Required"),
      format: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
    }),
    owner: Yup.object().shape({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid format"),
      // email: Yup.string().email("Invalid format"),
      mobile1: Yup.string().required("Required"),
    }),
    // description:Yup.string().required('Required'),
    // address: Yup.string().required("Required"),
    // size: Yup.string().required("Required"),
    // category: Yup.string().required("Required"),
    // price: Yup.string().required("Required"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    setButtonLoading(true);
    let imageUrl = "";
    if (image.length > 0) {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "client-uploads");
      try {
        // const res = await fetch(
        //   `https://api.cloudinary.com/v1_1/da75fckow/image/upload`,
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // );
        // const data = await res.json();
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/da75fckow/image/upload",
          formData
        );
        console.log(response);

        if (response.status === 200) {
          imageUrl = response.data.secure_url;
          values.motive = "sale";
          values.img = imageUrl;
          const result = await addProperty(values);
          if (result.status === 200) {
            toast.success("Property added");
            resetForm({ values: "" });
            setButtonLoading(false);
          }
        }
      } catch (err) {
        setButtonLoading(false);
        console.error(err);
      }
    } else {
      toast.error("Please select a property Image");
    }

    // let res;
    try {
      // if (id) {
      //   res = await axios.put(`/api/warehouse?id=${id}`, {
      //     address: values.address,
      //     type: values.type,
      //     format: values.format,
      //     city: values.city,
      //     state: values.state,
      //     imageUrl: image.length > 0 ? imageUrl : preview[0],
      //     size: values.size,
      //     zone: values.zone,
      //     category: values.category,
      //     owner: values.owner,
      //     addedBy: "owner",
      //     partlyAvailable: values.partlyAvailable,
      //     price: values.price,
      //   });
      //   toast.success("Updated Successfully");
      // } else {
      //   res = await axios.post("/api/warehouse", {
      //     address: values.address,
      //     type: values.type,
      //     format: values.format,
      //     city: values.city,
      //     state: values.state,
      //     imageUrl: imageUrl,
      //     size: values.size,
      //     zone: values.zone,
      //     category: values.category,
      //     owner: values.owner,
      //     addedBy: "owner",
      //     partlyAvailable: values.partlyAvailable,
      //     price: values.price,
      //   });
      // }
      if (res.status === 201) {
        resetForm({ values: "" });
        setImage([]);
        setPreview([]);
        toast.success("Added Successfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setButtonLoading(false);
    }
  };
  useEffect(() => {
    if (image.length === 0) return;
    const objectUrl = URL.createObjectURL(image[image.length - 1]);
    setPreview([...preview, objectUrl]);
  }, [image]);

  const addImages = (e) => {
    setImage([...image, e.target.files[0]]);
  };
  return (
    <Dashboard>
      <Formik
        initialValues={fetchedValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onSubmitHandler}
      >
        {({ values }) => {
          return (
            <Form>
              <Gap>Property Details</Gap>
              <FormWrapper>
                <InputField
                  onChange={(e) => setPropertyType(e.target)}
                  override={true}
                  as="select"
                  uni="property.type"
                  labelName="Type"
                  fieldRequired={true}
                >
                  <option value="">Choose</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commerial</option>
                  <option value="prolease">Pro-lease</option>
                </InputField>
                <InputField
                  override={true}
                  as="select"
                  labelName="State"
                  uni="property.state"
                  placeholder="Uttarakhand"
                  fieldRequired={true}
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
                  uni="property.city"
                  placeholder="Dehradun"
                  fieldRequired={true}
                >
                  <option disabled value="">
                    Choose
                  </option>
                  {cities_arr[values.property.state]?.map((item, i) => (
                    <option key={i} value={`${item}`}>
                      {item}
                    </option>
                  ))}
                </InputField>

                <InputField
                  override={true}
                  as="select"
                  uni="property.format"
                  labelName="Format"
                  fieldRequired={true}
                >
                  <option disabled value="">
                    Choose
                  </option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="BTS">BTS (Build to suite)</option>
                </InputField>

                {/* <InputField
                  override={true}
                  as="select"
                  uni="category"
                  labelName="Category"
                  fieldRequired={true}
                >
                  <option disabled value="">
                    Choose
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Non-Approved">Non-Approved</option>
                  <option value="Both">Both</option>
                </InputField>
                <InputField
                  uni="size"
                  placeholder="10,000 sq.ft"
                  labelName="Size"
                />
                <InputField
                  uni="partlyAvailable"
                  placeholder="3,000 sq.ft"
                  labelName="Partly Available"
                />
                <InputField
                  override={true}
                  as="select"
                  uni="zone"
                  placeholder="Red"
                  labelName="Zone"
                >
                  <option disabled value="">
                    Choose
                  </option>
                  <option value="Normal">Normal</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Purple">Purple</option>
                  <option value="Industrial">Industrial</option>
                </InputField>
                <InputField
                  uni="address"
                  placeholder="GMS Road"
                  labelName="Address"
                /> */}

                {/* <InputField
                  uni="price"
                  placeholder="10,000"
                  labelName="Price"
                /> */}
              </FormWrapper>

              <Gap>Owner Details</Gap>
              <FormWrapper>
                <InputField
                  uni="owner.name"
                  placeholder="Alex"
                  labelName="Name"
                />
                <InputField
                  uni="owner.email"
                  placeholder="abc@gmail.com"
                  labelName="Email"
                />
                <InputField
                  uni="owner.mobile1"
                  placeholder="+919876543210"
                  labelName="Mobile No 1"
                />
                <InputField
                  uni="owner.mobile2"
                  placeholder="+919876543210"
                  labelName="Mobile No 2"
                />
              </FormWrapper>

              <Gap>Property Image</Gap>
              <FormWrapper>
                {image &&
                  preview.map((item, i) => (
                    <div key={i} className="relative">
                      <div
                        key={i}
                        className=" w-full h-60 rounded-md flex justify-center items-center overflow-hidden"
                      >
                        <img
                          className="object-contain w-[100%] h-[100%]"
                          src={item}
                        ></img>
                      </div>
                      <IconButton
                        onClick={() => {
                          setPreview(
                            preview.filter((item2) => {
                              return item2 !== item;
                            })
                          );
                        }}
                        sx={{
                          position: "absolute",
                          top: -16,
                          right: -16,
                          zIndex: 10,
                        }}
                        aria-label="delete"
                        size="small"
                      >
                        <Cancel />
                      </IconButton>
                    </div>
                  ))}
                {preview.length < 1 && (
                  <div className="border-2 border-dotted w-full h-60 border-black rounded-md flex justify-center items-center lgrev:my-2">
                    <div className=" right-0 bottom-8">
                      <label htmlFor="profile_pic" className="text-black">
                        <Add color="#516395" style={{ color: "#516395" }} />
                      </label>
                      <input
                        id="profile_pic"
                        hidden
                        type="file"
                        onChange={(e) => addImages(e)}
                        accept="image/png, image/jpeg"
                      ></input>
                    </div>
                  </div>
                )}
              </FormWrapper>

              <div className="flex justify-end">
                {!buttonLoading ? (
                  <button
                    type="submit"
                    className={`bg-primary rounded-sm text-white w-32 h-10 `}
                  >
                    {id ? "UPDATE" : "SUBMIT"}
                  </button>
                ) : (
                  <Spinner size={40} />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dashboard>
  );
};

export default SaleProperty;
