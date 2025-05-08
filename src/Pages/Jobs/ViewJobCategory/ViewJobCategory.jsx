/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {

  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import moment from "moment";

const ViewJobCategory = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <SimpleGrid cols={2} w={"100%"}>


    
      <Title order={3}>Category Title</Title>
      <Text fw={"bold"} align="justify">
        {rowData?.title}
      </Text>

   
      <Title order={3}>Detail Description</Title>
      <Text align="justify">{rowData?.description}</Text>

    </SimpleGrid>
  );
};
export default ViewJobCategory;
