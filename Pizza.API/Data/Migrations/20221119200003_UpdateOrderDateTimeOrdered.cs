using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pizza.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrderDateTimeOrdered : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateTimeDelivered",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTimeDelivered",
                table: "Orders");
        }
    }
}
