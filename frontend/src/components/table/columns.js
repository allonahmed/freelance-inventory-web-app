import {
  IDFilter,
  TypeFilter,
  DateFilter,
  firstTwo,
  DateCell,
} from "./tablefilters";

export const inventoryColumns = [
  {
    Header: "All Inventory",

    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
      {
        Header: "Location ",
        accessor: "current_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
    ],
  },
];

export const profileInventoryColumns = [
  {
    Header: "All Inventory",
    hideHeader: false,

    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
      {
        Header: "Location ",
        accessor: "current_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
    ],
  },
];

export const removeColumns = [
  {
    Header: `Total Inventory in Vehicle`,

    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];

export const addColumns = [
  {
    Header: `Total Inventory in Warehouse`,

    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];

export const changesColumns = [
  {
    Header: `Changes`,

    columns: [
      {
        Header: "Change ID",
        accessor: "history_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Previous Location",
        accessor: "previous_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "Current Location",
        accessor: "current_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "Date",
        accessor: "time",
        id: "date",
        Cell: ({ value }) => {
          if (value.substring(0, 2) === "12") {
            return (
              "Dec " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "11") {
            return (
              "Nov " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "10") {
            return (
              "Oct " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "09") {
            return (
              "Sep " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "08") {
            return (
              "Aug " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "07") {
            return (
              "Jul " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "06") {
            return (
              "Jun " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "05") {
            return (
              "May " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "04") {
            return (
              "Apr " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "03") {
            return (
              "Mar " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "02") {
            return (
              "Feb " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "01") {
            return (
              "Jan " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          }
        },
        Filter: DateFilter,
        filter: firstTwo,
        name: "Dates",
      },
    ],
  },
  {
    Header: "Item Information",

    columns: [
      {
        Header: "Item ID",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Item Type",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];
export const allChangesColumns = [
  {
    Header: `Changes`,

    columns: [
      {
        Header: "Change ID",
        accessor: "history_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Previous Location",
        accessor: "previous_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "Current Location",
        accessor: "current_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "User",
        accessor: "who_switched",
        Filter: TypeFilter,
        filter: "includes",
        name: "Users",
      },
      {
        Header: "Date",
        accessor: "time",
        id: "date",
        Cell: ({ value }) => {
          if (value.substring(0, 2) === "12") {
            return (
              "Dec " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "11") {
            return (
              "Nov " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "10") {
            return (
              "Oct " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "09") {
            return (
              "Sep " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "08") {
            return (
              "Aug " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "07") {
            return (
              "Jul " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "06") {
            return (
              "Jun " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "05") {
            return (
              "May " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "04") {
            return (
              "Apr " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "03") {
            return (
              "Mar " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "02") {
            return (
              "Feb " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "01") {
            return (
              "Jan " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          }
        },
        Filter: DateFilter,
        filter: firstTwo,
        name: "Dates",
      },
    ],
  },
  {
    Header: "Item Information",

    columns: [
      {
        Header: "Item ID",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Item Type",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];
export const profileChangesColumns = [
  {
    Header: `Changes`,
    hideHeader: false,

    columns: [
      {
        Header: "Change ID",
        accessor: "history_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Previous Location",
        accessor: "previous_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "Current Location",
        accessor: "current_location",
        Filter: TypeFilter,
        filter: "includes",
        name: "Locations",
      },
      {
        Header: "Date",
        accessor: "time",
        id: "date",
        Cell: ({ value }) => {
          if (value.substring(0, 2) === "12") {
            return (
              "Dec " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "11") {
            return (
              "Nov " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "10") {
            return (
              "Oct " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "09") {
            return (
              "Sep " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "08") {
            return (
              "Aug " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "07") {
            return (
              "Jul " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "06") {
            return (
              "Jun " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "05") {
            return (
              "May " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "04") {
            return (
              "Apr " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "03") {
            return (
              "Mar " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "02") {
            return (
              "Feb " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          } else if (value.substring(0, 2) === "01") {
            return (
              "Jan " +
              value.substring(3, 5) +
              ", " +
              value.substring(6, value.length)
            );
          }
        },
        Filter: DateFilter,
        filter: firstTwo,
        name: "Dates",
      },

      {
        Header: "Item ID",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Item Type",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];

export const vehicleColumns = [
  {
    Header: `Items in Vehicle`,

    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];

export const profileVehicleColumns = [
  {
    Header: "h",
    hideHeader: false,
    isVisible: "false",
    columns: [
      {
        Header: "ID ",
        accessor: "item_id",
        Filter: IDFilter,
        filter: "fuzzyText",
      },
      {
        Header: "Type ",
        accessor: "item_type",
        Filter: TypeFilter,
        filter: "includes",
        name: "Types",
      },
    ],
  },
];
