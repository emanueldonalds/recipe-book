#!/bin/bash

echo Removing dist folder
rm -r ./dist

echo Building distrobution
npm install --force
ng build --configuration=production 

echo Removing old deployment files
rm -r /home/recipes/deployments/recipes-frontend

echo Copying new artifacts to deployment folder
mkdir /home/recipes/deployments/recipes-frontend
cp -r ./dist/* /home/recipes/deployments/recipes-frontend

echo Restarting systemd service
sudo systemctl daemon-reload
sudo systemctl restart recipes-frontend.service

sudo systemctl status recipes-frontend.service
journalctl -u recipes-frontend.service -n 10

echo Deployment done!
