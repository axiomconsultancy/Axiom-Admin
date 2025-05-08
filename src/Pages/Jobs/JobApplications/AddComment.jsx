/* eslint-disable react/prop-types */
import { Anchor, Box, Group, Modal } from "@mantine/core";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { useContext, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { backendUrl } from "../../../constants/constants";
import { useMutation } from "react-query";
import { UserContext } from "../../../contexts/UserContext";

const AddComment = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const handleAddComment = useMutation(
    () => {
      let values = { ...data, adminComments: comment.trim() };
      return axios.patch(
        `${backendUrl + `/api/v1/jobapplications/${data?._id}`}`,
        values,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          setOpen(false);
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
    <Box>
      <Anchor
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Comment
      </Anchor>
      <Modal
        title="Add Comment"
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        centered
        radius={"lg"}
      >
        <TextArea
          rows="4"
          label={"Application Comment"}
          onChange={(e) => setComment(e.target.value)}
          placeholder={"Enter application comments"}
        />
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => setOpen(false)}
          />
          <Button
            label={"Add Comment"}
            onClick={() => handleAddComment.mutate()}
            loading={handleAddComment.isLoading}
            disabled={comment.trim().length < 1}
          />
        </Group>
      </Modal>
    </Box>
  );
};
export default AddComment;
