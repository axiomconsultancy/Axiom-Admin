/* eslint-disable no-unused-vars */
import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import DropZone from "../../../components/Dropzone";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import TextArea from "../../../components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";
import DropDown from "../../../components/DropDown";
export const AddTestimonial = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      image: null,
      designation: "",
      testimonial: "",
      project: "",
      projectLink: "",
    },

    validate: {
      name: (value) => (value?.length > 1 && value?.length < 30 ? null : "Please enter name"),
      designation: (value) => (value?.length > 0 ? null : "Please enter designation"),
      testimonial: (value) => (value?.length > 0 ? null : "Please enter testimonial"),
      image: (value) => (value ? null : "Please upload a Image"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(`${backendUrl + `/api/v1/testimonial/${state?.data?._id}`}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
      else
        return axios.post(`${backendUrl + "/api/v1/testimonial"}`, values, {
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
          navigate(routeNames.general.viewTestimonial);
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
      <PageHeader label={state?.isUpdate ? "Edit Testimonial" : "Add Testimonial"} />
      <form onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}>
        <InputField label={"Project Name"} placeholder={"Enter Project Name"} form={form} validateName={"project"} />
        <InputField
          label={"Project Link"}
          placeholder={"Enter Project Link"}
          form={form}
          validateName={"projectLink"}
        />
        <InputField label={"Name"} placeholder={"Enter Name"} form={form} withAsterisk validateName={"name"} />
        <InputField
          label={"Designation"}
          placeholder={"Enter Designation"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"designation"}
        />

        <TextArea
          label={"Testimonial"}
          placeholder={"Enter testimonial"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"testimonial"}
        />
        <Group position="center">
          <DropZone form={form} folderName={"service"} name={"image"} label="Cover Image" />
          {/* <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          /> */}
        </Group>
        <Group position="right" mt={"md"}>
          <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.viewTestimonial)} />
          <Button
            label={state?.isUpdate ? "Edit Testimonial" : "Add Testimonial"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
