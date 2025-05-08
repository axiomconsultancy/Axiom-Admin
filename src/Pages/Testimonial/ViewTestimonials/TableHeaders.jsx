import moment from "moment/moment";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewTestimonial from "./ViewTestimonial";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.image,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.image} />,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
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
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.blocked}
        id={row._id}
        type={"testimonial"}
        queryName="fetchTestimonials"
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
        viewData={<ViewTestimonial rowData={row} />}
        type="testimonial"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
