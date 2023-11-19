# Deployment on linux server

## Requirements
### Install dependencies
A separate user must be created with user name "recipes".
The recipes user must have sudo rights on systemctl

These must be installed on the server:
- SDKMan
- Java 17 installed with SDKMan
- NPM
- Node
- Angular 

### Create systemd services
Make sure the paths are OK in the .service files

Copy the .service files to /etc/systemd/system

Run:
`sudo systemctl daemon-reload`
`sudo systemctl enable recipes-api.service`
`sudo systemctl enable recipes-frontend.service`

### Add AWS credentials
Copy the .aws folder to /home/recipes/.aws and enter the AWS credentials into the credentials file.
