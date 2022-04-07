#!/bin/bash

if [[ ! -f "/home/pi/.ssh/authorized_keys" ]]
then
    echo "authorized_keys not found, setting up SSH authentication"
    echo "Paste public SSH key"
    read public
    install -d -m 700 ~/.ssh
    mkdir /home/pi/.ssh
    touch /home/pi/.ssh/authorized_keys
    echo "$public" > /home/pi/.ssh/authorized_keys
    sudo chmod 644 /home/pi/.ssh/authorized_keys
    sudo chown pi:pi /home/pi/.ssh/authorized_keys
    sed -i -e 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
fi

if [[ ! -f "/home/pi/project.git/description" ]]
then
    echo "Initializing git project"
    mkdir /home/pi/deploy-folder
    git init --bare project.git
    chmod +x /home/pi/project.git/hooks/post-receive
fi

cp post-receive /home/pi/project.git/hooks/post-receive
chmod +x /home/pi/project.git/hooks/post-receive

sudo apt install -y git
sudo apt install zip
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
sdk install java 17.0.1-librca
sdk install gradle 7.4.2
