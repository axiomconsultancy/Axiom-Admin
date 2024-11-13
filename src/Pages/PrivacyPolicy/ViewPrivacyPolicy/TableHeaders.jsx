import ViewPrivPolicy from "./ViewPrivPolicy";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },

  {
    name: "Title",
    selector: (row) => row.policyTitle,
    sortable: true,
    // center: true,
    width: "250px",
  },

  {
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.blocked}
        id={row._id}
        type={"privacyPolicy"}
        queryName="fetchPrivacyPolicy"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        edit={true}
        viewData={<ViewPrivPolicy rowData={row} />}
        type="privacyPolicy"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
