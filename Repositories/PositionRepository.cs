using Microsoft.EntityFrameworkCore;
using Emp_Dep_Api_Angular.Contracts;
using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Emp_Dep_Api_Angular.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private DepDBContext _context;  // ccылка на контекст БД

        public PositionRepository(DepDBContext context) // DI
        {
            _context = context;
        }       


        public IEnumerable<Position> GetAll() //список всех обьектов из бд
        {
            return _context.Position;
        }

        public async Task<Position> Find(int id)  //найти обьект по ID
        {
            return await _context.Position.SingleOrDefaultAsync(a => a.PositionId == id);
        }

        public async Task<Position> Add(Position position)
        {
            await _context.Position.AddAsync(position);
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task<Position> Update(Position position)
        {
            _context.Entry(position).State = EntityState.Modified;           
             await _context.SaveChangesAsync();
            return position;


        }

        public async Task<Position> Remove(int id)
        {
            var position = await _context.Position.SingleAsync(m => m.PositionId == id);
            _context.Position.Remove(position);
            await _context.SaveChangesAsync();
            return position;
        }

        
        public async Task<bool> Exist(int id)
        {
            return await _context.Position.AnyAsync(e => e.PositionId == id);
        }





        //////////////////////////////////////////

   

        // вывод списка всех должностей для выбраного отдела предприятия 
        public IEnumerable<Position> Pos_List(int departmentid)
        {

            var PosForDepRec = _context.StaffRestrict.Where(x => x.DepartmentId == departmentid).ToList(); // выбор строк из таб.StaffRestrict для данного отдела 

            var PosForDep = from v in PosForDepRec                                // сопоставление PositionID и PositionName из таб. StaffRestrict и Position
                            join e in _context.Position on v.PositionId equals e.PositionId
                            select new Position
                            {
                                PositionId = v.PositionId,
                                PositionName = e.PositionName
                            };
            return PosForDep.ToList();

        }


    }
}
