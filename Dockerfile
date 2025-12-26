# Этап сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Рабочая директория — корень решения
WORKDIR /src

# Копируем .sln и csproj для восстановления зависимостей
COPY RussianKitchen.sln .
COPY RussianKitchen/RussianKitchen.csproj ./RussianKitchen/

# Восстанавливаем зависимости
RUN dotnet restore RussianKitchen.sln

# Копируем весь исходный код
COPY RussianKitchen/ ./RussianKitchen/

# Собираем и публикуем
WORKDIR /src/RussianKitchen
RUN dotnet publish -c Release -o /app/publish

# Этап запуска
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app
COPY --from=build /app/publish .

# Порт (опционально, но рекомендуется)
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Запуск
ENTRYPOINT ["dotnet", "RussianKitchen.dll"]
