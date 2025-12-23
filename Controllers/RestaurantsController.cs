using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RussianCuisine.Data;
using RussianCuisine.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RussianCuisine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly RussianCuisineDbContext _context;

        public RestaurantsController(RussianCuisineDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<RestaurantPreviewDto>>> GetRestaurants()
        {
            var restaurants = await _context.Restaurants.Include(r => r.MenuItems).Where(r => (bool)!r.IsDeleted).Select((r) => new RestaurantPreviewDto
            {
                Id = r.RestaurantId,
                Name = r.Name,
                Address = r.Address,
                Phone = r.Phone
            }).ToListAsync();

            return Ok(restaurants);
        }

        // GET: api/<RestaurantsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RestaurantsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RestaurantsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RestaurantsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RestaurantsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
