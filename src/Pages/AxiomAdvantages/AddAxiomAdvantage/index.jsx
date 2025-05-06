/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import DropZone from "../../../components/Dropzone";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

export const addAxiomAdvantage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      image: null,
      description: "",
    },

    validate: {
      title: (value) => (value?.length > 1 && value?.length < 50 ? null : "Please enter title"),
      description: (value) => (value?.length > 0 ? null : "Please enter description"),

      image: (value) => (value ? null : "Please upload a Image"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddAxiomAdvantage = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(`${backendUrl + `/api/v1/axiom-advantage/${state?.data?._id}`}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
      else
        return axios.post(`${backendUrl + "/api/v1/axiom-advantage"}`, values, {
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
          navigate(routeNames.general.viewAxiomAdvantage);
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
      <PageHeader label={state?.isUpdate ? "Edit Advantage" : "Add Advantage"} />
      <form onSubmit={form.onSubmit((values) => handleAddAxiomAdvantage.mutate(values))}>
        <InputField
          label={"Title"}
          placeholder={"Enter title"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"title"}
        />

        <InputField
          label={"Description"}
          placeholder={"Enter Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"description"}
        />

        <Group position="center">
          <DropZone form={form} folderName={"axiomAdvantage"} name={"image"} label="Icon Image" />
          {/* <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          /> */}
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewAxiomAdvantage)}
          />
          <Button
            label={state?.isUpdate ? "Edit Advantage" : "Add Advantage"}
            type={"submit"}
            loading={handleAddAxiomAdvantage.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
