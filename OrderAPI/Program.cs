using Microsoft.EntityFrameworkCore;
using OrderDataAccess;
using OrderServices.Implementation;
using OrderServices.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<OMDbContext>(options =>
                options.UseSqlServer("Data Source=localhost,1444;Database=MiniSa;User ID=sa;Password=Tien@123456;TrustServerCertificate=True")
    );
builder.Services.AddTransient<IOrderService, OrderService>();
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

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
