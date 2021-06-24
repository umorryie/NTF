import pandas as pd
import json
import numpy as np
from pymongo import MongoClient

data = "data.xlsx"
jsonData = "data.json"

df = pd.read_excel(data).replace(np.nan, '', regex=True)
json_list = json.loads(json.dumps(list(df.to_dict().values())))
names, data = [], []
for i in json_list[0]:
    names.append(json_list[0][i])

for i in range(1,len(json_list)):
    row = json_list[i]
    tempObject = {}
    for k in row:
        value = row[k]
        print(value)
        key=names[int(k)].replace(" ", "_").replace(".", "")
        if type(value) is str:
            if "," in value:
                tempObject[key] = value.split(',')
            else:
                tempObject[key] = [value]
        else:
            tempObject[key] = value

    data.append(tempObject)

finalJson = json.dumps(data, indent=4, ensure_ascii=False)



with open(jsonData, "w") as outfile:
    outfile.write(finalJson)

mongoDbClient = MongoClient("mongodb://localhost:27017/")
mydb = mongoDbClient["NFTS"]
mycol = mydb["NFT"]
mycol.delete_many({})

for i in data:
    mycol.insert_one(i)