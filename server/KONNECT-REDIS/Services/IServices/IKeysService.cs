using KONNECT_REDIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Services.IServices
{
    public interface IKeysService
    {
        ICollection<Key> GetAllKeys(int? pageNumber, int pageSize);
        ICollection<Key> GetKeyByQuery(string pattern, int? pageNumber, int pageSize);
        bool DeleteKey(string keyName, string orgId, string subset = "");
        string GetValue(Key key);
    }
}
