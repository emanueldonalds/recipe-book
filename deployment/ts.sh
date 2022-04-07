
#!/bin/bash
TARGET="/home/pi/deploy-folder"
GIT_DIR="/home/pi/project.git"
BRANCH="master"
GRADLE="/home/pi/.sdkman/candidates/gradle/7.4.2/bin/gradle"

red="\e[0;91m"
blue="\e[0;94m"
expand_bg="\e[K"
blue_bg="\e[0;104m${expand_bg}"
red_bg="\e[0;101m${expand_bg}"
green_bg="\e[0;102m${expand_bg}"
green="\e[0;92m"
white="\e[0;97m"
bold="\e[1m"
uline="\e[4m"
reset="\e[0m"

info() {
    echo -e "[${green}INFO${reset}]" $1
}


info "Sirius k"

