using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KONNECT_REDIS.Models;
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
        [ProducesResponseType(200, Type = typeof(ICollection<Key>))]
        [ProducesResponseType(404)]
        public IActionResult GetAllKeys(int pageNumber)

        {
            try
            {
                var res = _keysService.GetAllKeys(pageNumber);

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }     
        }

        /// <summary>
        /// Retrieves a list of keys according to a Redis key pattern 
        /// </summary>
        /// <param name="pattern">A Redis key pattern</param>
        /// <param name="pageNumber">Paginates Search Query</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Query")]
        [ProducesResponseType(200, Type = typeof(ICollection<Key>))]
        public IActionResult GetKeyByQuery([FromQuery]string pattern, int pageNumber)
        {
            try
            {
                var res = _keysService.GetKeyByQuery(pattern, pageNumber);

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}