using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.utils
{
    public class Paginate<T> : List<T>
    {
        public int PageIndex { get; private set; }

        public int TotalPages { get; private set; }

        public Paginate(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            this.AddRange(items);
        }

        // If current page is greater than page index 1, show previous page
        public bool HasPreviousPage
        {
            get
            {
                return PageIndex > 1;
            }
        }

        // If current page is less than totalpages, show next page
        public bool HasNextPage
        {
            get
            {
                return PageIndex < TotalPages;
            }
        }
    }
}
