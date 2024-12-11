using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel.Product;

namespace Interfaces
{
    public interface IProductService
    {
        List<ProductViewModel> getProductAllFK();
        Task<List<ProductViewModel>> getProductByCategoryOrBrand(int? categoryId, int? brandId);
        Task<List<ProductViewModel>> sortProductAscendingOrDecreasing(string? sort);
        Task<List<ProductViewModel>> filterByCategoryOrBrand(List<int> category, List<int> brand);
    }
}
