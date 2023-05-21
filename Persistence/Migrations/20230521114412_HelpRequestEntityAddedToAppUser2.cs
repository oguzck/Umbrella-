using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class HelpRequestEntityAddedToAppUser2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpRequests_AspNetUsers_AuthorId1",
                table: "HelpRequests");

            migrationBuilder.DropIndex(
                name: "IX_HelpRequests_AuthorId1",
                table: "HelpRequests");

            migrationBuilder.DropColumn(
                name: "AuthorId1",
                table: "HelpRequests");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "HelpRequests",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_HelpRequests_AuthorId",
                table: "HelpRequests",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_HelpRequests_AspNetUsers_AuthorId",
                table: "HelpRequests",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HelpRequests_AspNetUsers_AuthorId",
                table: "HelpRequests");

            migrationBuilder.DropIndex(
                name: "IX_HelpRequests_AuthorId",
                table: "HelpRequests");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                table: "HelpRequests",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

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
    }
}
