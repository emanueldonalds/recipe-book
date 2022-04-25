#!/bin/bash

blue="\e[0;36m"
yellow="\e[1;33m"
reset="\e[0m"

info() {
    echo -e "[${yellow}INFO${reset}]${blue}" $1 "${reset}"
}

if [ ! "$1" = "s" ]
then
    info "Installing Git"
    sudo apt install -y git

    info "Installing zip"
    sudo apt install zip

    info "Installing SDK Man"
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    sdk version

    info "Installing Java 17"
    sdk install java 17.0.1-librca

    info "Installing Gradle 7.4.2"
    sdk install gradle 7.4.2

    # Install NodeJS https://github.com/nodesource/distributions/blob/master/README.md#debinstall
    info "Installing NodeJS"
    KEYRING=/usr/share/keyrings/nodesource.gpg
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | sudo tee "$KEYRING" >/dev/null
    gpg --no-default-keyring --keyring "$KEYRING" --list-keys
    VERSION=node_17.x
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

    info "Installing Angular"
    sudo npm install -g @angular/cli

    info "Installing Docker"
    sudo npm install -y docker
else
    info "Quick setup"
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
	mkdir /home/pi/recipes-api-server
else
    info "Recipes API Git project already initialized"
fi

if [[ ! -d "/home/pi/recipes-frontend.git" ]]
then
    info "Initializing Recipes frontend Git project"
    mkdir /home/pi/recipes-frontend-deploy-folder
    git init --bare /home/pi/recipes-frontend.git
else
    info "Recipes frontend Git project already initialized"
fi

if [[ ! -d "/home/pi/keycloak.git" ]]
then
    info "Initializing Keycloak Git project"
    mkdir /home/pi/keycloak-deploy-folder
    git init --bare /home/pi/keycloak.git
else
    info "Keycloak Git project already initialized"
fi

if [[ ! -d "/home/pi/.aws" ]]
then
    info "Setting up AWS credentials"
    mkdir /home/pi/.aws
    touch /home/pi/.aws/config

    echo "[default]" >> /home/pi/.aws/config
    echo "region=eu-north-1" >> /home/pi/.aws/config

    touch /home/pi/.aws/credentials
    echo "[default]" >> /home/pi/.aws/credentials

    echo "Enter AWS_ACCESS_KEY_ID"
    read access_key_id
    echo "aws_access_key_id="$access_key_id >> /home/pi/.aws/credentials

    echo "Enter AWS_ACCESS_KEY"
    read access_key
    echo "aws_secret_access_key="$access_key >> /home/pi/.aws/credentials
else
    info "AWS credentials already set up"
fi

info "Copying post-recieve files"
cp recipes-api/post-receive /home/pi/recipes-api.git/hooks/post-receive
chmod +x /home/pi/recipes-api.git/hooks/post-receive
sudo cp recipes-api/recipes-api.service /usr/lib/systemd/system

info "Copying systemd service files"
cp recipes-frontend/post-receive /home/pi/recipes-frontend.git/hooks/post-receive
chmod +x /home/pi/recipes-frontend.git/hooks/post-receive
sudo cp recipes-frontend/recipes-frontend.service /usr/lib/systemd/system

sudo systemctl daemon-reload

info "Setup done!"
