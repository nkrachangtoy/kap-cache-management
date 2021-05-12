using KONNECT_REDIS.Models;
using KONNECT_REDIS.Models.Dtos;
using KONNECT_REDIS.utils;
using StackExchange.Redis;
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

        // ==============================
        // Delete By Select
        // ==============================
        bool CreateCollectionKeysToDelete(List<KeyDto> keys);
        bool DeleteKeysBySelect(string selection);



        // ==============================
        // Pattern Dropdowns
        // ==============================
        ICollection<string> GetUnique1stFields();
        ICollection<string> GetUniqueNextFields(string field, int index);
        
        // ==============================
        // Get Patterns
        // ==============================
        ICollection<string> GetUniqueFields();
    }
}