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
        long BatchDeleteKeysByQuery(string pattern);
        bool DeleteKey(Key key);
        string GetValue(Key key);
    }
}
