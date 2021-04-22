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
                var keyObj = new Key { field1 = key, field2 };

                keyList.Add(keyObj);
            }

            //string[] keysArr = keys
            //                    .Select(key => (string)key)
            //                    .ToArray();

            return keyList
                .OrderBy(k => k.field1)
                .ToList();
        }

    }
}
