# Command Line LLM Application for Graph in Integration Suite

### Prerequisites
* A running Graph intance called as a Business Data Graph: [Reference](https://help.sap.com/docs/graph?locale=en-US)
* `credentials.json`: The secret binding which is created in BTP. This file must be saved in the root folder of the project
* `OPENAI_API_KEY`: This is the key required for accesing the OPEN AI API ([Reference](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key))
  * This key must be exported as an environment variable
    ```
    export OPENAI_API_KEY = "<key>"
    ```
* If the run is failing try deleting the file `token.txt`. 
* Python 3

### Command
```
python3 main.py
```

## Sample Questions for frequent flyer case 

* *Give me the Flying Partner and their city with the maximum membership points*
* *Give me the membership points and their names for all flying partners which are in the city Konstanz*
* *Give me the Flying Partner with maximum membership points*
* *Give me the highest frequent flyer poits value*
* *Print the loyalty program status with the maximum frequent flyer points*
