namespace PSAIPI.Payloads
{
    public class UpdateUserBalancePayload
    {
        public int userId { get; set; }
        public double balance { get; set; }
        public int prizeCost { get; set; }
    }
}
