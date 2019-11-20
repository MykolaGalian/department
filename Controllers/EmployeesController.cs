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
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeesRepository _employeesRepository; // вместо ccылки на контекст БД, ссылка на интерфейс репозитория

        public EmployeesController(IEmployeesRepository employeesRepository)  //DI
        {
            _employeesRepository = employeesRepository;
        }

        // GET: api/Employees/getemp
        [HttpGet("getemp")]
        public IEnumerable<Employee> GetEmployee()
        {
            return _employeesRepository.GetAll().ToList();
        }

        // GET: api/Employees/getemp/5
        [HttpGet("getemp/{id}")]
        public async Task<ActionResult<Employee>> GetEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _employeesRepository.Find(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            try
            {
                await _employeesRepository.Update(employee);
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!await EmployeeExists(id))
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

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult> PostEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _employeesRepository.Add(employee);

            return CreatedAtAction("PostEmployee", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            if (!await EmployeeExists(id))
            {
                return NotFound();
            }

             var employee_ = await _employeesRepository.Remove(id);

            return employee_;
        }

        private async Task<bool> EmployeeExists(int id)
        {
            return await _employeesRepository.Exist(id);
        }

        //////////////////////////////// дополнительные методы////////////////////////////////////////


        // вывод списка всех фамилий работников выделенного отдела на выделенной должности на предприятии 
        //// GET    api/Employees/empldeplist/2/2
        [HttpGet("empldeplist/{positionid}/{departmentid}")]
        public IEnumerable<Employee> EmplDepList(int positionId, int departmentId)
        {
            return _employeesRepository.EmployeeDep_List(positionId, departmentId).ToList();
        }

       


        // повернення сутності по Login / Password
        //// GET    api/Employees/loginuser/2/2
        [HttpGet("loginuser/{login}/{password}")]
        public ActionResult<Employee> LogInUser(string login, string password)
        {
            try
            {
                return _employeesRepository.Log_In_UserAdmin(login, password);
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }

        // возврат текущего количества сотрудников для данной должности в текущем отделе - переменная X-NumEmp
        //// GET    api/Employees/curnumemp/2/2
        [HttpGet("curnumemp/{positionid}/{departmentid}")]
        public ActionResult CurNumEmp([FromRoute] int positionid, [FromRoute] int departmentid)
        {
            try
            {
                var _result = _employeesRepository.CurNumEmployee(positionid, departmentid);
                Response.Headers.Add("X-NumEmp", _result.ToString());   // возврат количества сотрудников в заголовке ответа переменная X-NumEmp
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }








    }
}