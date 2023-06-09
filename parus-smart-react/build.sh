#for local testing/or local docker container
image=docker-parus-smart-react
container=docker-parus-smart-react
port=3132
#should coming from git commit hash
version=1

docker stop $container
docker image rm $image
docker rm $container
docker build -t $image -f Dockerfile . --build-arg REACT_APP_VERSION=$version
docker run --restart=always --env PORT=80 -d -p $port:80 --name $container $image
