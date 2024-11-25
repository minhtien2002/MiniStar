using CartViewModel;

namespace CartServices.Interfaces
{
    public interface ICartService
    {
        Task<CartViewModel.CartViewModel> GetCartByUserIdAsync(int userId);
        Task<bool> AddToCartAsync(int userId, int productId, int quantity);
        Task<bool> RemoveFromCartAsync(int userId, int cartItemId);
        Task<bool> ClearCartAsync(int userId);
    }
}
