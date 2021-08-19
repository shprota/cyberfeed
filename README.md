

# Cyberproof exam task

This project was generated using [Nx](https://nx.dev).

## Install and run:

* Have MongoDb accessible: 
```docker run --rm --name cyber-mongo -d -p 27017:27017 mongo```
* Modify ```apps/api/src/environments/environment.ts``` with the valid MongoDb URI.
* Run:
```bash
yarn
yarn start api & yarn start
```
* Point your browser to http://localhost:4200

* For the API docs open http://localhost:3333/api

* Run the lint: ```yarn lint```
* Sorry, no tests
