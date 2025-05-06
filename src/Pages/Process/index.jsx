/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Group, Loader, ActionIcon, Text } from "@mantine/core";
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
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export const Process = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle loading state for user
  if (!user) return <Loader />;

  const form = useForm({
    initialValues: {
      steps: [{ stepNo: 1, title: "", description: "" }],
    },
  });

  const { status, refetch } = useQuery(
    "fetchProcess",
    () =>
      axios.get(`${backendUrl}/api/v1/process`, {
        headers: { authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess: (res) => {
        const steps = res.data.data?.steps || [{ stepNo: 1, title: "", description: "" }];
        form.setValues({ steps });
      },
      onError: (err) => {
        if (err.response?.status === 404) {
          form.setValues({
            steps: [{ stepNo: 1, title: "", description: "" }],
          });
        }
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const handleSave = useMutation(
    (values) =>
      axios.patch(
        `${backendUrl}/api/v1/process`,
        { steps: values.steps },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      ),
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response.data?.message,
          color: "green",
        });
        refetch();
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error.response?.data?.message || "Something went wrong",
          color: "red",
        });
      },
    }
  );

  const addStep = () => {
    const newSteps = [
      ...form.values.steps,
      {
        stepNo: form.values.steps.length + 1,
        title: "",
        description: "",
      },
    ];
    form.setFieldValue("steps", newSteps);
  };

  const removeStep = (index) => {
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

  return (
    <Container fluid style={{ minHeight: "80vh" }}>
      <PageHeader label="Our Process" />
      {status === "loading" ? (
        <Loader style={{ display: "flex", margin: "auto" }} />
      ) : (
        <form onSubmit={form.onSubmit((values) => handleSave.mutate(values))}>
          <Text align="center" weight={500} size="lg" style={{ marginBottom: 10 }}>
            Add Process Steps
          </Text>

          {form.values.steps.map((step, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <Group direction="column" spacing="sm">
                <InputField
                  label={`Step Title ${index + 1}`}
                  placeholder={`Enter Title for Step ${index + 1}`}
                  form={form}
                  value={step?.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  validateName={`steps.${index}.title`}
                />
                <InputField
                  label={`Step Description ${index + 1}`}
                  placeholder={`Enter Description for Step ${index + 1}`}
                  form={form}
                  value={step?.description || ""}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  validateName={`steps.${index}.description`}
                />
                {form.values.steps.length > 1 && (
                  <ActionIcon color="red" onClick={() => removeStep(index)} size="lg">
                    <FaTrashAlt size={18} />
                  </ActionIcon>
                )}
              </Group>
            </div>
          ))}

          <Group position="center" mt="md">
            <ActionIcon color="blue" size="xl" onClick={addStep}>
              <FaPlus />
            </ActionIcon>
          </Group>

          <Group position="right" mt="md">
            <Button label="Cancel" variant="outline" onClick={() => navigate(routeNames.general.landing)} />
            <Button label="Save" type="submit" loading={handleSave.isLoading} />
          </Group>
        </form>
      )}
    </Container>
  );
};
