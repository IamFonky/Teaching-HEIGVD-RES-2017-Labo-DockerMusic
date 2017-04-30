FROM node:4.3.1
MAINTAINER P-B Monaco <pierre-benjamin.monaco@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/
COPY src/shared /opt/app/shared/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/auditor.js"]