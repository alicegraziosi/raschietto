#!/usr/bin/python
# -*- coding: utf-8 -*-

# python v 2.7

__author__ = 'Los Raspadores'

"""
    pip install Flask

    spazio web nostro gruppo url: http://ltw1537.web.cs.unibo.it/
"""

from flask import Flask, render_template, request

# script importati
from scrapingGruppi import scraping_gruppi
from scrapingDocumenti import scraping_documenti
from scrapingSingoloDocumento import scraping_singolo_documento
from scrapingAutomatico import scraping_titolo, scraping_titolo_dlib, scarping_autore, scraping_autore_dlib,scraping_doi,scraping_doi_dlib


# initializzazione applicazione
app = Flask(__name__)

# valori di configurazione
app.config.update(
    DEBUG=True,
)


# controllers
@app.route("/hello")
def hello():
    return "Hello from Python!"


@app.route('/')
def index(name=None):
    return render_template('index.html', name=name)


@app.route('/scrapingDocumenti')
def return_documenti():
    data = scraping_documenti()
    return data


@app.route('/scrapingAutomatico')
def return_titolo():
    #data = scraping_titolo()
    #data = scraping_titolo_dlib()
    #data = scarping_autore()
    #data =scraping_autore_dlib()
    #data = scraping_doi()
    data = scraping_doi_dlib()
    return data



@app.route('/scrapingGruppi')
def return_gruppi():
    data = scraping_gruppi()
    return data


@app.route('/scrapingSingoloDocumento')
def return_singolo_documento():
    url = request.args.get('url')
    # print("***** "+url)
    data = scraping_singolo_documento(url)
    return data

# launch app
if __name__ == "__main__":
    # app.run(host='bla', port=8080)

    # in locale: run on default port localhost:5000
    app.run()
