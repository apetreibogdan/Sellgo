using El_Proyecte_Grande.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(user => user.Email).IsUnique(); });


            modelBuilder.Entity<Team>().HasMany(team => team.Sellers)
                .WithOne(user => user.Team)
                .HasForeignKey(user => user.TeamId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Team>().HasOne(team => team.Manager)
                .WithOne().HasForeignKey<Team>(team => team.ManagerId)
                .OnDelete(DeleteBehavior.NoAction);


            base.OnModelCreating(modelBuilder);
        }

        //public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Deal> Deals { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Interception> Interceptions { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }
        public DbSet<PersonalApproach> PersonalApproaches { get; set; }
        public DbSet<ProfessionalApproach> ProfessionalApproaches { get; set; }

    }
}
