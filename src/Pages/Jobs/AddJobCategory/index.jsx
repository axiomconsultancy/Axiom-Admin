// import { Container, Group, SimpleGrid } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { showNotification } from "@mantine/notifications";
// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useMutation } from "react-query";
// import { useLocation, useNavigate } from "react-router";
// import { routeNames } from "../../../Routes/routeNames";
// import Button from "../../../components/Button";
// import InputField from "../../../components/InputField";
// import PageHeader from "../../../components/PageHeader";
// import TextArea from "../../../components/TextArea";
// import { backendUrl } from "../../../constants/constants";
// import { UserContext } from "../../../contexts/UserContext";

// export const AddJobCategory = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   let { state } = useLocation();

//   const form = useForm({
//     validateInputOnChange: true,
//     initialValues: {
//       title: "",
//       description: "",
//     },

//     validate: {
//       title: (value) =>
//         value?.trim().length > 1 && value?.length < 30
//           ? null
//           : "Please enter job category title between 2 to 30 characters",
//       description: (value) =>
//         value?.trim().length > 0
//           ? null
//           : "Please enter job category description",
//     },
//   });

//   useEffect(() => {
//     if (state?.isUpdate) {
//       form.setValues(state.data);
//     }
//   }, [state]);

//   const handleAddJobCategory = useMutation(
//     (values) => {
//       if (state?.isUpdate)
//         return axios.patch(
//           `${backendUrl + `/api/v1/jobsCategory/${state?.data?._id}`}`,
//           values,
//           {
//             headers: {
//               authorization: `Bearer ${user.token}`,
//             },
//           }
//         );
//       else
//         return axios.post(`${backendUrl + "/api/v1/jobsCategory"}`, values, {
//           headers: {
//             authorization: `Bearer ${user.token}`,
//           },
//         });
//     },
//     {
//       onSuccess: (response) => {
//         if (response.data?.success) {
//           showNotification({
//             title: "Success",
//             message: response?.data?.message,
//             color: "green",
//           });
//           navigate(routeNames.general.viewJobCategory);
//           form.reset();
//         } else {
//           showNotification({
//             title: "Error",
//             message: response?.data?.message,
//             color: "red",
//           });
//         }
//       },
//     }
//   );

//   return (
//     <Container fluid>
//       <PageHeader
//         label={state?.isUpdate ? "Edit Job Category" : "Add Job Category"}
//       />
//       <form onSubmit={form.onSubmit((values) => handleAddJobCategory.mutate(values))}>
//         <SimpleGrid
//           breakpoints={[
//             { minWidth: "sm", cols: 1 },
//             { minWidth: "md", cols: 1 },
//           ]}
//         >
//           <InputField
//             label={"Title"}
//             placeholder={"Enter Job Category Title"}
//             form={form}
//             withAsterisk
//             validateName={"title"}
//           />
//           <TextArea
//             label={"Description"}
//             placeholder={"Enter Description"}
//             rows="4"
//             form={form}
//             withAsterisk
//             validateName={"description"}
//           />
//         </SimpleGrid>
//         <Group position="right" mt={"md"}>
//           <Button
//             label={"Cancel"}
//             variant={"outline"}
//             onClick={() => navigate(routeNames.general.viewJobCategory)}
//           />
//           <Button
//             label={state?.isUpdate ? "Edit Job Category" : "Add Job Category"}
//             type={"submit"}
//             loading={handleAddJobCategory.isLoading}
//           />
//         </Group>
//       </form>
//     </Container>
//   );
// };
