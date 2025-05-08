import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import PassInput from "../../components/PassInput";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";

export const Settings = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPass: "",
    },

    validate: {
      oldPassword: (value) =>
        value?.length > 0 ? null : "Please enter old password",
      newPassword: (value) =>
        value?.length > 0 ? null : "Please enter new password",
      confirmPass: (value, values) =>
        value === values.newPassword
          ? null
          : "New password and confirm password must be the same",
    },
  });

  const handleChangePassword = useMutation(
    (values) => {
      // console.log("Values", values);
      return axios.patch(`${backendUrl + "/api/v1/auth/updateProfile"}`, values, {
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
          form.reset();
        } else {
          // console.log("inside error");
          console.log(response?.data?.message);
        }
      },
      onError: (error) => {
        // console.log("Request failed");
        console.error(error.response?.data?.message || error.message);
        showNotification({
          title: "Error",
          message: error?.response?.data?.message,
          color: "red",
        });
      },
    }
  );

  return (
    <Container fluid>
      <PageHeader label={"Settings"} />
      <form
        onSubmit={form.onSubmit((values) => handleChangePassword.mutate(values))}
      >
        <PassInput
          label={"Old Password"}
          placeholder={"Enter Old Password"}
          form={form}
          withAsterisk
          validateName={"oldPassword"}
        />
        <PassInput
          label={"New Password"}
          placeholder={"Enter New Password"}
          form={form}
          withAsterisk
          validateName={"newPassword"}
        />
        <PassInput
          label={"Confirm Password"}
          placeholder={"Enter Confirm Password"}
          form={form}
          withAsterisk
          validateName={"confirmPass"}
        />

        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.landing)}
          />
          <Button
            label={"Save Settings"}
            type={"submit"}
            loading={handleChangePassword.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
