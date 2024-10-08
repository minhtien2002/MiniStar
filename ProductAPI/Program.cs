using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProductDataAccess;
using ProductServices.Implementation;
using ProductServices.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", b =>
{
    b.AllowAnyMethod()
    .AllowAnyHeader()
    .AllowAnyOrigin();
}));
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddDbContext<PMDbContext>(options =>
                options.UseSqlServer("Data Source=localhost,1444;Database=MiniSa;User ID=sa;Password=Tien@123456;TrustServerCertificate=True")
    );
builder.Services.AddTransient<IProductService, ProductService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
