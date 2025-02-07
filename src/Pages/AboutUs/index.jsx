import { Container, Group, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import PageHeader from "../../components/PageHeader";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";

export const AboutUs = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      primaryEmail: "",
      otherEmails: "",
      primaryContact: "",
      otherContacts: "",
      primaryAddress: "",
      otherAddresses: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      whatsapp: "",
      googleMapLink: "",
      googleMapImage: "",
    },

    validate: {
      primaryEmail: (value) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(value)
          ? null
          : "Please enter a valid email",
      otherEmails: (value) =>
        !value || /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(value)
          ? null
          : "Please Enter A Valid Email",
      primaryContact: (value) => {
        const regex = /^\+92-\d{10}$/; // Ensure the number starts with '+92-' and has exactly 10 digits after that
        if (!regex.test(value)) {
          return "Please enter a valid primary contact number";
        }
        return null; // No error if the validation passes
      },

      whatsapp: (value) => {
        if (!value) {
          return null; // No validation error if the field is empty (optional)
        }
        const regex = /^\+92-\d{10}$/; // Ensure the number starts with '+92-' and has exactly 10 digits after that
        if (!regex.test(value)) {
          return "Please enter a valid whatsapp number ";
        }
        return null; // No error if the validation passes
      },
      otherContacts: (value) => {
        if (!value) {
          return null; // No validation error if the field is empty (optional)
        }
        const regex = /^\+92-\d{10}$/; // Ensure the number starts with '+92-' and has exactly 10 digits after that
        if (!regex.test(value)) {
          return "Please enter a valid whatsapp number ";
        }
        return null; // No error if the validation passes
      },
      primaryAddress: (value) =>
        value?.length > 0 ? null : "Please enter primary address",
    },
  });

  //Get Data
  const { status } = useQuery(
    "fetchAboutUs",
    () => {
      return axios.get(backendUrl + "/api/v1/aboutUs", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        form.setValues(res.data.data[0]);
      },
    }
  );

  const handleSave = useMutation(
    (values) => {
      return axios.patch(`${backendUrl + "/api/v1/aboutUs"}`, values, {
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
    <Container fluid style={{ minHeight: "80vh" }}>
      <PageHeader label={"About Us"} />
      {status === "loading" ? (
        <Loader style={{ display: "flex", margin: "auto" }} />
      ) : (
        <form onSubmit={form.onSubmit((values) => handleSave.mutate(values))}>
          <InputField
            label={"Primary Email Address"}
            placeholder={"Enter Email Address"}
            form={form}
            withAsterisk
            validateName={"primaryEmail"}
          />
          <InputField
            label={"Other Email Address"}
            placeholder={"Enter Other Contact Number"}
            form={form}
            validateName={"otherEmails"}
          />
          <InputField
            label={"Primary Contact Number"}
            placeholder={"Enter Contact Number"}
            form={form}
            withAsterisk
            validateName={"primaryContact"}
          />
          <InputField
            label={"Other Contact Number"}
            placeholder={"Enter Other Contact Number"}
            form={form}
            validateName={"otherContacts"}
          />

          <InputField
            label={"LinkedIn Profile"}
            placeholder={"Enter LinkedIn Profile Link"}
            form={form}
            validateName={"linkedIn"}
          />
          <InputField
            label={"Instagram Profile"}
            placeholder={"Enter Instagram Profile Link"}
            form={form}
            validateName={"instagram"}
          />
          <InputField
            label={"Facebook Profile"}
            placeholder={"Enter Facebook Profile Link"}
            form={form}
            validateName={"facebook"}
          />
          <InputField
            label={"Whatsapp Number"}
            placeholder={"Enter Whatsapp Number"}
            form={form}
            validateName={"whatsapp"}
          />

          <InputField
            label={"Youtube Profile"}
            placeholder={"Enter Youtube Profile Link"}
            form={form}
            validateName={"youtube"}
          />
          <InputField
            label={"Primary Address"}
            placeholder={"Enter Primary Address"}
            form={form}
            withAsterisk
            validateName={"primaryAddress"}
          />
          <InputField
            label={"Other Address"}
            placeholder={"Enter Other Address"}
            form={form}
            validateName={"otherAddresses"}
          />

          <Group position="right" mt={"md"}>
            <Button
              label={"Cancel"}
              variant={"outline"}
              onClick={() => navigate(routeNames.general.landing)}
            />
            <Button
              label={"Save"}
              type={"submit"}
              loading={handleSave.isLoading}
            />
          </Group>
        </form>
      )}
    </Container>
  );
};
