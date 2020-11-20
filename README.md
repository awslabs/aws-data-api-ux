# AWS Data API - UX

This project contains a simple web interface for [AWS Data API](https://github.com/awslabs/aws-data-api). Data API's give you the ability to create a back end web service to handle core business data, without any coding or servers to manage. This Web UI provides the following functionality:

 - Discover and preview available Data API Stages
 - List and view Namespaces provisioned under each Stage
 - View Namespace data usage statistics
 - Provision new Namespaces
 - View and edit Metadata and Resource Schema

This project is based on Angular Framework for page logic and API queries, and UI Kit Framework and Angular Material Framework for visual elements on the page.

## Configuration

Configuration of the console consists of only a few steps:

 1. Fork or create a local copy of this repository
 
 2. Once the deployment of the [AWS Data API](https://github.com/awslabs/aws-data-api) is complete you will obtain a Discovery URL for the AWS Data API. This URL should put into Angular environment file `angular/src/environments/environment.ts` and `angular/src/environments/environment.prod.ts`:

    ``` typescript
    export const environment = {
    	...
    	discoveryUrl:  'https://xxxxxxxxx.execute-api.xx-xxxx-x.amazonaws.com/xxxx/data-apis'
    }
    ``` 
 3. Configuration is complete!

## Run solution locally

This website can be run locally on the most of the modern operations systems, including Linux, Windows and MacOS. However, please make sure the following software is installed:

 - [Node.js](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/), typically installed automatically with Node
 - [Angular CLI](https://cli.angular.io/)

In order to launch this application on the local computer please execute the following commands:

 1. Open `angular` directory

    ``` shell
    cd angular
    ```

 2. Download all the required npm modules

    ``` shell
    npm ci
    ```

 3. Build and launch web application

    ``` shell
    ng serve
    ```

 4. Open web application in your browser: `http://localhost:4200/`


## Run solution on AWS

Since this is just a Single Page Application (SPA) based on Angular Framework, it can be deployed in a variety of ways. We believe the simplest way is to deploy it via [AWS Amplify Console](https://aws.amazon.com/amplify/console/), and there is a [detailed guide](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html) available with step by step instructions under the AWS Amplify documentation.

Part of the deployment process is to create a build configuration for the application. The simplest set up for AWS Amplify Console build for Angular applications can look like this:

``` yaml
version: 0.1
frontend:
  phases:
    build:
      commands:
        - cd angular
        - npm ci
        - npm run-script build
  artifacts:
    baseDirectory: angular/build
    files:
      - '**/*'
  cache:
    paths: []
```

We also recommend to configure access protection for your website using AWS Amplify Console [access control settings](https://docs.aws.amazon.com/amplify/latest/userguide/access-control.html).

## Run solution using Docker

We have also provided `Dockerfile` for this application in case you decide to run it using Docker, or any Docker orchestration tool like Docker Compose or Kubernetes.

In order to build and test the Docker image you can follow these steps:

 1. Build Docker image

    ``` shell
    docker build . --tag aws-data-api-ux:1.0
    ```

 2. Launch built image locally
    
    ``` shell
    docker run --publish 8080:80 --detach --name apiux aws-data-api-ux:1.0
    ```

 3. Once tested you can stop and delete container

    ``` shell
    docker rm --force apiux
    ```