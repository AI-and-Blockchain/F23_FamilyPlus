# Installation Guide for Family+

This document provides instructions for setting up and running Family+, a React application built with Vite.

## Prerequisites

Before you begin, make sure your machine meets the following requirements:

- **Operating System:** Windows/Mac/Linux
- **Software:** [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/)

## Cloning the Family+ Repository
Clone the Family+ repository to your local machine:
```bash
git clone git@github.com:AI-and-Blockchain/F23_FamilyPlus.git
```
Navigate to the project directory:
```bash
cd F23_FamilyPlus
```

# Frontend
## Installing Family+
Install the project dependencies:
```bash
npm install
```

## Running Family+
To run Family+, use the following command:
```bash
npm run dev
```
The application will be accessible at http://localhost:3000 (or another port if configured differently).
You should browse our website on the browser where the Metamask extension is installed.


# Blockchain
## Smart Contract Deployment
Simply use the Remix IDE on your browser to open `FamilyPlus.sol` and compile it and deploy on a MetaMask Injected Mask of your choice.

Currently, our smart contract is deployed on the Sepolia test network at `0x539cc540df235b7d9b511cad4a214aeae445bf96`

