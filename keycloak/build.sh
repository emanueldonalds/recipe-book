#!/bin/bash

if [[ ! -d "./keycloak-18.0.0" ]]
then
    wget https://github.com/keycloak/keycloak/releases/download/18.0.0/keycloak-18.0.0.tar.gz
    tar -xvzf keycloak-18.0.0.tar.gz
    chmod +x keycloak-18.0.0/bin/kc.sh
else
    echo "KeyCloak already downloaded"
fi
