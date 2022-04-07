#!/bin/bash

blue="\e[0;94m"
yellow="\e[1;33m"
reset="\e[0m"

info() {
    echo -e "[${yellow}INFO${reset}]${blue}" $1 "${reset}"
}

if [ ! "$1" = "s" ]
then
    sudo apt install -y git
    sudo apt install zip
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    sdk version
    sdk install java 17.0.1-librca
    sdk install gradle 7.4.2


    #Install NodeJS https://github.com/nodesource/distributions/blob/master/README.md#debinstall

    KEYRING=/usr/share/keyrings/nodesource.gpg
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | sudo tee "$KEYRING" >/dev/null
    gpg --no-default-keyring --keyring "$KEYRING" --list-keys
    VERSION=node_17.8.0
    KEYRING=/usr/share/keyrings/nodesource.gpg
    DISTRO="$(lsb_release -s -c)"
    echo "deb [signed-by=$KEYRING] https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee /etc/apt/sources.list.d/nodesource.list
    echo "deb-src [signed-by=$KEYRING] https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list
    sudo apt-get update
    sudo apt-get install -y nodejs
    sudo apt-get install -y npm
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

    sudo npm install -g @angular/cli
    sudo npm install -g express

fi

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

if [[ ! -d "/home/pi/recipes-frontend.git" ]]
then
    info "Initializing Recipes frontend Git project"
    mkdir /home/pi/recipes-frontend-deploy-folder
    git init --bare /home/pi/recipes-frontend.git
else
    info "Recipes frontend Git project already initialized"
fi

if [[ ! -d "/home/pi/recipes-frontend-server" ]]
then
    info "Creating recipes-frontend-server directory"
	mkdir /home/pi/recipes-frontend-server
else
    info "Directory recipes-frontend-server already exists"
fi

cp recipes-api/post-receive /home/pi/recipes-api.git/hooks/post-receive
chmod +x /home/pi/recipes-api.git/hooks/post-receive
sudo cp recipes-api/recipes-api-service.service /usr/lib/systemd/system

cp recipes-frontend/post-receive /home/pi/recipes-frontend.git/hooks/post-receive
chmod +x /home/pi/recipes-frontend.git/hooks/post-receive
sudo cp recipes-frontend/recipes-frontend-service.service /usr/lib/systemd/system

sudo systemctl daemon-reload

info "Setup done!"
