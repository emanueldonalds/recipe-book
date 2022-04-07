
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

Reboot the RPI.

The RPI now requires SSH authentication to connect.

The setup script creates a bare Git repository called project.git in the home folder, on your project repo, add the RPI bar Git repository as a new remote "production".

`git remote add production pi@<your-public-ip>:project.git`


# How to deploy
Deploy by pushing master to the production remote

`git push production master`