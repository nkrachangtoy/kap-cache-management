using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.utils
{
    public interface IPaginate<T> : IList<T>
    {
        int PageIndex { get; }
        int PageSize { get; }
        int TotalPages { get; }
        int TotalCounts { get; }
        bool HasPreviousPage { get; }
        bool HasNextPage { get; }
    }
}
