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
    public class ServicesInterceptionTests
    {
        private readonly ServiceInterception _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

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

        public ServicesInterceptionTests()
        {
            _systemUnderTest = new ServiceInterception(dbMock.Object);
        }

        [Fact]
        public async Task GetInterceptionByIdAsync_ShouldReturnAInterception_WithID_WhenInterception_Exist()
        {
            //Arrange
            var interceptionId = 1;

            dbMock.Setup(x => x.GetInterceptionByIdAsync(interceptionId)).ReturnsAsync(interceptionsDto.
                Where(inetrception => inetrception.Id == interceptionId).SingleOrDefault());

            //Act
            var interception = await _systemUnderTest.GetInterceptionById(interceptionId);

            //Assert
            Assert.Equal(interceptionId, interception.Id);

        }

        [Fact]
        public async Task GetInterceptionsListAsync_ShouldReturnAllInterceptions()
        {
            //Arrange

            dbMock.Setup(x => x.GetInterceptionsAsync()).ReturnsAsync(interceptionsDto);

            //Act
            var interceptions = await _systemUnderTest.GetInterceptions();

            //Assert 
            Assert.Equal(interceptions, interceptionsDto);

        }

        [Fact]
        public async Task DeleteInterceptionAsync_ShouldDeleteAInterception_WithCorrectID_WhenInterception_Exist()
        {
            //Arrange
            var interceptionId = 1;

            dbMock.Setup(x => x.DeleteInterceptionAsync(interceptionId)).ReturnsAsync(interceptionsDto.
                Where(interception => interception.Id == interceptionId).
                Select(interception => "id: "+interception.Id.ToString() + "online meet:  " + interception.OnlineMeet ).
                SingleOrDefault().ToString());

            string result = interceptionsDto.Where(interception => interception.Id == interceptionId).Select(interception => "id: " + interception.Id.ToString() + "online meet:  " + interception.OnlineMeet).
                SingleOrDefault().ToString();

            //Act
            string deleteInterception = await _systemUnderTest.DeleteInterception(interceptionId);

            //Assert
            Assert.Equal(deleteInterception, result);

        }

        [Fact]
        public async Task AddClientAsync_ShouldReturnTheAddedClient()
        {
            //Arrange

            Interception newInterception = new Interception()
            {
                Id = interceptionsDto.Count + 1,
                Date = DateTime.Now.AddDays(-12820),
                Location = 0,
                Address = null,
                OnlineMeet = "www.Skype.ro",
                DealId = 105
            };
            dbMock.Setup(x => x.AddInterceptionAsync(newInterception)).ReturnsAsync(new Interception
            {
                Id = interceptionsDto.Count + 1,
                Date = newInterception.Date,
                Location = newInterception.Location,
                Address = newInterception.Address,
                OnlineMeet = newInterception.OnlineMeet,
                DealId = newInterception.DealId,

            });

            //Act
            var interception = await _systemUnderTest.AddInterception(newInterception);

            //Assert 
            Assert.Equal(interception.Id, newInterception.Id);

        }


    }
}
