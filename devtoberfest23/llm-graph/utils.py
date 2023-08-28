import json

def prettify(jsonAsString):
    jsonAsObject = json.loads(jsonAsString)
    prettyJson = json.dumps(jsonAsObject, indent=2)
    return prettyJson
