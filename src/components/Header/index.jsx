import { Flex, Image, Text, Title } from "@mantine/core";
import logo from "../../assets/axiom-logo.png";
import { Logout } from "tabler-icons-react";
import { useNavigate } from "react-router";
import { routeNames } from "../../Routes/routeNames";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMediaQuery } from "@mantine/hooks";

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <Flex
      w={"100vw"}
      style={{ color: "black" }}
      justify={"space-between"}
      align={"center"}
    >
      <Image src={logo} width={isMobile ? 50 : "150px"} />
      <Title order={isMobile ? 6 : 1} color="#0872da">
        Admin Panel
      </Title>
      <Flex
        gap={"sm"}
        align={"center"}
        sx={{
          "&:hover": {
            cursor: "pointer",
            color: "red",
          },
        }}
        onClick={() => {
          localStorage.clear();
          setUser({});
          navigate(routeNames.general.login);
        }}
      >
        <Logout />
        <Text> Logout</Text>
      </Flex>
    </Flex>
  );
};
