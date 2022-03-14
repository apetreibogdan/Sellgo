using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;


namespace El_Proyecte_Grande_XUnit_Test
{
    public class ServicesClientTests
    {
        private readonly ServiceClient _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

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

        public ServicesClientTests()
        {
            _systemUnderTest = new ServiceClient(dbMock.Object);

        }

        [Fact]
        public async Task GetClientByIdAsync_ShouldReturnAClient_WithID_WhenClient_Exist()
        {
            //Arrange
            var clientID = 1;

            dbMock.Setup(x => x.GetClientByIdAsync(clientID)).ReturnsAsync(clientsDto.
                Where(client => client.Id == clientID).SingleOrDefault());

            //Act
            var client = await _systemUnderTest.GetClientByIdAsync(clientID);

            //Assert
            Assert.Equal(clientID, client.Id);

        }

        [Fact]
        public async Task GetClientsListAsync_ShouldReturnAllClients()
        {
            //Arrange

            dbMock.Setup(x => x.GetClientsListAsync()).ReturnsAsync(clientsDto);

            //Act
            var clients = await _systemUnderTest.GetClientsListAsync();

            //Assert 
            Assert.Equal(clients, clientsDto);

        }

        [Fact]
        public async Task DeleteClientAsync_ShouldDeleteAClient_WithCorrectID_WhenClient_Exist()
        {
            //Arrange
            var clientID = 1;

            dbMock.Setup(x => x.DeleteClientAsync(clientID)).ReturnsAsync(clientsDto.
                Where(client => client.Id == clientID).
                Select(client => client.FirstName + " " + client.LastName + " id: " + client.Id.ToString()).
                SingleOrDefault().ToString());

            string result = clientsDto.Where(client => client.Id == clientID).Select(client => client.FirstName + " " + client.LastName + " id: " + client.Id.ToString()).
                SingleOrDefault().ToString();

            //Act
            string deletedClient = await _systemUnderTest.DeleteClientAsync(clientID);

            //Assert
            Assert.Equal(deletedClient, result);

        }

        [Fact]
        public async Task AddClientAsync_ShouldReturnTheAddedClient()
        {
            //Arrange
            Client newClient = new Client()
            {
                Id = clientsDto.Count + 1,
                FirstName = "Miriam",
                LastName = "Guns",
                Email = "miriam.guns@mail.com",
                PhoneNumber = "040395782013",
                CompanyId = 1,
                DateOfBirth = DateTime.Now.AddDays(-12820),
                Position = "Seller",
                Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                Address = " Miriam address"
            };
            dbMock.Setup(x => x.AddClientAsync(newClient)).ReturnsAsync(new Client
            {
                Id = clientsDto.Count + 1,
                FirstName = newClient.FirstName,
                LastName = newClient.LastName,
                Email = newClient.Email,
                PhoneNumber = newClient.PhoneNumber,
                CompanyId = newClient.CompanyId,
                DateOfBirth = newClient.DateOfBirth,
                Position = newClient.Position,
                Gender = newClient.Gender,
                Address = newClient.Address
            });

            //Act
            var client = await _systemUnderTest.AddClientAsync(newClient);

            //Assert 
            Assert.Equal(client.Id, newClient.Id);

        }


    }
}
