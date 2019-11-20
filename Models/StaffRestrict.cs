using System;
using System.Collections.Generic;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class StaffRestrict
    {
        public int StaffRestrictId { get; set; }
        public int? MaxAmount { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }

        public Department Department { get; set; }
        public Position Position { get; set; }
    }
}
