import pyScrape
import requests
import os
DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
ANNOUNCEMENTS_URL = os.getenv("ANNOUNCEMENTS_URL")
names=["genikes","tmhmatos"]
urls=["https://www.uniwa.gr/category/announcements/",
      "https://ice.uniwa.gr/announcements-all/"]
def send_message(name,url,message):
    if DISCORD_WEBHOOK:
        requests.post(DISCORD_WEBHOOK, json={
            "content":"["+name+"]"+message+"\n"+url
        })
for i in range(len(urls)):
    file='anakoinwseis_'+names[i]+'.txt'
    stored_dates = pyScrape.load_data(file)
    storedData = len(stored_dates)
    dates=pyScrape.getAnnouncements(urls[i])
    newData=len(dates)
    if newData==storedData:
       send_message(names[i],urls[i],"Δεν βγήκε ανακοίνωση")
    else:
       diaf=newData-storedData
       print("There are "+str(diaf)+" new announcements")
       pyScrape.save_data(file, dates)
       send_message(names[i],urls[i],"Βγήκαν "+str(diaf)+" ανακοινώσεις")
