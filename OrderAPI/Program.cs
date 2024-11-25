using Microsoft.EntityFrameworkCore;
using OrderDataAccess;
using OrderServices.Implementation;
using OrderServices.Interface;

var builder = WebApplication.CreateBuilder(args);

// Configure database connection
builder.Services.AddDbContext<OderDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("OrderDbConnection")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
// Configure services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddControllers();

// Swagger configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowReactApp");
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
