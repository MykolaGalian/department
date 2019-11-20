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
    public class PositionsController : ControllerBase
    {
        private readonly IPositionRepository _positionRepository; // вместо ccылки на контекст БД, ссылка на интерфейс репозитория

        public PositionsController(IPositionRepository positionRepository)  //DI
        {
            _positionRepository = positionRepository;
        }

        // GET: api/Positions/getpos
        [HttpGet("getpos")]
        public ActionResult<IEnumerable<Position>> GetPosition()
        {
            return _positionRepository.GetAll().ToList();
        }

        // GET: api/Positions/getpos/5
        [HttpGet("getpos/{id}")]
        public async Task<ActionResult<Position>> GetPosition([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var position = await _positionRepository.Find(id);

            if (position == null)
            {
                return NotFound();
            }

            return position;
        }

        // PUT: api/Positions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosition([FromRoute] int id, [FromBody] Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != position.PositionId)
            {
                return BadRequest();
            }

            try
            {
                await _positionRepository.Update(position);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PositionExists(id))
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

        // POST: api/Positions
        [HttpPost]
        public async Task<ActionResult> PostPosition([FromBody] Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _positionRepository.Add(position);

            return CreatedAtAction("PostPosition", new { id = position.PositionId }, position);
        }

        // DELETE: api/Positions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Position>> DeletePosition([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (!await PositionExists(id))
            {
                return NotFound();
            }

            var position_ = await _positionRepository.Remove(id);

            return position_;
        }

        private async Task<bool> PositionExists(int id)
        {
            return await _positionRepository.Exist(id);
        }


        ///////////////////////////////////////////// дополнительные методы/////////////////////////////////////

       

        

        // вывод списка всех должностей для выбраного отдела предприятия
        //// GET    api/Positions/getposlist/1
        [HttpGet("getposlist/{departmentid}")]
        public IEnumerable<Position> Dep_Pos_List(int departmentid)
        {
            return _positionRepository.Pos_List(departmentid).ToList();                
        }


        ///// В КЛЕНТЕ !!  проверка при добавление новой специальности в отдел (проверка на повтор)

    }
}