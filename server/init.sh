#!/bin/bash
docker-compose up -d
echo -ne "Waiting solr to start ... " 
sleep 5
echo -e "\e[32mdone \e[39m"
docker run --rm -v "$PWD/mydata:/mydata" --network=host solr post -c movies /mydata/movie.json
echo Done ! 