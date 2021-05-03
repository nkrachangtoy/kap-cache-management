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
        private readonly IServer _server;
        private readonly IEnumerable<RedisKey> _keys;

        public KeysService(IConnectionMultiplexer multiplexer)
        {
            _multiplexer = multiplexer;
            _db = _multiplexer.GetDatabase();
            _server = _multiplexer.GetServer("redis-12388.c261.us-east-1-4.ec2.cloud.redislabs.com", 12388);
            _keys = _server.Keys(0, pattern: "*", pageSize: 100000);
        }

        /// <summary>
        /// Retrieve All keys
        /// </summary>
        /// <param name="pageNumber">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>List of Keys</returns>
        public PaginatedList<KeyDto> GetAllKeys(int? pageNumber, int pageSize)

        {
            var keyList = new List<KeyDto>();

            foreach (var key in _keys)
            {
                var keyString = key.ToString();

                var keyDto = new KeyDto { KeyName = keyString };

                keyList.Add(keyDto);
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
            var keyList = new List<KeyDto>();

            foreach (var key in _server.Keys(0, pattern: pattern, pageSize: 100000))
            {
                var keyString = key.ToString();

                var keyDto = new KeyDto { KeyName = keyString };

                keyList.Add(keyDto);
            }

            // Paginate
            pageSize = 50;

            return PaginatedList<KeyDto>.Create(keyList.AsQueryable().OrderBy(k => k.KeyName), pageNumber ?? 1, pageSize);
        }

        /// <summary>
        /// Delete multiple keys by Redis key pattern
        /// </summary>
        /// <param name="pattern">A Redis key pattern</param>
        /// <returns>Number of deleted keys and pattern they followed, or throws an error</returns>
        public long BatchDeleteKeysByQuery(string pattern)
        {
            var keys = _keys.ToArray();
            return _db.KeyDelete(keys);
        }

        /// <summary>
        /// Delete key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>True/False if key delete was success</returns>
        public bool DeleteKey(KeyDto key)
        {
            var keyString = key.KeyName;

            return _db.KeyDelete(keyString);
        }

        /// <summary>
        /// Get value of key
        /// </summary>
        /// <param name="key"></param>
        /// <returns>Value of key in string form</returns>
        public Value GetValue(KeyDto key)
        {
            var res = _db.StringGet(key.KeyName);

            return new Value { Data = res };
        }

        /// <summary>
        /// Add new key value pair in Redis db
        /// </summary>
        /// <param name="key"></param>
        /// <returns>True or false whether key value pair was succesfully added</returns>
        public bool SetKeyValue(Key key)
        {
            return _db.StringSet(key.KeyName, key.Value.Data);
        }


        // =======================================================
        // Delete By Select
        // =======================================================
        /// <summary>
        /// Creates a key value pair
        /// key == keys2delete
        /// value == keys to be deleted
        /// </summary>
        /// <param name="keys"></param>
        /// <returns>True or false whether creation was succesful or not</returns>
        public bool CreateCollectionKeysToDelete(List<KeyDto> keys)
        {
            var keyNames = new List<string>();
        

            foreach (var key in keys)
            {
                keyNames.Add(key.KeyName);
            }


            var keyString = string.Join(",", keyNames);

            return _db.StringSet("keys2delete", keyString);
        }

        /// <summary>
        /// Delete a multiple keys by select
        /// </summary>
        /// <param name="selection">Selected keys</param>
        /// <returns>True or false whether delete was successful</returns>
        public bool DeleteKeysBySelect(string selection)
        {
           var keyListString =  _db.StringGet(selection);

           var keyListArr = keyListString.ToString().Split(",");

            var result = false;

            foreach(var value in keyListArr)
            {
               result = _db.KeyDelete(value);
            }

            _db.KeyDelete("keys2delete");

            return result;
        }








        public ICollection<string> GetUnique1stFields()
        {
            List<string> keyList = new List<string>(new string[] {
                "IsFeatureActive#ad_emit_events#5",
                "IsFeatureActive#autoschedule#1",
                "IsFeatureActive#dealassetstatus#3",
                "IsFeatureActive#deliverymodule#2",
                "IsFeatureActive#enabletags#3",
                "KonnectOrganization#921638db-6b88-4985-b1cd-95283f4e2c67",
                "KonnectOrganizationData#5",
                "KoreSetting#UnallocatedRevenueProperty#f8ada701-266b-4f4c-8fd6-87c780ce6952",
                "tableauconfig#23",
                "UsersCommentsOrganization#canucks"
            });

            List<string> keyList1stField = new List<string>();
            List<int> lengthArr = new List<int>();


            // Find max value of arr length
            int maxLength = lengthArr.Max();

            // Split string
            foreach (var key in keyList)
            {
               lengthArr.Add(key.Split("#").Length);

               var key1stField = key.Split("#");
            }

            
            return keyList;
        }
    }
}
