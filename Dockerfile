# Voir : https://github.com/denoland/deno_docker/blob/main/alpine.dockerfile

ARG DENO_VERSION=2.6.0
ARG BIN_IMAGE=denoland/deno:bin-${DENO_VERSION}
FROM ${BIN_IMAGE} AS bin

FROM frolvlad/alpine-glibc:alpine-3.13

# Installer les certificats nécessaires
RUN apk --no-cache add ca-certificates

# Créer un utilisateur non-root pour exécuter Deno
RUN addgroup --gid 1000 deno \
  && adduser --uid 1000 --disabled-password deno --ingroup deno \
  && mkdir /deno-dir/ \
  && chown deno:deno /deno-dir/

# Configurer les variables d'environnement pour Deno
ENV DENO_DIR /deno-dir/
ENV DENO_INSTALL_ROOT /usr/local

# Copier l'exécutable Deno depuis l'image source
ARG DENO_VERSION
ENV DENO_VERSION=${DENO_VERSION}
COPY --from=bin /deno /bin/deno

# Définir le répertoire de travail et copier les fichiers
WORKDIR /deno-dir
COPY . .

ENTRYPOINT ["/bin/deno"]
#CMD ["cache", "--reload", "https://deno.land/std/examples/echo_server.ts"]
CMD ["run", "--allow-net", "https://deno.land/std/examples/echo_server.ts"]
