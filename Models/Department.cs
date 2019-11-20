using System;
using System.Collections.Generic;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class Department
    {      

        public int DepartmentId { get; set; }
        public string DepartName { get; set; }

        public ICollection<Employee> Employee { get; set; }
        public ICollection<PositionDepartments> PositionDepartments { get; set; }
        public ICollection<StaffRestrict> StaffRestrict { get; set; }

        public Department()
        {
            Employee = new List<Employee>();
            PositionDepartments = new List<PositionDepartments>();
            StaffRestrict = new List<StaffRestrict>();
        }
    }
}
