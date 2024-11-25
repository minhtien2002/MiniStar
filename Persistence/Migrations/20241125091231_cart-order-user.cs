using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class cartorderuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(277),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(532));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 138, DateTimeKind.Local).AddTicks(9755),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(234));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(8770),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6182));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(8371),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(5920));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(6959),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(4835));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(6395),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(4551));

            migrationBuilder.CreateTable(
                name: "carts",
                columns: table => new
                {
                    CartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_carts", x => x.CartId);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuyerId = table.Column<int>(type: "int", nullable: false),
                    OrderStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.OrderId);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.RoleID);
                });

            migrationBuilder.CreateTable(
                name: "cart_items",
                columns: table => new
                {
                    CartItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cart_items", x => x.CartItemId);
                    table.ForeignKey(
                        name: "FK_cart_items_carts_CartId",
                        column: x => x.CartId,
                        principalTable: "carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "order_items",
                columns: table => new
                {
                    OrderItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order_items", x => x.OrderItemId);
                    table.ForeignKey(
                        name: "FK_order_items_orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmailVerified = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_users_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "roles",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "addresses",
                columns: table => new
                {
                    AddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    AddressType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_addresses", x => x.AddressId);
                    table.ForeignKey(
                        name: "FK_addresses_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Brand",
                keyColumn: "BrandId",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 11, 25, 16, 12, 31, 141, DateTimeKind.Local).AddTicks(4045), new DateTime(2024, 11, 25, 16, 12, 31, 141, DateTimeKind.Local).AddTicks(4046) });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 11, 25, 16, 12, 31, 141, DateTimeKind.Local).AddTicks(3878), new DateTime(2024, 11, 25, 16, 12, 31, 141, DateTimeKind.Local).AddTicks(3883) });

            migrationBuilder.CreateIndex(
                name: "IX_addresses_UserId",
                table: "addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_cart_items_CartId",
                table: "cart_items",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_order_items_OrderId",
                table: "order_items",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_users_RoleId",
                table: "users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "addresses");

            migrationBuilder.DropTable(
                name: "cart_items");

            migrationBuilder.DropTable(
                name: "order_items");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "carts");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(532),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(277));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(234),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 138, DateTimeKind.Local).AddTicks(9755));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6182),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(8770));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(5920),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(8371));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(4835),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(6959));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(4551),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 11, 25, 16, 12, 31, 139, DateTimeKind.Local).AddTicks(6395));

            migrationBuilder.UpdateData(
                table: "Brand",
                keyColumn: "BrandId",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6689), new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6690) });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6576), new DateTime(2024, 11, 18, 22, 53, 39, 33, DateTimeKind.Local).AddTicks(6577) });
        }
    }
}
