server {
    listen 80;
    server_name api.parus-smart.site;

    location / {
        proxy_pass http://192.168.0.104:3134;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}

server {
    listen 80;
    server_name parus-smart.site www.parus-smart.site;

    location / {
        proxy_pass http://192.168.0.104:3132;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}

sudo nano /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

sudo docker run --detach \
  --hostname 0.0.0.0 \
  --publish 443:443 --publish 8081:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  gitlab/gitlab-ee:latest



  sudo docker run --detach \
  --hostname gitlab.example.com \	
  --publish host-https-port:container-https-port 
  --publish host-http-port:container-http-port=8081 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  --shm-size 256m \
  gitlab/gitlab-ee:latest