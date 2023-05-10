#for local testing/or local docker container
image=docker-parus-smart-strapi
container=docker-parus-smart-strapi
port=3134
#should coming from git commit hash
version=1


docker image rm $image
docker build -t $image -f Dockerfile . --build-arg REACT_APP_VERSION=$version

docker stop $container
docker rm $container

# host.docker.internal
#docker run --env PORT=1337 -d -p $port:1337 --env-file=.env --env DATABASE_HOST=172.17.0.2 --name $container $image
docker run --restart=always --env PORT=1337 -d -p $port:1337 --env-file=.env --name $container $image

