import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import Image from "next/image";
import PropertyCard from "../UI/PropertyCard";
import { findAllAwaitedProperties } from "../services/userServices";

const RequestListing = () => {
  const [findAllAwaitedItem, setFindAllAwaitedItem] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { refresh } = useSelector((state) => state.userData);

  useEffect(() => {
    const fetchAllProperty = async () => {
      const findAwaited = await findAllAwaitedProperties();
      setFindAllAwaitedItem(findAwaited?.data);
    };
    fetchAllProperty();
  }, [refresh]);

  return (
    <Dashboard>
      <div className="pt-7">
        <h2 className="font-bold text-3xl mb-5  text-center text-black">
          You have {findAllAwaitedItem?.length} properties in pending request to
          be listed
        </h2>
        <div className="shadow-lg col-span-2 bg-quat p-3 grid grid-cols-1 md:grid-cols-3 gap-5">
          {findAllAwaitedItem?.length > 0 &&
            findAllAwaitedItem?.map((item) => (
              <PropertyCard
                property={item.property}
                img={item.img}
                activity={item.activity}
                motive={item?.motive}
                acceptCard={true}
                id={item?._id}
              />
            ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default RequestListing;
