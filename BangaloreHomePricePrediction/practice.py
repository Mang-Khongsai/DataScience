import json

__var = None
with open("./model/columns.json",'r') as f:
    __var = json.load(f)['data_columns']
    
    print(__var[:3])
    
    
