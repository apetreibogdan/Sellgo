using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace El_Proyecte_Grande_XUnit_Test
{
    public class ServicesProductTests
    {
        private readonly ServiceProduct _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

        private List<Product> productsDto = new List<Product>() {
                new Product()
                {
                    Id = 1,
                    Name = "Insurance",
                    Description = "Car Insurance",
                    ActualPrice = 500,
                    MinimPrice = 370,
                    SoldPrice = 400,
                    Guarantees = null,
                    Benefits = null,
                    UpSell = null,
                    CrossSell = null,
                    BundlingSell = null,
                    DealId = 1,
                    Deal = null

                }, new Product()
                {

                    Id = 2,
                    Name = "Insurance",
                    Description = "Car Insurance",
                    ActualPrice = 500,
                    MinimPrice = 370,
                    SoldPrice = 400,
                    Guarantees = null,
                    Benefits = null,
                    UpSell = null,
                    CrossSell = null,
                    BundlingSell = null,
                    DealId = 2,
                    Deal = null


                }, new Product()
                {
                    Id = 3,
                    Name = "Guaranty",
                    Description = "1 Year Service for Car",
                    ActualPrice = 500,
                    MinimPrice = 370,
                    SoldPrice = 370,
                    Guarantees = null,
                    Benefits = null,
                    UpSell = null,
                    CrossSell = null,
                    BundlingSell = null,
                    DealId = 1,
                    Deal = null


                }
        };

        public ServicesProductTests()
        {
            _systemUnderTest = new ServiceProduct(dbMock.Object);

        }

        [Fact]
        public async Task GetProductByIdAsync_ShouldReturnAProduct_WithID_WhenProduct_Exist()
        {
            //Arrange
            var productID = 1;

            dbMock.Setup(x => x.GetProductByIdAsync(productID)).ReturnsAsync(productsDto.
                Where(product => product.Id == productID).SingleOrDefault());

            //Act
            var product = await _systemUnderTest.GetProductById(productID);

            //Assert
            Assert.Equal(productID, product.Id);

        }

        [Fact]
        public async Task GetProductsListAsync_ShouldReturnAllProducts()
        {
            //Arrange

            dbMock.Setup(x => x.GetProductListAsync()).ReturnsAsync(productsDto);

            //Act
            var products = await _systemUnderTest.GetProductList();

            //Assert 
            Assert.Equal(products.Count, productsDto.Count);

        }

        [Fact]
        public async Task DeleteProductAsync_ShouldDeleteAProduct_WithCorrectID_WhenProduct_Exist()
        {
            //Arrange
            var productID = 1;

            dbMock.Setup(x => x.DeleteProductAsync(productID)).ReturnsAsync(productsDto.
                Where(product => product.Id == productID).
                Select(product => product.Name + " ID:" + product.Id.ToString() + " is deleted").
                SingleOrDefault().ToString());

            string result = productsDto.Where(product => product.Id == productID).
                Select(product => product.Name + " ID:" + product.Id.ToString() + " is deleted").
                SingleOrDefault().ToString();

            //Act
            string deletedProduct = await _systemUnderTest.DeleteProduct(productID);

            //Assert
            Assert.Equal(deletedProduct, result);

        }

        [Fact]
        public async Task AddProductAsync_ShouldReturnTheAddedProduct()
        {
            //Arrange
            Product newProduct = new Product()
            {
                Id = productsDto.Count + 1,
                Name = "Guaranty",
                Description = "1 Year Service for Car",
                ActualPrice = 500,
                MinimPrice = 370,
                SoldPrice = 370,
                Guarantees = null,
                Benefits = null,
                UpSell = null,
                CrossSell = null,
                BundlingSell = null,
                DealId = 1,
                Deal = null
            };
            dbMock.Setup(x => x.AddProductAsync(newProduct)).ReturnsAsync(new Product
            {
                Id = productsDto.Count + 1,
                Name = newProduct.Name,
                Description = newProduct.Description,
                ActualPrice = newProduct.ActualPrice,
                MinimPrice = newProduct.MinimPrice,
                SoldPrice = newProduct.SoldPrice,
                Guarantees = newProduct.Guarantees,
                Benefits = newProduct.Benefits,
                UpSell = newProduct.UpSell,
                CrossSell = newProduct.CrossSell,
                BundlingSell = newProduct.BundlingSell,
                DealId = newProduct.DealId,
                Deal = newProduct.Deal
            });

            //Act
            Product product = await _systemUnderTest.AddProduct(newProduct);

            //Assert 
            Assert.Equal(product.Id, newProduct.Id);

        }
    }
}
