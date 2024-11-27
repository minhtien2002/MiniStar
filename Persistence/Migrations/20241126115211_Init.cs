﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    BrandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrandName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(7822)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(8132)),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brand", x => x.BrandId);
                });

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
                name: "Category",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(9240)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(9521)),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
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
                name: "Product",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", maxLength: 20, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    ProductImage = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(2694)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 11, 26, 18, 52, 11, 388, DateTimeKind.Local).AddTicks(3029)),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Product_Brand_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brand",
                        principalColumn: "BrandId");
                    table.ForeignKey(
                        name: "FK_Product_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId",
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
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductImage = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cart_items", x => x.CartItemId);
                    table.ForeignKey(
                        name: "FK_cart_items_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_cart_items_carts_CartId",
                        column: x => x.CartId,
                        principalTable: "carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.InsertData(
                table: "Brand",
                columns: new[] { "BrandId", "BrandName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[,]
                {
                    { 1, "Vượng CP", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1250), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1251) },
                    { 2, "TONY Fruit", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1253), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1254) },
                    { 3, "NYTO Fresh", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1255), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1256) },
                    { 4, "Lavie", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1257), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1258) },
                    { 5, "OneOne", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1259), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1259) }
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "CategoryId", "CategoryName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[,]
                {
                    { 1, "Thịt heo", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1103), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1106) },
                    { 2, "Hoa quả", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1109), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1110) },
                    { 3, "Rau củ", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1111), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1111) },
                    { 4, "Nước giải khát", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1113), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1113) },
                    { 5, "Đồ ăn vặt", new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1114), true, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1115) }
                });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "RoleID", "RoleName" },
                values: new object[,]
                {
                    { 1, "admin" },
                    { 2, "buyer" },
                    { 3, "supporter" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "ProductId", "BrandId", "CategoryId", "CreateAt", "Description", "Price", "ProductImage", "ProductName", "Quantity", "UpdateAt" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1284), "null", 39m, "xuongheo", "Xương heo có thịt", 100, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1285) },
                    { 2, 2, 2, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1288), "null", 31m, "camsanh", "Cam sành", 300, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1289) },
                    { 3, 3, 3, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1291), "null", 8m, "rauden", "Rau dền", 50, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1291) },
                    { 4, 4, 4, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1293), "null", 6m, "lavie", "Nước khoáng Lavie", 200, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1294) },
                    { 5, 5, 5, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1295), "null", 10m, "banhgao", "Bánh gạo OneOne", 70, new DateTime(2024, 11, 26, 18, 52, 11, 390, DateTimeKind.Local).AddTicks(1296) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_addresses_UserId",
                table: "addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_cart_items_CartId",
                table: "cart_items",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_cart_items_ProductId",
                table: "cart_items",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_order_items_OrderId",
                table: "order_items",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_BrandId",
                table: "Product",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryId",
                table: "Product",
                column: "CategoryId");

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
                name: "Product");

            migrationBuilder.DropTable(
                name: "carts");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "Brand");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
