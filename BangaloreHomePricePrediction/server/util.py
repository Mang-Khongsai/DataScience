# NOTE: Run the following code with python 3.11.5 only

import json
import pickle
import  numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(loc, sqfts, bhks, baths):

    try:
        loc_index = __data_columns.index(loc.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))

    x[0] = sqfts
    x[1] = baths
    x[2] = bhks

    if loc_index >=0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)

def get_location_names():
    return __locations

def load_saved_artifacts():
    print("loading saved artifacts..start")
    global __data_columns
    global __locations
    global __model

    # with open("./artifacts/columns.json","r") as f:
    with open("./../model/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

        
    # with open("./artifacts/bangalore_home_price_prediction","rb") as f:
    with open("./../model/bangalore_home_price_prediction","rb") as f:
        __model = pickle.load(f)

if __name__=='__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('Indira Nagar',1000, 2, 2))
    print(get_estimated_price('Indira Nagar',1000, 3, 3))