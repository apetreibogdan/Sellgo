using Microsoft.EntityFrameworkCore.Migrations;

namespace El_Proyecte_Grande.Migrations
{
    public partial class ChangeAddressToStringInCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interceptions_Addresses_AddressId",
                table: "Interceptions");

            migrationBuilder.DropIndex(
                name: "IX_Interceptions_AddressId",
                table: "Interceptions");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_ClientId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Interceptions");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Interceptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_ClientId",
                table: "Addresses",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Addresses_ClientId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Interceptions");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Interceptions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Interceptions_AddressId",
                table: "Interceptions",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_ClientId",
                table: "Addresses",
                column: "ClientId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interceptions_Addresses_AddressId",
                table: "Interceptions",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
