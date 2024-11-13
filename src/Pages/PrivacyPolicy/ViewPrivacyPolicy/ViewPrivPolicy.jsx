/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Flex,
  Text,
  Title,
  useMantineTheme,
  TypographyStylesProvider,
} from "@mantine/core";

const ViewPrivPolicy = ({ rowData }) => {
  return (
    <Flex direction={"column"} w={"100%"}>
      <Text fw={"bold"} color="purple" fz="xl" my={"md"} align="center">
        {rowData?.policyTitle}
      </Text>

      <Title order={3}>Privacy Policy Data</Title>
      {/* <Text align="justify">{rowData?.privacyPolicyData}</Text> */}
      <TypographyStylesProvider
        fz={16}
        style={{
          textAlign: "justify",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: rowData?.policyData }} />
      </TypographyStylesProvider>
    </Flex>
  );
};
export default ViewPrivPolicy;
