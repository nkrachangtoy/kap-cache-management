using KONNECT_REDIS.Models;
using KONNECT_REDIS.Models.Dtos;
using KONNECT_REDIS.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Services.IServices
{
    public interface IKeysService
    {
        PaginatedList<KeyDto> GetAllKeys(int? pageNumber, int pageSize);
        PaginatedList<KeyDto> GetKeyByQuery(string pattern, int? pageNumber, int pageSize);
        long BatchDeleteKeysByQuery(string pattern);
        bool DeleteKey(KeyDto key);
        Value GetValue(KeyDto key);
        bool SetKeyValue(Key key);
        bool DeleteKeysBySelect(List<KeyDto> keys);
    }
}
