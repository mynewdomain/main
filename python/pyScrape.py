from bs4 import BeautifulSoup
import requests
import os

def getAnnouncements(site):
    url=site
    response=requests.get(url)
    soup=BeautifulSoup(response.text,"html.parser")
    announcements=soup.find_all('div', itemprop='dateCreated')
    dates=[]
    for i in announcements:
        day = i.find('span', class_='date_day').text.strip()
        month = i.find('span', class_='date_month').text.strip()
        year = i.find('span', class_='date_year').text.strip()
        dates.append(day+"/"+month+"/"+year)
    return dates

def save_data(path, lista):
    with open(path, "w") as f:
        for i in lista:
            f.write(str(i) + "\n")

def load_data(path):
    if not os.path.exists(path):
        # Δημιουργούμε άδειο αρχείο αν δεν υπάρχει
        with open(path, 'w') as f:
            pass
        return []
    with open(path, "r") as f:
        lines = f.read().splitlines()
    return lines
