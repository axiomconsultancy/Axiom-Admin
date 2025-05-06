import moment from "moment/moment";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";

import ViewAxiomAdvantage from ".";

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
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Description",
    selector: (row) => row.description,
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
      <StatusToggle status={row.blocked} id={row._id} type={"axiomAdvantage"} queryName="fetchAxiomAdvantages" />
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
        viewData={<ViewAxiomAdvantage rowData={row} />}
        type="axiomAdvantage"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
