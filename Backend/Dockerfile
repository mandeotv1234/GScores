FROM openjdk:21-jdk-slim

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew bootJar -x test

EXPOSE 8080

CMD ["java", "-jar", "build/libs/GScore-0.0.1-SNAPSHOT.jar"]
