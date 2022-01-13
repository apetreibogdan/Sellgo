﻿using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IAppDbRepository _db;
        private ServiceProduct services;
        public ProductController(IAppDbRepository db)
        {
            _db = db;
            services = new ServiceProduct(_db);
        }
        //GET Products
        [HttpGet]
        // [ValidateAntiForgeryToken]
        public async Task<List<Product>> GetProducts()
        {
            List<Product> result = await services.GetProductList();
            return result;
        }

        //GET Product
        [HttpGet]
        [Route("{id:int}")]
        public async Task<Product> GetProduct([FromRoute] int id)
        {
            Product result = await services.GetProductById(id);
            return result;
        }

        //Add Product  
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }
            return Ok(await services.AddProduct(product));
        }

        //Delete Product 
        [HttpDelete]
        public async Task<IActionResult> DeleteProduct([FromQuery] int id)
        {

            Product product = _db.Data.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(await services.DeleteProduct(id));

        }

        //Update Product 
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {

            if (id != product.Id)
            {
                return BadRequest();
            }

            _db.Data.Entry(product).State = EntityState.Modified;

            try
            {
                await _db.Data.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Data.Products.Any(product => product.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();

        }
    }
}
