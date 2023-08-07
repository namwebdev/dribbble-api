pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clone the Git repository
                git 'https://github.com/namwebdev/dribbble-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image using the Dockerfile in your app directory
                sh 'docker build -t dribbble-api'
            }
        }

        stage('Run app') {
            steps {
                // Tag the Docker image with a unique identifier (optional)
                sh 'docker-compose up -d'
            }
        }
    }
}
