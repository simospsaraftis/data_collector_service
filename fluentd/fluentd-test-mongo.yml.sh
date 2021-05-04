#!/bin/sh


ip4=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
ip6=$(/sbin/ip -o -6 addr list eth0 | awk '{print $4}' | cut -d/ -f1)

echo "[service]" > /project/courses/fluentd/inventory.yml
/project/bin/swarmlab-nmap >> /project/courses/fluentd/inventory.yml


# include master or not
echo $ip4 >> /project/courses/fluentd/inventory.yml


ansible-playbook -u docker -i inventory.yml fluentd-test-mongo.yml  -f 5  --ask-pass --ask-become-pass