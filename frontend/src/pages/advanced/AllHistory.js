import React, { useEffect, useState, useMemo } from "react";
import "../../styles/advanced.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { allChangesColumns } from "../../components/table/columns";
import Load from "../../assets/Loader";
import Table from "../../components/table/Table";
import { TypeFilter } from "../../components/table/tablefilters";

const API_URL = "http://localhost:5000/get-all-changes";
function AllHistory() {
  const [history, setHistory] = useState({});
  const user = useSelector((state) => state.user.value);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((resp) => {
      if (resp.data.message) {
        console.log(resp.data.message);
      } else {
        setHistory(resp.data);
      }
    });
  }, [user]);

  console.log(history);
  const column = useMemo(() => allChangesColumns);
  return (
    <div
      style={{
        height: "100vh",
        marginLeft: "160px",
        width: "calc(65% -160px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="history-container"
    >
      <div
        className="table-container"
        style={{ height: "80vh", marginTop: "-70px" }}
      >
        {history.length > 0 ? (
          <>
            <input
              placeholder="Firstname"
              onChange={(e) => setId(e.target.value)}
            />
            <Table columns={column} data={history} idOutside={id} />
          </>
        ) : (
          <Load />
        )}
      </div>
    </div>
  );
}

export default AllHistory;
