using Emp_Dep_Api_Angular.Contracts;
using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Emp_Dep_Api_Angular.Repositories
{
    public class StaffRestrictRepository : IStaffRestrictsRepository
    {

        private DepDBContext _context;  // ccылка на контекст БД

        public StaffRestrictRepository(DepDBContext context) // DI
        {
            _context = context;
        }

        public IEnumerable<StaffRestrict> GetAll()
        {
            return _context.StaffRestrict;
        }

        public async Task<StaffRestrict> Find(int id)
        {
            return await _context.StaffRestrict.SingleOrDefaultAsync(a => a.StaffRestrictId == id);
        }


        public async Task<StaffRestrict> Add(StaffRestrict staffRestrict)
        {
            await _context.StaffRestrict.AddAsync(staffRestrict);
            await _context.SaveChangesAsync();
            return staffRestrict;
        }

        public async Task<StaffRestrict> Update(StaffRestrict staffRestrict)
        {
            _context.Entry(staffRestrict).State = EntityState.Modified;            
            await _context.SaveChangesAsync();
            return staffRestrict;

        }

        public async Task<StaffRestrict> Remove(int id)
        {
            var staffRestrict = await _context.StaffRestrict.SingleAsync(m => m.StaffRestrictId == id);
            _context.Remove(staffRestrict);   // _context.StaffRestrict.Remove(staffRestrict);
            await _context.SaveChangesAsync();
            return staffRestrict;
        }        

        public async Task<bool> Exist(int id)
        {
            return await _context.StaffRestrict.AnyAsync(e => e.StaffRestrictId == id);
        }




        /////////// дополнительные методы //////////////////////////////////////

        // возврат правила (Id штатного расписания) для отдела и должности 
        public int RecStaffRest(int positionid, int departmentid)
        {            
            var StafId = _context.StaffRestrict.Where(x => (x.DepartmentId == departmentid) && (x.PositionId == positionid)).FirstOrDefault();

            if (StafId == null) return 0;
            else return StafId.StaffRestrictId;
        }


        // сохранение макс. количества сотрудников для выбранного штатного расписания
        public void StaffRestrict_NumberUpdate(int CurrentNumberEmp, StaffRestrict staf)
        {
            //// ПРОВЕРКУ В КЛИЕНТЕ!!! staf.MaxAmount >= CurrentNumberEmp
            // проверка новое макс. количество сотрудников на должности должно быть >= чем
            // текущее количество сотрудников на этой должности
            //if (staf.MaxAmount >= CurrentNumberEmp)
            //{
            _context.Entry(staf).State = EntityState.Modified; // вносим изменения в таб. StaffRestric БД
                    _context.SaveChanges();                   

            //}
            //else MessageBox.Show("Зараз не можна зменшити кількість працівників за штатним розкладом." +
            //    "Спочатку перевід співробітників в ін. відділи або звільніть з цієї посади.");


        }


        // проверка максимального количества сотрудников для данной должности и отдела (штатного расписане)
        public int MaxNumerEmployee(int positionId, int departmentId)
        {
            var Restr = _context.StaffRestrict.Where(x => (x.DepartmentId == departmentId) &&
            (x.PositionId == positionId)).FirstOrDefault();

            if (Restr.MaxAmount == null) return 0;
            else return Restr.MaxAmount.Value;

        }


    }
}
