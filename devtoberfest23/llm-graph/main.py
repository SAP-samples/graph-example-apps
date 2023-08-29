from logger import CustomFormatter
import prompt
import argparse
import logging

from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain
from langchain.schema import BaseOutputParser

from template import Template
from urlParser import UrlParser

# Argument Parser
parser = argparse.ArgumentParser()
parser.add_argument(
    '-d', '--debug',
    help="Print lots of debugging statements",
    action="store_const", dest="loglevel", const=logging.DEBUG,
    default=logging.WARNING,
)
parser.add_argument(
    '-v', '--verbose',
    help="Be verbose",
    action="store_true",
    dest="verboseLoggingEnabled",
)

args = parser.parse_args()  

# Configure custom logger
handler = logging.StreamHandler()
handler.setFormatter(CustomFormatter())

logging.getLogger().addHandler(handler)

if args.verboseLoggingEnabled:
    logging.basicConfig(level=logging.INFO)

message = prompt.string(prompt="Ask a question related to the Data: ")

# Run first chain to get the URL and its Json Response
template = Template.prepareTemplate()

system_message_prompt = SystemMessagePromptTemplate.from_template(template)

human_template = "{text}"
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

chain = LLMChain(
    llm=ChatOpenAI(),
    prompt=chat_prompt,
    verbose=args.verboseLoggingEnabled,
    output_parser=UrlParser()
)

response = ""
try:
    response =chain.run(message) 
except Exception as e:
    try:
        text = """In the previous run the AI responed with a URL and after requesting the URL we got an error. 
        Here are the details: %(error)s
        Please read the error message carefully and the reconstruct the URL. Only print the URL and nothing more
        Please find the user message below: \n%(message)s""" %{"error": e, "message": message}
        response = chain.run(text)
    except Exception as e:
        logging.error ("ßFailed in the second attempt")
        exit()

# Run second chain to convert the JSON response to human readable text

template_2 = Template.prepareTemplateForProcessingJsonResponse(response, message)
chat_prompt = ChatPromptTemplate.from_messages([SystemMessagePromptTemplate.from_template(template_2), HumanMessagePromptTemplate.from_template("{text}")])
chain_2 = LLMChain(
    llm=ChatOpenAI(),
    verbose=args.verboseLoggingEnabled,
    prompt=chat_prompt
)
chain_2_response= chain_2.run(message)
print("\nAnswer: " + chain_2_response)
