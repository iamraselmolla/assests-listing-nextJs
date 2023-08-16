import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import * as Yup from "yup";
import Gap from "../UI/Gap";
import FormWrapper from "../UI/FormWrapper";
import { Form, Formik } from "formik";
import InputField from "../UI/InputField";
import { Add, Cancel } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { addBlogbyAdmin } from "../services/userServices";

const Blog = () => {
  const [preview, setPreview] = useState([]);
  const [image, setImage] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false)
  const initialValues = {
    title: "",
    description: "",
    category: "",
    img: ""
  }
  const validationSchema = Yup.object({

    title: Yup.string().required('Required'),
    category: Yup.string().required("Required"),
    description: Yup.string().required("Required"),

  });
  const onSubmitHandler = async (values, { resetForm }) => {
    setButtonLoading(true)
    let imgUrl
    if (image.length > 0) {
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "client-uploads");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/da75fckow/image/upload",
        formData
      );
      imgUrl = response?.data.secure_url

    }
    values.img = imgUrl;
    const getResult = await addBlogbyAdmin(values);
    if (getResult.status === 200) {
      setButtonLoading(false);
      toast.success(getResult?.data?.message);
      resetForm({ values: "" });
      setImage([]);
      setPreview([])

    } else {
      toast.error(getResult?.data?.message)
      setButtonLoading(false)
    }


    setButtonLoading(false)
  }
  const addImages = (e) => {
    setImage([...image, e.target.files[0]]);
  };
  useEffect(() => {
    if (image?.length === 0) return;
    const objectUrl = URL.createObjectURL(image[image?.length - 1]);
    setPreview([...preview, objectUrl]);
  }, [image]);
  return (
    <Dashboard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onSubmitHandler}
      >
        {({ values }) => {
          return (
            <Form>
              <Gap>Add Blog </Gap>
              <FormWrapper>
                <InputField
                  override={true}
                  as="select"
                  uni="category"
                  labelName="Type"
                  fieldRequired={true}
                >
                  <option value="">Select Type</option>
                  <option value="hotels">Hotels</option>
                  <option value="foodcourt">Food Court</option>
                  <option value="coworkingspace">Co-working Space</option>
                  <option value="officespace">Office Space</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="factory">Factory</option>
                  <option value="schools">Schools</option>
                  <option value="banks">Banks</option>
                  <option value="hospitals">Hospitals</option>
                  <option value="callcenter">Call Center</option>
                  <option value="land">Land</option>
                  <option value="hostel">Hostel</option>
                  <option value="mall">Mall</option>
                  <option value="multiplex">Multiplex</option>
                </InputField>



                <InputField
                  uni="title"
                  placeholder="Give a title"
                  labelName="Title"
                />
                <InputField
                  uni="description"
                  as="textarea"
                  placeholder="Give a description"
                  labelName="Description"
                />
              </FormWrapper>

              <Gap>Blog Image</Gap>
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
                    {/* {id ? "UPDATE" : "SUBMIT"} */}
                    SUBMIT
                  </button>
                ) :
                  (<Spinner size={40} />)
                }
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dashboard>);
};

export default Blog;
