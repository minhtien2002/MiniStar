using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace OrderDataAccess
{
    public class OMDbContextFactory : IDesignTimeDbContextFactory<OMDbContext>
    {
        public OMDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("MSM");
            var optionsBuilder = new DbContextOptionsBuilder<OMDbContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new OMDbContext(optionsBuilder.Options);
        }
    }
}
