import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../UI/ResponsiveDrawer";
import TopCard from "../UI/TopCard";
import Footer from "../UI/Footer";
import SplashScreen from "../SplashScreen";
import Spinner from "../UI/Spinner";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../UI/InputField";
import Image from "next/image";
import { assets } from "../assets";
import { handleSignUp } from "../services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ''
  };
  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string(),
  });

  const onSubmitHandler = async (values) => {
    setButtonLoading(true);
    try {
      const response = await handleSignUp(values);
      if (response.status !== 200) {
        setButtonLoading(false);
        toast.error(response.data.message);
      }
      if (response.status === 200) {
        setButtonLoading(false);
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setButtonLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <ResponsiveDrawer />
          <TopCard title="Sign up" />
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
                            uni="firstName"
                            placeholder="First Name"
                            labelName="First Name"
                            inputClass="bg-quat rounded-sm"
                          />
                          <InputField
                            uni="lastName"
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

                        {!buttonLoading ? (
                          <button
                            type="submit"
                            className="self-center border border-primary hover:bg-primary rounded-sm text-primary font-bold hover:text-white w-full h-10 flex justify-center items-center gap-3"
                          >
                            Signup
                          </button>
                        ) : (
                          <div className="flex justify-center items-center">
                            <Spinner size={40} />
                          </div>
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
