using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Emp_Dep_Api_Angular.Models;

namespace Emp_Dep_Api_Angular.Contracts
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAll();  //get all
		 
		Task<Department> Find(int id);  //get by Id  - найти
		
		Task<Department> Add(Department department);   //post - добавить

        Task<Department> Update(Department department);  //put  --обновить

        Task<Department> Remove(int id);     //del

        Task<bool> Exist(int id);

        // get прикрепление должности к отделу (M_to_M)
        void PosAddToDepartment(int positionId, int departmentId);

        // get удаление должности из отдела (M_to_M)
        void PosRemoveFromDep(int positionId, int departmentId);


    }
}
