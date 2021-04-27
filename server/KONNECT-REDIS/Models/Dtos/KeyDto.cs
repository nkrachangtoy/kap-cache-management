using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KONNECT_REDIS.Models.Dtos
{
    public class KeyDto
    {
        public string KeyName { get; set; }
        public string Subset { get; set; }
        public string OrgId { get; set; }
    }
}
