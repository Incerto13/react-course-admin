# !/bin/bash

# Note: local postgres service must be off for nest.js server to start

# load nvm and change to node 16
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 16

# generate .env file in web and server directories
source ../.env
printf "REACT_APP_COURSE_ADMIN_SERVER_URL=$REACT_APP_COURSE_ADMIN_SERVER_URL" > web/.env
printf "REACT_COURSE_ADMIN_TYPEORM_HOST=$REACT_COURSE_ADMIN_TYPEORM_HOST\nREACT_COURSE_ADMIN_POSTGRES_PORT=$REACT_COURSE_ADMIN_POSTGRES_PORT\n" > server/.env
echo "successfully created web/.env and server/.env files"

# clean docker
docker stop react-course-admin_postgres react-course-admin_pgweb
docker system prune -af

# run postgres and pgweb in docker
echo "starting postgres and pgweb containers..."
docker compose -f docker-compose.dev.yml --env-file ../.env up -d react-course-admin_postgres react-course-admin_pgweb

# run server and web locally via tmux
Start a new tmux session named 'react-course-admin'
tmux new-session -d -s react-course-admin

# Create a new window for the server app
tmux new-window -t react-course-admin:0 -n 'server'

# Run the server app in the first window
echo "starting server..."
tmux send-keys -t react-course-admin:0 "cd server && npm start" C-m

# Create a new window for the web app
tmux new-window -t react-course-admin:1 -n 'web'

# Run the web app in the second window
echo "starting web app..."  
tmux send-keys -t react-course-admin:1 "cd web && npm start" C-m

# Attach to the tmux session
tmux attach -t react-course-admin
