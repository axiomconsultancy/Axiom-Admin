/* eslint-disable react/prop-types */
import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
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
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.name}
      </Text>
      <Title order={3}>Designaton</Title>
      <Text align="justify">{rowData?.designation}</Text>
      <Title order={3}>Testimonial</Title>
      <Text align="justify">{rowData?.testimonial}</Text>
    </Flex>
  );
};
export default ViewProduct;
