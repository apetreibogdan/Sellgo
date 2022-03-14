using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Services
{
    public class ServiceProduct : IServiceProduct
    {
        public IAppDbRepository Repository { get; set; }


        public ServiceProduct(IAppDbRepository repository)
        {
            Repository = repository;
        }

        public async Task<List<Product>> GetProductList()
        {
            var result = await Repository.GetProductListAsync();
            return result;
        }

        public async Task<Product> GetProductById(int id)
        {
            var result = await Repository.GetProductByIdAsync(id);
            return result;
        }

        public async Task<Product> AddProduct(Product product)
        {
            return await Repository.AddProductAsync(product);
        }

        public async Task<string> DeleteProduct(int id)
        {
            return await Repository.DeleteProductAsync(id);
        }
    }
}
