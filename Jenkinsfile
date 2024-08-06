pipeline {
    agent none
    stages {
        stage('Semgrep Builder') {
            agent {
                dockerfile {
                    filename 'Dockerfile'
                    dir 'semgrep'
                    additionalBuildArgs '--tag devsecops/semgrep --network host'
                } }
            steps {
                sh 'echo "SEMGREP INSTALLED"'
            }
            }
        stage('SAST') {
            agent {
                docker {
                    image 'devsecops/semgrep'
                    args '-u root --privileged --network host'
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
        
        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
      }
    }
            steps {
                sh 'semgrep --version'
                sh "semgrep --config p/expressjs"
            }
        }
        stage('Dependancy checking') {
            agent any
            steps {
                sh 'echo Dependancy checking'
            }
        }
    }
}
