# Electron React Multiwindow State Boilerplate with Typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and modified in order to handle the electron app features.

## Prerequisites
- NodeJs > 12
- npm

## Setup
```
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run start:static`

Runs the app in development mode with statically generated pages.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:e2e`

Launches e2e test of the electron application with playwright.

If you want to run a single e2e test:
`npm run test:e2e -- -g "Count state is moved across windows"`

### `npm run test:all`

Launches all the tests from both unit and e2e

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run pack`

Pack the app in dist folder.
The generated artifacts are installaters for Mac, Linux and Windows

### `npm run pack:mac`

Pack the app in dist folder.
The generated artifact is an installater for Mac

### `npm run pack:win`

Pack the app in dist folder.
The generated artifact is an installater for Windows

### `npm run pack:lin`

Pack the app in dist folder.
The generated artifact is an installater for Linux
