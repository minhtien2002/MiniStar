using Domain.Entities;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Category> result = await unitOfWork.Categories.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("GetById={id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Category result = await unitOfWork.Categories.GetByIdAsync(id);
            if (result == null) return BadRequest("NOT FOUND!");
            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] Category result)
        {
            Category c = new Category()
            {
                CategoryName = result.CategoryName,
                CreateAt = result.CreateAt,
                IsDeleted = result.IsDeleted,
            };    
            await unitOfWork.Categories.AddAsync(c);
            await unitOfWork.CompleteAsync();
            return Ok(result);
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] Category result)
        {
            Category c = await unitOfWork.Categories.GetByIdAsync(result.CategoryId);
            if (c == null) return BadRequest("NOT FOUND!");
            c.CategoryName = result.CategoryName;
            c.UpdateAt = result.UpdateAt;
            c.IsDeleted = result.IsDeleted;
            unitOfWork.Categories.Update(c);
            await unitOfWork.CompleteAsync();
            return Ok("Edit Success!");
        }

        [HttpDelete("DeleteById={id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Category result = await unitOfWork.Categories.GetByIdAsync(id);
            if (result == null) return BadRequest("NOT FOUND!");
            unitOfWork.Categories.Remove(result);
            await unitOfWork.CompleteAsync();
            return Ok("Delete Success!");
        }

        [HttpGet("GetCount")]
        public async Task<IActionResult> GetCount()
        {
            int result = await unitOfWork.Categories.GetCountAsync();
            return Ok(result);
        }
    }
}
