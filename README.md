# HIT Assessment

## Technologies used

- Next JS
- Typescript

## Prerequisites

- nvm
- git

## To install the project

- Clone the repository `git clone <repository-url>`
- Navigate to the project root `cd <project-directory>`
- Create `.env` file (Refer `.env.example` for reference) or run (`cp .env.example .env`)
- Run `nvm use` and switch the node version
- Run `npm i`
- Run `npm run dev` to start the server in development mode
- Application will now run in `http://localhost:3000`

## To build the project

- Set `NODE_ENV=production`
- Run `npm ci --production` to install the dependencies
- Run `npm run build` to build the project
- Run `npm run start`

npm run start
├── components/ # Reusable UI components
├── pages/ # Next.js pages and API routes
├── public/ # Static assets
├── styles/ # Global styles and CSS modules
├── types/ # TypeScript type definitions
├── utils/ # Helper functions and utilities
└── README.md # Project documentation
