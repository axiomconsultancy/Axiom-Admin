import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import PageHeader from "../../../components/PageHeader";
import TextArea from "../../../components/TextArea";
import { backendUrl } from "../../../constants/constants";
import { UserContext } from "../../../contexts/UserContext";

export const AddFaq = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      question: "",
      answer: "",
    },

    validate: {
      question: (value) =>
        value?.length > 1 && value?.length < 70 ? null : "Please enter question between 2 to 30 characters",

      answer: (value) =>
        value?.length > 2 && value?.length < 1000 ? null : "Please enter question between 2 to 1000 characters",
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddFaq = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(`${backendUrl + `/api/v1/faq/${state?.data?._id}`}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
      else
        return axios.post(`${backendUrl + "/api/v1/faq"}`, values, {
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
          navigate(routeNames.general.viewFaq);
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
      <PageHeader label={state?.isUpdate ? "Edit Faq" : "Add Faq"} />
      <form onSubmit={form.onSubmit((values) => handleAddFaq.mutate(values))}>
        <InputField
          label={"Question"}
          placeholder={"Enter Question"}
          form={form}
          withAsterisk
          validateName={"question"}
        />

        {/* <TextArea
          label={"Question"}
          placeholder={"Enter testimoni"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"testimonial"}
        /> */}
        <TextArea
          label={"Answer"}
          placeholder={"Enter Answer"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"answer"}
        />

        <Group position="right" mt={"md"}>
          <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.viewFaq)} />
          <Button label={state?.isUpdate ? "Edit Faq" : "Add Faq"} type={"submit"} loading={handleAddFaq.isLoading} />
        </Group>
      </form>
    </Container>
  );
};
