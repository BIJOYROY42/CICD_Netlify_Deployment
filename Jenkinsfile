pipeline {
    agent any
 
    stages {
        stage('Build') {
            agent{
                docker{
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            agent{
                docker{
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Running tests to verify the application..."
                    test -f build/index.html
                    npm test -- --watchAll=false
                '''
            }
        }
        stage('Deploy to Netlify') {
            agent{
                docker{
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                // Install Netlify CLI
                sh 'npm install -g netlify-cli'
                
                // Use the credentials stored in Jenkins
                withCredentials([string(credentialsId: 'token for ci/cd', variable: 'NETLIFY_AUTH_TOKEN')]) {
                    sh '''
                        echo "Deploying to Netlify..."
                        netlify deploy --site astonishing-medovik-a2a2a3 --auth $NETLIFY_AUTH_TOKEN --prod --dir build
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'The pipeline failed. Please check the logs for details.'
        }
    }
}

























