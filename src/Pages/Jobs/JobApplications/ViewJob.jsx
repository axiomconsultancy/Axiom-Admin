/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Anchor,
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
    <SimpleGrid cols={2} w={"100%"} p={"xl"}>
      <Title order={3}>Job Title</Title>
      <Text fw={"bold"} color="purple" fz="xl" >
        {rowData?.job?.title}
      </Text>
      <Title order={3}>Applicant Name</Title>
      <Text align="justify">{rowData?.fullName}</Text>
      <Title order={3}>Applicant Email</Title>
      <Text align="justify">{rowData?.email}</Text>
      <Title order={3}>Applicant Contact</Title>
      <Text align="justify">{rowData?.contactNumber}</Text>
      <Title order={3}>Applied Date</Title>
      <Text align="justify">
        {new Date(rowData?.createdAt).toLocaleString()}
      </Text>
      <Title order={3}>Address</Title>
      <Text align="justify">{rowData?.address}</Text>
      <Title order={3}>Experience</Title>
      <Text align="justify">{rowData?.yearsOfExperience + " Years"}</Text>
      <Title order={3}>Resume</Title>
      {rowData?.resume !== "" ? (
        <Anchor href={rowData?.resume} target="_blank">
          File
        </Anchor>
      ) : (
        <Text>No file</Text>
      )}
      <Title order={3}>Applicant Comments</Title>
      <Text align="justify">{rowData?.applicantComments || "NA"}</Text>
      <Title order={3}>Admin Comments</Title>
      <Text align="justify">{rowData?.adminComments || "NA"}</Text>
      {/* <Title order={3}>Applicant Comments</Title>
      <Text align="justify">
        {rowData?.applicantComments === ""
          ? "No Comments"
          : rowData?.applicantComments}
      </Text> */}

      {/* <Title order={3}>Application Deadline</Title>
      <Text>
        {moment(rowData?.jobApplicationDeadline).format("DD MMMM YYYY")}
      </Text>
      <Title order={3}>Job Requirements</Title>
      <Text>{rowData?.jobRequirements}</Text>
      <Title order={3}>Job Responsibilities</Title>
      <Text>{rowData?.jobResponsibilities}</Text>
      <Title order={3}>Detail Description</Title>
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

