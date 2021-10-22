from flask import Flask
from celery import Celery
from config import Config
from flask_migrate import Migrate
from flask_redis import FlaskRedis
from .db import db


migrate = Migrate()
redis_client = FlaskRedis()
celery = Celery(__name__, backend=Config.RESULT_BACKEND, broker=Config.BROKER_URL)


def register_blueprints(app):
    from app.school import bp as school_bp
    app.register_blueprint(school_bp)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    redis_client.init_app(app)
    celery.conf.update(app.config)

    register_blueprints(app)

    app.app_context().push()

    return app
    

def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['RESULT_BACKEND'],
        broker=app.config['BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    celery.config_from_object(__name__)
    return celery
