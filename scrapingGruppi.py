#!/usr/bin/python
# -*- coding: utf-8 -*-

# python v 2.7

__author__ = 'Los Raspadores'


"""
    pip install beautifulsoup4
"""


# moduli importati
import json
from bs4 import BeautifulSoup
import mechanize


# Browser mechanize
br = mechanize.Browser()

# url dove si trova l'elenco dei gruppi
url_gruppi = "http://vitali.web.cs.unibo.it/TechWeb15/ProgettoDelCorso"


def main():
    scraping_gruppi()


def scraping_gruppi():
    lista = []
    page = br.open(url_gruppi)
    html = page.read()
    soup = BeautifulSoup(html)
    table = soup.find("table", cellpadding="5")
    for r in table.findAll('tr')[1:]:
        list = r.findAll("font")
        data = {}
        data['id'] = list[0].text
        data['nome'] = list[1].text
        lista.append(data)

    with open('listagrafi.json', 'w') as fp:
        json.dump(lista, fp)

    return json.dumps(lista)


if __name__ == "__main__":
    print "this script (scrapingGruppi) is being run directly from %s" % __name__
    main()
else:
    print "this script (scrapingGruppi) is being imported into another module"
