# docker build -t image-optimizer .
# docker run --rm -v (pwd)/src:/lib/src -v (pwd)/dest:/lib/dest image-optimizer

FROM node:10-slim

COPY lib /lib/
WORKDIR /lib

RUN apt-get -y update && apt-get -y upgrade && apt-get install -y \
  libjpeg-dev \
  libpng-dev \
  libwebp-dev \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/* \
&& yarn install \
&& yarn cache clean

CMD ["node", "main"]
