curl -sL https://deb.nodesource.com/setup_15.x -o nodesource_setup.sh \
&& sudo bash nodesource_setup.sh \
&& sudo apt-get install -y nodejs \
&& npm install \
&& npm install socket.io \
&& npm install socket.io-client

