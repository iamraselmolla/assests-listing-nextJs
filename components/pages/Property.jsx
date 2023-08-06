import React from "react";
import Dashboard from "./Dashboard";
import { ALL_LINKS } from "../constants/constant";
import { assets } from "../assets";
import Link from "next/link";
import Image from "next/image";

const Property = () => {
  return (
    <Dashboard>
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
                className={`bg-black text-white h-10 font-bold  hover:opacity-75 w-full`}
                type
              >
                For Rent
              </button>
            </Link>
            <Link href={ALL_LINKS.saleProperty}>
              <button
                className={`bg-black text-white h-10 font-bold  hover:opacity-75 w-full`}
                type
              >
                For Sale
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Property;
