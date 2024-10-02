using System;
using System.Data;

namespace UserDataAccess.Entities
{
    public class Role
    {
        public int RoleID { get; set; }
        required public string RoleName { get; set; }
       
    }
}
