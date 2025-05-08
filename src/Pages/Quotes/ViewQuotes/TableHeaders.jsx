import moment from "moment/moment";
import ActionIcons from "../../../components/ActionIcons";

import ViewQuotes from "./ViewQuotes";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },

  {
    name: "Name",
    selector: (row) => row.quoteName,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Email",
    selector: (row) => row.quoteEmail,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Interested In",
    selector: (row) => row.quoteTechnology,
    sortable: true,
    // center: true,
    width: "200px",
  },
 
  {
    name: "Created Date",
    selector: (row) => row.createdAt,
    sortable: true,
    // center: true,
    width: "170px",
    cell: (row) => moment(row.createdAt).toDate().toDateString(),
  },
  {
    name: "Time",
    selector: (row) => row.createdAt,
    sortable: true,
    width: "170px",

    cell: (row) => moment(row.createdAt).format("h:mm a"), // Format to desired time format
},
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        viewData={<ViewQuotes rowData={row} />}
        type="quote"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
