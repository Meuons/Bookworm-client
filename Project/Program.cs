using Microsoft.EntityFrameworkCore;
using Project.Data;
using Project.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<UserContext>(opt =>

                opt.UseSqlite(builder.Configuration.GetConnectionString("SqliteDbString")));
builder.Services.AddDbContext<OrderContext>(opt =>

                opt.UseSqlite(builder.Configuration.GetConnectionString("SqliteDbString")));
builder.Services.AddDbContext<ProductContext>(opt =>

                opt.UseSqlite(builder.Configuration.GetConnectionString("SqliteDbString")));
builder.Services.AddDbContext<AddressContext>(opt =>

                opt.UseSqlServer(builder.Configuration.GetConnectionString("SqliteDbString")));


builder.Services.AddSession();

builder.Services.AddMvc().AddSessionStateTempDataProvider();

builder.Services.AddControllersWithViews();
var app = builder.Build();


app.UseSession();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Products}/{action=Index}/{id?}");

app.Run();
