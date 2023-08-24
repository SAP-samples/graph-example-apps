import os
import requests
import json


class Metadata:
    access_token = ""

    def fetchApiMetadata(self, url):

        client_credentials_file = 'credentials.json'
        tokenFile = 'token.txt'
        response = ''
        # Token fetch logic
        if (Metadata.access_token == ""):
            if os.path.exists(tokenFile):
                file = open(tokenFile, 'r')
                fileContents = file.read()
                file.close()
                Metadata.access_token = fileContents
            else:
                Metadata.access_token = Metadata.getAccessToken(client_credentials_file)
                file = open(tokenFile, 'w+')
                file.write(Metadata.access_token)

        try:
            response = Metadata.fetch_url_with_bearer_token(url, client_credentials_file)
        except Exception as e:
            print(f'Error: {str(e)}')
        return response



    def fetch_url_with_bearer_token(url, client_credentials_file):

        # Make the GET request with the bearer token
        headers = {
            'Authorization': f'Bearer {Metadata.access_token}'
        }
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise Exception('Failed to fetch URL' + response.status_code)

        return response.text

    def getAccessToken(client_credentials_file):
        with open(client_credentials_file, 'r') as file:
            credentials = json.load(file)

        # Metadata the bearer token
        oauthUrl = '/oauth/token'
        token_url = credentials['uaa']['url'] + oauthUrl
        client_id = credentials['uaa']['clientid']
        client_secret = credentials['uaa']['clientsecret']
        response = requests.post(token_url, data={
            'grant_type': 'client_credentials',
            'client_id': client_id,
            'client_secret': client_secret
        })

        if response.status_code != 200:
            raise Exception('Failed to fetch bearer token')

        access_token = response.json()['access_token']
        return access_token