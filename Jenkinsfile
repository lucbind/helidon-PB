pipeline {

  agent any

  parameters {
    string(name: 'ORDS_HOST'      , defaultValue: '130.61.153.50'                 , description: 'The IP address or the FQDN of the host running ORDS')
    string(name: 'ORDS_PORT'      , defaultValue: '8088'                          , description: 'The port of the host where ORDS listens to')
    string(name: 'PROD_PDB'       , defaultValue: 'PDB1'                          , description: 'The name of the PROD pluggable database')
    string(name: 'PROD_CLONE_PDB' , defaultValue: 'PDB1_CLONE'                    , description: 'The name of the cloned PROD pluggable database')
    string(name: 'PROD_PDB_CREDS' , defaultValue: 'pdb-creds'                     , description: 'The PDB credentials from Jenkins')
    string(name: 'DB_HOSTNAME'    , defaultValue: 'cicd.subnet3.vcn.oraclevcn.com', description: 'The name of the DB host')
    string(name: 'DB_PORT'        , defaultValue: '1521'                          , description: 'The port where the DB listens to')
    string(name: 'DB_DOMAIN'      , defaultValue: 'subnet3.vcn.oraclevcn.com'     , description: 'The domain of the DB')

    string(name: 'OCIR_REGION'    , defaultValue: 'fra.ocir.io'                   , description: 'The OCI registry to push the image to')
    string(name: 'OCIR_NAMESPACE' , defaultValue: 'emeaseitalysandbox'            , description: 'The OCI tenancy namespace')
    string(name: 'OCIR_REPOSITORY', defaultValue: 'pbellardone'                   , description: 'The name of the repository')
    string(name: 'OCIR_CREDS'     , defaultValue: 'ocir-creds'                    , description: 'The OCIR credentials from Jenkins')
  }

  stages {
    stage('Clone PROD database') {
      environment {
        PROD_PDB_CREDS = credentials("${params.PROD_PDB_CREDS}")
      }
      steps {
        httpRequest consoleLogResponseBody: true, authentication: 'ords-admin', contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: """{
          \"method\": \"CLONE\",
          \"clonePDBName\": \"${params.PROD_CLONE_PDB}\",
          \"tdePassword\": \"${env.PROD_PDB_CREDS_PSW}\",
          \"unlimitedStorage\": true,
          \"reuseTempFile\": true,
          \"totalSize\": \"UNLIMITED\",
          \"tempSize\": \"UNLIMITED\"
        }""", responseHandle: 'NONE', url: "http://${params.ORDS_HOST}:${params.ORDS_PORT}/ords/_/db-api/stable/database/pdbs/${params.PROD_PDB}/", wrapAsMultipart: false
      }
    }

    stage('Compile application') {
      environment {
        PROD_PDB_CREDS = credentials("${params.PROD_PDB_CREDS}")

        javax_sql_DataSource_noteDataSource_URL = "jdbc:oracle:thin:@//${params.DB_HOSTNAME}:${params.DB_PORT}/${params.PROD_CLONE_PDB}.${params.DB_DOMAIN}"
        javax_sql_DataSource_noteDataSource_user = "${env.PROD_PDB_CREDS_USR}"
        javax_sql_DataSource_noteDataSource_password = "${env.PROD_PDB_CREDS_PSW}"
      }
      agent {
        docker {
            image 'maven:3-jdk-11'
            args '-v /root/.m2:/root/.m2 -e javax_sql_DataSource_noteDataSource_URL -e javax_sql_DataSource_noteDataSource_user -e javax_sql_DataSource_noteDataSource_password'
        }
      }
      steps {
        sh 'mvn clean package'
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build --rm -t helidon-jpa:latest .'
      }
    }

    stage('Drop PROD database clone') {
      steps {
        httpRequest consoleLogResponseBody: true, authentication: 'ords-admin', httpMode: 'DELETE', responseHandle: 'NONE', url: "http://${params.ORDS_HOST}:${params.ORDS_PORT}/ords/_/db-api/stable/database/pdbs/${params.PROD_CLONE_PDB}/?action=INCLUDING", wrapAsMultipart: false
      }
    }

    stage('Push image on OCIR') {
      steps {
        withCredentials([usernamePassword(credentialsId: params.OCIR_CREDS, passwordVariable: 'OCIR_CREDS_PSW', usernameVariable: 'OCIR_CREDS_USR')]) {
          sh "docker login -u \$OCIR_CREDS_USR -p \$OCIR_CREDS_PSW ${params.OCIR_REGION}"
          sh "docker tag helidon-jpa:latest ${params.OCIR_REGION}/${params.OCIR_NAMESPACE}/${params.OCIR_REPOSITORY}/helidon-jpa:latest"
          sh "docker push ${params.OCIR_REGION}/${params.OCIR_NAMESPACE}/${params.OCIR_REPOSITORY}/helidon-jpa:latest"
        }
      }
    }

    stage('Deploy to OKE') {
      environment {
        PROD_PDB_CREDS = credentials("${params.PROD_PDB_CREDS}")
      }
      steps {
        sh "sed -i -e 's/OCIR_REGION/${params.OCIR_REGION}/' -e 's/OCIR_NAMESPACE/${params.OCIR_NAMESPACE}/' -e 's/OCIR_REPOSITORY/${params.OCIR_REPOSITORY}/' -e 's/DB_HOSTNAME/${params.DB_HOSTNAME}/' -e 's/DB_PORT/${params.DB_PORT}/' -e 's/PROD_PDB/${params.PROD_PDB}/' -e 's/DB_DOMAIN/${params.DB_DOMAIN}/' -e 's/DB_USERNAME/${env.PROD_PDB_CREDS_USR}/' -e 's/DB_PASSWORD/${env.PROD_PDB_CREDS_PSW}/' app.yaml"
        sh "sudo runuser -l opc -c \"kubectl apply -f ${env.WORKSPACE}/app.yaml\""
        echo 'Load balancer ip address: '
        sh 'sudo runuser -l opc -c "kubectl get service helidon-jpa"'
      }
    }
  }
}
