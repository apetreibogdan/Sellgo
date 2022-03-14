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
    public class CompanyControllerTests
    {

        private readonly Mock<IServiceCompany> repositoryStub = new Mock<IServiceCompany>();

        private List<Company> companiesDto = new List<Company>() {
                new Company()
                {
                    Id = 1,
                    Name = "Romstal",
                    CUI = "054785",
                    Email = "contact@romstal.ro",
                    Address = "Romstal post code",
                    Logo = null,
                    Empmloyees = null,
                    Deals = null,
                    Teams = null

                }, new Company()
                {

                    Id = 2,
                    Name = "Hidrolectrica",
                    CUI = "054785",
                    Email = "contact@Hidroelectrica.ro",
                    Address = "Hidroelectrica post code",
                    Logo = null,
                    Empmloyees = null,
                    Deals = null,
                    Teams = null


                }, new Company()
                {
                    Id = 3,
                    Name = "Transgaz",
                    CUI = "054785",
                    Email = "contact@transgaz.ro",
                    Address = "Transgaz post code",
                    Logo = null,
                    Empmloyees = null,
                    Deals = null,
                    Teams = null


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
        public async Task GetCompany_WithExistingCompany_ReturnsExpectedCompany()
        {
            //Arrange
            var expectedClient = companiesDto[0];
            var clientID = 1;

            repositoryStub.Setup(repo => repo.GetCompanyById(clientID))
                .ReturnsAsync(expectedClient);

            var controller = new CompanyController(repositoryStub.Object);

            //Act 
            var result = await controller.GetCompany(clientID);

            //Assert
            result.Should().BeEquivalentTo(
                expectedClient,
                options => options.ComparingByMembers<Client>());
        }

        [Fact]
        public async void GetCompaniesWithExistingCompanies_ReturnsAllCompaniess()
        {
            //Arrange
            var expectedCompanies = companiesDto;

            repositoryStub.Setup(repo => repo.GetCompaniesList())
                .ReturnsAsync(expectedCompanies);

            var controller = new CompanyController(repositoryStub.Object);

            //Act 
            var actualClients = await controller.GetCompanies();

            //Assert
            actualClients.Should().BeEquivalentTo(
                expectedCompanies,
                option => option.ComparingByMembers<Company>());
        }

        [Fact]
        public async void AddCompany_WithCompanyTOCreate_ReturnsOk()
        {
            //Arrange
            var companyToAdd = companiesDto[0];
            var controller = new CompanyController(repositoryStub.Object);

            //Act 
            IActionResult actionResult = await controller.AddCompany(companyToAdd);
            OkObjectResult okResult = actionResult as OkObjectResult;

            //Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

        }

    }
}
