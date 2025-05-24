/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  Container,
  Group,
  Select,
  Text,
  Switch,
  Textarea,
  Grid,
  Col,
  Stack,
  ActionIcon,
  Paper,
  Title,
} from "@mantine/core";
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
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export const AddService = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const [parentServices, setParentServices] = useState([]);

  // Fetch parent services using useQuery
  const { status: parentServicesStatus } = useQuery(
    "fetchParentServices",
    () =>
      axios.get(backendUrl + "/api/v1/service", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }),
    {
      onSuccess: (res) => {
        setParentServices(res.data.data); // Populate parent services state
      },
    }
  );

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      subTitle: "",
      shortDescription: "",
      description: "",
      aboutSlogan: "",
      aboutSloganPartTwo: "",
      aboutTitle: "  ",
      aboutDescription: "",
      serviceTitle: "",
      serviceDescription: "",
      serviceSpecificFaqs: [],
      serviceSpecificSteps: [],
      serviceSpecificAdvantages: [],
      serviceIcon: null,
      coverImage: null,
      homeImage: null,
      isParent: true, // Default to true (Parent service)
      parentService: null, // Default parentService to null (will be set if sub-service)
    },
    validate: {
      title: (value) =>
        value?.trim().length > 1 && value?.trim().length < 80
          ? null
          : "Please enter service title between 2 to 80 characters",
      subTitle: (value) =>
        value?.trim().length > 1 && value?.trim().length < 80
          ? null
          : "Please enter subtitle title between 2 to 80 characters",
      description: (value) => (value?.trim().length > 0 ? null : "Please enter project description"),
      aboutSlogan: (value) =>
        value?.trim().length > 1 && value?.trim().length <= 80
          ? null
          : "Please enter slogan between 2 to 80 characters",
      aboutSloganPartTwo: (value) =>
        !value?.trim().length
          ? null
          : value?.trim().length > 1 && value?.trim().length <= 80
          ? null
          : "Please enter slogan part two between 2 to 80 characters",
      aboutTitle: (value) =>
        value?.trim().length > 1 && value?.trim().length < 80
          ? null
          : "Please enter about title between 2 to 80 characters",
      aboutDescription: (value) => (value?.trim().length > 0 ? null : "Please enter about description"),
      shortDescription: (value) =>
        value?.trim().length > 0 && value?.trim().length < 100 ? null : "Please enter short description",
      coverImage: (value) => (value ? null : "Please upload a cover Image"),
      serviceIcon: (value) => (value ? null : "Please upload a service Icon"),
      serviceTitle: (value) =>
        value?.trim().length > 1 && value?.trim().length < 80
          ? null
          : "Please enter service title between 2 to 80 characters",
      serviceDescription: (value) => (value?.trim().length > 0 ? null : "Please enter service description"),
      homeImage: (value) => (value ? null : "Please upload a home Image"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      const data = state.data;

      form.setValues({
        ...data,
        faqs: data.serviceSpecificFaqs || [],
        steps: data.serviceSpecificSteps || [],
        advantages: data.serviceSpecificAdvantages || [],
      });
    }
  }, [state]);

  const addFaq = () => {
    const newFaqs = [...(form.values.faqs || []), { question: "", answer: "" }];
    form.setFieldValue("faqs", newFaqs);
  };

  const removeFaq = (index) => {
    const updatedFaqs = form.values.faqs.filter((_, i) => i !== index);
    form.setFieldValue("faqs", updatedFaqs);
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...form.values.faqs];
    updatedFaqs[index][field] = value;
    form.setFieldValue("faqs", updatedFaqs);
  };
  const addAdvantage = () => {
    const newAdvantages = [...(form.values.advantages || []), { title: "", description: "" }];
    form.setFieldValue("advantages", newAdvantages);
  };

  const removeAdvantage = (index) => {
    const updatedAdvantages = form.values.advantages.filter((_, i) => i !== index);
    form.setFieldValue("advantages", updatedAdvantages);
  };

  const handleAdvantageChange = (index, field, value) => {
    const updatedAdvantages = [...form.values.advantages];
    updatedAdvantages[index][field] = value;
    form.setFieldValue("advantages", updatedAdvantages);
  };
  const addProcess = () => {
    const newSteps = [
      ...(form.values.steps || []),
      {
        stepNo: (form.values.steps?.length || 0) + 1,
        title: "",
        description: "",
      },
    ];
    form.setFieldValue("steps", newSteps);
  };

  const removeProcess = (index) => {
    const filteredSteps = form.values.steps.filter((_, i) => i !== index);
    const reIndexed = filteredSteps.map((step, i) => ({
      ...step,
      stepNo: i + 1,
    }));
    form.setFieldValue("steps", reIndexed);
  };

  const handleChange = (index, field, value) => {
    const steps = [...form.values.steps];
    if (!steps[index]) {
      steps[index] = { stepNo: index + 1, title: "", description: "" };
    }
    steps[index][field] = value;
    form.setFieldValue("steps", steps);
  };
  const handleAddService = useMutation(
    (values) => {
      const finalValues = {
        ...values,
        parentService: values.isParent ? null : values.parentService,
      };

      if (state?.isUpdate)
        return axios.patch(`${backendUrl + `/api/v1/service/${state?.data?._id}`}`, finalValues, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
      else
        return axios.post(`${backendUrl + "/api/v1/service"}`, values, {
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
          navigate(routeNames.general.viewService);
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
      <PageHeader label={state?.isUpdate ? "Edit Service" : "Add Service"} />
      <form
        onSubmit={form.onSubmit((values) => {
          const trimmedValues = {
            ...values,
            title: values.title.trim(),
            subTitle: values.subTitle.trim(),
            shortDescription: values.shortDescription.trim(),
            description: values.description.trim(),
            aboutSlogan: values.aboutSlogan.trim(),
            aboutSloganPartTwo: values.aboutSloganPartTwo.trim(),
            aboutTitle: values.aboutTitle.trim(),
            aboutDescription: values.aboutDescription.trim(),
            serviceSpecificFaqs: values.faqs.map((faq) => ({
              question: faq.question.trim(),
              answer: faq.answer.trim(),
            })),
            serviceSpecificSteps: values.steps.map((step) => ({
              ...step,
              title: step.title.trim(),
              description: step.description.trim(),
            })),
            serviceSpecificAdvantages: values.advantages.map((advantage) => ({
              image: advantage.image,
              title: advantage.title.trim(),
              description: advantage.description.trim(),
            })),
            serviceTitle: values.serviceTitle.trim(),
            serviceDescription: values.serviceDescription.trim(),
          };
          handleAddService.mutate(trimmedValues);
        })}
      >
        {/* Toggle for Parent or Sub-Service */}
        {/* <Group position="apart" mt="md"> */}
        <Switch
          checked={form.values.isParent}
          label="Is Parent Service?"
          onChange={(e) => form.setFieldValue("isParent", e.currentTarget.checked)}
        />
        {!form.values.isParent && (
          <Select
            label={"Select Parent Service"}
            placeholder="Choose Parent Service"
            data={parentServices.map((service) => ({
              value: service._id, // Parent service's unique identifier
              label: service.title, // The title of the parent service
            }))}
            value={form.values.parentService}
            onChange={(value) => form.setFieldValue("parentService", value)}
            required
          />
        )}
        {/* </Group> */}
        <InputField
          label={"Title"}
          placeholder={"Enter Service Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <InputField
          label={"Sub Title"}
          placeholder={"Enter Sub Title"}
          form={form}
          withAsterisk
          validateName={"subTitle"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"shortDescription"}
        />
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <InputField
          label={"Slogan"}
          placeholder={"Enter Sub Title"}
          form={form}
          withAsterisk
          validateName={"aboutSlogan"}
        />
        <InputField
          label={"Slogan Part Two (It will appear below the first slogan after a line break)"}
          placeholder={"Enter Slogan Part Two"}
          form={form}
          validateName={"aboutSloganPartTwo"}
        />
        <InputField
          label={"About Title"}
          placeholder={"Enter about Title"}
          form={form}
          withAsterisk
          validateName={"aboutTitle"}
        />
        <TextArea
          label={"About Description"}
          placeholder={"Enter About Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"aboutDescription"}
        />

        <DropZone form={form} folderName={"serviceIcon"} name={"serviceIcon"} label="Service Icon" />

        <TextArea
          label={"Service Title"}
          placeholder={"Enter Service Title"}
          rows="1"
          form={form}
          withAsterisk
          validateName={"serviceTitle"}
        />

        <TextArea
          label={"Service Description"}
          placeholder={"Enter Service Description"}
          rows="3"
          form={form}
          withAsterisk
          validateName={"serviceDescription"}
        />

        <Group position="center">
          <DropZone form={form} folderName={"service"} name={"coverImage"} label="Cover Image" />
          <DropZone form={form} folderName={"service"} name={"homeImage"} label="Home Image" />
        </Group>
        {/* ======================= SERVICE PROCESS STEPS ======================= */}
        <Stack mt="xl" spacing="lg">
          <Title align="center" order={2}>
            {state?.isUpdate ? "Edit " : "Add "}Service Specific Process
          </Title>
          <Text align="center" size="md" color="dimmed">
            Define the process steps clearly for this service
          </Text>

          <Grid>
            {form.values.steps?.map((step, index) => (
              <Col span={12} key={index}>
                <Paper withBorder p="md" radius="md" shadow="xs">
                  <Group position="apart" mb="sm">
                    <Text weight={500}>Step {index + 1}</Text>
                    {form.values.steps.length > 1 && (
                      <ActionIcon color="red" onClick={() => removeProcess(index)} size="sm">
                        <FaTrashAlt />
                      </ActionIcon>
                    )}
                  </Group>
                  <InputField
                    label="Step Title"
                    placeholder="Enter Step Title"
                    form={form}
                    value={step?.title || ""}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    validateName={`steps.${index}.title`}
                  />
                  <Textarea
                    label="Step Description"
                    placeholder="Enter Step Description"
                    form={form}
                    rows={4}
                    value={step?.description || ""}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    validateName={`steps.${index}.description`}
                  />
                </Paper>
              </Col>
            ))}
          </Grid>

          <Group position="center">
            <ActionIcon color="blue" size="xl" onClick={addProcess}>
              <FaPlus />
            </ActionIcon>
          </Group>
        </Stack>

        {/* ======================= SERVICE FAQ SECTION ======================= */}
        <Stack mt="xl" spacing="lg">
          <Title align="center" order={2}>
            {state?.isUpdate ? "Edit " : "Add "} Service Specific FAQs
          </Title>
          <Text align="center" size="md" color="dimmed">
            Help users by adding common questions and answers
          </Text>

          <Grid>
            {form.values.faqs?.map((faq, index) => (
              <Col span={12} key={index}>
                <Paper withBorder p="md" radius="md" shadow="xs">
                  <Group position="apart" mb="sm">
                    <Text weight={500}>FAQ {index + 1}</Text>
                    {form.values.faqs.length > 1 && (
                      <ActionIcon color="red" onClick={() => removeFaq(index)} size="sm">
                        <FaTrashAlt />
                      </ActionIcon>
                    )}
                  </Group>
                  <InputField
                    label="Question"
                    placeholder="Enter the question"
                    form={form}
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                    validateName={`faqs.${index}.question`}
                  />
                  <Textarea
                    label="Answer"
                    placeholder="Enter the answer"
                    form={form}
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                    validateName={`faqs.${index}.answer`}
                  />
                </Paper>
              </Col>
            ))}
          </Grid>

          <Group position="center">
            <ActionIcon color="blue" size="xl" onClick={addFaq}>
              <FaPlus />
            </ActionIcon>
          </Group>
        </Stack>
        {/* ======================= SERVICE ADVANTAGES SECTION ======================= */}
        <Stack mt="xl" spacing="lg">
          <Title align="center" order={2}>
            {state?.isUpdate ? "Edit " : "Add "} Service Specific Advanages
          </Title>
          <Text align="center" size="md" color="dimmed">
            Help users by adding common advantages of this service
          </Text>

          <Grid>
            {form.values.advantages?.map((advantage, index) => (
              <Col span={12} key={index}>
                <Paper withBorder p="md" radius="md" shadow="xs">
                  <Group position="apart" mb="sm">
                    <Text weight={500}>ADVANTAGE {index + 1}</Text>
                    {form.values.advantages.length > 1 && (
                      <ActionIcon color="red" onClick={() => removeAdvantage(index)} size="sm">
                        <FaTrashAlt />
                      </ActionIcon>
                    )}
                  </Group>
                  <DropZone
                    form={form}
                    folderName={"service"}
                    name={`advantages.${index}.image`}
                    label="Advantage Image"
                  />

                  <InputField
                    label="Title"
                    placeholder="Enter the Title"
                    form={form}
                    value={advantage.title}
                    onChange={(e) => handleAdvantageChange(index, "title", e.target.value)}
                    validateName={`advantages.${index}.title`}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter the Description"
                    form={form}
                    rows={3}
                    value={advantage.description}
                    onChange={(e) => handleAdvantageChange(index, "description", e.target.value)}
                    validateName={`advantages.${index}.description`}
                  />
                </Paper>
              </Col>
            ))}
          </Grid>

          <Group position="center">
            <ActionIcon color="blue" size="xl" onClick={addAdvantage}>
              <FaPlus />
            </ActionIcon>
          </Group>
        </Stack>
        <Group position="right" mt={"md"}>
          <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.viewService)} />
          <Button
            label={state?.isUpdate ? "Edit Service" : "Add Service"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
