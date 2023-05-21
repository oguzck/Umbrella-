using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class HelpRequestEntityAddedToAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AuthorId",
                table: "HelpRequests",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "AuthorId1",
                table: "HelpRequests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HelpRequests_AuthorId1",
                table: "HelpRequests",
                column: "AuthorId1");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpRequests_AspNetUsers_AuthorId1",
                table: "HelpRequests",
                column: "AuthorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpRequests_AspNetUsers_AuthorId1",
                table: "HelpRequests");

            migrationBuilder.DropIndex(
                name: "IX_HelpRequests_AuthorId1",
                table: "HelpRequests");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "HelpRequests");

            migrationBuilder.DropColumn(
                name: "AuthorId1",
                table: "HelpRequests");
        }
    }
}
