import React, { useContext, useEffect, useState } from "react";
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
import { handleLogin } from "../services/userServices";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AuthContext from "../store/AuthContext";
import Spinner from "../UI/Spinner";
import { useDispatch } from "react-redux";
import { userDataActions } from "../store/user-data-slice";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string(),
    password: Yup.string(),
  });

  const onSubmitHandler = async (values) => {
    setButtonLoading(true);

    try {
      const result = await handleLogin(values);
      if (result.status === 200) {
        toast.success("Login successfully");
        router.push("/dashboard/addproperty");
        setButtonLoading(false);
        const { token, id, role } = result?.data?.user;
        const { userInfo } = result?.data;

        login(id, token, role);
        dispatch(userDataActions.setUserInfo(userInfo));
      } else {
        toast.warning(result?.data?.message);
        setButtonLoading(false);
      }
    } catch (err) {
      console.log(err);
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
          <TopCard title="Login" />
          <div className="py-20 bg-white text-black">
            <Container>
              <div className="p-3 my-5 shadow-lg rounded grid md:grid-cols-2 gap-4">
                <Image
                  src={assets.contact}
                  className="hidden md:block rounded"
                  alt="Login Image"
                />
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
                          Login
                        </h2>
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
                            Login
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
              </div>
            </Container>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
