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

namespace El_Proyecte_Grande_XUnit_Test
{
    public class ClientControllersTests
    {
        private readonly Mock<IServiceClient> repositoryStub = new Mock<IServiceClient>();
       

        private List<Client> clientsDto = new List<Client>() {
                new Client()
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@mail.com",
                    PhoneNumber = "040395782013",
                    CompanyId = 1,
                    DateOfBirth = DateTime.Now.AddDays(-12820),
                    Position = "Manager",
                    Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                    Address = " John address"


                }, new Client()
                {
                Id = 2,
                    FirstName = "Mark",
                    LastName = "Marinna",
                    Email = "mark.marinna@mail.com",
                    PhoneNumber = "040395782013",
                    CompanyId = 1,
                    DateOfBirth = DateTime.Now.AddDays(-12820),
                    Position = "Manager",
                    Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                    Address = " Mark address"


                }, new Client()
                {
                    Id = 3,
                    FirstName = "Anthony",
                    LastName = "Fallon",
                    Email = "anthony.fallon@mail.com",
                    PhoneNumber = "040395782013",
                    CompanyId = 1,
                    DateOfBirth = DateTime.Now.AddDays(-12820),
                    Position = "Seller",
                    Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                    Address = " Anthony address"


                }
        };

        [Fact]
        public void UnitOfWork_StateUnderTest_ExpectedBehavior()
        {
            //Arrange
            
            //Act 

            //Assert

        }

        [Fact]
        public async Task GetClient_WithExistingClient_ReturnsExpectedClient()
        {
            //Arrange
            var expectedClient = clientsDto[0];
            var clientID = 1;

            repositoryStub.Setup(repo => repo.GetClientByIdAsync(clientID))
                .ReturnsAsync(expectedClient);

            var controller = new ClientController(repositoryStub.Object);

            //Act 
            var result = await controller.GetClient(clientID);

            //Assert
            result.Should().BeEquivalentTo(
                expectedClient,
                options => options.ComparingByMembers<Client>());
        }

        [Fact]
        public async void GetClients_WithExistingClients_ReturnsAllClients()
        {
            //Arrange
            var expectedClients = clientsDto;

            repositoryStub.Setup(repo => repo.GetClientsListAsync())
                .ReturnsAsync(expectedClients);

            var controller = new ClientController(repositoryStub.Object);

            //Act 
            var actualClients = await controller.GetClients();

            //Assert
            actualClients.Should().BeEquivalentTo(
                expectedClients,
                option => option.ComparingByMembers<Client>());
        }

        [Fact]
        public async void AddClient_WithClientTOCreate_ReturnsOk()
        {
            //Arrange
            var clientToAdd = clientsDto[0];
            var controller = new ClientController(repositoryStub.Object);

            //Act 
            IActionResult actionResult = await controller.AddClient(clientToAdd) ;
            OkObjectResult okResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

        }

        [Fact]
        public async void DeleteClient_WithExistingClient_ReturnsOk()
        {
            //Arrange
            var clientID = 1;
            var controller = new ClientController(repositoryStub.Object);

            repositoryStub.Setup(x => x.GetClientByIdAsync(clientID)).ReturnsAsync(clientsDto.
                Where(client => client.Id == clientID).SingleOrDefault());

            repositoryStub.Setup(x => x.DeleteClientAsync(clientID)).ReturnsAsync(clientsDto.
               Where(client => client.Id == clientID).
               Select(client => client.FirstName + " " + client.LastName + " id: " + client.Id.ToString()).
               SingleOrDefault().ToString());

            //Act 
            IActionResult actionResult = await controller.DeleteClient(clientID);
            OkObjectResult okResult = actionResult as OkObjectResult;


            //Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

        }
    }
}
