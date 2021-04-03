FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://*:5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ActivitiesAPI/ActivitiesAPI.csproj", "ActivitiesAPI/"]
RUN dotnet restore "ActivitiesAPI\ActivitiesAPI.csproj"
COPY . .
WORKDIR "/src/ActivitiesAPI"
RUN dotnet build "ActivitiesAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ActivitiesAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ActivitiesAPI.dll"]
