using AppOwnsDataWebApi.Models;
using AppOwnsDataWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AppOwnsDataWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmbedController : ControllerBase
    {
        private readonly PowerBiServiceApi powerBiServiceApi;

        public EmbedController(PowerBiServiceApi powerBiServiceApi)
        {
            this.powerBiServiceApi = powerBiServiceApi;
        }

        [HttpGet]
        public async Task<EmbedTokenResult> Get()
        {
            return await powerBiServiceApi.GetEmbedToken();
        }
    }
}
