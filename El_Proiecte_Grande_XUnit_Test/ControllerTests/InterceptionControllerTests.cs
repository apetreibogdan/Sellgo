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
    public class InterceptionControllerTests
    {
        private readonly Mock<IServiceInterception> repositoryStub = new Mock<IServiceInterception>();

        private List<Interception> interceptionsDto = new List<Interception>() {
                new Interception()
                {
                    Id= 1,
                    Date=DateTime.Now.AddDays(-12820),
                    Location= 0,
                    Address= null,
                    OnlineMeet= "www.Skype.ro",
                    DealId= 105
                }, new Interception()
                {
                    Id= 2,
                    Date=DateTime.Now.AddDays(-12620),
                    Location= 0,
                    Address= null,
                    OnlineMeet= "www.googlemeet.ro",
                    DealId= 105
                },new Interception()
                {
                    Id= 3,
                    Date=DateTime.Now.AddDays(-12320),
                    Location= 0,
                    Address= null,
                    OnlineMeet= "www.discord.ro",
                    DealId= 105
                }
        };

        [Fact]
        public async Task GetInterception_WithExistingInterception_ReturnsExpectedInterception()
        {
            //Arrange
            var expectedInterception = interceptionsDto[0];
            var interceptionID = 1;

            repositoryStub.Setup(repo => repo.GetInterceptionById(interceptionID))
                .ReturnsAsync(expectedInterception);

            var controller = new InterceptionController(repositoryStub.Object);

            //Act 
            var result = await controller.GetInterception(interceptionID);

            //Assert
            result.Should().BeEquivalentTo(
                expectedInterception,
                option => option.ComparingByMembers<Interception>()
                );
        }

        [Fact]
        public async Task GetInterceptions_WithExistingInterceptions_ReturnsAllInterceptions()
        {
            //Arrange
            var expectedInterceptions = interceptionsDto;

            repositoryStub.Setup(repo => repo.GetInterceptions())
                .ReturnsAsync(expectedInterceptions);

            var controller = new InterceptionController(repositoryStub.Object);

            //Act 
            var actualInterceptions = await controller.GetInterceptions();

            //Assert
            actualInterceptions.Should().BeEquivalentTo(
                expectedInterceptions,
                option => option.ComparingByMembers<Deal>());
        }

        [Fact]
        public async void AddInterception_WithInterceptionTOCreate_ReturnsOk()
        {
            //Arrange
            var interceptionToAdd = interceptionsDto[0];
            var controller = new InterceptionController(repositoryStub.Object);

            //Act 
            IActionResult actionResult = await controller.AddInterception(interceptionToAdd);
            OkObjectResult okResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

        }

    }  
}
