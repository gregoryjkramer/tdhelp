// src/Dashboard.tsx
import React from "react";
// import { useIsAuthenticated } from "@azure/msal-react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import LoginMenu from "./components/LoginMenu";
import PowerBIEmbed from "./components/PowerBIEmbed";

const Dashboard: React.FC = () => {
    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#0a192f', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Tenacious Data - App Owns Data
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ bgcolor: "#0a192f", minHeight: "calc(100vh - 64px)" }}>
                <Container sx={{ py: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            mb: 3,
                            background: "linear-gradient(135deg, #10131a 0%, #0a192f 100%)",
                            border: '1px solid rgba(255, 153, 0, 0.3)',
                            color: "white",
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            Power BI Embedded
                        </Typography>
                        <Typography variant="body1">
                            App-owns-data demo powered by a Web API token broker and a Vite
                            React client.
                        </Typography>
                    </Paper>
                    <PowerBIEmbed />
                </Container>
            </Box>
        </>
    );
};

export default Dashboard;
