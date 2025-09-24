pipeline {
    agent any

    environment {
        PROJECT_NAME = 'hms'
        DOCKER_COMPOSE_CMD = 'docker compose'
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set up Docker') {
            steps {
                sh 'docker version || true'
                sh 'docker compose version || true'
            }
        }

        stage('Build Images (cached)') {
            steps {
                sh "${DOCKER_COMPOSE_CMD} build"
            }
        }

        stage('Start Services') {
            steps {
                sh "${DOCKER_COMPOSE_CMD} up -d"
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Wait for backend to be up
                    retry(10) {
                        sleep time: 6, unit: 'SECONDS'
                        sh 'curl -sSf http://localhost:9091/actuator/health || (echo "Backend not ready yet" && false)'
                    }
                    // Wait for frontend to be up
                    retry(10) {
                        sleep time: 3, unit: 'SECONDS'
                        sh 'curl -sSf http://localhost || (echo "Frontend not ready yet" && false)'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully. Frontend: http://localhost, Backend: http://localhost:9091'
        }
        failure {
            echo 'Build or deployment failed. Check stage logs.'
            sh "${DOCKER_COMPOSE_CMD} ps"
            sh "${DOCKER_COMPOSE_CMD} logs --tail=100"
        }
    }
}


