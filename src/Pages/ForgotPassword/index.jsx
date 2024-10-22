import { Container } from "@mantine/core";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants/constants";
import { useStyles } from "./styles";

export const ForgetPassword = () => {
  const { classes } = useStyles();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
    },
    validate: {
      email: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{0,6}$/i.test(val)
          ? null
          : "Please enter a valid email",
    },
  });

  const handleForgetPassword = useMutation(
    (values) => {
      return axios.post(`${backendUrl + "/api/v1/auth/forgetPassword"}`, values);
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: "Password reset link sent to your email",
            color: "green",
          });
          form.reset();
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
        onSubmit={form.onSubmit((values) => handleForgetPassword.mutate(values))}
      >
        <h2>Forgot Password</h2>
        <InputField
          label={"Email"}
          placeholder={"example@email.com"}
          form={form}
          validateName={"email"}
        />
        <Button
          label={"Send Reset Link"}
          type={"submit"}
          mt="md"
          loading={handleForgetPassword.isLoading}
        />
      </form>
    </Container>
  );
};
