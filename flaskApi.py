from flask import Flask
from flask_restful import Resource, Api
from pymongo import MongoClient
import json
import chardet 

#api = http://127.0.0.1:5000/marketplaces

mongoDbClient = MongoClient("mongodb://localhost:27017/")
mydb = mongoDbClient["NFTS"]
mycol = mydb["NFT"]
app = Flask(__name__)
api = Api(app)

class MarketPlaces(Resource):
    def get(self):
        marketplaces = mycol.find()
        data = []
        for i in marketplaces:
            doc = i
            #print(i)
            doc["_id"]= str(doc["_id"])
            data.append(doc)
        #print(data)
        return {"marketplaces": data}

api.add_resource(MarketPlaces, '/marketplaces')

if __name__ == '__main__':
    app.run(debug=True)