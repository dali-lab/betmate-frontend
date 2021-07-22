# Betmate Front End
## Project Overview

Betmate is a web platform that combines live betting with chess. It allows users to place bets on outcomes of games and on moves throughout the game. At the moment, all bets are placed using virtual currency, and the live games are taken from a sample of games that have been played on Lichess.

Link to Figma: https://www.figma.com/file/RHJ2hnpnYVsxFiYK19vavb/BetMate-21S

## Project Architecture 

Front-end:
- Typescript
- React
- React-router
- Redux
- Redux Sagas
- Axios
- Socket.io
- Chess.js

## Developer Information
   To run locally:
1. Clone front-end repo into a local directory
2. Run `yarn install` to install all node dependencies
3. Run `yarn dev` to start running the site locally at localhost:8080
4. Go to the [backend repo](https://github.com/dali-lab/betmate-backend) and follow instructions on its README to get the server running locally at localhost:9090. Go to the [python microservice](https://github.com/dali-lab/betmate-model-microservice) repo and follow its README to get a local server running for our chess engine ML model at localhost:3000.

## Deploying this site
All pull requests merged into the 'dev' branch are automatically deployed to https://betmate-dev.netlify.app/

All pull requests merged into the 'release' branch are automatically deployed to https://betmate-prod.netlify.app/. This will be the official version of the site.

The current development flow has all pull requests merging into the 'dev' branch, which is the equivalent of the 'master' or 'main' branch on most repos. Once the changes on the 'dev' branch have been sufficiently tested for bugs and the team is ready to release changes to the official site, a pull request is made from the 'dev' branch to the 'release' branch.

The continuous deployment process is managed by a service called Netlify. To access the team's Netlify account, please refer to the handoff doc for login credential information. The handoff doc will be in the shared Google Drive for this project.

## Authors
  Faustino Cortina '21
  Jack Keane '22
  Benedict Tedjokusumo '23

## Acknowledgements
- This project was built in partnership with Mike Perkins and Benjamin Portheault. The overall design of this site was based off of their vision.
- Thank you to Tim Tregubov, Lorie Loeb, Natalie Svoboda, and Erica Lobel of DALI Lab for their help, guidance, and advice.
- Model for writing up this README drawn from https://github.com/dali-lab/911-dispatch/



