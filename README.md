# KORE Software / KAP Cache Management
<!-- ABOUT THE PROJECT -->
### About The Project
<img src="https://koresoftware.com/wp-content/uploads/2019/08/KONNECT_700.png"/>

The Konnect product leverages an internal facing administration portal we have built to aid KORE employees to manage the products client base. The KONNECT Admin Portal (KAP) currently provides the internal members the ability to create, update and read the products client list as well as customize the configurations for the individual client by turning on/off different setting toggles. We want to expand the functionality of the KAP to also help us manage the product's caches.
Currently KONNECT has implemented a Redis cache on AWS that we use extensively across the application. At the moment, the dev team has no way to visualize and/or interact with the keys on the cache outside of custom console applications that we write on an as needed basis. We, the dev team, have been talking about building a portal that would allow us to interact withthe keys in a more efficient way than building/manipulating console applications

### Essential Feautures
1. An application for the internal team to interact with the Redis cache that has the following functionalities:
    *  Ability to read from a well-organized list / grid
    *  Paginated results
    *  Number of existing keys ranges between 1,000 < x < 1,000,000
    *  Search functionality with the ability to search the entire list of keys by pattern
2. The dev team should be able to perform the following CRUD operations
    * Create new key value pair
    * Retrieve paginated key list
    * Retrieve value of selected key
    * Remove individual key
    * Remove keys by pattern
    * Remove keys by selection
### Additional features
* Configurable / dynamic filtering
* Redis key pattern generator
### Built With
* [.NET Core 3.1]("https://dotnet.microsoft.com/")
* [Microsoft Azure]("https://azure.microsoft.com/en-ca/")
* [React with TypeScript]("https://reactjs.org/")
* [Redis]("https://redis.io/")
* [RedisLabs]("https://redislabs.com/")
* [AWS S3]("https://aws.amazon.com/s3/")
* [Material UI]("https://material-ui.com/")
* [AG Grid]("https://www.ag-grid.com/")
## API Documentation
View API Documentation [here]("https://documenter.getpostman.com/view/13703734/TzRSh8AV")
<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
* Microsoft Visual Studio
* .NET Core 3.1
* Ubuntu
* Redis
* (AIDEN TODO REDIS INSTALLATION)
* NodeJS
To get a local copy up and running follow these steps.
### Installation (Server Side)
1. Clone the repo
   ```sh
   git clone https://github.com/nkrachangtoy/kap-cache-management.git
   ```
2. Go to /server/KONNECT-REDIS
   ```sh
   cd server/KONNECT-REDIS
   ```
3. Double click `KONNECT-REDIS.sln` to open the project
4. Rename `appsettingsSAMPLE.json` and `appsettingsSAMPLE.Development.json` to `appsettings.json` and `appsettings.Development.json` repectively
5. Install Nuget Packages
   From within Visual Studio you can use the Package Manager Console to also update the packages. This has the benefit that any PowerShell scripts will be run as part of the update where as using NuGet.exe will not run them. The following command will update all packages in every project to the latest version available from nuget.org.
    `Update-Package`
6. Inside `Startup.cs` (Optional)
    If you want to use the interactive API Documentation with Swagger, uncomment the following outlined code blocks:
   ```sh
    //=============================================================================
    // UNCOMMENT THIS BLOCK DURING LOCAL DEV FOR DOCUMENTATION (SWAGGER CONFIG)
    //=============================================================================
    services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("KonnectAPI",
            new Microsoft.OpenApi.Models.OpenApiInfo()
            {
                Title = "Konnect - Redis Cache - API",
                Version = "1",
                Description = "API Documentation by Konnect Dev Team"
            });
        options.IncludeXmlComments("KONNECT-REDIS.xml");
    });
    //=============================================================================
    // UNCOMMENT THIS BLOCK DURING LOCAL DEV FOR DOCUMENTATION (SWAGGER CONFIG)
    //=============================================================================
    ....
    //=============================================================================
    // UNCOMMENT THIS BLOCK DURING LOCAL DEV FOR DOCUMENTATION (SWAGGER CONFIG)
    //=============================================================================
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/KonnectAPI/swagger.json", "Konnect - Redis Cache - API");
        options.RoutePrefix = "";
    });
    //=============================================================================
    // UNCOMMENT THIS BLOCK DURING LOCAL DEV FOR DOCUMENTATION (SWAGGER CONFIG)
    //=============================================================================
   ```
 7. AIDEN TODO LOCAL REDIS INSTRUCTIONS
 8. Run the app by pressing `F5`
##### Pacakges used (Server Side)
* [Microsoft.AspNetCore.Mvc.NewtonsoftJson V3.0.0]("https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/")
* [StackExchange.Redis V2.2.4]("https://stackexchange.github.io/StackExchange.Redis/Basics.html")
* [Swashbuckle.AspNetCore V6.1.3]("https://github.com/domaindrivendev/Swashbuckle.AspNetCore")
### Installation (Client Side)
1. Within the client folder of the repo, run `npm install` to install packages 
2. To start the app locally, run `npm start`
##### Pacakges used (Client Side)
* [AgGrid](https://www.ag-grid.com/)
* [Material-UI Core](https://material-ui.com/)
* [Material-UI Icons](https://material-ui.com/components/material-icons/)
* [Axios](https://www.npmjs.com/package/axios)
* [CodeMirror](https://codemirror.net/)
* [Toastr](https://codeseven.github.io/toastr/demo.html)
* React with Typescript
<!-- CONTACT -->
## Contributors
[Nusorn Krachangtoy]("https://github.com/nkrachangtoy")
[Sabrina Kuah]("https://github.com/scurrie90")
[Simon Currie]("https://github.com/sabkuah")
[Russell Telen]("https://github.com/russtelen")
