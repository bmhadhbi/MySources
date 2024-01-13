// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using System;
using System.Linq;

namespace MyEFApi
{
    public class AppSettings
    {
        public string DefaultUserRole { get; set; }
        public ExternalLoginConfig ExternalLogin { get; set; }
        public SmtpConfig SmtpConfig { get; set; }
    }

    public class ExternalLoginConfig
    {
        public OidcAuthConfig Google { get; set; }
        public OidcAuthConfig Facebook { get; set; }
        public OidcAuthConfig Microsoft { get; set; }
        public TwitterAuthConfig Twitter { get; set; }
    }

    public class OidcAuthConfig
    {
        public string ClientId { get; set; }
        public string Issuer { get; set; }
        public bool ValidateIssuer { get; set; }
    }

    public class TwitterAuthConfig
    {
        public string ConsumerAPIKey { get; set; }
        public string ConsumerSecret { get; set; }
    }

    public class SmtpConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool UseSSL { get; set; }

        public string Name { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }
}
