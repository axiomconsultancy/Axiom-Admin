import moment from "moment/moment";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewFaq from "./ViewFaq";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },

  {
    name: "Question",
    selector: (row) => row.question,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Answer",
    selector: (row) => row.answer,
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
    cell: (row) => <StatusToggle status={row.blocked} id={row._id} type={"faq"} queryName="fetchFaqa" />,
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons rowData={row} view={true} del={true} edit={true} viewData={<ViewFaq rowData={row} />} type="faq" />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
