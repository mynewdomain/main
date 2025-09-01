import pyScrape
import requests
import os
DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
ANNOUNCEMENTS_URL = os.getenv("ANNOUNCEMENTS_URL")
file = 'python/anakoinwseis.txt'
def send_message(message):
    if DISCORD_WEBHOOK:
        requests.post(DISCORD_WEBHOOK, json={
            "content": f"{message}\n{ANNOUNCEMENTS_URL}"
        })
stored_dates = pyScrape.load_data(file)
storedData = len(stored_dates)
if stored_dates == []:
    dates = pyScrape.getAnnouncements(ANNOUNCEMENTS_URL)
    pyScrape.save_data(file, dates)
else:
    dates = stored_dates
newData=len(dates)
if newData==storedData:
    send_message("Δεν βγήκε ανακοίνωση")
else:
    diaf=newData-storedData
    print("There are "+str(diaf)+" new announcements")
    pyScrape.save_data(file, dates)
    send_message("Βγήκαν "+str(diaf)+" ανακοινώσεις")
