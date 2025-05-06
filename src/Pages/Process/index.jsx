/* eslint-disable no-unused-vars */
import { Container, Group, Loader, ActionIcon, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
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

  // Form setup for auto-steps
  const form = useForm({
    initialValues: {
      steps: [
        {
          stepNo: 1,
          title: "",
          description: "",
        },
      ],
    },
  });

  const [processExists, setProcessExists] = useState(false);

  const { status, refetch } = useQuery(
    "fetchProcess",
    () =>
      axios.get(`${backendUrl}/api/v1/process`, {
        headers: { authorization: `Bearer ${user.token}` },
      }),
    {
      onSuccess: (res) => {
        setProcessExists(true);
        form.setValues(res.data.data || { steps: [{ stepNo: 1, title: "", description: "" }] });
      },
      onError: (err) => {
        if (err.response?.status === 404) {
          setProcessExists(false);
          // Important: make sure steps array has at least one item
          form.setValues({
            steps: [{ stepNo: 1, title: "", description: "" }],
          });
        }
      },

      refetchOnWindowFocus: false, // prevent unnecessary refetching
      retry: false, // prevent auto-retries on 404
    }
  );

  // Mutation to save process steps (create or update)
  const handleSave = useMutation(
    (values) => {
      const method = processExists ? "patch" : "post";
      return axios[method](`${backendUrl}/api/v1/process`, values, {
        headers: { authorization: `Bearer ${user.token}` },
      });
    },
    {
      onSuccess: (response) => {
        showNotification({
          title: "Success",
          message: response.data?.message,
          color: "green",
        });
        setProcessExists(true); // assume process now exists after save
        refetch(); // fetch updated data
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

  // Add a new step
  const addStep = () => {
    const steps = [...form.values.steps];
    steps.push({ stepNo: steps.length + 1, title: "", description: "" });
    form.setFieldValue("steps", steps);
  };

  // Remove a step
  const removeStep = (index) => {
    const steps = form.values.steps.filter((_, i) => i !== index);
    form.setFieldValue("steps", steps);
  };

  // Handle changes to individual steps
  const handleChange = (index, field, value) => {
    const steps = [...form.values.steps];

    // If the step at that index doesn't exist, initialize it
    if (!steps[index]) {
      steps[index] = { stepNo: index + 1, title: "", description: "" };
    }

    steps[index][field] = value;
    form.setFieldValue("steps", steps);
  };

  return (
    <Container fluid style={{ minHeight: "80vh" }}>
      <PageHeader label={"Our Process"} />
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
                  value={step.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  validateName={`steps[${index}].title`}
                />
                <InputField
                  label={`Step Description ${index + 1}`}
                  placeholder={`Enter Description for Step ${index + 1}`}
                  form={form}
                  value={step.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  validateName={`steps[${index}].description`}
                />
                {form.values.steps.length > 1 && (
                  <ActionIcon color="red" onClick={() => removeStep(index)} size="lg" style={{ marginTop: 5 }}>
                    <FaTrashAlt size={18} />
                  </ActionIcon>
                )}
              </Group>
            </div>
          ))}

          {form.values.steps.length > 0 && (
            <Group position="center" style={{ marginTop: "20px" }}>
              <ActionIcon color="blue" size="xl" onClick={addStep}>
                <FaPlus />
              </ActionIcon>
            </Group>
          )}

          <Group position="right" mt="md">
            <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.landing)} />
            <Button label={"Save"} type={"submit"} loading={handleSave.isLoading} />
          </Group>
        </form>
      )}
    </Container>
  );
};
