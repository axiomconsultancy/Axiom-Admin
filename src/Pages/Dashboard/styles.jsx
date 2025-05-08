import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "white",
    borderRadius: "15px",
    width: "250px", // Adjusted width for a narrower rectangle
    height: "100px", // Maintain height for rectangular shape
    cursor: "pointer",
    backgroundColor: theme.colors.primary, // Purple color
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: theme.shadows.md,
    padding: "10px 15px", // Reduced padding for a more compact layout
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows.lg,
    },
  },
  icon: {
    marginLeft: "10px", // Reduced margin to bring the icon closer to the text
    color: "white",
  },
  label: {
    fontSize: "1rem",
    textAlign: "left",
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
}));
