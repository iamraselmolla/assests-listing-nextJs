import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ALL_LINKS } from "../../../components/constants/constant";
import AuthContext from "../../../components/store/AuthContext";
import SplashScreen from "../../../components/SplashScreen";
import ResponsiveDrawer from "../../../components/UI/ResponsiveDrawer";
import Footer from "../../../components/UI/Footer";
import { assets } from "../../../components/assets";
import Image from "next/image";

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.push("/adminpanel");
    }
  }, []);

  return (
    <>
      <div className="relative">
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            {authCtx.isLoggedIn ? (
              <>
                <ResponsiveDrawer />
                <div className="bg-white py-10">
                  <div className="flex justify-center items-center font-sans">
                    <div className="w-full md:w-[600px] border-2 border-black p-4 flex flex-col gap-4">
                      <Image
                        className="w-2/3 m-auto"
                        alt="illustration"
                        src={assets.assetImage}
                      />
                      <Link href={ALL_LINKS.rentProperty}>
                        <button
                          className={`bg-black text-white h-10  hover:opacity-75 w-full`}
                          type
                        >
                          Add Property for Rent
                        </button>
                      </Link>
                      <Link href={ALL_LINKS.saleProperty}>
                        <button
                          className={`bg-black text-white h-10  hover:opacity-75 w-full`}
                          type
                        >
                          Add property for sale
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
