/* eslint-disable react/prop-types */
import {
  Anchor,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

const ViewTeamMember = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.teamMemberImage}
        width="200px"
        height={"200px"}
        fit="cover"
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
        {rowData?.teamMemberName}
      </Text>
      <SimpleGrid cols={2}>
        <Title order={3}>Job Title</Title>
        <Text>{rowData?.teamMemberTitle}</Text>
        <Title order={3}>Email</Title>
        <Text>{rowData?.teamMemberEmail}</Text>
        <Title order={3}>Phone No.</Title>
        <Text>{rowData?.teamMemberPhone}</Text>
        <Title order={3}>Member Priority to Display</Title>
        <Text>{rowData?.memberPriority}</Text>
        <Title order={3}>LinkedIn Profile</Title>
        <HyperLink url={rowData?.teamMemberLinkedInLink} />
        <Title order={3}>Facebook Profile</Title>
        <HyperLink url={rowData?.teamMemberFacebookLink} />
        <Title order={3}>Twitter Profile</Title>
        <HyperLink url={rowData?.teamMemberTwitterLink} />
      </SimpleGrid>
    </Flex>
  );
};
export default ViewTeamMember;

const HyperLink = ({ url }) => {    
  const withHttp = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    return url;
  };

  return (
    <Anchor href={withHttp(url)} target="_blank">
      <Text align="justify">{url}</Text>
    </Anchor>
  );
};
