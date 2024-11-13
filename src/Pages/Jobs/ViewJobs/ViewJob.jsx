/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Flex,
  Image,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import moment from "moment";

const ViewJob = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <SimpleGrid cols={2} w={"100%"}>
      <Title order={3}>Job Title</Title>
      <Text fw={"bold"} color="purple" fz="xl">
        {rowData?.title}
      </Text>
      <Title order={3}>Job Type</Title>
      <Text align="justify">{rowData?.type}</Text>
      <Title order={3}>Job location</Title>
      <Text align="justify">{rowData?.location}</Text>
      {/* <Title order={3}>Job Category</Title>
      <Text align="justify">{rowData?.category?.title}</Text> */}
      {/* <Title order={3}>Job Vacancies</Title>
      <Text align="justify">{rowData?.vacancies}</Text> */}
      {/* <Title order={3}>Minimum Qualifications</Title>
      <Text align="justify">{rowData?.minimumQualifications}</Text>
      <Title order={3}>Job Level</Title>
      <Text align="justify">{rowData?.jobLevel}</Text>
      <Title order={3}>Minimum Experience</Title>
      <Text align="justify">{rowData?.minimumExperience}</Text>
      <Title order={3}>Salary Range (PKR)</Title>
      <Text>
        {rowData?.minimumJobSalary} - {rowData?.maximumJobSalary}{" "}
      </Text>
      <Title order={3}>Application Deadline</Title>
      <Text>
        {moment(rowData?.jobApplicationDeadline).format("DD MMMM YYYY")}
      </Text> */}
      {/* <Title order={3}>Job Requirements</Title>
      <Text>{rowData?.jobRequirements}</Text>
      <Title order={3}>Job Responsibilities</Title>
      <Text>{rowData?.jobResponsibilities}</Text> */}
      {/* <Title order={3}>Detail Description</Title>
      <Text align="justify">{rowData?.description}</Text> */}
      {/* <Title order={3}>Detail View Image</Title>
      <Image
        src={rowData?.homeImage}
        width="70%"
      /> */}
    </SimpleGrid>
  );
};
export default ViewJob;
