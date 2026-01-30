using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace AppOwnsDataWebApi.Services
{
    public class MdkService
    {
        private readonly HttpClient _httpClient;
        private readonly string _accessToken;
        private readonly string _apiBaseUrl = "https://api.moneydevkit.com/v1"; // Example base URL

        public MdkService(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _accessToken = configuration["MDK_ACCESS_TOKEN"];
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        }

        public async Task<bool> IsSessionPaid(string sessionId)
        {
            if (string.IsNullOrEmpty(sessionId) || sessionId == "unpaid") return false;

            try
            {
                // Logic to check session status via MDK API
                var response = await _httpClient.GetAsync($"{_apiBaseUrl}/checkouts/{sessionId}");
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var json = JObject.Parse(content);
                    return json["status"]?.ToString() == "PAID";
                }
            }
            catch (Exception ex)
            {
                // Log error
                Console.WriteLine($"MDK Verification Error: {ex.Message}");
            }

            return false;
        }
    }
}
