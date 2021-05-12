using KONNECT_REDIS.Models;
using KONNECT_REDIS.Models.Dtos;
using KONNECT_REDIS.Services.IServices;
using KONNECT_REDIS.utils;
using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Services
{
    public class KeysService : IKeysService
    {
        private const string guid = "{GUID}";
        private readonly IConnectionMultiplexer _multiplexer;
        private readonly IDatabase _db;
        private readonly IServer _server;
        private readonly IEnumerable<RedisKey> _keys;
        public IConfiguration Configuration { get; }
        private readonly Regex _regex;

        public KeysService(IConnectionMultiplexer multiplexer, IConfiguration configuration)
        {
            _multiplexer = multiplexer;
            Configuration = configuration;
            _db = _multiplexer.GetDatabase();
            _server = _multiplexer.GetServer(Configuration["REDIS_ENDPOINT"], 12388);
            _keys = _server.Keys(0, pattern: "*", pageSize: 100000);
            _regex = new Regex(@"^[0-9]+$");
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
            var keys = _server.Keys(0, pattern: pattern, pageSize: 100000).ToArray();
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
            var keyListString = _db.StringGet(selection);

            var keyListArr = keyListString.ToString().Split(",");

            var result = false;

            foreach (var value in keyListArr)
            {
                result = _db.KeyDelete(value);
            }

            _ = _db.KeyDelete("keys2delete");

            return result;
        }

        // ==============================
        // Pattern Dropdowns
        // ==============================
        /// <summary>
        /// Retrieve list of unique keys
        /// </summary>
        /// <returns>Array of unique keys</returns>
        public ICollection<string> GetUnique1stFields()
        {
            List<string> keyList1stField = new List<string>();
                 
            foreach (var key in _keys)
            {
                var key1stField = key.ToString().Split("#")[0];

                keyList1stField.Add(key1stField);
            }

            List<string> keyList1stFieldDistinct = keyList1stField.Distinct().OrderBy(k => k).ToList();

            return keyList1stFieldDistinct;
        }
        /// <summary>
        /// Retrieve list of unique keys (next field)
        /// </summary>
        /// <returns>Array of unique keys</returns>
        public ICollection<string> GetUniqueNextFields(string field, int index)
        {
            List<string> keyListNextField = new List<string>();

            var keys = _server.Keys(0, pattern: $"{field}*", pageSize: 100000);

            foreach (var key in keys)
            {
                var count = key.ToString().Split("#").ToArray().Length;

                if (index <= (count - 1))
                {
                    var keyNextField = key.ToString().Split("#")[index];

                    keyListNextField.Add(keyNextField);
                }
                else
                {
                    keyListNextField.Add(null);
                }
            }

            return keyListNextField.Distinct().OrderBy(k => k).ToList();
        }

        /// <summary>
        /// Gets list of unique available patterns 
        /// </summary>
        /// <returns>Unique pattern types</returns>
        public ICollection<string> GetUniqueFields()
        {
            List<string> keyListFields = new List<string>();
            string[] stringDescriptors = { "IsFeatureActive", "KonnectOrganization", "KonnectOrganizationData", "KoreSetting", "tableauconfig", "UserCommentsOrganization", 
                "ad_emit_events", "autoschedule", "dealassetstatus", "deliverymodule", "enabletags", "enforceassetavailability", "eventsmodule", "extendedseason", 
                "UnallocatedRevenueProperty" };

            foreach (var key in _keys)
            {
                StringBuilder sb = new StringBuilder();
                var keyField = key.ToString().Split("#");
                foreach (string keyPattern in keyField.Distinct())
                {
                    keyListFields.Add(keyPattern);
                    string patternField = "";
                    foreach (var pattern in keyListFields.Distinct().ToArray())
                    {
                        if (stringDescriptors.Contains(pattern))
                        {
                            patternField = pattern;
                        }
                        else if (Guid.TryParse(pattern, out _))
                        {
                            patternField = "{GUID}";
                        }
                        else if (_regex.IsMatch(pattern))
                        {
                            patternField = "{Int_ID}";
                        }
                        else
                        {
                            patternField = "{String_ID}";
                        }
                        _ = keyListFields.Remove(keyPattern);
                    }

                    foreach (string field in keyListFields)
                    {
                        if (string.IsNullOrEmpty(field))
                        {
                            sb.Append(patternField);
                        }
                        else
                        {
                            sb.Append(patternField += "#");
                        }
                    }    
                               
                }
                string newPattern = sb.ToString();
                if (!keyListFields.Contains(newPattern))
                {
                    keyListFields.Add(newPattern);
                }
            }
            return keyListFields;
        }
    }
}
