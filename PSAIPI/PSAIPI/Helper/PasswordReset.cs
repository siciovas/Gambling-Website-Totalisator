using PSAIPI.Models;
using PSAIPI.Repositories;
using System.Net.Mail;

namespace PSAIPI.Helper
{
    public class PasswordReset
    {
        private readonly UserRepository userRepository;

        public string Message { get; set; }

 

        public static string CreatePassword(int length)
        {
            try
            {
                byte[] result = new byte[length];

                for (int index = 0; index < length; index++)
                {
                    result[index] = (byte)new Random().Next(33, 126);
                }

                return System.Text.Encoding.ASCII.GetString(result);
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public static void HandlePasswordReset(User user)
        {            
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("kamandaax@gmail.com");
                    mail.To.Add(user.Email);
                    mail.Subject = "Reset your password. | PSAIPI";
                    mail.Body = $@"<h3>Hello, {user.Name}.</h3>
                                <p>You made a request to reset your password.</p>
                                <p>New password is: <b>{user.Password}</b></p>";
                    mail.IsBodyHtml = true;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("kamandaax@gmail.com", "kamandax123");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception)
            {

            }
            
        }
    }
}
