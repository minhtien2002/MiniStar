using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductDataAccess
{
    public class PMDbContextFactory : IDesignTimeDbContextFactory<PMDbContext>
    {
        public PMDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("MSM");
            var optionsBuilder = new DbContextOptionsBuilder<PMDbContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new PMDbContext(optionsBuilder.Options);
        }
    }
}
