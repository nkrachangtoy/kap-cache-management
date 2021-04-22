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
        /// Retrieve list of all keys in db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAllKeys()
        {
            var res = _keysService.GetAllKeys();

            return Ok(res); 
        }
    }
}
