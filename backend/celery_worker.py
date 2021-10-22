from app import create_app, celery, make_celery


app = create_app()
app.app_context().push()

make_celery(app)
