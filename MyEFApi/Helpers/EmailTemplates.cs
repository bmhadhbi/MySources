using System.Text.Encodings.Web;

namespace MyEFApi.Helpers
{
    public static class EmailTemplates
    {
        private static IWebHostEnvironment _hostingEnvironment;
        private static string testEmailTemplate;
        private static string plainTextTestEmailTemplate;
        private static string confirmAccountEmailTemplate;
        private static string resetPasswordEmailTemplate;

        public static void Initialize(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public static string GetTestEmail(string recipientName, DateTime testDate)
        {
            testEmailTemplate ??= ReadPhysicalFile("Helpers/Templates/TestEmail.template");

            var emailMessage = testEmailTemplate
                .Replace("{user}", recipientName)
                .Replace("{testDate}", testDate.ToString());

            return emailMessage;
        }

        public static string GetPlainTextTestEmail(DateTime date)
        {
            plainTextTestEmailTemplate ??= ReadPhysicalFile("Helpers/Templates/PlainTextTestEmail.template");

            var emailMessage = plainTextTestEmailTemplate
                .Replace("{date}", date.ToString());

            return emailMessage;
        }

        public static string GetConfirmAccountEmail(string recipientName, HttpRequest httpRequest, string userId, string emailConfirmationToken)
        {
            return GetConfirmAccountEmail(recipientName, GetConfirmEmailCallbackUrl(httpRequest, userId, emailConfirmationToken));
        }

        public static string GetConfirmAccountEmail(string recipientName, string callbackUrl)
        {
            confirmAccountEmailTemplate ??= ReadPhysicalFile("Helpers/Templates/ConfirmAccountEmail.template");

            var emailMessage = confirmAccountEmailTemplate
                 .Replace("{user}", recipientName)
                 .Replace("{url}", HtmlEncoder.Default.Encode(callbackUrl));

            return emailMessage;
        }

        public static string GetConfirmEmailCallbackUrl(HttpRequest httpRequest, string userId, string emailConfirmationToken)
        {
            return $"http://localhost:4200/authentication/confirm?code={emailConfirmationToken}";
            //return $"{httpRequest.Scheme}://{httpRequest.Host}/ConfirmEmail?userId={userId}&code={emailConfirmationToken}";
        }

        public static string GetResetPasswordEmail(string recipientName, string callbackUrl)
        {
            resetPasswordEmailTemplate ??= ReadPhysicalFile("Helpers/Templates/ResetPasswordEmail.template");

            var emailMessage = resetPasswordEmailTemplate
                 .Replace("{user}", recipientName)
                 .Replace("{url}", callbackUrl);

            return emailMessage;
        }

        private static string ReadPhysicalFile(string path)
        {
            if (_hostingEnvironment == null)
                throw new InvalidOperationException($"{nameof(EmailTemplates)} is not initialized");

            var fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");

            using (var fs = fileInfo.CreateReadStream())
            {
                using (var sr = new StreamReader(fs))
                {
                    return sr.ReadToEnd();
                }
            }
        }
    }
}