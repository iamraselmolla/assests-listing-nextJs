import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  BathtubOutlined,
  Block,
  BookmarkBorder,
  Check,
  FavoriteBorder,
  LocationOn,
  Map,
  OpenInFull,
  Person,
  Search,
  SingleBedOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { identifierToKeywordKind } from "typescript";
import { handleApprovePropertyByAdmin } from "../services/userServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDataActions } from "../store/user-data-slice";

const PropertyCard = ({ img, activity, property, motive, acceptCard, id }) => {
  const dispatch = useDispatch();
  const HanldleAccepted = async (id) => {
    if (window.confirm("Do You want to accept this property?")) {
      const result = await handleApprovePropertyByAdmin(id);
      if (result.status === 200) {
        toast.success(result?.data?.message);
        dispatch(userDataActions?.refreshItem());
      } else {
        toast.success("Something Wrong");
      }
    }
  };
  return (
    <div className="flex flex-col gap-2 text-black bg-quat shadow-md rounded overflow-hidden justify-between h-fit">
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
      {/* <div className="bg-primary px-3 p-1 text-white flex justify-between text-sm shadow-inner">
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
      </div> */}
      {acceptCard && (
        <>
          <div className="flex w-full">
            <button
              onClick={() => HanldleAccepted(id)}
              className="bg-green-400 flex justify-center items-center w-full py-1 px-4 text-white font-bold"
            >
              Accept <Check />
            </button>
            <button className="bg-red-400 w-full justify-center items-center py-1 px-4 text-white font-bold">
              Reject <Block />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyCard;
