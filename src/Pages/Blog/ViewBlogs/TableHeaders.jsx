// import ActionIcons from "../../../components/ActionIcons";
// import StatusToggle from "../../../components/StatusToggle";
// import TableImageView from "../../../components/TableImageView";
// import ViewBlog from "./ViewBlog";

// export const Columns = [
//   {
//     name: "Sr No.",
//     selector: (row) => row.serialNo,
//     width: "100px",
//     sortable: true,
//   },
//   {
//     name: "",
//     selector: (row) => row.blogImage,
//     center: true,
//     width: "40px",
//     cell: (row) => <TableImageView src={row?.blogImage} />,
//   },
//   {
//     name: "Title",
//     selector: (row) => row.blogTitle,
//     sortable: true,
//     // center: true,
//     width: "250px",
    
//   },
//   {
//     name: "Blog Description",
//     selector: (row) =>  row.blogDescription.slice(0, 80) + "...",
//     sortable: true,
//     // center: true,
//     // width: "250px",
//   },
//   {
//     name: "Status",
//     selector: (row) => row.blocked,
//     width: "150px",
//     sortable: true,
//     center: true,
//     cell: (row) => (
//       <StatusToggle
//         status={row.blocked}
//         id={row._id}
//         type={"blog"}
//         queryName="fetchBlogs"
//       />
//     ),
//   },
//   {
//     name: "Actions",
//     center: true,
//     cell: (row) => (
//       <ActionIcons
//         rowData={row}
//         view={true}
//         del={true}
//         edit={true}
//         viewData={<ViewBlog rowData={row} />}
//         type="blog"
//       />
//     ),
//   },
// ];

// export const filterbyStatus = [
//   { label: "All", value: null },
//   { label: "Blocked", value: true },
//   { label: "Unblocked", value: false },
// ];



import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewBlog from "./ViewBlog";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.blogImage,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.blogImage} />,
  },
  {
    name: "Title",
    selector: (row) => row.blogTitle,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Author",
    selector: (row) => row.authorName?.slice(0, 15),
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Meta Description",
    // selector: (row) => row.blogDescription,
    selector: (row) =>  row?.metaDescription?.slice(0, 80) + "...",
    sortable: true,
    // center: true,
    // width: "250px",
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
        type={"blog"}
        queryName="fetchBlogs"
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
        viewData={<ViewBlog rowData={row} />}
        type="blog"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];