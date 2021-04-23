using KONNECT_REDIS.Models;
using KONNECT_REDIS.Services.IServices;
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

        public ICollection<Key> GetAllKeys()
        {
            var keys = _multiplexer.GetServer("localhost", 6379).Keys();
            
            var keyList = new List<Key>();

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

                    var keyObj = new Key { KeyName = f1, Subset = f2, OrgId = f3 };

                    keyList.Add(keyObj);
                }
                else
                {
                    var f1 = keyString.Split("#")[0];
                    var f3 = keyString.Split("#")[1];
                   
                    var keyObj = new Key { KeyName = f1, Subset = "", OrgId = f3 };

                    keyList.Add(keyObj);
                }
            }
            return keyList
                    .OrderBy(k => k.KeyName)
                    .ToList();
        }
    }
}
