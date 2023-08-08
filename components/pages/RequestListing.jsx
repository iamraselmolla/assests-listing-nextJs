import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux";
import Image from "next/image";

const RequestListing = () => {
  const { allProperties } = useSelector((state) => state.userData);
  const [findAllAwaitedItem, setFindAllAwaitedItem] = useState([]);

  useEffect(() => {
    if (allProperties?.length > 0) {
      const awaitedItems = allProperties.filter(
        (property) => property.activity.accepted === false
      );
      setFindAllAwaitedItem(awaitedItems);
    }
  }, [allProperties]);

  console.log(allProperties, findAllAwaitedItem);

  return (
    <Dashboard>
      <div className="pt-7">
        <h2 className="font-bold text-3xl text-center text-black">
          You have {findAllAwaitedItem?.length} properties in pending request to
          be listed
        </h2>
        {findAllAwaitedItem?.map((singleItem) => (
          <>
            <div className="grid border px-6 py-3 border-blue-500   my-4">
              <Image
                width={300}
                height={300}
                src={singleItem?.img}
                alt="Property Image"
              />
            </div>
          </>
        ))}
      </div>
    </Dashboard>
  );
};

export default RequestListing;
