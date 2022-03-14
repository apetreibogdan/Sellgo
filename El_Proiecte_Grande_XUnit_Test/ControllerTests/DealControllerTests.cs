using El_Proyecte_Grande.Controllers;
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace El_Proyecte_Grande_XUnit_Test.ControllerTests
{
    public class DealControllerTests
    {
        private readonly Mock<IServiceDeal> repositoryStub = new Mock<IServiceDeal>();

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

        [Fact]
        public async Task GetDeal_WithExistingDeal_ReturnsExpectedDeal()
        {
            //Arrange
            var expectedDeal = dealsDto[0];
            var dealID = 1;

            repositoryStub.Setup(repo => repo.GetDealById(dealID))
                .ReturnsAsync(expectedDeal);

            var controller = new DealController(repositoryStub.Object);

            //Act 
            var result = await controller.GetDealById(dealID);

            //Assert
            result.Should().BeEquivalentTo(
                expectedDeal,
                options => options.ComparingByMembers<Deal>());
        }

        [Fact]
        public async void GetDeals_WithExistingDeals_ReturnsAllDeals()
        {
            //Arrange
            var expectedDeals = dealsDto;

            repositoryStub.Setup(repo => repo.GetDealsList())
                .ReturnsAsync(expectedDeals);

            var controller = new DealController(repositoryStub.Object);

            //Act 
            var actualDeals = await controller.GetDeals();

            //Assert
            actualDeals.Should().BeEquivalentTo(
                expectedDeals,
                option => option.ComparingByMembers<Deal>());
        }

        [Fact]
        public async void AddDeal_WithDealTOAdd_ReturnsAddedDeal()
        {
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
            repositoryStub.Setup(x => x.AddDeal(newDeal)).ReturnsAsync(new Deal
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
            var controller = new DealController(repositoryStub.Object);
            //Act
            Deal deal = await controller.AddDeal(newDeal);

            //Assert 
            Assert.Equal(deal.Id, newDeal.Id);

        }
    }
}
