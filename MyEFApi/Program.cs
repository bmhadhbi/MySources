using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;
using DAL.service;
using DAL.service.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyEFApi.Helpers;
using MyEFApi.Hubs;
using MyEFApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

ConfigureServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/hubs/chat");

app.Run();

static void ConfigureServices(WebApplicationBuilder builder)
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                            throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });

    // Add cors
    builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));
    // Add external authentication providers
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
              .AddEntityFrameworkStores<ApplicationDbContext>()
              .AddDefaultTokenProviders();

    builder.Services.AddScoped<IEmailSender, EmailSender>();

    builder.Services.AddScoped<IAccountManager, AccountManager>();
    builder.Services.AddScoped<IChatService, ChatDbService>();
    builder.Services.AddHttpContextAccessor();
    builder.Services.AddSingleton<ChatService>();
    builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    builder.Services.AddSignalR();

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddAutoMapper(typeof(Program));

    //Email Templates
    EmailTemplates.Initialize(builder.Environment);
}