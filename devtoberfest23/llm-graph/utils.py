import json
import logging

def prettify(jsonAsString):
    prettyJson = "Not found"
    try:
        jsonAsObject = json.loads(jsonAsString)
        prettyJson = json.dumps(jsonAsObject, indent=2)
    except Exception as e:
        logging.debug(f'Error: {str(e)}')
    return prettyJson
