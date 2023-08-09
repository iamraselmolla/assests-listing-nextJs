import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  BathtubOutlined,
  BookmarkBorder,
  FavoriteBorder,
  LocationOn,
  Map,
  OpenInFull,
  Person,
  Search,
  SingleBedOutlined,
} from "@mui/icons-material";
import Image from "next/image";

const PropertyCard = ({ img, activity, property, motive }) => {
  return (
    <div className="flex flex-col gap-2 bg-quat shadow-md rounded overflow-hidden justify-between h-fit">
      <div className="relative">
        <img src={img} alt="Property Image" className="h-52" />
        <div className="absolute top-3 w-full uppercase">
          <div className="flex mx-6 justify-between">
            <div
              style={{ fontSize: "10px" }}
              className={`bg-green-400 px-3 font-bold rounded text-white ${
                !activity?.featured ? "opacity-0" : ""
              }`}
            >
              Featured
            </div>
            <div
              style={{ fontSize: "10px" }}
              className="bg-black bg-opacity-75 font-bold px-3 rounded text-white"
            >
              For {motive}
            </div>
          </div>
        </div>
        <div className="absolute gap-1 pr-3 justify-end w-full bottom-2 flex">
          <PhotoProvider>
            <PhotoView src={img}>
              <div className="bg-black p-1 text-sm rounded bg-opacity-40 cursor-pointer text-white">
                <OpenInFull></OpenInFull>
              </div>
            </PhotoView>
          </PhotoProvider>
          <div className="bg-black p-1 text-sm rounded bg-opacity-40 cursor-pointer text-white">
            <FavoriteBorder></FavoriteBorder>
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h2 className="text-xl font-bold">{(property?.type).toUpperCase()}</h2>
        <p>
          <b className="text-primary"> {property?.format}</b>
        </p>
        <div className="flex gap-2">
          <LocationOn sx={{ color: "orange" }} />
          <p>{property?.state}</p>
        </div>
        <div className="flex gap-2">
          <LocationOn sx={{ color: "orange" }} />
          <p>{property?.city}</p>
        </div>
      </div>
      <div className="bg-primary px-3 p-1 text-white flex justify-between text-sm shadow-inner">
        <div className="flex gap-1 items-center">
          <Map />
          <p>{property?.city}</p>
        </div>
        <div className="flex gap-1 items-center">
          <SingleBedOutlined />
          <p>{property?.state}</p>
        </div>
        <div className="flex gap-1 items-center">
          <BathtubOutlined />
          <p>{`l;dshfks;dfhkj`}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
