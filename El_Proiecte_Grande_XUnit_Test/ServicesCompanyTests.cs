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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace El_Proyecte_Grande_XUnit_Test
{
    public class ServicesCompanyTests
    {
        private readonly ServiceCompany _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

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

        public ServicesCompanyTests()
        {
            _systemUnderTest = new ServiceCompany(dbMock.Object);

        }

        [Fact]
        public async Task GetCompanyByIdAsync_ShouldReturnACompany_WithID_WhenCompany_Exist()
        {
            //Arrange
            var companyID = 1;

            dbMock.Setup(x => x.GetCompanyByIdAsync(companyID)).ReturnsAsync(companiesDto.
                Where(company => company.Id == companyID).SingleOrDefault());

            //Act
            var company = await _systemUnderTest.GetCompanyById(companyID);

            //Assert
            Assert.Equal(companyID, company.Id);

        }

        [Fact]
        public async Task GetCompaniesListAsync_ShouldReturnAllCompanies()
        {
            //Arrange

            dbMock.Setup(x => x.GetCompaniesListAsync()).ReturnsAsync(companiesDto);

            //Act
            var companies = await _systemUnderTest.GetCompaniesList();

            //Assert 
            Assert.Equal(companies.Count, companiesDto.Count);

        }

        [Fact]
        public async Task DeleteCompanyAsync_ShouldDeleteACompany_WithCorrectID_WhenCompany_Exist()
        {
            //Arrange
            var companyID = 1;

            dbMock.Setup(x => x.DeleteCompanyAsync(companyID)).ReturnsAsync(companiesDto.
                Where(company => company.Id == companyID).
                Select(company => company.Name + " CUI:" + company.CUI + " ID:" + company.Id.ToString() + " is deleted").
                SingleOrDefault().ToString());

            string result = companiesDto.Where(company => company.Id == companyID).
                Select(company => company.Name + " CUI:" + company.CUI + " ID:" + company.Id.ToString() + " is deleted").
                SingleOrDefault().ToString();

            //Act
            string deletedCompany = await _systemUnderTest.DeleteCompany(companyID);

            //Assert
            Assert.Equal(deletedCompany, result);

        }

        [Fact]
        public async Task AddCompanyAsync_ShouldReturnTheAddedCompany()
        {
            //Arrange
            Company newCompany = new Company()
            {
                Id = companiesDto.Count + 1,
                Name = "Transgaz",
                CUI = "054785",
                Email = "contact@transgaz.ro",
                Address = "Transgaz post code",
                Logo = null,
                Empmloyees = null,
                Deals = null,
                Teams = null
            };
            dbMock.Setup(x => x.AddCompanyAsync(newCompany)).ReturnsAsync(new Company
            {
                Id = companiesDto.Count + 1,
                Name = newCompany.Name,
                CUI = newCompany.CUI,
                Email = newCompany.Email,
                Address = newCompany.Address,
                Logo = newCompany.Logo,
                Empmloyees = newCompany.Empmloyees,
                Deals = newCompany.Deals,
                Teams = newCompany.Teams
            });

            //Act
            var client = await _systemUnderTest.AddCompany(newCompany);

            //Assert 
            Assert.Equal(client.Id, newCompany.Id);

        }
    }
}
