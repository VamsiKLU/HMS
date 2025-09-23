# Backend Dockerfile for Java Spring Boot application
FROM openjdk:17-jdk-alpine

# Install Maven
RUN apk add --no-cache maven

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml ./

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose port 5000 (as specified in requirements)
EXPOSE 5000

# Run the application on port 5000
CMD ["java", "-Dserver.port=5000", "-jar", "target/hms-backend-0.0.1-SNAPSHOT.jar"]