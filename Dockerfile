FROM bitnami/nginx:latest

USER 0
RUN chown -R 1001 /opt/bitnami/nginx/tmp/

# Copy the build output to replace the default nginx contents.
COPY /dist/fileid-app-frontend/browser /app
COPY /deployment/nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx-server.conf

COPY ./deployment/start-app.sh /docker-entrypoint-initdb.d
RUN chown -R 1001 /app/environment/

# Don't run as root
USER 1001

# Expose port
EXPOSE 8080
