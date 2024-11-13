import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";

export const AddService = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      description: "",
      shortDescription: "",
      coverImage: null,
      homeImage: null,
    },

    validate: {
      title: (value) =>
        value?.trim().length > 1 && value?.trim().length < 30
          ? null
          : "Please enter service title between 2 to 30 characters",
      description: (value) =>
        value?.trim().length > 0 ? null : "Please enter project description",
      shortDescription: (value) =>
        value?.trim().length > 0 && value?.trim().length < 80
          ? null
          : "Please enter short description",
      coverImage: (value) => (value ? null : "Please upload a cover Image"),
      homeImage: (value) => (value ? null : "Please upload a home Image"),
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
        return axios.patch(
          `${backendUrl + `/api/v1/service/${state?.data?._id}`}`,
          values,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      else
        return axios.post(`${backendUrl + "/api/v1/service"}`, values, {
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
          navigate(routeNames.general.viewService);
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
      <PageHeader label={state?.isUpdate ? "Edit Service" : "Add Service"} />
      <form
        onSubmit={form.onSubmit((values) => {
          // Trim all values before passing to mutation
          const trimmedValues = {
            ...values,
            title: values.title.trim(),
            description: values.description.trim(),
            shortDescription: values.shortDescription.trim(),
            // No need to trim images, as they are file objects
          };
          handleAddService.mutate(trimmedValues);
        })}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Service Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"shortDescription"}
        />
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Group position="center">
          <DropZone
            form={form}
            folderName={"service"}
            name={"coverImage"}
            label="Cover Image"
          />
          <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          />
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewService)}
          />
          <Button
            label={state?.isUpdate ? "Edit Service" : "Add Service"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
