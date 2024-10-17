/* eslint-disable no-unused-vars */
import { Container, Group, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import SelectMenu from "../../../components/SelectMenu";
import TextArea from "../../../components/TextArea";
import Datepicker from "../../../components/Datepicker";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import moment from "moment";

export const AddJob = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      type: "",
      vacancies: "",
      description: "",
      category: "",
      location: "Islamabad",
      jobLevel: "",
      minimumQualifications: "",
      minimumExperience: "",
      jobApplicationDeadline: "",
      jobRequirements: "",
      jobResponsibilities: "",
      minimumJobSalary: "",
      maximumJobSalary: "",
      jobImage: null,
      jobSkills: "",
      otherBenefits: "",
    },

    validate: {
      title: (value) =>
        value?.trim().length > 1 && value?.length < 30
          ? null
          : "Please enter job title between 2 to 30 characters",
      type: (value) =>
        value?.trim().length > 0 ? null : "Please select job type",
      vacancies: (value) => (value > 0 ? null : "Please enter vacancies in digits only"),
      category: (value) =>
        value?.trim().length > 0 ? null : "Please select category",
      description: (value) =>
        value?.trim().length > 0 ? null : "Please enter job description",
      jobLevel: (value) =>
        value?.trim().length > 0 ? null : "Please enter job level",
      minimumQualifications: (value) =>
        value?.trim().length > 0 ? null : "Please enter minimum qualification",
      minimumExperience: (value) =>
        value?.trim().length > 0 ? null : "Please enter minimum experience",
      jobApplicationDeadline: (value) =>
        value ? null : "Please select job deadline",
      jobRequirements: (value) =>
        value?.trim().length > 0 ? null : "Please enter job requirements",

      minimumJobSalary: (value) =>
        value > 0 ? null : "Please enter minimum salary",
      maximumJobSalary: (value) =>
        value > 0 ? null : "Please enter maximum salary",
    },
  });

  //categories
  const { status } = useQuery(
    "fetchJobsCategory",
    () => {
      console.log("Categories issue 1")
      return axios.get(backendUrl + "/api/v1/jobsCategory");
    },
    {
      onSuccess: (res) => {
        console.log("categories before:", res);
      
        // Map and filter the data, excluding items where blocked is true
        let data = res.data.data
          .filter(item => !item?.blocked)  // Exclude items where blocked is true
          .map((item) => {
            return { value: item?._id, label: item?.title, blocked: item?.blocked };
          });
      
        console.log("categories after:", data);
        setCategories(data);
      },
      onError: (error) =>{
      console.log("Categories issue 2323" , error)
      }
    }
  );

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue("category", state.data?.category?._id);
      form.setFieldValue(
        "jobApplicationDeadline",
        new moment(state.data.jobApplicationDeadline)
      );
    }
  }, [state]);

  const handleAddJob = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(
          `${backendUrl + `/api/v1/jobs/${state?.data?._id}`}`,
          values,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      else
        return axios.post(`${backendUrl + "/api/v1/jobs"}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewJobs);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );

  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Job" : "Add Job"} />
      <form onSubmit={form.onSubmit((values) => handleAddJob.mutate(values))}>
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 1 },
            { minWidth: "md", cols: 2 },
          ]}
        >
          <Datepicker
            label={"Application Deadline"}
            placeholder={"Select Application Deadline"}
            form={form}
            withAsterisk
            minDate={new Date()}
            validateName={"jobApplicationDeadline"}
          />
          <InputField
            label={"Title"}
            placeholder={"Enter Job Title"}
            form={form}
            withAsterisk
            validateName={"title"}
          />
          <SelectMenu
            data={[
              { value: "Full Time", label: "Full Time" },
              { value: "Part Time", label: "Part Time" },
              { value: "Remote", label: "Remote" },
            ]}
            label="Job Type"
            placeholder="Select Job Type"
            withAsterisk
            form={form}
            validateName="type"
          />
          <SelectMenu
            data={categories}
            label="Job Category"
            placeholder="Select Job Category"
            withAsterisk
            form={form}
            validateName="category"
          />
          <InputField
            label={"Vacancies"}
            placeholder={"Enter Job vacancies"}
            form={form}
            withAsterisk
            validateName={"vacancies"}
          />
          <InputField
            label={"Job Level"}
            placeholder={"Enter Job Level"}
            form={form}
            withAsterisk
            validateName={"jobLevel"}
          />
          <InputField
            label={"Minimum Qualification"}
            placeholder={"Enter Minimum Qualification"}
            form={form}
            withAsterisk
            validateName={"minimumQualifications"}
          />
          <SelectMenu
            data={[
              { value: "0-1 Year", label: "0-1 Year" },
              { value: "1-3 Years", label: "1-3 Years" },
              { value: "3-5 Years", label: "3-5 Years" },
              { value: "5-7 Years", label: "5-7 Years" },
              { value: "7-10 Years", label: "7-10 Years" },
              { value: "10+ Years", label: "10+ Years" },
            ]}
            label="Job Experience"
            placeholder="Select Experience"
            withAsterisk
            form={form}
            validateName="minimumExperience"
          />
          <InputField
            label={"Minimum Salary"}
            placeholder={"Enter Minimum Salary"}
            form={form}
            withAsterisk
            validateName={"minimumJobSalary"}
          />
          <InputField
            label={"Maximum Salary"}
            placeholder={"Enter Maximum Salary"}
            form={form}
            withAsterisk
            validateName={"maximumJobSalary"}
          />
        </SimpleGrid>
        <TextArea
          label={"Job Requirements"}
          placeholder={"Enter Job Requirements"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"jobRequirements"}
        />
        <TextArea
          label={"Job Responsibilities"}
          placeholder={"Enter Job Responsibilities"}
          rows="4"
          form={form}
          validateName={"jobResponsibilities"}
        />
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <TextArea
          label={"Other Benefits"}
          placeholder={"Enter Other Benefits"}
          rows="4"
          form={form}
          validateName={"otherBenefits"}
        />
        <TextArea
          label={"Job Skills"}
          placeholder={"Enter Job Skills"}
          rows="4"
          form={form}
          validateName={"jobSkills"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewJobs)}
          />
          <Button
            label={state?.isUpdate ? "Edit Job" : "Add Job"}
            type={"submit"}
            loading={handleAddJob.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
