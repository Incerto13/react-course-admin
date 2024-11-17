# !/bin/bash

# generate .env file in web directory
source ../.env
printf "REACT_APP_COURSE_ADMIN_SERVER_URL=$REACT_APP_COURSE_ADMIN_SERVER_URL" > web/.env
echo "successfully created web/.env and server/.env files"

# clean docker
docker stop react-course-admin_postgres react-course-admin_pgweb react-course-admin_server react-course-admin_web
docker system prune -af

# run all containers in docker
echo "starting postgres, pgweb, react-course-admin_server and react-course-admin_web containers..."
sudo docker compose -f docker-compose.dev.yml --env-file ../.env up -d

