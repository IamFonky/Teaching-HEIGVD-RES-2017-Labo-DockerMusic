#!/bin/bash

#
# This is a bit brutal (and will affect your system if you are running other
# containers than those of the lab)
#
echo ""
echo ""
echo "*** Killing"
echo ""
docker kill $(docker ps -a -q)
docker rm $(docker ps -a -q)

#
# Let's get rid of existing images...
#
echo ""
echo ""
echo "*** Deleting"
echo ""
docker rmi res/auditor

#
# ... and rebuild them
#
echo ""
echo ""
echo "*** Rebuilding our 3 Docker images"
echo ""
docker build --tag res/auditor --file ./docker/image-auditor/Dockerfile ./docker/image-auditor/

#
# We start a single container. The Node.js application executed in this container will use
# a npm package to control Docker. It will start/stop musician and auditor containers and check that
# the auditor works as expected.
#
echo ""
echo ""
echo "*** Starting validation..."
echo ""
docker run --name res_validation -v //var/run/docker.sock:/var/run/docker.sock res/validate-music

#docker run -it --name res_auditor res/auditor


