import json
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import String, Integer, BigInteger, SmallInteger, Float
from sqlalchemy.sql.schema import CheckConstraint, Column, UniqueConstraint, ForeignKey
from .db import Model, db


class AdmZone(Model):
    __tablename__ = "adm_zones"
    __table_args__ = (UniqueConstraint('zone_name', 'okrug_name', 'sub_ter', name='uq_adm_zones'),)

    zone_name = Column(String(512), nullable=False)
    region_name = Column(String(1024), nullable=False)
    sub_ter = Column(String(256), nullable=False)

    def __init__(self, zone_name : str, region_name : str, sub_ter : str):
        self.zone_name = zone_name
        self.region_name = region_name
        self.sub_ter = sub_ter

    def insert_if_not_exists_and_select(self):
        adm = AdmZone.query.filter_by(zone_name=self.zone_name, okrug_name=self.okrug_name, sub_ter=self.sub_ter).first()

        if adm is None:
            self.session.add(self)
            self.session.commit()
            
        return adm or self


class Sector(Model):

    adm_zone_id = Column(BigInteger, ForeignKey('adm_zones.id'))
    area = Column(Float, nullable=False)

    adm_zone = relationship('AdmZone', backref=db.backref('sectors'))

    def __init__(self, adm_zone_id: int, area : float) -> None:
        self.adm_zone_id = adm_zone_id
        self.area = area
    
    def insert_if_not_exists_and_select(self):
        sector = Sector.query.filter_by(adm_zone_id=self.adm_zone_id, area=self.area).first()

        if sector is None:
            self.session.add(self)
            self.session.commit()

        return sector or self


class Location(Model):

    sector_id = Column(BigInteger, ForeignKey('sector.id'))
    customers_cnt_home = Column(Integer, nullable=False)
    customers_cnt_job = Column(Integer, nullable=False)
    customers_cnt_day = Column(Integer, nullable=False)
    customers_cnt_move = Column(Integer, nullable=False)

    def __init__(self, sector_id : int, customers_cnt_home : int = 0, customers_cnt_job : int = 0, customers_cnt_day : int = 0, customers_cnt_move : int = 0) -> None:
        self.sector_id = sector_id
        self.customers_cnt_home = customers_cnt_home
        self.customers_cnt_job = customers_cnt_job
        self.customers_cnt_day = customers_cnt_day
        self.customers_cnt_move = customers_cnt_move

    def insert_if_not_exists_and_select(self):
        location = Location.query.filter_by(sector_id=self.sector_id, customers_cnt_home=self.customers_cnt_home, 
            customers_cnt_job=self.customers_cnt_job, customers_cnt_day=self.customers_cnt_day, 
            customers_cnt_move=self.customers_cnt_move).first()

        if location is None:
            self.session.add(self)
            self.session.commit()

        return location or self
    

class MatrixHomeWork(Model):
    __tablename__ = "matrix_home_work"

    home_zone_id = Column(BigInteger, ForeignKey('adm_zones.id'))
    work_zone_id = Column(BigInteger, ForeignKey('adm_zones.id'))
    customers_cnt = Column(Integer, nullable=False)

    def __init__(self, home_zone_id : int , work_zone_id : int, customers_cnt : int = 0):
        self.home_zone_id = home_zone_id
        self.work_zone_id = work_zone_id
        self.customers_cnt = customers_cnt


class HeatMap(Model):
    __tablename__ = "heat_map"
    __table_args__ = (UniqueConstraint('latitude', 'longitude', name='uq_heat_map'),)

    latitude = Column(Float, nullable=False)
    longitude = Column(FLoat, nullable=False)
    layer = Column(FLoat, nullable=False)

    def __init__(self, latitude : float, longitude : float, layer : float = 0):
        self.latitude = latitude
        self.longitude = longitude
        self.layer = layer
