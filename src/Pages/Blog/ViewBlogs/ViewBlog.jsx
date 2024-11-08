/* eslint-disable react/prop-types */


import { Flex, Image, Text, Title, useMantineTheme , TypographyStylesProvider } from "@mantine/core";

const ViewProduct = ({ rowData }) => {
  const theme = useMantineTheme();
  return (
    <Flex direction={"column"} w={"100%"}>
      <Image
        src={rowData?.blogImage}
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
        {rowData?.blogTitle}
      </Text>
      <Title order={3}>Meta Description</Title>
      <Text align="justify">{rowData?.metaDescription}</Text>
      <Title order={3}>SEO Title</Title>
      <Text align="justify">{rowData?.seoTitle}</Text>
      <Title order={3}>Category</Title>
      <Text align="justify">{rowData?.blogCategory}</Text>
      <Title order={3}>Author Name</Title>
      <Text align="justify">{rowData?.authorName}</Text>
      <Title order={3}>Blog Data</Title>
      {/* <Text align="justify">{rowData?.blogData}</Text> */}
      <TypographyStylesProvider
          fz={16}
          style={{
            textAlign: "justify",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: rowData?.blogData }} />
        </TypographyStylesProvider>
    </Flex>
  );
};
export default ViewProduct;