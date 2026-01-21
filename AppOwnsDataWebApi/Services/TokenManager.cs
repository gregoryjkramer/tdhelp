using System;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;

namespace AppOwnsDataWebApi.Services
{
    public class TokenManager
    {
        private string TenantId { get; }
        private string ClientId { get; }
        private string CertificateThumbprint { get; }

        private static string CachedToken { get; set; }
        private static DateTime CachedTokenExpires { get; set; }

        public TokenManager(IConfiguration configuration)
        {
            TenantId = configuration["ServicePrincipalApp:TenantId"];
            ClientId = configuration["ServicePrincipalApp:ClientId"];
            CertificateThumbprint = configuration["ServicePrincipalApp:CertificateThumbprint"];
        }

        public string GetAccessToken()
        {
            if (string.IsNullOrEmpty(CachedToken) || DateTime.UtcNow > CachedTokenExpires)
                RefreshAccessToken();

            return CachedToken;
        }

        private void RefreshAccessToken()
        {
            X509Certificate2 cert = LoadCertificateByThumbprint(CertificateThumbprint);

            IConfidentialClientApplication app =
                ConfidentialClientApplicationBuilder.Create(ClientId)
                .WithCertificate(cert)
                .WithAuthority($"https://login.microsoftonline.com/{TenantId}")
                .Build();

            var token = app.AcquireTokenForClient(new[] { "https://analysis.windows.net/powerbi/api/.default" })
                           .ExecuteAsync().Result;

            CachedToken = token.AccessToken;
            CachedTokenExpires = token.ExpiresOn.DateTime.AddMinutes(-5);
        }

        private X509Certificate2 LoadCertificateByThumbprint(string thumbprint)
        {
            using X509Store store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            store.Open(OpenFlags.ReadOnly);

            foreach (var cert in store.Certificates)
            {
                if (cert.Thumbprint != null &&
                    cert.Thumbprint.Equals(thumbprint, StringComparison.OrdinalIgnoreCase))
                    return cert;
            }

            throw new Exception($"Certificate with thumbprint {thumbprint} not found.");
        }
    }
}
