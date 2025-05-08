/* eslint-disable react/prop-types */
import { Flex, Text, Title,} from "@mantine/core";

const ViewQuotes = ({ rowData }) => {

  return (
    <Flex direction={"column"} w={"100%"}>
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.quoteName}
      </Text>
      <Title order={3}>Email</Title>
      <Text align="justify">{rowData?.quoteEmail}</Text>
      <Title order={3}>Interested In</Title>
      <Text align="justify">{rowData?.quoteTechnology}</Text>
      <Title order={3}>Message</Title>
      <Text align="justify">{rowData?.quoteDescription}</Text>
    </Flex>
  );
};
export default ViewQuotes;
