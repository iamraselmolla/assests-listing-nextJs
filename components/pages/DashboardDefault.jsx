import React, { useContext, useState } from "react";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { Link, ListItemText, Switch } from "@mui/material";
import axios from "axios";
import Spinner from "../UI/Spinner";
import { toast } from "react-toastify";
import cities_arr, { state_arr } from "../utils/CityDropdown";
import {
  getAllProperty,
  handleActiveOrFeatured,
  handleDeletingProperty,
} from "../services/userServices";
import AuthContext from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../store/user-data-slice";
import { Delete, OpenInNew, Visibility } from "@mui/icons-material";

const label = { inputProps: { "aria-label": "Switch demo" } };

const DashboardDefault = () => {
  const [search, setSearch] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [searchWarehouses, setSearchWarehouses] = useState([]);
  const [findAllProperty, setFindAllProperty] = useState([]);
  const { role } = useContext(AuthContext);
  const { refresh } = useSelector((state) => state.userData);

  const [dataLoading, setDataLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getWareHouses = async () => {
      try {
        // setDataLoading(true);
        const findAwaited = await getAllProperty();
        if (findAwaited?.status === 200) {
          setFindAllProperty(findAwaited?.data);
          setWarehouses(findAwaited?.data);
          setSearchWarehouses(findAwaited?.data);
          setDataLoading(false);
        }
      } catch (err) {
        console.log(err);
        setDataLoading(false);
      }
    };
    getWareHouses();
  }, [refresh]);

  useEffect(() => {
    const searchResults = warehouses.filter((item) => {
      return (
        item.property.type.toLowerCase().includes(search.toLowerCase()) ||
        item.property.format.toLowerCase().includes(search.toLowerCase()) ||
        item.property.city.toLowerCase().includes(search.toLowerCase()) ||
        state_arr[item.property.state]
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
    setSearchWarehouses(searchResults);
    if (search == "") setSearchWarehouses(warehouses);
  }, [search]);

  const Content = ({ item }) => {
    const [activeStatus, setActiveStatus] = useState(item?.activity?.active);
    const [featuredStatus, setfeaturedStatus] = useState(
      item?.activity?.featured
    );
    const handleDisableOrEnable = async (id, action) => {
      const response = await handleActiveOrFeatured(id, action);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        dispatch(userDataActions.refreshItem());
      } else {
        toast.error(response?.data?.message);
      }
    };
    const propertyDeleteHandler = async (id) => {
      try {
        if (window.confirm("You you want to delete this?")) {
          const response = await handleDeletingProperty(id);
          if (response.status === 200) {
            toast.success(response.data.message);
            dispatch(userDataActions.refreshItem());
          }
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };

    const [hidden, setHidden] = useState(true);
    return (
      <tr className="py-1 text-center">
        <td className="p-2 border border-black">{item?.property.format}</td>
        <td className="p-2 border border-black">{item?.property.type}</td>
        <td className="p-2 border border-black">{item?.property.city}</td>
        <td className="p-2 border border-black">{state_arr[item?.property.state]}</td>
        <td className="p-2 border border-black">
          <a target="_blank" href={item?.img}>
            <OpenInNew />
          </a>
        </td>
        {role === "admin" && (
          <>
             <td className="p-2 border border-black"><>
              {item?.owner.name} <br/>
              {item?.owner.mobile1}<br/>
              {item?.owner.mobile2}
             </></td>
            <td className="p-2 border border-black">
              <Switch
                // disabled={disabling}
                checked={activeStatus}
                onChange={() => handleDisableOrEnable(item?._id, "active")}
              />
            </td>

            <td className="p-2 border border-black">
              <Switch
                // disabled={disabling}
                checked={featuredStatus}
                onChange={() => handleDisableOrEnable(item?._id, "featured")}
              />
            </td>
          </>
        )}

        <td className="p-2 border border-black">{item?.motive}</td>
        <td className="p-2 border border-black ">
          <a href={`/dashboard/addproperty/${item?.motive}?id=${item?._id}`}>
          <div className="border cursor-pointer mx-auto border-green-500 flex h-8 items-center justify-center rounded-full w-8">
            <Visibility className=" text-green-600" />
            </div>
          </a>
        </td>
       {role === 'admin' && <>
       
       <td className=" border border-black">
          
         
          <div className="border cursor-pointer mx-auto border-red-500 flex h-8 items-center justify-center rounded-full w-8">
          <Delete className=" text-red-600"  onClick={() => propertyDeleteHandler(item._id)} />
          </div>
       
      </td>
       </>}
      </tr>
    );
  };

  return (
    <Dashboard>
      {dataLoading && (
        <div className="flex justify-center h-[40vh] items-end overflow-hidden">
          <Spinner size={80} />
        </div>
      )}
      {warehouses?.length > 0 && (
        <>
          <div className="flex gap-4">
            <input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              defaultValue={search}
              name="search_state"
              className="bg-blue-100 p-[10px]  w-[100%]"
            />
            <button
              className={`w-32 ${"bg-primary"} text-white p-1 rounded-sm`}
            >
              Search
            </button>
          </div>
          <div className="p-4 overflow-x-auto min-w-[100%] max-w-[300px]">
            <table className="text-black table border border-black w-[100%]">
              <tr className="text-center">
                <th className="p-2 border border-black">Format</th>
                <th className="p-2 border border-black">Type</th>
                <th className="p-2 border border-black">City</th>
                <th className="p-2 border border-black">State</th>
               

                <th className="p-2 border border-black">Image</th>
                {role === "admin" && (
                  <>
                   <th className="p-2 border border-black">Owner</th>
                    <th className="p-2 border border-black">Enabled</th>
                    <th className="p-2 border border-black">Featured</th>
                  </>
                )}
                <th className="p-2 border border-black">Motive</th>
                <th className="p-2 border border-black">View</th>
                {role === 'admin' && <>
                <th className="p-2 border border-black">Delete</th>
                </>}
              </tr>
              {searchWarehouses.map((item, i) => (
                <Content key={i} item={item} />
              ))}
            </table>
          </div>
        </>
      )}
      {!dataLoading && warehouses?.length === 0 && (
        <div className="text-center h-[40vh] flex flex-col justify-end items-center overflow-hidden gap-4">
          <h3 className="text-lg text-black font-extrabold">
            No Warehouses found
          </h3>
          <Link href="/dashboard/addproperty">
            <button className=" bg-primary text-white p-2 border hover:bg-secondary w-64">
              ADD Property
            </button>
          </Link>
        </div>
      )}

      {search && searchWarehouses.length === 0 && (
        <div className="text-center h-[30vh] flex flex-col justify-end items-center overflow-hidden gap-4">
          <h3 className="text-lg font-bold">No Property Found</h3>
        </div>
      )}
    </Dashboard>
  );
};

export default DashboardDefault;
