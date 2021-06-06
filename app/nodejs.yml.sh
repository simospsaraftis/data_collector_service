#!/bin/sh

#Entoli pou pragmatopoiei enimerosi ton idi egatestimenon paketon
sudo apt update -y

# Entoli pou pragmatopoiei egatastasi tou ansible
sudo apt install -y ansible sshpass

# Entoli pou orizei ton xristi tou directory app
sudo chown $(whoami) /data_collector_service/app

# Entoli pou dinei dikaiomata read,write kai execute sto directory app
sudo chmod +rwx /data_collector_service/app


# Entoli pou dimiourgei enan kryfo katalogo gia to ansible sto docker
sudo mkdir -p /home/docker/.ansible

#Entoli pou orizei oti o xristis tou directory docker tha einai o docker
sudo chown docker.docker -R /home/docker


# Entoli pou metaferei to arxeio me to default configuration tou ansible
# ston katalogo /etc/ansible, opou exei egatastathei to ansible
sudo cp ../ansible/ansible.cfg /etc/ansible/ansible.cfg


# Me tis parakato entoles vriskoume tin topiki IPv4 kai IPv6 dieythynsi
ip4=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
ip6=$(/sbin/ip -o -6 addr list eth0 | awk '{print $4}' | cut -d/ -f1)


# Entoli pou dimiourgei kai prosthetei sto arxeio inventory.yml ta mixanakia sta opoia epithymoume na egatastahei to fluentd
echo "[service]" > /data_collector_service/app/inventory.yml
/data_collector_service/bin/swarmlab-nmap >> /data_collector_service/app/inventory.yml


# Den theloume na kanoume tis sygekrimenes egatastaseis ston master
#echo $ip4 >> /data_collector_service/app/inventory.yml


# Entoli pou trexei to ansible-playbook,
# outos oste na pragmatopoiithoun oi egatastaseis sta mixanakia pou anaferontai sto inventory.yml
# Orizoume to ansible na anoigei 5 syndeseis taytoxrona
ansible-playbook -u docker -i /data_collector_service/app/inventory.yml nodejs.yml  -f 5  --ask-pass --ask-become-pass

