using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Text;
using Mailjet.Client.TransactionalEmails;
using Mailjet.Client;
using Mailjet.Client.Resources;
using Newtonsoft.Json.Linq;
using Mailjet.Client.Exceptions;
using Mailjet.Client.TransactionalEmails.Response;

namespace MyEFApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        public async Task SendMail()
        {
            //    var client = new SmtpClient("smtp-relay.brevo.com", 25)
            //    {
            //        Credentials = new NetworkCredential("bechir.mhadhbi@gmail.com", "mypwd"),
            //        EnableSsl = true
            //    };
            //    client.Send("bechir.mhadhbi@gmail.com", "bechir.mhadhbi@gmail.com", "test", "testbody");
            //    Console.WriteLine("Sent");
            //    Console.ReadLine();


            //var client = new MailjetClient("eba024ff901284319e73d6c4d8d4492f", "ac901ed062d407c7db8171d01a53cb9e");

            //JArray jarray = new JArray();
            //jarray.Add(new JObject
            //{
            //    new JProperty("FromEmail","bechir.mhadhbi@gmail.com"),
            //    new JProperty("FromName","bechir"),
            //    new JProperty("Recipients",new JArray{ 
            //       new JObject{
            //            new JProperty("Email","bechir.mhadhbi@gmail.com"),
            //            new JProperty("Name","bechir"),
            //       }
            //    }),
            //    new JProperty("Subject","api test send mail"),
            //    new JProperty("Test-part","Bonjour"),
            //    new JProperty("Html-part","Bonjour"),
            //});

            //var req = new MailjetRequest()
            //{
            //    Resource = Mailjet.Client.Resources.Send.Resource
            //}.Property(Mailjet.Client.Resources.Send.Messages, jarray);

            //var response = await client.PostAsync(req);


            try
            {
                var client = new SmtpClient("smtp-relay.brevo.com", 587)
                {
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential("bechir.mhadhbi@gmail.com",
                        "EJyx2LKXPtg0s31N")
                };

                var message = new MailMessage
                {
                    From = new MailAddress("bechir.mhadhbi@gmail.com"),
                    Subject = "Testing SMTP Email 65",
                    SubjectEncoding = Encoding.UTF8,
                    BodyEncoding = Encoding.UTF8,
                    BodyTransferEncoding = System.Net.Mime.TransferEncoding.QuotedPrintable,
                    Body = "<p>Hi, This is a test email.</p>",
                    IsBodyHtml = true
                };

                message.To.Add(new MailAddress("medbechir.mhadhbi@gmail.com"));
                //client.SendCompleted += (sender, e) =>
                //{
                //    if (e.Error != null)
                //    {
                //        Console.WriteLine("SendCompleted Error: " + e.Error.Message + " : " + e.Error.ToString());
                //    }

                //    if (e.Cancelled)
                //    {
                //        Console.WriteLine("SendCompleted Cancelled");
                //    }

                //    message.Dispose();
                //    client.Dispose();
                //};

                client.SendAsync(message, null);
                Console.WriteLine("Mail sent.");
            }
            catch (Exception e)
            {
                Console.WriteLine("There was an exception. " + e.Message);
            }

            //await Task.Delay(2000);
            //Console.ReadLine();
            //await Task.Delay(2000);
            //Console.ReadLine();
        }
    }
}
