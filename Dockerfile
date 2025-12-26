# Этап 1 Сборка
FROM mcr.microsoft.comdotnetsdk8.0 AS build
WORKDIR src

# Копируем файлы проекта
COPY .sln .
COPY RussianKitchen.csproj .RussianKitchen

# Восстанавливаем зависимости
RUN dotnet restore

# Копируем весь код
COPY RussianKitchen. .RussianKitchen

# Собираем релиз
WORKDIR srcRussianKitchen
RUN dotnet publish -c Release -o apppublish

# Этап 2 Запуск
FROM mcr.microsoft.comdotnetaspnet8.0 AS final
WORKDIR app
COPY --from=build apppublish .

# Запускаем приложение

ENTRYPOINT [dotnet, RussianKitchen.dll]
