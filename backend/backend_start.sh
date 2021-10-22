#!/bin/sh
flask db init
flask db migrate
flask db upgrade

/etc/init.d/redis-server restart 
celery -A celery_worker.celery worker &

service nginx start
uwsgi --ini uwsgi.ini
