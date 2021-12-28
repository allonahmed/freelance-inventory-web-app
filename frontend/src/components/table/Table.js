import React, { useEffect, useRef, forwardRef, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useRowSelect,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { DefaultColumnFilter, fuzzyTextFilterFn } from "../table/tablefilters";
import axios from "axios";
import { PortalWithState, Portal } from "react-portal";
import "../../styles/table.css";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion/dist/es/index";
import { formatDate } from "../DateFormatter";

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      style={{ background: "red", width: "30px", height: "40px" }}
      type="checkbox"
      ref={resolvedRef}
      {...rest}
    />
  );
});

export default function Table({
  columns,
  data,
  edit,
  type,
  profile,
  myStyle,
  idOutside,
}) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    headers,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    // Instead of using 'rows', we'll use page,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    isSelected,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [
          {
            id: "data",
            desc: false,
          },
        ],
      },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    edit
      ? (hooks) => {
          hooks.visibleColumns.push((columns) => [
            // Let's make a column for selection
            {
              id: "selection",
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div
                  style={{
                    width: "0px",
                    paddingLeft: "10px",
                    margin: "auto 0",
                  }}
                >
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div style={{ width: "0px", padding: "0px" }}>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ]);
        }
      : () => {}
  );

  const spring = React.useMemo(
    () => ({
      type: "",
      damping: 100,
      stiffness: 1000,
      bounce: 1,
    }),
    []
  );

  const user = useSelector((state) => state.user.value);
  const vehicle = user.vehicle.charAt(0).toUpperCase() + user.vehicle.slice(1); //capitalized vehicle name
  const location = type === "add" ? vehicle : "Warehouse";
  const success =
    "✅ Success! " +
    Object.keys(selectedRowIds).length +
    " item(s) moved to " +
    location;
  const [style, setStyle] = useState({});
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      // document.getElementById("root").style.filter = "grayscale(100%)";
      document.getElementById("root").style.opacity = ".5";
    } else {
      document.getElementById("root").style.opacity = "1";
    }
  }, [open]);

  const UpdateClick = () => {
    const indeces = Object.keys(selectedRowIds);
    const newData = [];
    const itemId = [],
      currentLocation = [],
      itemType = [];
    for (let i = 0; i < Object.keys(selectedRowIds).length; i++) {
      newData.push(data[indeces[i]]);
      currentLocation.push(newData[i]["current_location"]);
      itemType.push(newData[i]["item_type"]);
      itemId.push(newData[i]["item_id"]);
    }
    console.log(newData);

    axios
      .post("http://localhost:5000/update-inventory", {
        id: itemId,
        sendTo: location,
      })
      .then((resp) => {
        if (resp.data.erro) {
          setStatus("Failure!");
        } else {
          setStatus(success);
        }
      });
    axios
      .post("http://localhost:5000/update-history", {
        id: itemId,
        type: itemType,
        sendTo: location,
        previousLocation: type === "add" ? "Warehouse" : vehicle,
        name: user.firstname + " " + user.lastname,
        time: formatDate(new Date()),
      })
      .then((response) => {
        if (response.data.message) {
          setStatus("Failure2");
        } else {
          setStatus(success);
        }
      });
  };

  const PortalMessage = () => {
    const size = Object.keys(selectedRowIds).length;
    const location = vehicle;
    if (type === "add") {
      return (
        "Would You like to send " +
        size +
        " item(s) from the Warehouse to " +
        location
      );
    } else if (type === "remove") {
      return (
        "Would you like to return " +
        size +
        " item(s) from " +
        vehicle +
        " to the Warehouse?"
      );
    }
  };

  useEffect(() => {
    setFilter("item_id", idOutside);
  }, [idOutside]);
  console.log(headerGroups[0].headers[0].columns);

  return (
    <div className="table-wrapper" style={myStyle}>
      {/* {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, key) => {
            return (
              <div style={profile ? { display: "none" } : {}}>
                {" "}
                {column.canFilter ? column.render("Filter") : null}
              </div>
            );
          })}
        </tr>
      ))} */}
      <table style={myStyle} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => {
                return column.hideHeader === false ? null : (
                  <motion.th
                    className="header"
                    {...column.getHeaderProps({
                      // layoutTransition: spring,
                      style: {
                        minWidth: column.minWidth,
                      },
                    })}
                  >
                    <div
                      style={{
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("hi");
                          setStyle({ animation: "drop .5s ease-in-out" });
                        }}
                        {...column.getSortByToggleProps()}
                      >
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                console.log("hi");

                                setStyle({
                                  animation: "drop .5s ease-in-out",
                                });
                              }}
                              style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "white",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faSortUp}
                                className="icon"
                                style={{ marginBottom: "-6px" }}
                              />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                console.log("hi");

                                setStyle({
                                  animation: "drop .5s ease-in-out",
                                });
                              }}
                              style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "white",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faSortDown}
                                className="icon"
                                style={{ marginTop: "-6px" }}
                                onClick={(event) => {
                                  event.preventDefault();
                                  setStyle({
                                    animation: "drop .5s ease-in-out",
                                  });
                                }}
                              />
                            </button>
                          )
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("hi");

                              setStyle({
                                animation: "drop .5s ease-in-out",
                              });
                            }}
                            style={{
                              height: "0",
                              width: "0",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              color: "white",
                            }}
                          ></button>
                        )}
                      </div>
                    </div>
                    <div style={profile ? { display: "none" } : {}}>
                      {" "}
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </motion.th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {(page.length > 0 &&
            page.map((row, i) => {
              prepareRow(row);
              return (
                <motion.tr
                  className="body-row"
                  {...row.getRowProps({
                    // layoutTransition: spring,
                    exit: { opacity: 0, maxHeight: 0 },
                  })}
                  style={
                    row.isSelected
                      ? { background: "rgb(0, 17, 92)", color: "white" }
                      : {}
                  }
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <motion.td
                        style={style}
                        {...cell.getCellProps({
                          // layoutTransition: spring,
                        })}
                        // style={style}
                        className="each-cell"
                      >
                        {cell.render("Cell")}
                      </motion.td>
                    );
                  })}
                </motion.tr>
              );
            })) || (
            <tr
              style={{
                width: "100%",
                background: "rgba(20, 20, 20, 0.692)",
                height: "100px",
                position: "absolute",
                overflow: "hidden",
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // paddingBottom: "-200px",
                height: "100%",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              NO DATA FOUND <br />
              (Try editing your filters)
            </tr>
          )}
        </tbody>
      </table>
      <div style={profile ? { display: "none" } : {}} className="pagination">
        <div className="outer">
          {page.length === 0 ? (
            <span>NO DATA FOUND</span>
          ) : (
            <span>Row Count {rows.length} </span>
          )}
          <select
            value={pageSize}
            style={{ height: "25px", width: "125px", marginTop: "5px" }}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div style={!edit ? { display: "none" } : { display: "block" }}>
          <button
            onClick={() => !toggleAllRowsSelected(false)}
            disabled={Object.keys(selectedRowIds).length === 0}
            className="action-button"
          >
            Cancel
          </button>
          <PortalWithState
            node={document.getElementById("portal")}
            closeOnOutsideClick={false}
            closeOnEsc={false}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
          >
            {({ openPortal, closePortal, isOpen, portal }) => (
              <React.Fragment>
                <button
                  onClick={openPortal}
                  disabled={Object.keys(selectedRowIds).length === 0}
                  className="action-button"
                >
                  Update
                </button>
                {portal(
                  status ? (
                    <div className="modal">
                      <div>
                        <h3>{status}</h3>
                        <button
                          className="action-button"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          Return
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="modal">
                      <h3>{PortalMessage()}</h3>
                      <div>
                        <button className="action-button" onClick={closePortal}>
                          No, Go back
                        </button>
                        <button
                          onClick={() => {
                            UpdateClick();
                          }}
                          className="action-button "
                        >
                          Yes, Confirm
                        </button>
                      </div>
                    </div>
                  )
                )}
              </React.Fragment>
            )}
          </PortalWithState>
        </div>
        <div className="outer">
          <span style={{ transform: "scale(1.08,1)", marginLeft: "4px" }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <div style={{ paddingTop: "5px" }}>
            <button
              onClick={() => {
                setStyle({ animation: "left .5s ease-in-out" });
                gotoPage(0);
              }}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              onClick={() => {
                setStyle({ animation: "left .5s ease-in-out" });
                previousPage();
              }}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              onClick={() => {
                setStyle({ animation: "right .5s ease-in-out" });
                nextPage();
              }}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              onClick={() => {
                setStyle({ animation: "right .5s ease-in-out" });
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
