import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import TopCard from "../UI/TopCard";
import Footer from "../UI/Footer";
import SplashScreen from "../SplashScreen";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../UI/InputField";
import Image from "next/image";
import { assets } from "../assets";

const Signup = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string(),
  });

  const onSubmitHandler = ({ values }) => {
    console.log(values);
    //------------ Route to submit the form -------------------
    //---------------------------------------------------------
  };

  return (
    <div className="relative">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <ResponsiveDrawer />
          <TopCard title="About" />
          <div className="py-20 bg-white text-black">
            <Container>
              <div className="p-3 my-5 shadow-lg rounded grid md:grid-cols-2 gap-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                  onSubmit={onSubmitHandler}
                >
                  {({ values }) => {
                    return (
                      <Form className="flex flex-col gap-6">
                        <h2 className="text-center text-2xl font-bold">
                          Sign Up
                        </h2>
                        <div className="grid md:grid-cols-2 gap-5">
                          <InputField
                            uni="firstname"
                            placeholder="First Name"
                            labelName="First Name"
                            inputClass="bg-quat rounded-sm"
                          />
                          <InputField
                            uni="lastname"
                            placeholder="Last Name"
                            labelName="Last Name"
                            inputClass="bg-quat rounded-sm"
                          />
                        </div>
                        <InputField
                          uni="email"
                          placeholder="Email"
                          labelName="Email"
                          inputClass={"bg-quat rounded-sm"}
                        />
                        <InputField
                          uni="password"
                          placeholder="Password"
                          labelName="Password"
                          inputClass={"bg-quat rounded-sm"}
                          type={"password"}
                        />

                        {!loading ? (
                          <button
                            type="submit"
                            className="self-center border border-primary hover:bg-primary rounded-sm text-primary font-bold hover:text-white w-full h-10 flex justify-center items-center gap-3"
                          >
                            Signup
                          </button>
                        ) : (
                          <Spinner size={40} />
                        )}
                      </Form>
                    );
                  }}
                </Formik>
                <Image
                  src={assets.contact}
                  className="hidden md:block rounded"
                />
              </div>
            </Container>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
