using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Emp_Dep_Api_Angular.Models;
using Emp_Dep_Api_Angular.Contracts;




namespace Emp_Dep_Api_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {

        private readonly IDepartmentRepository _departmentRepository; // вместо ccылки на контекст БД, ссылка на интерфейс репозитория

        public DepartmentsController(IDepartmentRepository departmentRepository)  //DI
        {
            _departmentRepository = departmentRepository;
        }

        //// GET api/Departments/getdep/
        [HttpGet("getdep")]
        public ActionResult<IEnumerable<Department>> GetDepartment()
        {
            return _departmentRepository.GetAll().ToList();
        }


        //// GET  api/Departments/getdep/1
        [HttpGet("getdep/{id}")]
        public async Task<ActionResult<Department>> GetDepartment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = await _departmentRepository.Find(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment([FromRoute] int id, [FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            try
            {
                await _departmentRepository.Update(department);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Departments
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment([FromBody] Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _departmentRepository.Add(department);

            return CreatedAtAction("PostDepartment", new { id = department.DepartmentId }, department);
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Department>> DeleteDepartment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await DepartmentExists(id))
            {
                return NotFound();
            }

            var department_ = await _departmentRepository.Remove(id);

            return department_;
        }

        public async Task<bool> DepartmentExists(int id)
        {
            return await _departmentRepository.Exist(id);
        }



        ///////////////////////////////////////  дополнительные методы  /////////////////////////////////////////////////////////////////////      

        // get прикрепление должности к отделу (M_to_M)
        //// GET    api/Departments/posaddtodep/2/2
        [HttpGet("posaddtodep/{positionid}/{departmentid}")]
        public ActionResult PosAddToDep([FromRoute] int positionid, [FromRoute] int departmentid)
        {
            try
            {
                _departmentRepository.PosAddToDepartment(positionid, departmentid);
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }





        // DELETE удаление должности из отдела (M_to_M)
        //// DELETE    api/Departments/posdelfromdep/2/2
        [HttpDelete("posdelfromdep/{positionid}/{departmentid}")]
        public ActionResult PosDelFromDep([FromRoute] int positionid, [FromRoute] int departmentid)
        {
            try
            {
                _departmentRepository.PosRemoveFromDep(positionid, departmentid);
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }



    }



}
        
    
