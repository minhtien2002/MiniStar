using ViewModel;

namespace Interfaces
{
    public interface ICartItemService
    {
        Task<CartItemViewModel> GetCartItemByIdAsync(int cartItemId);
        Task<bool> UpdateCartItemQuantityAsync(int cartItemId, int quantity);
    }
}
