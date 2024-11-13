/* eslint-disable no-unused-vars */

import { TagsInput } from "react-tag-input-component";
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

export const AddTermsAndConditions = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

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
        value?.length > 0 ? null : "Please enter Terms and Conditions Data",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate) {
        return axios.patch(
          `${backendUrl}/api/v1/terms-and-conditions/${state?.data?._id}`,
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
        return axios.post(`${backendUrl}/api/v1/terms-and-conditions`, values, {
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
          navigate(routeNames.general.viewTermsAndConditions);
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
        label={
          state?.isUpdate
            ? "Edit Terms And Conditions"
            : "Add Terms And Conditions"
        }
      />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Terms And Conditions Title"}
          form={form}
          withAsterisk
          validateName={"tacTitle"}
        />

        <TinyMCEEditor
          label={"Terms And Conditions Data"}
          placeholder={"Enter Terms And Conditions Data"}
          form={form}
          withAsterisk
          validateName={"tacData"}
        />

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewTermsAndConditions)}
          />
          <Button
            label={
              state?.isUpdate
                ? "Edit TermsAndConditions"
                : "Add TermsAndConditions"
            }
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
