namespace RussianCuisine.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string AuthorName { get; set; } = "Аноним";
        public short? Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; }
    }
}