using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Models
{
    public class Key
    {
        public string KeyName { get; set; }
        public string Subset { get; set; }
        public string OrgId { get; set; }

        public Value Value { get; set; }
    }
}
