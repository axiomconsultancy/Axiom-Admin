/* eslint-disable no-unused-vars */

import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../components/InputField";

import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import { backendUrl } from "../../constants/constants";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import TinyMCEEditor from "./TinyMCEEditor";

export const PrivacyPolicy = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      policyTitle: "",
      policyData: "",
    },

    validate: {
      policyTitle: (value) =>
        !value
          ? "Title is required"
          : value.length < 3
          ? "Title must be at least 3 characters long"
          : value.length > 100
          ? "Title must be at most 100 characters long"
          : null,

      policyData: (value) =>
        !value ? "Please enter Privacy Policy Data" : null,
    },
  });

  // Fetch the existing Privacy Policy entry
  const { status } = useQuery(
    "fetchPrivacyPolicy",
    () =>
      axios.get(`${backendUrl}/api/v1/privacy-policy`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess: (res) => {
        if (res.data?.data) {
          form.setValues({
            policyTitle: res.data.data.policyTitle,
            policyData: res.data.data.policyData,
          });
        }
      },
    }
  );

  // Save Privacy Policy
  const handleSave = useMutation(
    async (values) => {
      return axios.patch(`${backendUrl}/api/v1/privacy-policy`, values, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response?.data?.message || "Privacy Policy saved",
          color: "green",
        });

        // Invalidate the query to refetch data
        queryClient.invalidateQueries("fetchPrivacyPolicy");
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
      <PageHeader label="Privacy Policy" />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={form.onSubmit((values) => handleSave.mutate(values))}>
          <InputField
            label="Title"
            placeholder="Enter Privacy Policy Title"
            form={form}
            withAsterisk
            validateName="policyTitle"
          />
          <TinyMCEEditor
            label="Privacy Policy Data"
            placeholder="Enter Privacy Policy Data"
            form={form}
            withAsterisk
            validateName="policyData"
          />
          <Group position="right" mt="md">
            <Button label="Cancel" variant="outline" onClick={() => {}} />
            <Button
              label="Save Privacy Policy"
              type="submit"
              loading={handleSave.isLoading}
            />
          </Group>
        </form>
      )}
    </Container>
  );
};
