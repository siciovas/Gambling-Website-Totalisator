namespace PSAIPI.Models
{
    public class Prize
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsOrdered { get; set; }
        public bool IsRedeemed { get; set; }
        public int TimeToRedeem { get; set; }
        public int Remainder { get; set; }
        public int Cost { get; set; }
    }
}
