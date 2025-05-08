import { Container } from "@mantine/core";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants/constants";
import { useParams, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

export const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL
  const navigate = useNavigate(); // For redirecting after reset
  const { classes } = useStyles();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (val) =>
        val.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (val, values) =>
        val === values.password ? null : "Passwords do not match",
    },
  });

  const handleResetPassword = useMutation(
    (values) => {
      return axios.post(`${backendUrl + `/api/v1/auth/reset-password/${token}`}`, {
        password: values.password,
      });
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: "Password has been reset successfully",
            color: "green",
          });
          form.reset();
          navigate("/login"); // Redirect to login page
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
      onError: (response) => {
        showNotification({
          title: "Error",
          message: response?.response?.data?.message,
          color: "red",
        });
      },
    }
  );

  return (
    <Container mih="100vh" className={classes.con}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleResetPassword.mutate(values))}
      >
        <h2>Reset Password</h2>
        <InputField
          label={"New Password"}
          placeholder={"Enter your new password"}
          form={form}
          validateName={"password"}
          type={"password"}
        />
        <InputField
          label={"Confirm Password"}
          placeholder={"Confirm your new password"}
          form={form}
          validateName={"confirmPassword"}
          type={"password"}
        />
        <Button
          label={"Reset Password"}
          type={"submit"}
          mt="md"
          loading={handleResetPassword.isLoading}
        />
      </form>
    </Container>
  );
};
