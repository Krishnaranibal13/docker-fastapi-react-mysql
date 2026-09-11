
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "Building Docker images..."
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Stopping old containers..."
                    docker compose down

                    echo "Starting application..."
                    docker compose up -d
                '''
            }
        }

        stage('Check Containers') {
            steps {
                sh '''
                    echo "Checking containers..."
                    docker compose ps
                '''
            }
        }

        stage('Backend Health Check') {
            steps {
                sh '''
                    echo "Checking backend..."
                    sleep 10
                    curl -f http://localhost:8000/docs
                '''
            }
        }

        stage('Frontend Health Check') {
            steps {
                sh '''
                    echo "Checking frontend..."
                    curl -f http://localhost:3000
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }

        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}



