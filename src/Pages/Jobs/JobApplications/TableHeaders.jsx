/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Anchor, Text } from "@mantine/core";
import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewJob from "./ViewJob";
import moment from "moment";
import AddComment from "./AddComment";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Applicant Name",
    selector: (row) => row.fullName,
    sortable: true,
    // center: true,
    width: "170px",
  },
  {
    name: "Email",
    selector: (row) => row?.email,
    width: "170px",
    sortable: true,
  },
  {
    name: "Applied Post",
    selector: (row) =>(row.job?.title),
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Applied Date",
    selector: (row) => moment(row.createdAt).format("DD-MMM-YYYY"),
    sortable: true,
    // center: true,
    width: "150px",
  },

  {
    name: "Gender",
    selector: (row) => row?.gender,
    sortable: true,
    center: true,
    width: "120px",
  },
  {
    name: "Resume",
    selector: (row) => row?.resume,
    sortable: true,
    center: true,
    width: "110px",
    cell: (row) => {
      return row?.resume !== "" ? (
        <Anchor href={row?.resume} target="_blank">
          File
        </Anchor>
      ) : (
        <Text>No file</Text>
      );
    },
  },
  {
    name: "Add Comments",
    selector: (row) => row?.resume,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => {
      return <AddComment data={row}/>;
    },
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        // edit={true}
        viewData={<ViewJob rowData={row} />}
        type="Jobapplications"
      />
    ),
  },
];
