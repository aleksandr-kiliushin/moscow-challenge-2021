import json
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import String, Integer, BigInteger, SmallInteger, Float, Bool
from sqlalchemy.sql.schema import CheckConstraint, Column, UniqueConstraint, ForeignKey
from ..db import Model, db


class School(Model):
    __table_args__ = (UniqueConstraint('latitude', 'longitude',  name='uq_schools'),)

    latitude = Column(Float, nullable=False)
    longitude = Column(FLoat, nullable=False)
    volume = Column(Integer, nullable=False)
    done = Column(Bool, nullable=False)

    def __init__(self, latitude : float, longitude : float, volume : int, done : bool = False):
        self.latitude = latitude
        self.longitude = longitude
        self.volume = volume
        self.done = done

    def insert_if_not_exists_and_select(self):
        school = School.query.filter_by(latitude=self.latitude, longitude=self.longitude, volume=self.volume).first()

        if school is None:
            self.session.add(self)
            self.session.commit()
            
        return school or self


