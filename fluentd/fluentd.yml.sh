#!/bin/sh

sudo apt update -y
sudo apt install -y ansible sshpass

sudo chown $(whoami) /data_collector_service/fluentd/
sudo chmod +rwx /data_collector_service/fluentd/

sudo mkdir -p /home/docker/.ansible
sudo chown docker.docker -R /home/docker

sudo cp ../ansible.cfg /etc/ansible/ansible.cfg

ip4=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
ip6=$(/sbin/ip -o -6 addr list eth0 | awk '{print $4}' | cut -d/ -f1)

echo "[service]" > /data_collector_service/fluentd/inventory.yml
/project/bin/swarmlab-nmap >> /data_collector_service/fluentd/inventory.yml


# include master or not
echo $ip4 >> /data_collector_service/fluentd/inventory.yml


ansible-playbook -u docker -i inventory.yml fluentd.yml  -f 5  --ask-pass --ask-become-pass

