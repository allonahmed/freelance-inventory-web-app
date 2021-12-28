import React from "react";
import { matchSorter } from "match-sorter";
import { useGlobalFilter, useAsyncDebounce } from "react-table";

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      style={{ marginBottom: "10px" }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

export function IDFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      style={{ marginBottom: "10px", height: "22px", width: "150px" }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ID...`}
    />
  );
}

export function TypeFilter({
  column: { filterValue, preFilteredRows, setFilter, id, name },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <select
      style={{ marginBottom: "10px", height: "25px", width: "150px" }}
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All {name}</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DateFilter({
  column: { filterValue, preFilteredRows, setFilter, id, name },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    const list = [];
    const comp = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    preFilteredRows.forEach((row) => {
      for (let i = 0; i < 12; i++) {
        if (
          row.values[id].substring(0, 2) == comp[i] &&
          !list.includes(comp[i])
        ) {
          list.push(comp[i]);
          options.add(row.values[id].substring(0, 2));
        }
      }
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthDict = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return (
    <select
      style={{ marginBottom: "10px", height: "25px", width: "150px" }}
      value={filterValue}
      onChange={(e) => setFilter(e.target.value.substring(0, 2) || undefined)}
    >
      <option value="">All {name}</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {monthDict[option]}
        </option>
      ))}
    </select>
  );
}

export const DateCell = ({ value }) => {
  if (value.substring(0, 2) === "12") {
    return (
      "Dec " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "11") {
    return (
      "Nov " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "10") {
    return (
      "Oct " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "09") {
    return (
      "Sep " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "08") {
    return (
      "Aug " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "07") {
    return (
      "Jul " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "06") {
    return (
      "Jun " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "05") {
    return (
      "May " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "04") {
    return (
      "Apr " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "03") {
    return (
      "Mar " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "02") {
    return (
      "Feb " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  } else if (value.substring(0, 2) === "01") {
    return (
      "Jan " + value.substring(3, 5) + ", " + value.substring(6, value.length)
    );
  }
};
export function firstTwo(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue.substring(0, 2) === filterValue;
  });
}

firstTwo.autoRemove = (val) => typeof val !== "string";

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
