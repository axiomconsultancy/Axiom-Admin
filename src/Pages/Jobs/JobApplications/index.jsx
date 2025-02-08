/* eslint-disable react/prop-types */
import { Container, Grid } from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import SelectMenu from "../../../components/SelectMenu";
import { useStyles } from "../styles";
import { Columns } from "./TableHeaders";
import PageHeader from "../../../components/PageHeader";
import DataGrid from "../../../components/Table";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import { UserContext } from "../../../contexts/UserContext";
import { backendUrl } from "../../../constants/constants";
import { routeNames } from "../../../Routes/routeNames";
import { useNavigate } from "react-router";
// import { Category } from "tabler-icons-react";

const ViewJobApplications = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [blockedFilter, setBlockedFilter] = useState(null);
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(""); // For category filter
  const [categories, setCategories] = useState([]); // For storing job categories

  // Fetch job applications
  const { status: jobStatus } = useQuery(
    "fetchJobApplications",
    () => {
      return axios.get(backendUrl + "/api/v1/jobapplications", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        data.map((item) => {
          item.serialNo = data.indexOf(item) + 1;
        });
        setTableData(data); // Set job applications data
      },
    }
  );
  // console.log(tableData);

  // Fetch job categories for the dropdown filter
  const { status: categoryStatus } = useQuery(
    "fetchJobCategories",
    () => {
      return axios.get(backendUrl + "/api/v1/jobsCategory", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const categoryData = res.data.data.map((cat) => ({
          value: cat._id,
          label: cat.title,
        }));
        setCategories(categoryData); // Set job categories for dropdown
      },
    }
  );
  // console.log(categories);

  // Filter job applications based on search, category, and blocked filter
  const filteredItems = tableData.filter((item) => {
    // console.log("item : " , item)
    const matchesSearch = item?.fullName?.toLowerCase().includes(search.toLowerCase());
    const matchesBlockedFilter = blockedFilter === null || item?.blocked === blockedFilter;
    const matchesCategoryFilter = categoryFilter === "" || item?.category === categoryFilter;

    return matchesSearch  && matchesCategoryFilter;
  });

  // Clear filters
  const handleClearFilters = () => {
    setSearch("");
    setBlockedFilter(null);
    setCategoryFilter(""); // Clear category filter
  };

  // Handle checkbox change for selecting resumes
  const handleCheckboxChange = (id) => {
    setSelectedResumes((prev) =>
      prev.includes(id)
        ? prev.filter((resumeId) => resumeId !== id)
        : [...prev, id]
    );
  };

  // Download resumes logic
  const downloadResume = async (resumeLinks) => {
    for (const link of resumeLinks) {
      try {
        const response = await axios.get(link, {
          responseType: "blob", // Set response type to blob
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = link.split("/").pop(); // Extract the filename
        document.body.appendChild(a);
        a.click();
        a.remove(); 
        window.URL.revokeObjectURL(url); 
      } catch (error) {
        console.error(`Error downloading ${link}:`, error);
      }
    }
  };

  const handleDownloadSelected = async (event) => {
    event.preventDefault();
    const downloadLinks = selectedResumes.map((resumeId) => {
      return `${backendUrl}/api/v1/jobapplications/download/${resumeId}`;
    });
    await downloadResume(downloadLinks);
  };

  return (
    <Container size="xl" p="sm">
      <PageHeader label={"View Job Applications"} />
      <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
        <Grid p="xs">
          <Grid.Col sm="6" md={"6"} lg="3">
            <InputField
              placeholder={"Search Title"}
              leftIcon="search"
              value={search}
              onChange={(v) => setSearch(v.target.value)}
            />
          </Grid.Col>
          <Grid.Col sm="6" md="6" lg="3">
            <SelectMenu
              placeholder={"Filter by Category"}
              data={categories} // Pass job categories to the dropdown
              value={categoryFilter}
              onChange={setCategoryFilter}
              disabled={categoryStatus === "loading"} // Disable dropdown if categories are loading
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="3">
            <Button
              fullWidth
              label={"Clear Filters"}
              variant="outline"
              onClick={handleClearFilters}
            />
          </Grid.Col>
          <Grid.Col sm="6" md={"6"} lg="3">
            <Button
              fullWidth
              label={"Add Job"}
              leftIcon="plus"
              onClick={() => navigate(routeNames.general.addJob)}
            />
          </Grid.Col>
          <Grid.Col sm="12">
            <Button
              fullWidth
              label={"Download Selected Resumes"}
              onClick={(event) => handleDownloadSelected(event)}
              disabled={selectedResumes.length === 0}
            />
          </Grid.Col>
        </Grid>
        <DataGrid
          columns={[
            {
              name: "Select",
              cell: (row) => (
                <input
                  type="checkbox"
                  checked={selectedResumes.includes(row._id)}
                  onChange={() => handleCheckboxChange(row._id)}
                />
              ),
            },
            ...Columns, 
          ]}
          data={filteredItems}
          progressPending={jobStatus === "loading"}
          type="jobs"
        />
      </Container>
    </Container>
  );
};

export default ViewJobApplications;








// /* eslint-disable react/prop-types */
// import { Container, Grid } from "@mantine/core";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { useQuery } from "react-query";
// import SelectMenu from "../../../components/SelectMenu";
// import { useStyles } from "../styles";
// import { Columns } from "./TableHeaders";
// import PageHeader from "../../../components/PageHeader";
// import DataGrid from "../../../components/Table";
// import InputField from "../../../components/InputField";
// import Button from "../../../components/Button";
// import { UserContext } from "../../../contexts/UserContext";
// import { backendUrl } from "../../../constants/constants";
// import { routeNames } from "../../../Routes/routeNames";
// import { useNavigate } from "react-router";

// const ViewJobApplications = () => {
//   const { classes } = useStyles();
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [tableData, setTableData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [blockedFilter, setBlockedFilter] = useState(null);
//   const [selectedResumes, setSelectedResumes] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState(""); // For category filter
//   const [categories, setCategories] = useState([]);

//   // Fetch job applications
//   const { status } = useQuery(
//     "fetchJobApplications",
//     () => {
//       return axios.get(backendUrl + "/api/v1/jobapplications", {
//         headers: {
//           authorization: `Bearer ${user.token}`,
//         },
//       });
//     },
//     {
//       onSuccess: (res) => {
//         const data = res.data.data;
//         data.map((item) => {
//           item.serialNo = data.indexOf(item) + 1;
//         });
//         setTableData(data); // Set job applications data
//       },
//     }
//   );





//   // Fetch job categories for the dropdown filter
//   const { status: categoryStatus } = useQuery(
//     "fetchJobCategories",
//     () => {
//       return axios.get(backendUrl + "/api/v1/jobsCategory", {
//         headers: {
//           authorization: `Bearer ${user.token}`,
//         },
//       });
//     },
//     {
//       onSuccess: (res) => {
//         const categoryData = res.data.data.map((cat) => ({
//           value: cat._id,
//           label: cat.title,
//         }));
//         setCategories(categoryData); // Set job categories for dropdown
//       },
//     }
//   );
//   // Filter job applications based on search and blocked filter
//   const filteredItems = tableData.filter((item) => {
//     if (blockedFilter === null)
//       return item?.fullName?.toLowerCase().includes(search.toLowerCase());
//     else
//       return (
//         item?.fullName?.toLowerCase().includes(search.toLowerCase()) &&
//         item?.blocked === blockedFilter
//       );
//   });

//   // Clear filters
//   const handleClearFilters = () => {
//     setSearch("");
//     setBlockedFilter(null);
//   };

//   // Handle checkbox change for selecting resumes
//   const handleCheckboxChange = (id) => {
//     setSelectedResumes((prev) =>
//       prev.includes(id)
//         ? prev.filter((resumeId) => resumeId !== id)
//         : [...prev, id]
//     );
//   };

//   // Download resumes logic

//   const downloadResume = async (resumeLinks) => {
//     for (const link of resumeLinks) {
//       try {
//         // Trigger the download by navigating to the backend endpoint
//         const response = await axios.get(link, {
//           responseType: "blob", // Set response type to blob
//         });

//         // Create a Blob from the response
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);

//         // Create a temporary anchor element to trigger the download
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = link.split("/").pop(); // Extract the filename
//         document.body.appendChild(a);
//         a.click();
//         a.remove(); // Clean up the anchor element
//         window.URL.revokeObjectURL(url); // Release the blob URL
//       } catch (error) {
//         console.error(`Error downloading ${link}:`, error);
//       }
//     }
//   };

//   const handleDownloadSelected = async (event) => {
//     event.preventDefault();

//     // Create an array of download URLs from the selected resumes
//     const downloadLinks = selectedResumes.map((resumeId) => {
//       return `${backendUrl}/api/v1/jobapplications/download/${resumeId}`;
//     });

//     // Trigger the download process for each resume link
//     await downloadResume(downloadLinks);
//   };

//   return (
//     <Container size="xl" p="sm">
//       <PageHeader label={"View Job Applications"} />
//       <Container size="xl" pb={"md"} bg={"white"} className={classes.table}>
//         <Grid p="xs">
//           <Grid.Col sm="6" md={"6"} lg="3">
//             <InputField
//               placeholder={"Search Title"}
//               leftIcon="search"
//               value={search}
//               onChange={(v) => setSearch(v.target.value)}
//             />
//           </Grid.Col>
//           <Grid.Col sm="6" md="6" lg="3">
//             <SelectMenu
//               placeholder={"Filter by Category"}
//               data={[]}
//               value={blockedFilter}
//               onChange={setBlockedFilter}
//             />
//           </Grid.Col>
//           <Grid.Col sm="6" md={"6"} lg="3">
//             <Button
//               fullWidth
//               label={"Clear Filters"}
//               variant="outline"
//               onClick={handleClearFilters}
//             />
//           </Grid.Col>
//           <Grid.Col sm="6" md={"6"} lg="3">
//             <Button
//               fullWidth
//               label={"Add Job"}
//               leftIcon="plus"
//               onClick={() => navigate(routeNames.general.addJob)}
//             />
//           </Grid.Col>
//           <Grid.Col sm="12">
//             <Button
//               fullWidth
//               label={"Download Selected Resumes"}
//               onClick={(event) => handleDownloadSelected(event)}
//               disabled={selectedResumes.length === 0}
//             />
//           </Grid.Col>
//         </Grid>
//         <DataGrid
//           columns={[
//             {
//               name: "Select",
//               cell: (row) => (
//                 <input
//                   type="checkbox"
//                   checked={selectedResumes.includes(row._id)}
//                   onChange={() => handleCheckboxChange(row._id)}
//                 />
//               ),
//             },
//             ...Columns, // Your existing columns
//           ]}
//           data={filteredItems}
//           progressPending={status === "loading"}
//           type="jobs"
//         />
//       </Container>
//     </Container>
//   );
// };

// export default ViewJobApplications;


