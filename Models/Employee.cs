using System;
using System.Collections.Generic;

namespace Emp_Dep_Api_Angular.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public double? Salary { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string TypeOfUser { get; set; }
        public int? DepartmentId { get; set; }
        public int? PositionId { get; set; }

        public Department Department { get; set; }
        public Position Position { get; set; }
    }
}
