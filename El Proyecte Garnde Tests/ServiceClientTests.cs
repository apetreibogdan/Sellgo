using Castle.Core.Internal;
using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Repository;
using El_Proyecte_Grande.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace El_Proyecte_Garnde_Tests
{
    class ServiceClientTests
    {
        private ServiceClient _systemUnderTest;
        private Mock<IAppDbRepository> dbMock;
        IQueryable<Client> fakeClients = new List<Client> {
                new Client {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@mail.com",
                    PhoneNumber = "040395782013",
                    CompanyId = 1,
                    DateOfBirth = DateTime.Now.AddDays(-12820),
                    Position = "Manager",
                    Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                    Address = "john address"


                },
                new Client()
                {
                    Id = 1,
                    FirstName = "Mike",
                    LastName = "Doe",
                    Email = "mike.doe@mail.com",
                    PhoneNumber = "040395783467",
                    CompanyId = 1,
                    DateOfBirth = DateTime.Now.AddDays(-129872),
                    Position = "Marketing Manager",
                    Gender = El_Proyecte_Grande.Utils.GenderTypes.Male,
                    Address = "mike address"


                }
            }.AsQueryable();


        [SetUp]
        public void SetupServiceClientTest()
        {

            dbMock = new Mock<IAppDbRepository>();

            dbMock.As<IAppDbRepository>().Setup(m => m.Data.Clients.AsQueryable().Provider).Returns(fakeClients.Provider);

            //dbMock.As<IAppDbRepository>().Setup(m => m.Data.Clients.AsQueryable().Provider).Returns(fakeClients.Provider);
            //dbMock.As<IAppDbRepository>().Setup(m => m.Data.Clients.AsQueryable().Expression).Returns(fakeClients.Expression);
            //dbMock.As<IAppDbRepository>().Setup(m => m.Data.Clients.AsQueryable().ElementType).Returns(fakeClients.ElementType);
            //dbMock.As<IAppDbRepository>().Setup(m => m.Data.Clients.AsQueryable().GetEnumerator()).Returns(fakeClients.GetEnumerator());

            _systemUnderTest = new ServiceClient(dbMock.Object);
        }


        [Test]
        public async Task GetClientsListTest_ShouldReturnCutomers_WhenCutomers_Exist()
        {
            //Expected

            List<Client> expectedClients = dbMock.Object.Data.Clients.ToList();

            //Actual

            List<Client> actualClients = await _systemUnderTest.GetClientsListAsync();


            //Assert
            Assert.AreEqual(expectedClients, actualClients);
        }
    }
}
