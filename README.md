# Musical Bassoon Fe

Musical Bassoon FE serves as a user interface for an artist and song management system.


## Installation

Say goodbye to the 'It works on my machine' blues and hello to the Docker dazzle with our app! 
```bash

    git clone https://github.com/dcostersabin/musical-bassoon-fe.git

    cd musical-bassoon-fe

    docker build -t musical-bassoon-fe .

   docker run --rm -d -p 3000:80 musical-bassoon-fe:latest 


```
    
## Health Check
__Note__ : Ensure that your backend system is operational. If it's not running, you can set up the backend service by visiting https://github.com/dcostersabin/musical-bassoon.

Open your browser and go to the following address: http://localhost:3000. Once there, you will be welcomed with a login screen.


## Environment Variables

Kindly locate the exemplar environment variable within the __.example.env__ file.

