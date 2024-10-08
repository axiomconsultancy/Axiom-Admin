/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      cacheTime: 30000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: 'Saira, sans-serif',
          fontSizes: {
          xs: '0.6rem',
          sm: '0.75rem',
          md: '0.9rem',
          lg: '1rem',
          xl: '1.2rem',
        },
        
          colors: {
            primary: [
              "#F8F0FC",
              "#c3d7eb",
              "#c3d7eb",
              "#6398cc",
              "#5b9bdb",
              "#5b9bdb",
              "#3f87ce",
              "#0872da",
              "#0872da",
              "#0872da",
            ],
          },
          primaryColor: "primary",
          globalStyles: (theme) => ({
            ".mantine-Modal-title": {
              margin: "auto",
              fontWeight: "bold",
              color: "rgb(0,0,0,0.5)",
            },
          }),
        }}
      >
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications
              position="top-center"
              zIndex={2077}
              style={{ marginTop: "60px" }}
            />
            <App />
          </QueryClientProvider>
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
