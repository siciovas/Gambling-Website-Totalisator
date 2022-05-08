using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PSAIPI.Migrations
{
    public partial class AddPrizes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Prizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsOrdered = table.Column<bool>(type: "bit", nullable: false),
                    IsRedeemed = table.Column<bool>(type: "bit", nullable: false),
                    TimeToRedeem = table.Column<int>(type: "int", nullable: false),
                    Remainder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prizes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Prizes");
        }
    }
}
