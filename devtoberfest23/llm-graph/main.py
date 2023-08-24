import os
from langchain import PromptTemplate
import prompt
import argparse
import logging
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory


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
    action="store_const", dest="loglevel", const=logging.INFO,
)

args = parser.parse_args()    
logging.basicConfig(level=args.loglevel)

message = prompt.string(prompt="Ask a question related to the Data: ")


template = Template.prepareTemplate()
system_message_prompt = SystemMessagePromptTemplate.from_template(template)
human_template = "{text}"
human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])


memory = ConversationBufferMemory(memory_key="chat_history")

chain = LLMChain(
    llm=ChatOpenAI(),
    prompt=chat_prompt,
    memory=memory,
    verbose=True,
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
        logging.error ("\n Failed in the second attempt")
        exit()

template_2 = Template.prepareTemplateForProcessingJsonResponse(response, message)
chat_prompt = ChatPromptTemplate.from_messages([SystemMessagePromptTemplate.from_template(template_2), HumanMessagePromptTemplate.from_template("{text}")])
chain_2 = LLMChain(
    llm=ChatOpenAI(),
    verbose=True,
    prompt=chat_prompt
)
chain_2_response= chain_2.run(message)
print("\nAnswer: " + chain_2_response)