from bs4 import BeautifulSoup
import requests
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
def save_data(path,lista):
    f=open(path,"w")
    for i in lista:
        f.write(str(i)+"\n")
    f.close()
def load_data(path):
    f=open(path,"r")
    lines=f.read().splitlines()
    f.close()
    return lines
