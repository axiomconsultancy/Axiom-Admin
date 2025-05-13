/* eslint-disable no-unused-vars */
import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import SelectMenu from "../../../components/SelectMenu";

export const AddProduct = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      description: "",
      // shortDescription: "",
      coverImage: null,
      link: "",
      // homeImage: null,
    },

    validate: {
      title: (value) =>
        value?.trim().length > 1 && value?.length < 50 ? null : "Please enter product title between 2 to 50 characters",
      description: (value) => (value?.trim().length > 0 ? null : "Please enter product description"),
      // shortDescription: (value) =>
      //   value?.length > 0 ? null : "Please enter short description",
      coverImage: (value) => (value ? null : "Please upload a cover Image"),
      link: (value) => {
        if (!value?.trim()) return "Please enter project link";

        try {
          new URL(value);
          return null;
        } catch (e) {
          return "Please enter a valid URL";
        }
      }
      // homeImage: (value) => (value ? null : "Please upload a home Image"),
    },
  });
  const handleSubmit = (values) => {
    const trimmedValues = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      link: values.link.trim(),
    };
    handleAddService.mutate(trimmedValues);
  };

  //categories
  const { status } = useQuery(
    "fetchServices",
    () => {
      return axios.get(backendUrl + "/api/v1/web/services");
    },
    {
      onSuccess: (res) => {
        let data = res.data.data.map((item) => {
          return { value: item._id, label: item.title };
        });
        setCategories(data);
      },
    }
  );

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue("category", state.data.category._id);
    }
  }, [state]);
  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(`${backendUrl + `/api/v1/product/${state?.data?._id}`}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
      else
        return axios.post(`${backendUrl + "/api/v1/product"}`, values, {
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
          navigate(routeNames.general.viewProducts);
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
      <PageHeader label={state?.isUpdate ? "Edit Product" : "Add Product"} />
      {/* <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      > */}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <InputField
          label={"Title"}
          placeholder={"Enter Product Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <SelectMenu
          data={categories}
          label="Service Category"
          placeholder="Select Product Service Category"
          withAsterisk
          form={form}
          validateName="category"
        />
        <InputField
          label={"Project Link"}
          placeholder={"Enter Project Link"}
          form={form}
          withAsterisk
          validateName={"link"}
        />
        {/* <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"shortDescription"}
        /> */}
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Group position="center">
          <DropZone form={form} folderName={"service"} name={"coverImage"} label="Cover Image" />
          {/* <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          /> */}
        </Group>
        <Group position="right" mt={"md"}>
          <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.viewProducts)} />
          <Button
            label={state?.isUpdate ? "Edit Product" : "Add Product"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
