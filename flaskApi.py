from flask import Flask
from flask_restful import Resource, Api
from pymongo import MongoClient
import json
import chardet 

#api = http://127.0.0.1:5000/marketplaces

mongoDbClient = MongoClient("mongodb://localhost:27017/")
mydb = mongoDbClient["NFTS"]
mycol1 = mydb["NFT"]
mycol2 = mydb["columns"]
app = Flask(__name__)
api = Api(app)

class MarketPlaces(Resource):
    def get(self):
        marketplaces = mycol1.find()
        data = []
        for i in marketplaces:
            doc = i
            #print(i)
            doc["_id"]= str(doc["_id"])
            data.append(doc)
        #print(data)
        return {"marketplaces": data}

class Columns(Resource):
    def get(self):
        columns = mycol2.find()
        data = []
        for i in columns:
            doc = i
            #print(i)
            doc["_id"]= str(doc["_id"])
            data.append(doc)
        #print(data)
        return {"columns": data}

api.add_resource(MarketPlaces, '/marketplaces')
api.add_resource(Columns, '/columns')

if __name__ == '__main__':
    app.run(debug=True)