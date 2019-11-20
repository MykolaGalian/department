using System;
using System.Collections.Generic;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class Position
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }

        public ICollection<Employee> Employee { get; set; }
        public ICollection<PositionDepartments> PositionDepartments { get; set; }
        public ICollection<StaffRestrict> StaffRestrict { get; set; }

        public Position()
        {
            Employee = new List<Employee>();
            PositionDepartments = new List<PositionDepartments>();
            StaffRestrict = new List<StaffRestrict>();
        }
    }
}
