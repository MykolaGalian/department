using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Emp_Dep_Api_Angular.Contracts
{
    public interface IEmployeesRepository
    {

        IEnumerable<Employee> GetAll();  //get all

        Task<Employee> Find(int id);  //get by Id  - найти

        Task<Employee> Add(Employee employee);   //post - добавить

        Task<Employee> Update(Employee employee);  //put  --обновить

        Task<Employee> Remove(int id);     //del

        Task<bool> Exist(int id);

        // вывод списка всех фамилий работников выделенного отдела на предприятии 
        IEnumerable<Employee> EmployeeDep_List(int positionId, int departmentId);

        // повернення сутності по Login / Password
        Employee Log_In_UserAdmin(string Login, string password);

        // get - проверка текущего количества сотрудников для данной должности в текущем отделе
        int CurNumEmployee(int positionId, int departmentId);
    }
}
