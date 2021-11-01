# Copilot demo
Just wanted to create a demo copilot app that uses RDS so I could learn more :) 

## How to set up the demo
To run this demo simply follow the set of commands below

- `copilot init` - Select a load balanced web service, enter the name book-store, set docker file to `Dockerfile` and set the port to 8080
- `copilot env init --name test --profile weaver-danj --app copilot-test`
- `copilot deploy`