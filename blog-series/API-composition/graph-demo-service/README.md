# Graph demo Loyalty Service

A simple Demo CDS OData service with an in-memory database + CSV example data for demo purposes.

## How to run / deploy

### Prerequisites

For building and deploying this demo service these tools are required:

- [Node.js](https://nodejs.org/en) & npm
- CAP command-line: `npm i -g @sap/cds-dk`
- MBT command-line: `npm i -g mbt`
- Cloud Foundry command-line (optional) - see [here](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)

### Prepare

Rename the file `.cdsrc.json.template` to `.cdsrc.json` and add a basic authentication password for the demo user in the file.

### Build the project

- install prerequisites (see above)
- `npm ci`
- `npm run build`

To run it locally: `npm start`

### Deploy to Cloud Foundry

Run `cf api <API-URL>` to set the correct URL of your BTP account region and login via `cf login --sso`.
Then deploy to Cloud Foundry: `cf deploy gen/mta.tar`.

## How to use as Destination for Graph

After having successfully deployed the service, go to the BTP cockpit and under Connectivity > Destinations, add a new entry. Use the application route URL from your cloud foundry deployment and add the `graph-demo/` path as follows: URL: `<application-route-URL>/graph-demo/`. Also select Basic Authentication in the destination and provide the user/password you configured previously.
