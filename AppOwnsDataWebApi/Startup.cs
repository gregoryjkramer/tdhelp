using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

using AppOwnsDataShared.Models;
using AppOwnsDataShared.Services;
using AppOwnsDataWebApi.Services;

namespace AppOwnsDataWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // initialize database connection with connection string
            string connectString = Configuration["AppOwnsDataDB:ConnectString"];
            services.AddDbContext<AppOwnsDataDB>(opt => opt.UseSqlServer(connectString));

            // register custom classes to support dependency injection in controllers
            services.AddScoped<AppOwnsDataDB>();
            services.AddScoped<AppOwnsDataDBService>();

            // our App-Owns-Data services
            services.AddScoped<TokenManager>();
            services.AddScoped<PowerBiServiceApi>();

            // ❌ REMOVE Microsoft.Identity.Web user authentication for App-Owns-Data
            // services.AddMicrosoftIdentityWebApiAuthentication(Configuration, "ClientApp");

            // configure Cross-origin Resource Sharing (CORS) for client applications
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            });

            // setup controllers + JSON + Swagger for API discoverability
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IncludeFields = true;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EmbeddingApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // if (env.IsDevelopment())
            // {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmbeddingApi v1"));
            // }

            app.UseRouting();

            app.UseCors("AllowOrigin");

            // ❌ We are not using user/JWT auth in this App-Owns-Data Web API
            // app.UseAuthentication();
            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
