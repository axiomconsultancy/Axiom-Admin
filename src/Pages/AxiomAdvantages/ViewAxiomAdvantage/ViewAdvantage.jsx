/* eslint-disable react/prop-types */
import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewAxiomAdvantage = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.image}
        width="200px"
        height={"200px"}
        fit="fill"
        style={{
          border: `5px solid ${theme.primaryColor}`,
        }}
        styles={{
          root: {
            margin: "auto",
            borderRadius: "10%",
            overflow: "hidden",
          },
        }}
      />
      <Title order={3}>Title</Title>
      <Text align="justify">{rowData?.title}</Text>
      <Title order={3}>Description</Title>
      <Text align="justify">{rowData?.description}</Text>
    </Flex>
  );
};
export default ViewAxiomAdvantage;
