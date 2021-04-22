using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KONNECT_REDIS.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KONNECT_REDIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeysController : ControllerBase
    {
        private IKeysService _keysService;

        public KeysController(IKeysService keysService)
        {
            _keysService = keysService;
        }

        /// <summary>
        /// This is a sample documentation
        /// </summary>
        ///  <param name="id"> The id of something </param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Index()
        {
            var res = _keysService.Test();

            return Ok(res); 
        }
    }
}
