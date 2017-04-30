#!/bin/bash

rm -rf docker/image-auditor/src/shared
cp -r docker/shared/ docker/image-auditor/src/shared

rm -rf docker/image-musician/src/shared
cp -r docker/shared/ docker/image-musician/src/shared