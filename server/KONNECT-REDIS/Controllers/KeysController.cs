﻿using System;
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
        /// <param name="pageNumber">Page number</param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Key>))]
        [ProducesResponseType(404)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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

        /// <summary>
        /// Delete a key
        /// </summary>
        /// <param name="keyName"></param>
        /// <param name="orgId"></param>
        /// <param name="subset">(optional)</param>
        /// <returns>True/False if key delete was success</returns>
        [HttpDelete("remove")]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteKey([FromQuery] string keyName, string orgId, string subset = "")
        {
            try
            {
                var res = _keysService.DeleteKey(keyName, orgId, subset);

                if (res == false)
                {
                    var errMessage = new { success = res, message = "Error deleting key / could not find key" };

                    return NotFound(errMessage);
                }

                var deletedKey = subset.Equals("") ? $"{keyName}#{orgId}" : $"{keyName}#{subset}#{orgId}";

                var message = new { success = res, message = $"Successfully deleted {deletedKey}" };

                return Ok(message);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Delete a multiple keys by Redis key pattern
        /// </summary>
        /// <param name="pattern">A Redis key pattern</param>
        /// <returns>Number of deleted keys and pattern they followed, or throws an error</returns>
        [HttpDelete("removeSubset")]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult BatchDeleteKeysByQuery([FromQuery] string pattern)
        {
            try
            {
                var res = _keysService.BatchDeleteKeysByQuery(pattern);

                if (res == 0)
                {
                    var errMessage = new { success = res, message = "Keys matching pattern do not exist" };

                    return NotFound(errMessage);
                }

                var deletedKeys = $"{res}";

                var message = new { success = res, message = $"Successfully deleted {pattern}" };

                return Ok(message);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
        