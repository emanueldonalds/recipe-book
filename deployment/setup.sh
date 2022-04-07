#!/bin/bash

red="\e[0;91m"
blue="\e[0;94m"
expand_bg="\e[K"
blue_bg="\e[0;104m${expand_bg}"
green_bg="\e[0;102m${expand_bg}"
green="\e[0;92m"
yellow="\e[1;33m"
purple="\e[35m"
white="\e[0;97m"
bold="\e[1m"
uline="\e[4m"
reset="\e[0m"

info() {
    echo -e "[${yellow}INFO${reset}]${blue}" $1 "${reset}"
}

sudo apt install -y git
sudo apt install zip
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
sdk install java 17.0.1-librca
sdk install gradle 7.4.2

if [[ ! -f "/home/pi/.ssh/authorized_keys" ]]
then
    info "Setting up SSH authentication"
    echo "Paste public SSH key"
    read public
    install -d -m 700 ~/.ssh
    mkdir /home/pi/.ssh
    touch /home/pi/.ssh/authorized_keys
    echo "$public" > /home/pi/.ssh/authorized_keys
    sudo chmod 644 /home/pi/.ssh/authorized_keys
    sudo chown pi:pi /home/pi/.ssh/authorized_keys
    sed -i -e 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
else
    info "SSH Authentication already set up"
fi

if [[ ! -d "/home/pi/recipes-api.git" ]]
then
    info "Initializing Recipes API Git project"
    mkdir /home/pi/recipes-api-deploy-folder
    git init --bare /home/pi/recipes-api.git
else
    info "Recipes API Git project already initialized"
fi

if [[ ! -d "/home/pi/recipes-api-server" ]]
then
    info "Creating recipes-api-server directory"
	mkdir /home/pi/recipes-api-server
else
    info "Directory recipes-api-server already exists"
fi

cp recipes-api/post-receive /home/pi/recipes-api.git/hooks/post-receive
chmod +x /home/pi/recipes-api.git/hooks/post-receive
sudo cp recipes-api/recipes-api-service.service /usr/lib/systemd/system
sudo systemctl daemon-reload

info "Setup done!"
