using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;

namespace AppOwnsDataWebApi.Services
{
    public class TokenManager
    {
        private string TenantId { get; }
        private string ClientId { get; }
        private string ClientSecret { get; }

        private static string CachedToken { get; set; }
        private static DateTime CachedTokenExpires { get; set; }

        public TokenManager(IConfiguration configuration)
        {
            TenantId = configuration["ServicePrincipalApp:TenantId"];
            ClientId = configuration["ServicePrincipalApp:ClientId"];
            ClientSecret = configuration["ServicePrincipalApp:ClientSecret"];
        }

        public string GetAccessToken()
        {
            if (string.IsNullOrEmpty(CachedToken) || DateTime.UtcNow > CachedTokenExpires)
                RefreshAccessToken();

            return CachedToken;
        }

        private void RefreshAccessToken()
        {
            IConfidentialClientApplication app =
                ConfidentialClientApplicationBuilder.Create(ClientId)
                .WithClientSecret(ClientSecret)
                .WithAuthority($"https://login.microsoftonline.com/{TenantId}")
                .Build();

            var token = app.AcquireTokenForClient(new[] { "https://analysis.windows.net/powerbi/api/.default" })
                           .ExecuteAsync().Result;

            CachedToken = token.AccessToken;
            CachedTokenExpires = token.ExpiresOn.DateTime.AddMinutes(-5);
        }
    }
}

