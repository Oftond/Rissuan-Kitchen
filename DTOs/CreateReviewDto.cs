namespace RussianCuisine.DTOs
{
    public class CreateReviewDto
    {
        public int RestaurantId { get; set; }
        public string? AuthorName { get; set; }
        public short? Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}