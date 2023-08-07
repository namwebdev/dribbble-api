pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clone the Git repository
                git 'https://github.com/namwebdev/dribbble-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm
                sh 'curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -'
                sh 'apt-get install -y nodejs'
                
                // Install app dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your test suite
                sh 'npm run test'
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
