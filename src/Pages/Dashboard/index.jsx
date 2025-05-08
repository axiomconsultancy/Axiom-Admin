import { useContext, useState } from "react";
import axios from "axios";
import { Loader, SimpleGrid, Text } from "@mantine/core";
import PageHeader from "../../components/PageHeader";
import { backendUrl } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContext";
import { useQuery } from "react-query";
import Card from "./Card";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  const { status } = useQuery(
    "fetchDashboard",
    () => {
      return axios.get(backendUrl + "/api/v1/dashboard", {
        headers: {
          authorization: `Bearer ${user.token}`, // Corrected
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setData(data);
      },
    }
  );

  return (
    <>
      <PageHeader label={"Dashboard"} />
      {status === "loading" ? (
        <Loader style={{ width: "100%", margin: "auto" }} />
      ) : (
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 1500, cols: 3 },
            { maxWidth: 1150, cols: 2 },
            { maxWidth: 500, cols: 1 },
          ]}
        >
          {data.length ? (
            data.map((obj, ind) => <Card key={ind} data={obj} />)
          ) : (
            <Text align="center" size="lg">
              No data available
            </Text>
          )}
        </SimpleGrid>
      )}
    </>
  );
};
