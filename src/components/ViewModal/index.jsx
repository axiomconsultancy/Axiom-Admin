/* eslint-disable react/prop-types */
import { Container, Group, Modal as ModalMantine, createStyles, ActionIcon, Text, Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Button from "../Button";

const useStyles = createStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modal: {
    position: "relative", // required for absolute positioning
  },
  titleWrapper: {
    textAlign: "center",
    width: "100%",
    marginTop: "1.5rem", // spacing below the close icon
    marginBottom: "1rem",
  },
}));

const ViewModal = ({ opened, setOpened, children, title }) => {
  const { classes } = useStyles();

  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
      radius="lg"
      size="xl"
      styles={{
        overlay: {
          backdropFilter: "blur(3px)",
        },
        inner: {
          width: "94%",
          paddingInline: "0px !important",
        },
        modal: classes.modal,
      }}
    >
      {/* Close Icon */}
      <ActionIcon className={classes.closeBtn} variant="light" color="red" radius="xl" onClick={() => setOpened(false)}>
        <IconX />
      </ActionIcon>

      {/* Centered Title */}
      <Box className={classes.titleWrapper}>
        <Text fw={700} fz="2rem" color="black">
          {title}
        </Text>
      </Box>

      {/* Content */}
      <Container className={classes.root} p="0px">
        {children}
        <Group pt="sm" ml="auto">
          <Button label="Close" onClick={() => setOpened(false)} />
        </Group>
      </Container>
    </ModalMantine>
  );
};

export default ViewModal;
