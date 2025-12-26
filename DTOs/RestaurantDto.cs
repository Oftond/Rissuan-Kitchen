namespace RussianKitchen.DTOs
{
    public class RestaurantDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string OpeningHours { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public List<MenuItemDto> Menu { get; set; } = new();
    }
}