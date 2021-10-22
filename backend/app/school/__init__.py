from flask import Blueprint

from .routes import School

bp = Blueprint('school', __name__, url_prefix='/')
School.register(bp, route_base='/')
