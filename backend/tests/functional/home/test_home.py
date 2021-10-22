import json
from tests.functional.bases.base import BaseTestCase
from tests.functional.header import Header
from tests.utils import random_string
from time import sleep
import requests


class HomeTestCase(BaseTestCase):
    def test_index_success(self):
        with self.app.test_client() as test_client:
            response = test_client.get('/')
            assert response.status_code == 200
    