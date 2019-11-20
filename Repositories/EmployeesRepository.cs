using Emp_Dep_Api_Angular.Contracts;
using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Emp_Dep_Api_Angular.Repositories
{
    public class EmployeesRepository : IEmployeesRepository
    {

        private DepDBContext _context;  // ccылка на контекст БД

        public EmployeesRepository(DepDBContext context) // DI
        {
            _context = context;
        }


        public IEnumerable<Employee> GetAll()
        {
            return _context.Employee;
        }

        public async Task<Employee> Find(int id)
        {
            return await _context.Employee.SingleOrDefaultAsync(a => a.EmployeeId == id);
        }

        public async Task<Employee> Update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;            
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> Add(Employee employee)
        {
            await _context.Employee.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        

        public async Task<Employee> Remove(int id)
        {
            var employee = await _context.Employee.SingleAsync(m => m.EmployeeId == id);
            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
            return employee;
        }       

        public async Task<bool> Exist(int id)
        {
            return await _context.Employee.AnyAsync(e => e.EmployeeId == id);
        }




        /////////////////////////////// дополнительные методы///////////////////////////////////

        // вывод списка всех фамилий работников выделенного отдела на предприятии 
        public IEnumerable<Employee> EmployeeDep_List(int positionId, int departmentId)  
        {            
            var EmpForPosDepRec = _context.Employee.Where(x => (x.PositionId == positionId) &&
                (x.DepartmentId == departmentId)).ToList(); // выбор строк из таб.Employees_ для данного отдела и должности

            return EmpForPosDepRec;           

        }


        // повернення сутності по Login / Password
        public Employee Log_In_UserAdmin(string Login, string password)
        {
            return _context.Employee.Where(x => (x.Login == Login) && (x.Password ==
           password)).FirstOrDefault();
        }


        // проверка текущего количества сотрудников для данной должности в текущем отделе
        public int CurNumEmployee(int positionId, int departmentId)
        {
            var Curent = _context.Employee.Where(x => (x.DepartmentId == departmentId) && (x.PositionId == positionId)).ToList();

            if (Curent == null) return 0;
            else return Curent.Count();
        }

    }
}
