/* eslint-disable react/prop-types */
import { Flex, Text, Title } from "@mantine/core";

const ViewFaq = ({ rowData }) => {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.name}
      </Text>
      <Title order={3}>Question</Title>
      <Text align="justify">{rowData?.question}</Text>
      <Title order={3}>Answer</Title>
      <Text align="justify">{rowData?.answer}</Text>
    </Flex>
  );
};
export default ViewFaq;
