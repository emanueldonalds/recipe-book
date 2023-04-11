#!/bin/bash

./gradlew clean
./gradlew assemble
./gradlew test
./gradlew bootJar

echo Deploying jar file
rm -r /home/recipes/deployments/recipes-api
mkdir /home/recipes/deployments/recipes-api
cp ./build/libs/recipes-api.jar /home/recipes/deployments/recipes-api/

echo Restarting systemd service
sudo systemctl daemon-reload
sudo systemctl restart recipes-api.service

echo Deployment done!
