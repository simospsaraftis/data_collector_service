#!/bin/sh

#Entoli pou pragmatopoiei enimerosi ton idi egatestimenon paketon
sudo apt update -y

# Entoli pou pragmatopoiei egatastasi ton paketon ansible kai sshpass pou einai aparaitita gia na doulepsei to ansible
sudo apt install -y ansible sshpass

# Entoli pou orizei ton xristi tou directory fluentd
sudo chown $(whoami) /data_collector_service/fluentd/

# Entoli pou dinei dikaiomata read,write kai execute sto directory fluentd
sudo chmod +rwx /data_collector_service/fluentd/


# Entoli pou dimiourgei enan kryfo katalogo gia to ansible sto docker
sudo mkdir -p /home/docker/.ansible

#Entoli pou orizei oti o xristis tou directory docker tha einai o docker
sudo chown docker.docker -R /home/docker


# Entoli pou metaferei ena diko mas config arxeio gia to ansible
# ston katalogo /etc/ansible, opou exei egatastathei to ansible
sudo cp ../ansible/ansible.cfg /etc/ansible/ansible.cfg


# Me tis parakato entoles vriskoume tin topiki IPv4 kai IPv6 dieythynsi tou master
ip4=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
ip6=$(/sbin/ip -o -6 addr list eth0 | awk '{print $4}' | cut -d/ -f1)


# Entoles opou i mia dimiourgei to arxeio inventory.yml kai prosthetei se ayto to string "[service]"
# kai i alli vriskei kai prostetei sto arxeio inventory.yml 
# ta mixanakia sta opoia epithymoume na egatastathei to fluentd
echo "[service]" > /data_collector_service/fluentd/inventory.yml
/project/bin/swarmlab-nmap >> /data_collector_service/fluentd/inventory.yml


# Entoli pou prosthetei kai ton master sto inventory.yml,
# dioti theloume na egatastathei kai se ayton to fluentd
echo $ip4 >> /data_collector_service/fluentd/inventory.yml


# Entoli pou trexei to ansible-playbook,
# outos oste na pragmatopoiithoun oi egatastaseis pou anaferontai sto arxeio fluentd.yml 
# sta mixanakia pou anaferontai sto arxeio inventory.yml
# Orizoume to ansible na anoigei 5 syndeseis taytoxrona kai na egathista kai sta 5 mixanakia taytoxrona
# Tou leme otan tha syndethei na rotisei to password mia fora 
# kai na rotisei ean ayto to password einai idio me tou sudo
ansible-playbook -u docker -i inventory.yml fluentd.yml  -f 5  --ask-pass --ask-become-pass

