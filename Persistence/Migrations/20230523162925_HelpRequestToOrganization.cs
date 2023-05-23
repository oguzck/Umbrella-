using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class HelpRequestToOrganization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RelatedOrganizationId",
                table: "HelpRequests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HelpRequests_RelatedOrganizationId",
                table: "HelpRequests",
                column: "RelatedOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpRequests_Organizations_RelatedOrganizationId",
                table: "HelpRequests",
                column: "RelatedOrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpRequests_Organizations_RelatedOrganizationId",
                table: "HelpRequests");

            migrationBuilder.DropIndex(
                name: "IX_HelpRequests_RelatedOrganizationId",
                table: "HelpRequests");

            migrationBuilder.DropColumn(
                name: "RelatedOrganizationId",
                table: "HelpRequests");
        }
    }
}
