using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RussianCuisine.Models;

[Table("Restaurant")]
public partial class Restaurant
{
    [Key]
    [Column("restaurant_id")]
    public int RestaurantId { get; set; }

    [Column("name")]
    [StringLength(255)]
    public string Name { get; set; } = null!;

    [Column("description")]
    public string? Description { get; set; }

    [Column("address")]
    [StringLength(500)]
    public string Address { get; set; } = null!;

    [Column("phone")]
    [StringLength(30)]
    public string? Phone { get; set; }

    [Column("opening_hours")]
    public string? OpeningHours { get; set; }

    [Column("website_url")]
    [StringLength(255)]
    public string? WebsiteUrl { get; set; }

    [Column("created_at", TypeName = "timestamp without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [Column("deleted_at", TypeName = "timestamp without time zone")]
    public DateTime? DeletedAt { get; set; }

    [Column("is_deleted")]
    public bool? IsDeleted { get; set; }

    [InverseProperty("Restaurant")]
    public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

    [InverseProperty("Restaurant")]
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
