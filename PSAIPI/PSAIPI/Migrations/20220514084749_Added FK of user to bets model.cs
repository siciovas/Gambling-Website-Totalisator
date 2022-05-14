using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PSAIPI.Migrations
{
    public partial class AddedFKofusertobetsmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LeagueMemberId",
                table: "Bets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bets_LeagueMemberId",
                table: "Bets",
                column: "LeagueMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bets_League_members_LeagueMemberId",
                table: "Bets",
                column: "LeagueMemberId",
                principalTable: "League_members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bets_League_members_LeagueMemberId",
                table: "Bets");

            migrationBuilder.DropIndex(
                name: "IX_Bets_LeagueMemberId",
                table: "Bets");

            migrationBuilder.DropColumn(
                name: "LeagueMemberId",
                table: "Bets");
        }
    }
}
