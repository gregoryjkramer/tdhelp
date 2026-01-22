using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Rest;
using Microsoft.PowerBI.Api;
using Microsoft.PowerBI.Api.Models;
using AppOwnsDataWebApi.Models;

namespace AppOwnsDataWebApi.Services
{
    public class PowerBiServiceApi
    {
        private readonly TokenManager tokenManager;
        private readonly string urlPowerBiServiceApiRoot;

        private readonly Guid workspaceId;
        private readonly Guid reportId;
        private readonly string datasetId;

        private readonly int embedTokenLifetime;

        private PowerBIClient pbiClient;

        public PowerBiServiceApi(IConfiguration configuration, TokenManager tokenManager)
        {
            this.tokenManager = tokenManager;

            urlPowerBiServiceApiRoot = configuration["PowerBi:ServiceRootUrl"];
            embedTokenLifetime = int.Parse(configuration["PowerBi:EmbedTokenLifetime"]);

            // Backward compatibility
            workspaceId = Guid.Parse(configuration["Workspaces:0:WorkspaceId"]);
            reportId = Guid.Parse(configuration["Workspaces:0:ReportId"]);
            datasetId = configuration["Workspaces:0:DatasetId"];
        }

        private PowerBIClient CreatePowerBiClient()
        {
            string accessToken = tokenManager.GetAccessToken();
            var tokenCredentials = new TokenCredentials(accessToken, "Bearer");
            return new PowerBIClient(new Uri(urlPowerBiServiceApiRoot), tokenCredentials);
        }

        private void RefreshClient()
        {
            pbiClient = CreatePowerBiClient();
        }

        /// <summary>
        /// Parameterless method (backward compatible)
        /// </summary>
        public async Task<EmbedTokenResult> GetEmbedToken()
        {
            RefreshClient();

            var report = await pbiClient.Reports.GetReportInGroupAsync(workspaceId, reportId);
            if (report == null)
            {
                throw new ApplicationException($"Report {reportId} not found in workspace {workspaceId}.");
            }

            var tokenRequest = new GenerateTokenRequest(
                accessLevel: TokenAccessLevel.View,
                datasetId: report.DatasetId
            );

            var tokenResponse = await pbiClient.Reports.GenerateTokenAsync(
                workspaceId,
                reportId,
                tokenRequest
            );

            return new EmbedTokenResult
            {
                embedToken = tokenResponse.Token,
                embedTokenId = tokenResponse.TokenId.ToString(),
                embedTokenExpiration = tokenResponse.Expiration,
                embedUrl = report.EmbedUrl,
                reportId = report.Id.ToString()
            };
        }

        /// <summary>
        /// Dynamic method (this is the one the React client uses)
        /// </summary>
        public async Task<EmbedTokenResult> GetEmbedToken(string workspaceIdStr, string reportIdStr)
        {
            RefreshClient();

            var workspaceGuid = Guid.Parse(workspaceIdStr);
            var reportGuid = Guid.Parse(reportIdStr);

            // 1. Retrieve the report metadata
            var report = await pbiClient.Reports.GetReportInGroupAsync(workspaceGuid, reportGuid);
            if (report == null)
            {
                throw new ApplicationException($"Report {reportIdStr} not found in workspace {workspaceIdStr}.");
            }

            // 2. Extract dataset id
            string datasetId = report.DatasetId;

            // 3. Build a simple embed token request (V1 is more stable)
            var tokenRequest = new GenerateTokenRequest(
                accessLevel: TokenAccessLevel.View,
                datasetId: datasetId
            );

            // 4. Generate embed token
            var tokenResponse = await pbiClient.Reports.GenerateTokenAsync(
                workspaceGuid,
                reportGuid,
                tokenRequest
            );

            // 5. Return everything the SPA needs
            return new EmbedTokenResult
            {
                embedToken = tokenResponse.Token,
                embedTokenId = tokenResponse.TokenId.ToString(),
                embedTokenExpiration = tokenResponse.Expiration,
                embedUrl = report.EmbedUrl,
                reportId = report.Id.ToString()
            };
        }
    }
}
