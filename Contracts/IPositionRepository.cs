using Emp_Dep_Api_Angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Emp_Dep_Api_Angular.Contracts
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetAll();  //get all

        Task<Position> Find(int id);  //get by Id  - найти

        Task<Position> Add(Position position);   //post - добавить

        Task<Position> Update(Position position);  //put  --обновить

        Task<Position> Remove(int id);     //del

        Task<bool> Exist(int id);

        

        // вывод списка всех должностей для выбраного отдела предприятия 
        IEnumerable<Position> Pos_List(int departmentid);
    }
}
