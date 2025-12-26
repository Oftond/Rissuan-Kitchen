using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RussianKitchen.Data;
using RussianKitchen.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RussianKitchen.Controllers
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
        public async Task<ActionResult<List<RestaurantDto>>> GetRestaurants()
        {
            var restaurants = await _context.Restaurants.Where((r) => (bool)!r.IsDeleted).ToListAsync();

            var result = restaurants.Select(r => new RestaurantDto
            {
                Id = r.RestaurantId,
                Name = r.Name,
                Description = r.Description,
                Address = r.Address,
                Phone = r.Phone,
                OpeningHours = r.OpeningHours,
                WebsiteUrl = r.WebsiteUrl,
                Menu = r.MenuItems.Where(m => (bool)m.IsAvailable && (bool)!m.IsDeleted)
                .Select(m => new MenuItemDto
                {
                    Id = m.MenuItemId,
                    Name = m.Name,
                    Price = m.Price,
                    Category = m.Category,
                    ImageUrl = m.ImageUrl
                }).ToList()
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantDto>> GetRestaurant(int id)
        {
            var restaurant = await _context.Restaurants
                .Include(r => r.MenuItems)
                .FirstOrDefaultAsync(r => r.RestaurantId == id && (bool)!r.IsDeleted);

            if (restaurant == null)
                return NotFound();

            var result = new RestaurantDto
            {
                Id = restaurant.RestaurantId,
                Name = restaurant.Name,
                Description = restaurant.Description,
                Address = restaurant.Address,
                Phone = restaurant.Phone,
                OpeningHours = restaurant.OpeningHours,
                WebsiteUrl = restaurant.WebsiteUrl,
                Menu = restaurant.MenuItems
                    .Where(m => (bool)m.IsAvailable && (bool)!m.IsDeleted)
                    .Select(m => new MenuItemDto
                    {
                        Id = m.MenuItemId,
                        Name = m.Name,
                        Price = m.Price,
                        Category = m.Category,
                        ImageUrl = m.ImageUrl
                    }).ToList()
            };

            return Ok(result);
        }
    }
}
