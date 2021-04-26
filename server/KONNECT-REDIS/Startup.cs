using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KONNECT_REDIS.Services;
using KONNECT_REDIS.Services.IServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;



namespace KONNECT_REDIS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();

            // Configure Redis Connection
            var options = new ConfigurationOptions
            {
                EndPoints = { "redis-12388.c261.us-east-1-4.ec2.cloud.redislabs.com:12388" },
                Password = "KoreKonnect123!",
                AllowAdmin = true,
                AbortOnConnectFail = false,
            };
            services.AddSingleton<IConnectionMultiplexer>(
               ConnectionMultiplexer.Connect(options));

            // Register KeyService
            services.AddScoped<IKeysService, KeysService>();

            services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            // Configure Swagger
            services.AddSwaggerGen(options => {
                options.SwaggerDoc("KonnectAPI",
                    new Microsoft.OpenApi.Models.OpenApiInfo()
                    {
                        Title = "Konnect - Redis Cache - API",
                        Version = "1",
                        Description = "API Documentation by Konnect Dev Team"
                    });
                options.IncludeXmlComments("KONNECT-REDIS.xml");
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();

            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/swagger/KonnectAPI/swagger.json", "Konnect - Redis Cache - API");
                options.RoutePrefix = "";
            });

            app.UseRouting();

            // Configure Cors, Authentication and Authorization            
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
