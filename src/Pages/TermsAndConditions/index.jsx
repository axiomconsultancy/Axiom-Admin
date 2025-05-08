/* eslint-disable no-unused-vars */

import { Container, Group } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import { backendUrl } from "../../constants/constants";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TinyMCEEditor from "./TinyMCEEditor";

export const TermsAndConditions = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient(); // React Query's query client for manual invalidation

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      tacTitle: "",
      tacData: "",
    },
    validate: {
      tacTitle: (value) =>
        !value
          ? "Title is required"
          : value.length < 3
          ? "Title must be at least 3 characters long"
          : value.length > 100
          ? "Title must be at most 100 characters long"
          : null,
      tacData: (value) =>
        !value ? "Please enter Terms and Conditions data" : null,
    },
  });

  // Fetch the existing TAC entry
  const { status } = useQuery(
    "fetchTermsAndConditions",
    () =>
      axios.get(`${backendUrl}/api/v1/terms-and-conditions`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess: (res) => {
        if (res.data?.data) {
          form.setValues({
            tacTitle: res.data.data.tacTitle,
            tacData: res.data.data.tacData,
          });
        }
      },
    }
  );

  // Save (Create/Update) Terms and Conditions
  const handleSave = useMutation(
    async (values) => {
      return axios.post(`${backendUrl}/api/v1/terms-and-conditions`, values, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message || "Terms and Conditions saved",
          color: "green",
        });

        // Invalidate the query to refetch data
        queryClient.invalidateQueries("fetchTermsAndConditions");
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error.response?.data?.message || "Failed to save",
          color: "red",
        });
      },
    }
  );

  return (
    <Container fluid>
      <PageHeader label="Terms And Conditions" />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={form.onSubmit((values) => handleSave.mutate(values))}>
          <InputField
            label="Title"
            placeholder="Enter Terms And Conditions Title"
            form={form}
            withAsterisk
            validateName="tacTitle"
          />
          <TinyMCEEditor
            label="Terms And Conditions Data"
            placeholder="Enter Terms And Conditions Data"
            form={form}
            withAsterisk
            validateName="tacData"
          />
          <Group position="right" mt="md">
            <Button label="Cancel" variant="outline" onClick={() => {}} />
            <Button
              label="Save Terms And Conditions"
              type="submit"
              loading={handleSave.isLoading}
            />
          </Group>
        </form>
      )}
    </Container>
  );
};
