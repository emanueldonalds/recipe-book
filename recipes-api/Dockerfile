FROM gradle:7.2.0-jdk17-alpine AS build

WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle dependencies

COPY src/ ./src
RUN gradle bootJar --no-daemon

FROM openjdk:17-jdk-slim AS final

COPY --from=build /app/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-XX:-UseContainerSupport", "-jar", "/app/app.jar"]
