using System.Net;
using System.Net.Mail;
using System.Text;

namespace MyEFApi.Helpers
{
    public interface IEmailSender
    {
        //Task<(bool success, string errorMsg)> SendEmailAsync(MailboxAddress sender, MailboxAddress[] recipients, string subject, string body, SmtpConfig config = null, bool isHtml = true);
        Task<(bool success, string errorMsg)> SendEmailAsync(string recipientName, string recipientEmail, string subject, string body, bool isHtml = true);

        //Task<(bool success, string errorMsg)> SendEmailAsync(string senderName, string senderEmail, string recipientName, string recipientEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
    }

    public class EmailSender : IEmailSender
    {
        //private readonly SmtpConfig _config;
        private readonly ILogger _logger;

        //public EmailSender(IOptions<AppSettings> config, ILogger<EmailSender> logger)
        public EmailSender()
        {
            //_config = config.Value.SmtpConfig;
            //_logger = logger;
        }

        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            string recipientName,
            string recipientEmail,
            string subject,
            string body,
            //SmtpConfig config = null,
            bool isHtml = true)
        {
            try
            {
                using var client = new SmtpClient("smtp-relay.brevo.com", 587)
                {
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential("bechir.mhadhbi@gmail.com", "EJyx2LKXPtg0s31N")
                };

                var message = new MailMessage
                {
                    From = new MailAddress("bechir.mhadhbi@gmail.com"),
                    Subject = subject,
                    SubjectEncoding = Encoding.UTF8,
                    BodyEncoding = Encoding.UTF8,
                    BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable,
                    Body = body,
                    IsBodyHtml = true
                };

                message.To.Add(new MailAddress(recipientEmail));

                await client.SendMailAsync(message);
                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        ////For background tasks such as sending emails, its good practice to use job runners such as hangfire https://www.hangfire.io
        ////or a service such as SendGrid https://sendgrid.com/
        //public async Task<(bool success, string errorMsg)> SendEmailAsync(
        //    MailboxAddress sender,
        //    MailboxAddress[] recipients,
        //    string subject,
        //    string body,
        //    SmtpConfig config = null,
        //    bool isHtml = true)
        //{
        //    var message = new MimeMessage();

        //    message.From.Add(sender);
        //    message.To.AddRange(recipients);
        //    message.Subject = subject;
        //    message.Body = isHtml ? new BodyBuilder { HtmlBody = body }.ToMessageBody() : new TextPart("plain") { Text = body };

        //    try
        //    {
        //        config ??= _config;

        //        using (var client = new SmtpClient())
        //        {
        //            if (!config.UseSSL)
        //                client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true;

        //            await client.ConnectAsync(config.Host, config.Port, config.UseSSL).ConfigureAwait(false);
        //            client.AuthenticationMechanisms.Remove("XOAUTH2");

        //            if (!string.IsNullOrWhiteSpace(config.Username))
        //                await client.AuthenticateAsync(config.Username, config.Password).ConfigureAwait(false);

        //            await client.SendAsync(message).ConfigureAwait(false);
        //            await client.DisconnectAsync(true).ConfigureAwait(false);
        //        }

        //        return (true, null);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(LoggingEvents.SEND_EMAIL, ex, "An error occurred whilst sending email");
        //        return (false, ex.Message);
        //    }
        //}
    }
}