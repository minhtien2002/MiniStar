using System;
using System.Data;

namespace Domain.Entities
{
    public class Role
    {
        public int RoleID { get; set; }
        required public string RoleName { get; set; }
       
    }
}
