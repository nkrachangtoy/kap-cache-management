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

        public Key(string _KeyName, string _Subset, string _OrgId)
        {
            KeyName = _KeyName;
            Subset = _Subset;
            OrgId = _OrgId;
        }

        public Key(string _KeyName, string _OrgId)
        {
            KeyName = _KeyName;
            OrgId = _OrgId;
        }

        public Key()
        {

        }
    }
}
