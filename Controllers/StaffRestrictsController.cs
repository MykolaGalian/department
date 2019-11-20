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
    public class StaffRestrictsController : ControllerBase
    {
        private readonly IStaffRestrictsRepository _staffRestrictsRepository; // вместо ccылки на контекст БД, ссылка на интерфейс репозитория

        public StaffRestrictsController(IStaffRestrictsRepository staffRestrictsRepository)  //DI
        {
            _staffRestrictsRepository = staffRestrictsRepository;
        }

        // GET: api/StaffRestricts/getstaff
        [HttpGet("getstaff")]
        public ActionResult<IEnumerable<StaffRestrict>> GetStaffRestrict()
        {
            return _staffRestrictsRepository.GetAll().ToList();
        }

        // GET: api/StaffRestricts/getstaff/5
        [HttpGet("getstaff/{id}")]
        public async Task<ActionResult<StaffRestrict>> GetStaffRestrict([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var staffRestrict = await _staffRestrictsRepository.Find(id);

            if (staffRestrict == null)
            {
                return NotFound();
            }

            return staffRestrict;
        }

        // PUT: api/StaffRestricts/putstaf/5
        [HttpPut("putstaf/{id}")]
        public async Task<IActionResult> PutStaffRestrict([FromRoute] int id, [FromBody] StaffRestrict staffRestrict)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != staffRestrict.StaffRestrictId)
            {
                return BadRequest();
            }

            try
            {
                await _staffRestrictsRepository.Update(staffRestrict);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await StaffRestrictExists(id))
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

        // POST: api/StaffRestricts
        [HttpPost]
        public async Task<ActionResult<StaffRestrict>> PostStaffRestrict([FromBody] StaffRestrict staffRestrict)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _staffRestrictsRepository.Add(staffRestrict);

            return CreatedAtAction("PostStaffRestrict", new { id = staffRestrict.StaffRestrictId }, staffRestrict);
        }

        // DELETE: api/StaffRestricts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StaffRestrict>> DeleteStaffRestrict([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            if (!await StaffRestrictExists(id))
            {
                return NotFound();
            }

            var staffRestrict_ = await _staffRestrictsRepository.Remove(id);

            return staffRestrict_;
        }

        private async Task<bool> StaffRestrictExists(int id)
        {
            return await _staffRestrictsRepository.Exist(id);
        }



        ///////////////////////////////////// дополнительные методы //////////////////////////////////////       

        // возврат правила (штатного расписания) для отдела и должности  -   проверка
        //// GET    api/StaffRestricts/recstaff/2/2
        [HttpGet("recstaff/{positionid}/{departmentid}")]
        public ActionResult RecStaff(int positionid, int departmentid) 
        {                                                                                  
            try
            {
                var _result = _staffRestrictsRepository.RecStaffRest(positionid, departmentid);
                Response.Headers.Add("X-StuffId", _result.ToString());
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }

        // сохранение макс. количества сотрудников для выбранного штатного расписания
        // PUT: api/StaffRestricts/stafupdatemax/5    //ПРОВЕРКА РАБОТЫ ИЗ КЛИЕНТА - передача обьекта в теле запроса put
        [HttpPut("stafupdatemax/{id}")]             
        public  ActionResult<StaffRestrict> StaffRestNumUpdate([FromRoute] int CurrentNumberEmp, [FromBody] StaffRestrict staf)        
        {
            try
            {
                _staffRestrictsRepository.StaffRestrict_NumberUpdate(CurrentNumberEmp, staf);
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }            
        }

        // возврат максимального количества сотрудников в заголовке ответа, переменная X-MaxNumEmp
        //// GET    api/StaffRestricts/maxcurnumemp/2/2
        [HttpGet("maxcurnumemp/{positionid}/{departmentid}")]
        public ActionResult MaxNumerEmp([FromRoute] int positionid, [FromRoute] int departmentid)
        {
            try
            {
                var _result = _staffRestrictsRepository.MaxNumerEmployee(positionid, departmentid);
                Response.Headers.Add("X-MaxNumEmp", _result.ToString());
                return Ok();
            }

            catch (Exception exp)
            {
                return NotFound(exp.Message);
            }
        }

       

    }
}