using EV_ChargingApp.BLL.Services.Implementations;
using EV_ChargingApp.BLL.Services.Interfaces;
using EV_ChargingApp.Configurations;
using EV_ChargingApp.DAL.Data;
using EV_ChargingApp.DAL.Repository.Implementations;
using EV_ChargingApp.DAL.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionStrings"));
});


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ProducesAttribute("application/json"));
});
builder.Services.AddAutoMapper(typeof(Program).Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IGetCustomerRepository, GetCustomerRepository>();
builder.Services.AddScoped<ILoginRegisterRepository, LoginRegisterRepository>();
builder.Services.AddScoped<ICustomerServiceBLL, CustomerServiceBLL>();
builder.Services.AddScoped<ILoginRegisterServiceBLL, LoginRegisterServiceBLL>();


var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
}); app.MapControllers();

app.AddGlobalErrorHandler();

app.Run();

