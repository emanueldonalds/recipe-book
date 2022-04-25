#!/bin/bash

# MariaDB
sudo apt install mariadb-server
sudo mysql_secure_installation

# KeyCloak
if [[ ! -d "./rm -r keycloak-18.0.0.tar.gz" ]]
then
    rm -r keycloak-18.0.0.tar.gz
fi
wget https://github.com/keycloak/keycloak/releases/download/18.0.0/keycloak-18.0.0.tar.gz
gunzip keycloak-18.0.0.tar.gz
chmod +x keycloak-18.0.0/bin/kc.sh
