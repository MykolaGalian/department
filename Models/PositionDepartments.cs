using System;
using System.Collections.Generic;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class PositionDepartments
    {
        public int PositionId { get; set; }
        public Position Position { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
       
    }
}
