using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RussianCuisine.Data;
using RussianCuisine.DTOs;
using RussianCuisine.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RussianCuisine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly RussianCuisineDbContext _context;

        public ReviewsController(RussianCuisineDbContext context)
        {
            _context = context;
        }

        [HttpGet("restaurant/{restaurantId}")]
        public async Task<ActionResult<List<ReviewDto>>> GetReviews(int restaurantId)
        {
            var restaurantExists = await _context.Restaurants
                .AnyAsync(r => r.RestaurantId == restaurantId && (bool)!r.IsDeleted);

            if (!restaurantExists)
                return NotFound("Restaurant not found");

            var reviews = await _context.Reviews
                .Where(r => r.RestaurantId == restaurantId && (bool)!r.IsDeleted)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            var result = reviews.Select(r => new ReviewDto
            {
                Id = r.ReviewId,
                AuthorName = r.AuthorName ?? "Аноним",
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.CreatedAt
            }).ToList();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDto>> CreateReview(CreateReviewDto dto)
        {
            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest("Rating must be between 1 and 5");

            if (string.IsNullOrWhiteSpace(dto.Comment))
                return BadRequest("Comment is required");

            var restaurantExists = await _context.Restaurants
                .AnyAsync(r => r.RestaurantId == dto.RestaurantId && (bool)!r.IsDeleted);

            if (!restaurantExists)
                return BadRequest("Invalid restaurant ID");

            var review = new Review
            {
                RestaurantId = dto.RestaurantId,
                AuthorName = string.IsNullOrWhiteSpace(dto.AuthorName) ? null : dto.AuthorName,
                Rating = dto.Rating,
                Comment = dto.Comment,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            var result = new ReviewDto
            {
                Id = review.ReviewId,
                AuthorName = review.AuthorName ?? "Аноним",
                Rating = review.Rating,
                Comment = review.Comment,
                CreatedAt = review.CreatedAt
            };

            return CreatedAtAction(nameof(GetReviews), new { restaurantId = dto.RestaurantId }, result);
        }
    }
}