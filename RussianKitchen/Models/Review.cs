using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RussianKitchen.Models;

[Table("Review")]
[Index("RestaurantId", Name = "idx_review_restaurant_id")]
public partial class Review
{
    [Key]
    [Column("review_id")]
    public int ReviewId { get; set; }

    [Column("restaurant_id")]
    public int RestaurantId { get; set; }

    [Column("author_name")]
    [StringLength(100)]
    public string? AuthorName { get; set; }

    [Column("rating")]
    public short? Rating { get; set; }

    [Column("comment")]
    public string? Comment { get; set; }

    [Column("created_at", TypeName = "timestamp without time zone")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at", TypeName = "timestamp without time zone")]
    public DateTime? UpdatedAt { get; set; }

    [Column("deleted_at", TypeName = "timestamp without time zone")]
    public DateTime? DeletedAt { get; set; }

    [Column("is_deleted")]
    public bool? IsDeleted { get; set; }

    [ForeignKey("RestaurantId")]
    [InverseProperty("Reviews")]
    public virtual Restaurant Restaurant { get; set; } = null!;
}
