using Domain.Entities;
using Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEndApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;

        public BrandController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Brand> result = await unitOfWork.Brands.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("GetById={id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Brand result = await unitOfWork.Brands.GetByIdAsync(id);
            if (result == null) return BadRequest("NOT FOUND!");
            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] Brand result)
        {
            Brand b = new Brand()
            {
                BrandId = result.BrandId,
                BrandName = result.BrandName,
                CreateAt = result.CreateAt,
                IsDeleted = result.IsDeleted,
            };
            await unitOfWork.Brands.AddAsync(b);
            unitOfWork.CompleteAsync();
            return Ok(result);
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> Edit([FromBody] Brand result)
        {
            Brand b = await unitOfWork.Brands.GetByIdAsync(result.BrandId);
            if (b == null) return BadRequest("NOT FOUND!");
            b.BrandName = result.BrandName;
            b.UpdateAt = result.UpdateAt;
            b.IsDeleted = result.IsDeleted;
            unitOfWork.Brands.Update(b);
            await unitOfWork.CompleteAsync();
            return Ok(result);
        }

        [HttpDelete("DeleteById={id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Brand result = await unitOfWork.Brands.GetByIdAsync(id);
            if (result == null) return BadRequest("NOT FOUND!");
            unitOfWork.Brands.Remove(result);
            await unitOfWork.CompleteAsync();
            return Ok(result);
        }

        [HttpGet("GetCount")]
        public async Task<IActionResult> GetCount()
        {
            int count = await unitOfWork.Brands.GetCountAsync();
            return Ok(count);
        }
    }
}
