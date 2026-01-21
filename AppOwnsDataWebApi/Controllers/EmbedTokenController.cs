using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppOwnsDataWebApi.Models;
using AppOwnsDataWebApi.Services;

namespace AppOwnsDataWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmbedTokenController : ControllerBase
    {
        private readonly PowerBiServiceApi _powerBiServiceApi;

        public EmbedTokenController(PowerBiServiceApi powerBiServiceApi)
        {
            _powerBiServiceApi = powerBiServiceApi;
        }

        // GET api/EmbedToken?workspaceId={workspaceId}&reportId={reportId}
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string workspaceId, [FromQuery] string reportId)
        {
            if (string.IsNullOrWhiteSpace(workspaceId) || string.IsNullOrWhiteSpace(reportId))
            {
                return BadRequest("workspaceId and reportId are required.");
            }

            try
            {
                var result = await _powerBiServiceApi.GetEmbedToken(workspaceId, reportId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // return 500 with message (you can add better logging)
                return StatusCode(500, ex.Message);
            }
        }
    }
}
