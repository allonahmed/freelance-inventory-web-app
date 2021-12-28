import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { changesColumns } from "../../components/table/columns";
import Load from "../../assets/Loader";
import Table from "../../components/table/Table";
import axios from "axios";

const API_URL = "http://localhost:5000/get-my-changes";

const Changes = () => {
  const user = useSelector((state) => state.user.value);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(API_URL, {
        username: user.firstname + " " + user.lastname,
      })
      .then((response) => {
        setData(response.data);
      });
    console.log(data);
  }, [user]);

  const column = useMemo(() => changesColumns);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "160px",
        width: "calc(65% -160px)",
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

export default Changes;
