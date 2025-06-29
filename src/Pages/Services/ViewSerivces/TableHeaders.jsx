import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewService from "./ViewService";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.coverImage,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.coverImage} />,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Short Description",
    selector: (row) => row.shortDescription,
    sortable: true,
    // center: true,
    width: "300px",
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
        type={"service"}
        queryName="fetchServices"
      />
    ),
  },
 
  {
    name: "Priority",
    selector: (row) => row.periority,
    width: "150px",
    sortable: true,
    center: true,
  },
  {
    name: "Show In Ring",
    selector: (row) => row.showInRing ? "Yes" : "No",
    width: "150px",
    sortable: true,
    center: true,
  },
   {
    name: "Show In Card",
    selector: (row) => row.showInCard ? "Yes" : "No",
    width: "150px",
    sortable: true,
    center: true,
  },
  {
    name: "Actions",
    center: true,
    width: "200px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        edit={true}
        viewData={<ViewService rowData={row} />}
        type="service"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
