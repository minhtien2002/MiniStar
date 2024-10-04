using ProductDataAccess.Entities;
using ProductViewModel;
using ProductViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductServices.Interface
{
    public interface IProductService
    {
        Task<List<Product>> GetAll();
        Task<Product> GetById(int id);
        Task<int> Create(ProductCreateViewModel product);
        Task<int> DeleteById(int id);
        Task<int> Update(ProductEditViewModel product);
    }
}
