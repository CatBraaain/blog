---
title: Gmail APIで送信したメールに警告文が表示されてしまう原因
category: Tech
tags: ["Python"]
createdAt: 2021-08-09 15:07:45
updatedAt: 2021-08-09 15:07:45
noteLink: https://note.com/optim/n/n526433531246
---

PythonとGmailAPIでメール送信のテストをしたところ

このメールにはご注意ください
Gmail では、このメールが本当に xxxxx@gmail.com から送信されたものであることを確認できませんでした。メールに含まれるリンクのクリックや添付ファイルのダウンロード、または返信に個人情報を記載することは避けてください。

というエラーメッセージが表示された。

原因は、メール送信者の設定を文字列で自分のメールアドレスにしていたこと。
解決策は、メール送信者の設定を"me"にすること。

```python
def create_message(body, to, sender, subject):
    message = MIMEText(body)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    encode_message = base64.urlsafe_b64encode(message.as_bytes())
    message = {'raw': encode_message.decode()}
    return message

message = create_message("body","xxxxxx@gmail.com","me","subject")
#ここの第三引数がmeじゃなくて"xxxxxx@gmail.com"だと警告文が表示される
```

以上で解決

一応全文

```python
from __future__ import print_function
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

import base64
from email.mime.text import MIMEText
from apiclient import errors

SCOPES = [
   "https://www.googleapis.com/auth/gmail.compose",
   "https://www.googleapis.com/auth/gmail.readonly",
   "https://www.googleapis.com/auth/gmail.labels",
   "https://www.googleapis.com/auth/gmail.modify",
]

def get_service():
   creds = None
   if os.path.exists('token.json'):
       creds = Credentials.from_authorized_user_file('token.json', SCOPES)
   if not creds or not creds.valid:
       if creds and creds.expired and creds.refresh_token:
           creds.refresh(Request())
       else:
           flow = InstalledAppFlow.from_client_secrets_file(r"ForGmailAPI.json", SCOPES)
           creds = flow.run_local_server(port=0)
       with open('token.json', 'w') as token:
           token.write(creds.to_json())

   service = build('gmail', 'v1', credentials=creds)
   return service
service = get_service()

def create_message(body, to, sender, subject):
   message = MIMEText(body)
   message['to'] = to
   message['from'] = sender
   message['subject'] = subject
   encode_message = base64.urlsafe_b64encode(message.as_bytes())
   message = {'raw': encode_message.decode()}
   return message

message = create_message("body","xxxxxx@gmail.com","me","subject")

def send_message(service, user_id, message):
   try:
       message = (service.users().messages().send(userId=user_id, body=message)
                  .execute())
       print("success")
   except errors.HttpError as error:
       print('An error occurred: %s' % error)

send_message(service, 'me', message)
```
