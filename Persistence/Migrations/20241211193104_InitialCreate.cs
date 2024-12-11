using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 544, DateTimeKind.Local).AddTicks(558)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 544, DateTimeKind.Local).AddTicks(914)),
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
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 544, DateTimeKind.Local).AddTicks(2400)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 544, DateTimeKind.Local).AddTicks(2751)),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
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
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 543, DateTimeKind.Local).AddTicks(5555)),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2024, 12, 12, 2, 31, 4, 543, DateTimeKind.Local).AddTicks(5958)),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
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
                    ProductImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_orders_addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "addresses",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_orders_users_BuyerId",
                        column: x => x.BuyerId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
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
                        name: "FK_order_items_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_items_orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Brand",
                columns: new[] { "BrandId", "BrandName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[,]
                {
                    { 1, "Vượng CP", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6180), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6182) },
                    { 2, "TONY Fruit", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6183), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6184) },
                    { 3, "NYTO Fresh", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6185), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6186) },
                    { 4, "Lavie", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6187), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6188) },
                    { 5, "OneOne", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6189), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6189) },
                    { 6, "FnV", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6190), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6191) },
                    { 7, "Budweiser", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6192), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6192) },
                    { 8, "Neptune", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6193), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6194) }
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "CategoryId", "CategoryName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[,]
                {
                    { 1, "Thịt heo", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6019), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6024) },
                    { 2, "Hoa quả", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6026), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6027) },
                    { 3, "Rau củ", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6028), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6029) },
                    { 4, "Nước giải khát", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6030), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6031) },
                    { 5, "Đồ ăn vặt", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6032), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6032) },
                    { 6, "Gạo", new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6034), true, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6034) }
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
                columns: new[] { "ProductId", "BrandId", "CategoryId", "CreateAt", "Description", "IsDeleted", "Price", "ProductImage", "ProductName", "Quantity", "UpdateAt" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6221), "null", true, 39m, "xuongheo.png", "Xương heo có thịt", 100, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6222) },
                    { 2, 2, 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6226), "null", true, 31m, "camsanh.png", "Cam sành", 300, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6226) },
                    { 3, 3, 3, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6229), "null", true, 8m, "rauden.png", "Rau dền", 50, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6229) },
                    { 4, 4, 4, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6232), "null", true, 6m, "lavie.png", "Nước khoáng Lavie", 200, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6233) },
                    { 5, 5, 5, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6235), "null", true, 10m, "banhgao.png", "Bánh gạo OneOne", 70, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6235) },
                    { 6, 6, 5, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6237), "null", true, 40m, "banhgaotet.png", "Tết rôm rả", 30, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6237) },
                    { 7, 1, 1, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6239), "null", true, 25m, "ucgacoxuong.png", "Ức gà có xương", 10, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6240) },
                    { 8, 3, 3, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6242), "null", true, 10m, "caibexanh.png", "Cải bẹ xanh", 40, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6242) },
                    { 9, 7, 4, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6244), "null", true, 300m, "bia.png", "Thùng 20 lon", 20, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6245) },
                    { 10, 8, 6, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6247), "null", true, 139m, "gao.png", "Gạo ST25 5kg", 60, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6247) }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "UserId", "CreatedAt", "Email", "EmailVerified", "FullName", "Gender", "Password", "PhoneNumber", "RoleId", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6304), "vuongdeptrai@gmail.com", true, "Vuong dep trai", "sigmaMale", "admin", "0123456789", 1, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6305), "admin" },
                    { 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6307), "haixinhgai@gmail.com", true, "Hai xinh gai", "Female", "hai", "0112233445", 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6308), "hai" },
                    { 3, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6309), "tienthieutien@gmail.com", true, "Tien thieu tien", "Male", "tien", "0987654321", 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6310), "tien" }
                });

            migrationBuilder.InsertData(
                table: "addresses",
                columns: new[] { "AddressId", "AddressType", "City", "State", "Street", "UserId" },
                values: new object[] { 1, "home", "ho chi minh", "tan quy", "duong 15", 2 });

            migrationBuilder.InsertData(
                table: "orders",
                columns: new[] { "OrderId", "AddressId", "BuyerId", "CreatedAt", "OrderStatus", "TotalAmount", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, 1, 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6348), "pending", 123m, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6349) },
                    { 2, 1, 3, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6351), "pending", 333m, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6352) },
                    { 3, 1, 2, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6353), "pending", 444m, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6354) },
                    { 4, 1, 3, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6355), "pending", 666m, new DateTime(2024, 12, 12, 2, 31, 4, 545, DateTimeKind.Local).AddTicks(6356) }
                });

            migrationBuilder.InsertData(
                table: "order_items",
                columns: new[] { "OrderItemId", "OrderId", "Price", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 1, 4, 22m, 3, 2 },
                    { 2, 3, 11m, 5, 4 },
                    { 3, 2, 33m, 1, 3 },
                    { 4, 1, 44m, 2, 5 }
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
                name: "IX_order_items_ProductId",
                table: "order_items",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_orders_AddressId",
                table: "orders",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_orders_BuyerId",
                table: "orders",
                column: "BuyerId");

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
                name: "cart_items");

            migrationBuilder.DropTable(
                name: "order_items");

            migrationBuilder.DropTable(
                name: "carts");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "Brand");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "addresses");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
