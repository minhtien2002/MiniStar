using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductDataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Brand_BrandId",
                table: "Product");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(5989),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 628, DateTimeKind.Local).AddTicks(6553));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(5708),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 628, DateTimeKind.Local).AddTicks(4655));

            migrationBuilder.AlterColumn<int>(
                name: "BrandId",
                table: "Product",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(1715),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 633, DateTimeKind.Local).AddTicks(6220));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(1450),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 633, DateTimeKind.Local).AddTicks(4027));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(181),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 632, DateTimeKind.Local).AddTicks(2979));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(9917),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 632, DateTimeKind.Local).AddTicks(1200));

            migrationBuilder.InsertData(
                table: "Brand",
                columns: new[] { "BrandId", "BrandName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[] { 1, "asas", new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(2222), true, new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(2222) });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "CategoryId", "CategoryName", "CreateAt", "IsDeleted", "UpdateAt" },
                values: new object[] { 1, "tiemgu", new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(2115), true, new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(2117) });

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Brand_BrandId",
                table: "Product",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "BrandId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Brand_BrandId",
                table: "Product");

            migrationBuilder.DeleteData(
                table: "Brand",
                keyColumn: "BrandId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "CategoryId",
                keyValue: 1);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 628, DateTimeKind.Local).AddTicks(6553),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(5989));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 628, DateTimeKind.Local).AddTicks(4655),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(5708));

            migrationBuilder.AlterColumn<int>(
                name: "BrandId",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 633, DateTimeKind.Local).AddTicks(6220),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(1715));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Category",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 633, DateTimeKind.Local).AddTicks(4027),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(1450));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 632, DateTimeKind.Local).AddTicks(2979),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 906, DateTimeKind.Local).AddTicks(181));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "Brand",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 25, 17, 4, 16, 632, DateTimeKind.Local).AddTicks(1200),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 25, 23, 0, 4, 905, DateTimeKind.Local).AddTicks(9917));

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Brand_BrandId",
                table: "Product",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
