using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KONNECT_REDIS.Models;
using KONNECT_REDIS.Models.Dtos;
using KONNECT_REDIS.Services.IServices;
using KONNECT_REDIS.utils;
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
        /// <param name="pageSize">Page size</param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(PaginatedList<Key>))]
        [ProducesResponseType(404)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllKeys(int pageNumber, int pageSize)

        {
            try
            {
                var res = _keysService.GetAllKeys(pageNumber, pageSize); 
                
                if (res == null)
                {
                    return NotFound();
                }
                var results = new { Keys = res, res.TotalCount, res.TotalPages, res.HasNextPage, res.HasPreviousPage };

                return Ok(results);
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
        /// /// <param name="pageSize">Page size</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Query")]
        [ProducesResponseType(200, Type = typeof(ICollection<Key>))]
        public IActionResult GetKeyByQuery([FromQuery] string pattern, int pageNumber, int pageSize)
        {
            try
            {
                var res = _keysService.GetKeyByQuery(pattern, pageNumber, pageSize);

                if (res == null)
                {
                    return NotFound();
                }
                var results = new { Keys = res, res.TotalCount, res.TotalPages, res.HasNextPage, res.HasPreviousPage };
                return Ok(results);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Delete a key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>True/False if key delete was success</returns>
        [HttpDelete("remove")]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteKey([FromQuery] KeyDto key)
        {
            try
            {
                var res = _keysService.DeleteKey(key);

                if (res == false)
                {
                    var errMessage = new { success = res, message = "Error deleting key / could not find key" };

                    return NotFound(errMessage);
                }

                var deletedKey = key.Subset == null ? $"{key.KeyName}#{key.OrgId}" : $"{key.KeyName}#{key.Subset}#{key.OrgId}";

                var message = new { success = res, message = $"Successfully deleted {deletedKey}" };

                return Ok(message);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Get value of key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>Value of key in string form</returns>
        [HttpGet("value")]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetValue([FromQuery] KeyDto key)
        {
            try
            {
                var res = _keysService.GetValue(key);

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
        /// Delete multiple keys by Redis key pattern
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

        /// <summary>
        /// Create new key value pair
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult SetKeyValue([FromBody] Key key)
        {
            try
            {
                if(key == null)
                {
                    return BadRequest(ModelState);
                }

                if(!_keysService.SetKeyValue(key))
                {
                    ModelState.AddModelError("", $"Something went wrong seting key pair value");
                    return StatusCode(500, ModelState);
                }

                return Ok(key);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Delete a multiple keys by select
        /// </summary>
        /// <param name="keys">Selected keys</param>
        /// <returns>Number of deleted keys and keys, or throws an error</returns>
        [HttpDelete("removeSelected")]
        [ProducesResponseType(200)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteKeysBySelect([FromBody] List<KeyDto> keys)
        {
            try
            {
                var res = _keysService.DeleteKeysBySelect(keys);

                if (res == false)
                {
                    var errMessage = new { success = res, message = "No key selected" };

                    return NotFound(errMessage);
                }

                var deletedKeys = $"{res}";

                var message = new { success = res, message = $"Successfully deleted {keys.Count} keys" };

                return Ok(message);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}