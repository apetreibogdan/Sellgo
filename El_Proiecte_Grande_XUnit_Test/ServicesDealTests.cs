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
    public class ServicesDealTests
    {
        private readonly ServiceDeal _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

        private List<Deal> dealsDto = new List<Deal>() {
                new Deal()
                {
                      Id = 1,
                      UserId = "67644bd7-2d42-4d52-b04d-562aca305384",
                      Priority = El_Proyecte_Grande.Utils.PriorityTypes.Low,
                      Status = El_Proyecte_Grande.Utils.StatusTypes.NeedsDefined,
                      ClientId = 1,
                      Client = null,
                      Company = null,
                      Interceptions = null,
                      Products = null

                }, new Deal()
                {

                    Id = 2,
                    UserId = "67644bd7-2d42-4d52-b04d-562aca305384",
                    Priority = El_Proyecte_Grande.Utils.PriorityTypes.Medium,
                    Status = El_Proyecte_Grande.Utils.StatusTypes.NeedsDefined,
                    ClientId = 1,
                    Client = null,
                    Company = null,
                    Interceptions = null,
                    Products = null


                }, new Deal()
                {
                    Id = 2,
                    UserId = "67644bd7-2d42-4d52-b04d-562aca305384",
                    Priority = El_Proyecte_Grande.Utils.PriorityTypes.High,
                    Status = El_Proyecte_Grande.Utils.StatusTypes.NeedsDefined,
                    ClientId = 1,
                    Client = null,
                    Company = null,
                    Interceptions = null,
                    Products = null


                }
        };

        public ServicesDealTests()
        {
            _systemUnderTest = new ServiceDeal(dbMock.Object);

        }

        [Fact]
        public async Task GetDealByIdAsync_ShouldReturnADeal_WithID_WhenDeal_Exist()
        {
            //Arrange
            var dealID = 1;

            dbMock.Setup(x => x.GetDealByIdAsync(dealID)).ReturnsAsync(dealsDto.
                Where(deal => deal.Id == dealID).SingleOrDefault());

            //Act
            var deal = await _systemUnderTest.GetDealById(dealID);

            //Assert
            Assert.Equal(dealID, deal.Id);

        }

        [Fact]
        public async Task GetDealsListAsync_ShouldReturnAllDeals()
        {
            //Arrange

            dbMock.Setup(x => x.GetDealsListAsync()).ReturnsAsync(dealsDto);

            //Act
            var deals = await _systemUnderTest.GetDealsList();

            //Assert 
            Assert.Equal(deals.Count, dealsDto.Count);

        }

        [Fact]
        public async Task DeleteDealAsync_ShouldDeleteADeal_WithCorrectID_WhenDeal_Exist()
        {
            //Arrange
            var dealID = 1;

            dbMock.Setup(x => x.DeleteDealAsync(dealID)).ReturnsAsync(dealsDto.
                Where(deal => deal.Id == dealID).
                Select(deal => " ID:" + deal.Id.ToString() + " is deleted").
                SingleOrDefault().ToString());

            string result = dealsDto.Where(deal => deal.Id == dealID).
                Select(deal => " ID:" + deal.Id.ToString() + " is deleted").
                SingleOrDefault().ToString();

            //Act
            string deletedDeal = await _systemUnderTest.DeleteDeal(dealID);

            //Assert
            Assert.Equal(deletedDeal, result);

        }

        [Fact]
        public async Task AddDealAsync_ShouldReturnTheAddedDeal()
        {
            //Arrange
            Deal newDeal = new Deal()
            {
                Id = dealsDto.Count + 1,
                UserId = "67644bd7-2d42-4d52-b04d-562aca305384",
                Priority = El_Proyecte_Grande.Utils.PriorityTypes.Medium,
                Status = El_Proyecte_Grande.Utils.StatusTypes.NeedsDefined,
                ClientId = 1,
                Client = null,
                Company = null,
                Interceptions = null,
                Products = null
            };
            dbMock.Setup(x => x.AddDealAsync(newDeal)).ReturnsAsync(new Deal
            {
                Id = dealsDto.Count + 1,
                UserId = newDeal.UserId,
                Priority = newDeal.Priority,
                Status = newDeal.Status,
                ClientId = newDeal.ClientId,
                Client = newDeal.Client,
                Company = newDeal.Company,
                Interceptions = newDeal.Interceptions,
                Products = newDeal.Products
            });

            //Act
            Deal deal = await _systemUnderTest.AddDeal(newDeal);

            //Assert 
            Assert.Equal(deal.Id, newDeal.Id);
        }

    }
}
