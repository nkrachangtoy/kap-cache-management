using KONNECT_REDIS.Models;
using KONNECT_REDIS.Models.Dtos;
using KONNECT_REDIS.Services.IServices;
using KONNECT_REDIS.utils;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Services
{
    public class KeysService : IKeysService
    {
        private readonly IConnectionMultiplexer _multiplexer;
        private readonly IDatabase _db;

        public KeysService(IConnectionMultiplexer multiplexer)
        {
            _multiplexer = multiplexer;
            _db = _multiplexer.GetDatabase();

        }

        /// <summary>
        /// Retrieve All keys
        /// </summary>
        /// <param name="pageNumber">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>List of Keys</returns>
        public PaginatedList<KeyDto> GetAllKeys(int? pageNumber, int pageSize)

        {
            var keys = _multiplexer.GetServer("redis-12388.c261.us-east-1-4.ec2.cloud.redislabs.com", 12388).Keys(0, pattern: "*", pageSize: 100000);
            
            var keyList = new List<KeyDto>();

            foreach (var key in keys)
            {
                // ex key: IsFeatureActive#ad_emit_events#1
                // f1 === IsFeatureActive
                // f2 === ad_emit_event
                // f3? === 1
                var keyString = key.ToString();
                

                if (keyString.Split("#").Length == 3)
                {
                    var f1 = keyString.Split("#")[0];
                    var f2 = keyString.Split("#")[1];
                    var f3 = keyString.Split("#")[2];

                    var keyObj = new KeyDto { KeyName = f1, Subset = f2, OrgId = f3 };
                    keyList.Add(keyObj);
                   
                }
                else if (keyString.Split("#").Length == 2)
                {
                    var f1 = keyString.Split("#")[0];
                    var f3 = keyString.Split("#")[1];

                    var keyObj = new KeyDto { KeyName = f1, Subset = "", OrgId = f3 };
                    
                    keyList.Add(keyObj);
                }
            }

            // Paginate
            pageSize = 50;

            return PaginatedList<KeyDto>.Create(keyList.AsQueryable().OrderBy(k => k.KeyName), pageNumber ?? 1, pageSize);
        }

        /// <summary>
        /// Retrieves a list of keys according to a Redis key pattern 
        /// </summary>
        /// <param name="pattern">A Redis key pattern</param>
        /// <param name="pageNumber">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns></returns>
        public PaginatedList<KeyDto> GetKeyByQuery(string pattern, int? pageNumber, int pageSize)
        {
            var server = _multiplexer.GetServer("redis-12388.c261.us-east-1-4.ec2.cloud.redislabs.com", 12388);

            var keyList = new List<KeyDto>();

            foreach (var key in server.Keys(0, pattern: pattern, pageSize: 100000))
            {
                var keyString = key.ToString();

                if (keyString.Split("#").Length == 3)
                {
                    var f1 = keyString.Split("#")[0];
                    var f2 = keyString.Split("#")[1];
                    var f3 = keyString.Split("#")[2];

                    var keyObj = new KeyDto { KeyName = f1, Subset = f2, OrgId = f3 };

                    keyList.Add(keyObj);
                }
                else if (keyString.Split("#").Length == 2 )
                {
                    var f1 = keyString.Split("#")[0];
                    var f3 = keyString.Split("#")[1];

                    var keyObj = new KeyDto { KeyName = f1, Subset = "", OrgId = f3 };

                    keyList.Add(keyObj);
                }
            }

            // Paginate
            pageSize = 50;

            return PaginatedList<KeyDto>.Create(keyList.AsQueryable().OrderBy(k => k.KeyName), pageNumber ?? 1, pageSize);
        }

        public long BatchDeleteKeysByQuery(string pattern)
        {
                var server = _multiplexer.GetServer("redis-12388.c261.us-east-1-4.ec2.cloud.redislabs.com", 12388);
                var keys = server.Keys(0, pattern: pattern, pageSize: 100000).ToArray();
                return _db.KeyDelete(keys);
        }

        /// <summary>
        /// Delete key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>True/False if key delete was success</returns>
        public bool DeleteKey(KeyDto key)
        {
            if (key.Subset != null)
            {
                return _db.KeyDelete($"{key.KeyName}#{key.Subset}#{key.OrgId}");
            }
            else
            {
                return _db.KeyDelete($"{key.KeyName}#{key.OrgId}");
            }
        }

        /// <summary>
        /// Get value of key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>Value of key in string form</returns>
        public Value GetValue(KeyDto key)
        {
            if(key.Subset != null)
            {
               var res = _db.StringGet($"{key.KeyName}#{key.Subset}#{key.OrgId}");
                return new Value { Data = res };
            }
            else
            {
               var res =  _db.StringGet($"{key.KeyName}#{key.OrgId}");
                return new Value { Data = res };
            }
        }

        /// <summary>
        /// Add new key value pair in Redis db
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns>True or false whether key value pair was succesfully added</returns>
        public bool SetKeyValue(Key key)
        {
            if(!key.Subset.Equals(""))
            {
                return _db.StringSet($"{key.KeyName}#{key.Subset}#{key.OrgId}", key.Value.Data);
            }
            else
            {
                return _db.StringSet($"{key.KeyName}#{key.OrgId}", key.Value.Data);
            }
        }

        public bool DeleteKeysBySelect(List<KeyDto> keys)
        {
            var result = false;
            foreach (var key in keys) 
            {

                if(key.Subset != null)
                {
                    
                    result = _db.KeyDelete($"{key.KeyName}#{key.Subset}#{key.OrgId}");
                }
                else
                {
                    result = _db.KeyDelete($"{key.KeyName}#{key.OrgId}");
                }
            }
            return result;
        }
    }
}
