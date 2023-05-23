using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class OrganizationEntityAdded2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppOrganizationId",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "Organizations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppOrganizationId",
                table: "Photos",
                column: "AppOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Organizations_AppOrganizationId",
                table: "Photos",
                column: "AppOrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Organizations_AppOrganizationId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_AppOrganizationId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "AppOrganizationId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "Organizations");
        }
    }
}
