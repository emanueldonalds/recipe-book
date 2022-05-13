
# Deployment

Contains scripts that sets up a Raspberry PI as a production server, using Git's post-recieve hook to test and deploy the application.

## Pre-requisites

A RPI running Raspbian

Port 22 forwarded to the RPI

## Initial setup on RPI

Copy the files in this folder to the RPI's home folder.

On your Windows PC, make sure you have a ssh-agent session running.

Create a new ssh key on your windows device using an elevated powershell:

First run

`ssh-keygen`

Then

`ssh-add <path-to-private-key>`

Copy the contents of the public key.

On the RPI, run
chmod +x setup.sh
./setup.sh

Paste the public key when prompted.

Enter yes if prompted.

Reboot the RPI.

The RPI now requires SSH authentication to connect.

The setup script creates bare Git repositories in the RPI home folder. On your project repo, add the RPI bare Git repositories as new remotes.

`git remote add prod-recipes-api pi@<your-public-ip>:recipes-api.git`
`git remote add prod-recipes-frontend pi@<your-public-ip>:recipes-frontend.git`

# How to deploy
Deploy by pushing master to the prod remotes

`git push prod-recipes-api master`
`git push prod-recipes-frontend master`
