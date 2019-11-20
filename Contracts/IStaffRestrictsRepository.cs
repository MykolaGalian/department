using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Emp_Dep_Api_Angular.Contracts
{
    public interface IStaffRestrictsRepository
    {
        IEnumerable<StaffRestrict> GetAll();  //get all

        Task<StaffRestrict> Find(int id);  //get by Id  - найти

        Task<StaffRestrict> Add(StaffRestrict staffRestrict);   //post - добавить

        Task<StaffRestrict> Update(StaffRestrict staffRestrict);  //put  --обновить

        Task<StaffRestrict> Remove(int id);     //del

        Task<bool> Exist(int id);

        // возврат правила (штатного расписания) для отдела и должности 
        int RecStaffRest(int positionid, int departmentid);

        // сохранение макс. количества сотрудников для выбранного штатного расписания
        void StaffRestrict_NumberUpdate(int CurrentNumberEmp, StaffRestrict staf);

        // get - проверка максимального количества сотрудников для данной должности и отдела (штатного расписане)
        int MaxNumerEmployee(int positionId, int departmentId);
    }
}
