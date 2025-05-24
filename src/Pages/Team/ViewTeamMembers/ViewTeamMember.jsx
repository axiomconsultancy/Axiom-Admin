/* eslint-disable react/prop-types */
import { Anchor, Flex, Image, SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
// import { IconX } from "@tabler/icons-react";

const ViewTeamMember = ({ rowData }) => {
  const theme = useMantineTheme();

  const HyperLink = ({ url }) => {
    const withHttp = (url) => {
      if (!/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
      }
      return url;
    };

    return url ? (
      <Anchor href={withHttp(url)} target="_blank">
        <Text align="justify">{url}</Text>
      </Anchor>
    ) : (
      <Text>-</Text>
    );
  };

  return (
    <Flex direction="column" w="100%" pos="relative">
      {/* Close Button */}
      {/* <ActionIcon onClick={onClose} variant="light" color="red" radius="xl" pos="absolute" top={10} right={10}>
        <IconX />
      </ActionIcon> */}

      {/* Image */}
      <Image
        src={rowData?.teamMemberImage}
        width="200px"
        height="200px"
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

      <Text fw="bold" color="purple" fz="xl" my="md" align="center">
        {rowData?.teamMemberName}
      </Text>

      {/* Fields */}
      <SimpleGrid cols={2} spacing="xs">
        <Field label="Job Title" value={rowData?.teamMemberTitle} />
        <Field label="Email" value={rowData?.teamMemberEmail} />
        <Field label="Official Email" value={rowData?.officialEmail} />
        <Field label="Phone No." value={rowData?.teamMemberPhone} />
        <Field label="Official Phone" value={rowData?.officialPhone} />
        <Field label="Member Priority to Display" value={rowData?.memberPriority} />

        <Field label="LinkedIn Profile" value={<HyperLink url={rowData?.teamMemberLinkedInLink} />} />
        <Field label="Facebook Profile" value={<HyperLink url={rowData?.teamMemberFacebookLink} />} />
        <Field label="Twitter Profile" value={<HyperLink url={rowData?.teamMemberTwitterLink} />} />

        <Field label="CNIC" value={rowData?.CNIC} />
        <Field label="Github" value={<HyperLink url={rowData?.githubLink} />} />

        <Field label="Bank Name" value={rowData?.bankName} />
        <Field label="Bank Branch" value={rowData?.bankBranch} />
        <Field label="Account Number" value={rowData?.bankAccountNumber} />
        <Field label="IBAN" value={rowData?.IBAN} />
        <Image
          label="ID Card Front Image"
          src={rowData?.IDCardFront}
          width="300px"
          height="170px"
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
        <Image
          label="ID Card Back Image"
          src={rowData?.IDCardBack}
          width="300px"
          height="170px"
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
        {/* <Field label="ID Card Front Image" value={<HyperLink url={rowData?.IDCardFront} />} />
        <Field label="ID Card Back Image" value={<HyperLink url={rowData?.IDCardBack} />} /> */}

        <Field label="Next of Kin Name" value={rowData?.nextOfKinName} />
        <Field label="Relation with Next of Kin" value={rowData?.nextOfKinRelation} />
        <Field label="Next of Kin Phone" value={rowData?.nextOfKinPhone} />
        <Field label="Next of Kin Address" value={rowData?.nextOfKinAddress} />
      </SimpleGrid>
    </Flex>
  );
};

export default ViewTeamMember;

// Utility component to avoid repetition
const Field = ({ label, value }) => (
  <>
    <Title order={4}>{label}</Title>
    <Text>{value || "-"}</Text>
  </>
);
