import pyScrape
import requests
import os

DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
names = ["genikes", "tmhmatos"]
urls = ["https://www.uniwa.gr/category/announcements/",
        "https://ice.uniwa.gr/announcements-all/"]

def send_message(name, url, message):
    if DISCORD_WEBHOOK:
        requests.post(DISCORD_WEBHOOK, json={
            "content": f"[{name}] {message}\n{url}"
        })

for i in range(len(urls)):
    file = f'anakoinwseis_{names[i]}.txt'
    stored_dates = pyScrape.load_data(file)  # Ανακοινώσεις που έχουμε ήδη αποθηκεύσει
    dates = pyScrape.getAnnouncements(urls[i])  # Όλες οι τρέχουσες ανακοινώσεις στη σελίδα

    if not stored_dates:  # Πρώτη εκτέλεση
        pyScrape.save_data(file, dates)
        # Δεν στέλνουμε μήνυμα την πρώτη φορά
        print(f"{names[i]}: Αρχικοποιήθηκαν οι ανακοινώσεις ({len(dates)} συνολικά)")
        continue

    # Βρίσκουμε τις πραγματικά νέες ανακοινώσεις
    new_announcements = [d for d in dates if d not in stored_dates]

    if new_announcements:
        pyScrape.save_data(file, dates)
        send_message(names[i], urls[i], f"Βγήκαν {len(new_announcements)} νέες ανακοινώσεις")
        print(f"{names[i]}: Βγήκαν {len(new_announcements)} νέες ανακοινώσεις")
    else:
        send_message(names[i], urls[i], "Δεν βγήκε ανακοίνωση")
        print(f"{names[i]}: Δεν βγήκε ανακοίνωση")
