# !/bin/bash

source .env
echo REACT_APP_COURSE_ADMIN_DOMAIN_SERVER=$REACT_APP_COURSE_ADMIN_DOMAIN_SERVER > web/.env
sudo docker-compose up --build -d