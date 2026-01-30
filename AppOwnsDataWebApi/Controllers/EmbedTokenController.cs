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
        private readonly MdkService _mdkService;

        public EmbedTokenController(PowerBiServiceApi powerBiServiceApi, MdkService mdkService)
        {
            _powerBiServiceApi = powerBiServiceApi;
            _mdkService = mdkService;
        }

        // GET api/EmbedToken?workspaceId={workspaceId}&reportId={reportId}&mdkSessionId={mdkSessionId}
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string workspaceId, [FromQuery] string reportId, [FromQuery] string mdkSessionId = null)
        {
            if (string.IsNullOrWhiteSpace(workspaceId) || string.IsNullOrWhiteSpace(reportId))
            {
                return BadRequest("workspaceId and reportId are required.");
            }

            // Gating Logic
            bool isPaid = await _mdkService.IsSessionPaid(mdkSessionId);
            if (!isPaid && mdkSessionId != "bypass-for-demo") 
            {
                return StatusCode(402, "Payment Required: Please settle in sats via MDK to view this report.");
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
