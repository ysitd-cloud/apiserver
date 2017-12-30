# YSITD Cloud API Server 

Public API Server for YSITD Cloud. Build with [Nest.js](nestjs.com).

## Installation

```bash
yarn install
```

## Start Development Server
```bash
yarn setup:frontend
yarn setup:backend
yarn dev
```

## Start Production Server

```bash
yarn build
yarn start
```

## Environment Variable

| Variable            | Description                              |
|---------------------|------------------------------------------|
| `DEPLOYER_ENDPOINT` | Http Access Endpoint for deployer        |
| `PORT`              | Port for service to listen               |
| `ACCOUNT_ENDPOINT`  | Grpc Endpoint for access account service |
