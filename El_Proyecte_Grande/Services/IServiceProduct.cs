using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public interface IServiceProduct
    {
        public IAppDbRepository Repository { get; set; }
        Task<Product> AddProduct(Product product);
        Task<string> DeleteProduct(int id);
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProductList();
    }
}