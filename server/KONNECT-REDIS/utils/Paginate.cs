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

        public int TotalCounts { get; private set; }

        public Paginate(IList<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            // Define the totalpages with number of items/pageSize
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

        public static Paginate<T> Create(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = source.Count();
            // This statement will Skip the x amount of item in the current page
            // And will Take the next x amount of item & display into List
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new Paginate<T>(items, count, pageIndex, pageSize);
        }
    }
}
