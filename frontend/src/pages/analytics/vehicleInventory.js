import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { vehicleColumns } from "../../components/table/columns";
import Load from "../../assets/Loader";
import Table from "../../components/table/Table";
import axios from "axios";

const API_URL = "http://localhost:5000/get-vehicle-info";
const VehicleItems = () => {
  const user = useSelector((state) => state.user.value);
  const vehicle = user.vehicle.charAt(0).toUpperCase() + user.vehicle.slice(1); //capitalized vehicle name
  const first =
    user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
  const last = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(API_URL, {
        vehicle: vehicle,
      })
      .then((response) => {
        setData(response.data);
      });
    console.log(data);
  }, [user]);

  vehicleColumns[0]["Header"] =
    "Total Inventory in " + vehicle + " (" + first + " " + last + ")";
  const column = useMemo(() => vehicleColumns);

  return (
    <div
      style={{
        height: "100vh",
        marginLeft: "160px",
        width: "calc(65% -160px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        className="table-container"
        style={{ height: "80vh", marginTop: "-70px" }}
      >
        {data.length > 0 ? <Table columns={column} data={data} /> : <Load />}
      </div>
    </div>
  );
};

export default VehicleItems;
