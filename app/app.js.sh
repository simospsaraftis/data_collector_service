curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh \
&& sudo bash nodesource_setup.sh \
&& sudo apt-get install -y nodejs \
&& npm install \
&& npm install socket.io \
&& npm install socket.io-client \
&& npm install mongodb \
&& npm install express \
&& npm install helmet \
&& npm install dotenv
