import React, { useEffect, useRef, useState } from "react";
import * as powerbi from "powerbi-client";
import axios from "axios";
// import { useMsal } from "@azure/msal-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import { PowerBiLoginRequest } from "../AuthConfig";

const DEFAULT_WORKSPACE_ID = "3405b65d-7455-4ad5-ba0f-5db626cd8f3b";
const DEFAULT_REPORT_ID = "67d62ff9-7478-47dd-812a-a5ac24a1166f";

const PowerBIEmbed: React.FC = () => {
    const reportRef = useRef<HTMLDivElement | null>(null);
    // const { instance, accounts } = useMsal();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const loadReport = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                /*
                const account = accounts[0];
                if (!account) {
                    setIsLoading(false);
                    return;
                }

                const tokenResponse = await instance.acquireTokenSilent({
                    ...PowerBiLoginRequest,
                    account,
                });
                */

                const apiUrl = import.meta.env.VITE_API_BASE_URL ?? "https://tdhelp-dqfjawbxfuf9f7ee.centralus-01.azurewebsites.net";
                const workspaceId = import.meta.env.VITE_PBI_WORKSPACE_ID ?? DEFAULT_WORKSPACE_ID;
                const targetReportId = import.meta.env.VITE_PBI_REPORT_ID ?? DEFAULT_REPORT_ID;

                const response = await axios.get(`${apiUrl}/api/EmbedToken`, {
                    params: {
                        workspaceId,
                        reportId: targetReportId,
                    },
                    // headers: {
                    //    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    // },
                });

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
                            pageNavigation: { visible: true },
                        },
                    },
                };

                const powerbiService = new powerbi.service.Service(
                    powerbi.factories.hpmFactory,
                    powerbi.factories.wpmpFactory,
                    powerbi.factories.routerFactory
                );

                if (reportRef.current) {
                    // Reset before embedding to avoid stale iframes.
                    powerbiService.reset(reportRef.current);
                    reportRef.current.innerHTML = "";
                    powerbiService.embed(reportRef.current, config);
                }

            } catch (err) {
                console.error("Error loading Power BI report", err);
                setErrorMessage("Unable to load the report. Check the API and workspace settings.");
            } finally {
                setIsLoading(false);
            }
        };

        loadReport();
    }, []); // Removed instance, accounts dependencies

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Embedded Power BI Report
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
                {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 4 }}>
                        <CircularProgress size={24} />
                        <Typography>Loading report...</Typography>
                    </Box>
                ) : null}
                {errorMessage ? (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Typography>
                ) : null}
                <div ref={reportRef} style={{ height: "850px", width: "100%" }} />
            </Paper>
        </Box>
    );
};

export default PowerBIEmbed;
