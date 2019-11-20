using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Emp_Dep_Api_Angular.Contracts;
using Emp_Dep_Api_Angular.Models;

namespace Emp_Dep_Api_Angular.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private DepDBContext _context;  // ccылка на контекст БД

        public DepartmentRepository(DepDBContext context) // DI
        {
            _context = context;
        }

        public IEnumerable<Department> GetAll()  //список всех обьектов из бд
        {
            return _context.Department;
        }

        public async Task<Department> Find(int id) //найти обьект по ID
        {
            return await _context.Department.SingleOrDefaultAsync(a => a.DepartmentId == id);

        }

        public async Task<Department> Add(Department department) // добавление обьекта в БД
        {
            await _context.Department.AddAsync(department);
            await _context.SaveChangesAsync();
            return department;            
        }

        public async Task<Department> Update(Department department)  // обновление  обьекта в БД
        {         
            _context.Entry(department).State = EntityState.Modified;            
            await _context.SaveChangesAsync();
            return department;
        }            

        public async Task<Department> Remove(int id)
        {
            var department = await _context.Department.SingleAsync(m => m.DepartmentId == id);
            _context.Department.Remove(department);
            await _context.SaveChangesAsync();
            return department; 
        }

        public async Task<bool> Exist(int id) // проверка на существование записи
        {
            return await _context.Department.AnyAsync(n => n.DepartmentId == id);
        }


        /////////// дополнительные методы //////////////////////////////////////


        //ПРОВЕРКУ В КЛИЕНТЕ!!! (если ручной ввод) 
        // прикрепление должности к отделу (M_to_M)
        public void PosAddToDepartment(int positionId, int departmentId)
        {

            var recDep = _context.Department.Where(x => x.DepartmentId == departmentId).FirstOrDefault(); // выбор текущего отдела - сущности           

            PositionDepartments pd = new PositionDepartments();
            pd.DepartmentId = recDep.DepartmentId;
            pd.PositionId = positionId;

            recDep.PositionDepartments.Add(pd);  // добавление должностей в отдел через промежуточную сущность (M_to_M)   

            _context.SaveChanges();         

        }

        //удаление должности из отдела
        public void PosRemoveFromDep(int positionId, int departmentId)
        {

            var recDep = _context.Department.Where(x => x.DepartmentId == departmentId).FirstOrDefault(); // выбор текущего отдела - сущности     
            var recPos = _context.Position.Where(x => x.PositionId == positionId).FirstOrDefault(); // выбор текущей должности - сущности

            PositionDepartments pd = new PositionDepartments();
            pd.DepartmentId = recDep.DepartmentId;
            pd.PositionId = recPos.PositionId;
            

            _context.Remove(pd);

            _context.SaveChanges();


            //recDep.PositionDepartments.Remove(pd);  // удаление должности из отдела через промежуточную сущность (M_to_M)   

            

        }




    }
}
