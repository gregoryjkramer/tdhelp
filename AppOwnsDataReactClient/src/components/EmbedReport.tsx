import React, { useEffect, useRef } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";
import * as powerbi from "powerbi-client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { PowerBiLoginRequest } from "../AuthConfig";

interface EmbedTokenResponse {
    embedToken: string;
    reportId: string;
    embedUrl: string;
}

/**
 * Uses the logged-in user's access token to call the Web API
 *   GET {API_BASE_URL}/EmbedToken
 * and embeds the Power BI report using powerbi-client.
 */
const EmbedReport: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();
    const { instance, accounts } = useMsal();
    const reportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isAuthenticated || accounts.length === 0) {
            return;
        }

        const loadReport = async () => {
            try {
                // Acquire an access token for the Web API
                const tokenResult = await instance.acquireTokenSilent({
                    ...PowerBiLoginRequest,
                    account: accounts[0]
                });

                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5001";
                const response = await axios.get<EmbedTokenResponse>(
                    `${apiBaseUrl}/api/Embed`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResult.accessToken}`
                        }
                    }
                );

                const { embedToken, reportId, embedUrl } = response.data;

                const models = powerbi.models;
                const config: powerbi.IEmbedConfiguration = {
                    type: "report",
                    id: reportId,
                    embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: { visible: false },
                            pageNavigation: { visible: true }
                        }
                    }
                };

                const powerbiService = new powerbi.service.Service(
                    powerbi.factories.hpmFactory,
                    powerbi.factories.wpmpFactory,
                    powerbi.factories.routerFactory
                );

                if (reportRef.current) {
                    // Clear any existing embeds
                    powerbiService.reset(reportRef.current);
                    powerbiService.embed(reportRef.current, config);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Error loading embed token or embedding report", err);
            }
        };

        loadReport();
    }, [isAuthenticated, instance, accounts]);

    if (!isAuthenticated) {
        return (
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Not signed in
                </Typography>
                <Typography>
                    Please click <strong>LOGIN</strong> in the top-right first, then return
                    to this page to see the embedded report.
                </Typography>
            </Paper>
        );
    }

    return (
        <Box sx={{ height: "calc(100vh - 160px)" }}>
            <div
                ref={reportRef}
                style={{ height: "100%", width: "100%", border: "1px solid #ddd" }}
            />
        </Box>
    );
};

export default EmbedReport;
