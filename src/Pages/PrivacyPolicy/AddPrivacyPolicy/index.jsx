/* eslint-disable no-unused-vars */

import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";

import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
// import SelectMenu from "../../../components/SelectMenu";
import TinyMCEEditor from "./TinyMCEEditor";

export const AddPrivacyPolicy = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  // console.log("categ : ", categories);

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
        value?.length > 0 ? null : "Please enter policyData",
    },
  });

  // console.log("Form : ", form.values);
  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      // const clonedData = { ...state.data };
      // form.setValues(clonedData);
    }
  }, [state]);
  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate) {
        return axios.patch(
          `${backendUrl}/api/v1/privacy-policy/${state?.data?._id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        console.log("values : ", values);
        return axios.post(`${backendUrl}/api/v1/privacy-policy`, values, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewPrivacyPolicy);
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
      <PageHeader
        label={state?.isUpdate ? "Edit Privacy Policy" : "Add Privacy Policy"}
      />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Privacy Policy Title"}
          form={form}
          withAsterisk
          validateName={"policyTitle"}
        />

        <TinyMCEEditor
          label={"Privacy Policy Data"}
          placeholder={"Enter Privacy Policy Data"}
          form={form}
          withAsterisk
          validateName={"policyData"}
        />
        {/* y */}
        {/* <textarea name="" id=""></textarea> */}

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewPrivacyPolicy)}
          />
          <Button
            label={state?.isUpdate ? "Edit PrivacyPolicy" : "Add PrivacyPolicy"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
