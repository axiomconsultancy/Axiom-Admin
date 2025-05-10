/* eslint-disable react/prop-types */

import { Container, Text, Flex } from "@mantine/core";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../Routes/routeNames";
import {
  AiOutlineAppstore,
  AiOutlineProject,
  AiOutlineShoppingCart,
  AiOutlineFileDone,
  AiOutlineFileSearch,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineRead,
} from "react-icons/ai";

const iconMap = {
  Services: <AiOutlineAppstore size={36} />,
  "Team Members": <AiOutlineTeam size={36} />,
  Projects: <AiOutlineProject size={36} />,
  Products: <AiOutlineShoppingCart size={36} />,
  "Job Applications": <AiOutlineFileDone size={36} />,
  Jobs: <AiOutlineFileSearch size={36} />,
  Testimonials: <AiOutlineUser size={36} />,
  Blogs: <AiOutlineRead size={36} />,
};

const Card = ({ data }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    const routes = {
      Services: routeNames.general.viewService,
      "Team Members": routeNames.general.viewTeams,
      Projects: routeNames.general.viewProjects,
      Products: routeNames.general.viewProducts,
      "Job Applications": routeNames.general.jobApplications,
      Jobs: routeNames.general.viewJobs,
      Testimonials: routeNames.general.viewTestimonial,
      Blogs: routeNames.general.viewBlogs,
    };

    const route = routes[data.label];
    if (route) {
      navigate(route);
    }
  };

  return (
    <Container className={classes.card} onClick={handleClick}>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <div>
          <Text size="lg" className={classes.label}>
            {data?.label}
          </Text>
          <Text size="xl" weight={700} className={classes.value}>
            {data?.value}
          </Text>
        </div>
        <div className={classes.icon}>{iconMap[data.label]}</div>
      </Flex>
    </Container>
  );
};

export default Card;
