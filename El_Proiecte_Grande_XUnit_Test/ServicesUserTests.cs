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
    public class ServicesUserTests
    {
        private readonly ServiceUser _systemUnderTest;
        private readonly Mock<IAppDbRepository> dbMock =
            new Mock<IAppDbRepository>();

        private List<User> usersDto = new List<User>() {
                new User()
                {
                    FirstName = "Ana",
                    LastName = "Dark",
                    Password = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                    ConfirmPassword = null,
                    Position = El_Proyecte_Grande.Utils.UserPosition.Salesman,
                    Image = null,
                    Deals = null,
                    TeamId = null,
                    Team = null,
                    Id = "4c71e9c8-17bc-4a48-96f0-aa54317077a1",
                    UserName = "ana@gmail.com",
                    NormalizedUserName = "ANA@GMAIL.COM",
                    Email = "ana@gmail.com",
                    NormalizedEmail = "ANA@GMAIL.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEFtwbELUtsEbUC73l9Ru6Vc9FMcpA975m6n2dH1BxxlSjfs6xmq3TWeWln2RQbFnIA==",
                    SecurityStamp = "HC6KYWIIVBJZ63V7COV2JRU2RZLWCZIV",
                    ConcurrencyStamp = "1d448400-507b-47a6-9198-8a6c4376d1e2",
                    PhoneNumber = null,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = null,
                    LockoutEnabled = true,
                    AccessFailedCount = 0

                }, new User()
                {

                    FirstName = "John",
                    LastName = "Moshe",
                    Password = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                    ConfirmPassword = null,
                    Position = El_Proyecte_Grande.Utils.UserPosition.Manager,
                    Image = null,
                    Deals = null,
                    TeamId = null,
                    Team = null,
                    Id = "4c71e9c8-17bc-4a48-96f0-aa54317077a2",
                    UserName = "john@gmail.com",
                    NormalizedUserName = "JOHN@GMAIL.COM",
                    Email = "john@gmail.com",
                    NormalizedEmail = "JOHN@GMAIL.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEFtwbELUtsEbUC73l9Ru6Vc9FMcpA975m6n2dH1BxxlSjfs6xmq3TWeWln2RQbFnIA==",
                    SecurityStamp = "HC6KYWIIVBJZ63V7COV2JRU2RZLWCZIV",
                    ConcurrencyStamp = "1d448400-507b-47a6-9198-8a6c4376d1e2",
                    PhoneNumber = null,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = null,
                    LockoutEnabled = true,
                    AccessFailedCount = 0


                }, new User()
                {
                    FirstName = "James",
                    LastName = "Allison",
                    Password = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                    ConfirmPassword = null,
                    Position = El_Proyecte_Grande.Utils.UserPosition.Admin,
                    Image = null,
                    Deals = null,
                    TeamId = null,
                    Team = null,
                    Id = "4c71e9c8-17bc-4a48-96f0-aa54317077a3",
                    UserName = "james@gmail.com",
                    NormalizedUserName = "JAMES@GMAIL.COM",
                    Email = "james@gmail.com",
                    NormalizedEmail = "JAMES@GMAIL.COM",
                    EmailConfirmed = false,
                    PasswordHash = "AQAAAAEAACcQAAAAEFtwbELUtsEbUC73l9Ru6Vc9FMcpA975m6n2dH1BxxlSjfs6xmq3TWeWln2RQbFnIA==",
                    SecurityStamp = "HC6KYWIIVBJZ63V7COV2JRU2RZLWCZIV",
                    ConcurrencyStamp = "1d448400-507b-47a6-9198-8a6c4376d1e2",
                    PhoneNumber = null,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnd = null,
                    LockoutEnabled = true,
                    AccessFailedCount = 0


                }
        };

        public ServicesUserTests()
        {
            _systemUnderTest = new ServiceUser(dbMock.Object);

        }

        [Fact]
        public async Task GetUserByIdAsync_ShouldReturnAUser_WithID_WhenUser_Exist()
        {
            //Arrange
            String userID = "4c71e9c8-17bc-4a48-96f0-aa54317077a3";

            dbMock.Setup(x => x.GetUserAsync(userID)).ReturnsAsync(usersDto.
                Where(user => user.Id == userID).SingleOrDefault());

            //Act
            var user = await _systemUnderTest.GetUser(userID);

            //Assert
            Assert.Equal(userID, user.Id);

        }

        [Fact]
        public async Task GetUsersListAsync_ShouldReturnAllUsers()
        {
            //Arrange

            dbMock.Setup(x => x.GetUsersAsync()).ReturnsAsync(usersDto);

            //Act
            var users = await _systemUnderTest.GetUsers();

            //Assert 
            Assert.Equal(users.Count, usersDto.Count);

        }

        [Fact]
        public void TryAddUser_ShouldReturnAllUsers()
        {
            //Arrange
            User newUser = new User()
            {
                FirstName = "Andrew",
                LastName = "Shovlin",
                Password = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                ConfirmPassword = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                Position = El_Proyecte_Grande.Utils.UserPosition.Admin,
                Image = null,
                Deals = null,
                TeamId = null,
                Team = null,
                Id = "4c71e9c8-17bc-4a48-96f0-aa54317077a4",
                UserName = "andrew@gmail.com",
                NormalizedUserName = "ANDREW@GMAIL.COM",
                Email = "andrew@gmail.com",
                NormalizedEmail = "ANDREW@GMAIL.COM",
                EmailConfirmed = false,
                PasswordHash = "AQAAAAEAACcQAAAAEFtwbELUtsEbUC73l9Ru6Vc9FMcpA975m6n2dH1BxxlSjfs6xmq3TWeWln2RQbFnIA==",
                SecurityStamp = "HC6KYWIIVBJZ63V7COV2JRU2RZLWCZIV",
                ConcurrencyStamp = "1d448400-507b-47a6-9198-8a6c4376d1e2",
                PhoneNumber = null,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnd = null,
                LockoutEnabled = true,
                AccessFailedCount = 0
            };

            var estimate = newUser.Password == newUser.ConfirmPassword ? true : false;

            //Act
            var result = _systemUnderTest.TryAddUser(newUser);

            //Assert 
            Assert.Equal(result, estimate);

        }

        [Fact]
        public async Task DeleteUserAsync_ShouldDeleteAUser_WithCorrectID_WhenUser_Exist()
        {
            //Arrange
            String userID = "4c71e9c8-17bc-4a48-96f0-aa54317077a2";

            dbMock.Setup(x => x.DeleteUserAsync(userID)).ReturnsAsync(usersDto.
                Where(user => user.Id == userID).
                Select(user => " ID:" + user.Id.ToString() + " is deleted").
                SingleOrDefault().ToString());

            string result = usersDto.Where(user => user.Id == userID).
                Select(user => " ID:" + user.Id.ToString() + " is deleted").
                SingleOrDefault().ToString();

            //Act
            string deletedUser = await _systemUnderTest.DeleteUser(userID);

            //Assert
            Assert.Equal(deletedUser, result);

        }

        [Fact]
        public async Task AddUserAsync_ShouldReturnTheAddedUser()
        {
            //Arrange
            User newUser = new User()
            {
                FirstName = "Andrew",
                LastName = "Shovlin",
                Password = "Ctcwb4sLby/TWhvYGiwtX0g0ZmnyhzE6ZitdwvBasfs=",
                ConfirmPassword = null,
                Position = El_Proyecte_Grande.Utils.UserPosition.Admin,
                Image = null,
                Deals = null,
                TeamId = null,
                Team = null,
                Id = "4c71e9c8-17bc-4a48-96f0-aa54317077a4",
                UserName = "andrew@gmail.com",
                NormalizedUserName = "ANDREW@GMAIL.COM",
                Email = "andrew@gmail.com",
                NormalizedEmail = "ANDREW@GMAIL.COM",
                EmailConfirmed = false,
                PasswordHash = "AQAAAAEAACcQAAAAEFtwbELUtsEbUC73l9Ru6Vc9FMcpA975m6n2dH1BxxlSjfs6xmq3TWeWln2RQbFnIA==",
                SecurityStamp = "HC6KYWIIVBJZ63V7COV2JRU2RZLWCZIV",
                ConcurrencyStamp = "1d448400-507b-47a6-9198-8a6c4376d1e2",
                PhoneNumber = null,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnd = null,
                LockoutEnabled = true,
                AccessFailedCount = 0
            };
            dbMock.Setup(x => x.AddUserAsync(newUser)).ReturnsAsync(new User
            {

                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Password = newUser.Password,
                ConfirmPassword = newUser.ConfirmPassword,
                Position = newUser.Position,
                Image = newUser.Image,
                Deals = newUser.Deals,
                TeamId = newUser.TeamId,
                Team = newUser.Team,
                Id = newUser.Id,
                UserName = newUser.UserName,
                NormalizedUserName = newUser.NormalizedUserName,
                Email = newUser.Email,
                NormalizedEmail = newUser.NormalizedEmail,
                EmailConfirmed = newUser.EmailConfirmed,
                PasswordHash = newUser.PasswordHash,
                SecurityStamp = newUser.SecurityStamp,
                ConcurrencyStamp = newUser.ConcurrencyStamp,
                PhoneNumber = newUser.PhoneNumber,
                PhoneNumberConfirmed = newUser.PhoneNumberConfirmed,
                TwoFactorEnabled = newUser.TwoFactorEnabled,
                LockoutEnd = newUser.LockoutEnd,
                LockoutEnabled = newUser.LockoutEnabled,
                AccessFailedCount = newUser.AccessFailedCount
            });

            //Act
            User user = await _systemUnderTest.AddUser(newUser);

            //Assert 
            Assert.Equal(user.Id, newUser.Id);
        }
    }
}
