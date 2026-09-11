
pipeline {
    agent any

    environment {
        APP_DIR = '/home/ubuntu/docker-fastapi-react-mysql'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Krishnaranibal13/docker-fastapi-react-mysql.git'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    echo "Deploying application..."

                    cd ${APP_DIR}

                    echo "Pulling latest code..."
                    git pull origin main

                    echo "Stopping old containers..."
                    docker compose down

                    echo "Building latest images..."
                    docker compose build --no-cache

                    echo "Starting containers..."
                    docker compose up -d

                    echo "Waiting for services..."
                    sleep 20

                    echo "Checking containers..."
                    docker compose ps

                    echo "Backend health check..."
                    curl -f http://localhost:8000/docs || exit 1

                    echo "Frontend health check..."
                    curl -f http://localhost:3000 || exit 1

                    echo "Deployment successful!"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
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

