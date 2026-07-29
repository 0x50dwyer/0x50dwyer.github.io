---
layout: default
title: Port Guessing Game
description: Python guessing game for common Ports/Protocols
date: 2026-07-29
---
<pre><code>import random

knownPorts = {'22': 'SSH', '23': 'Telnet', '25': 'SMTP', '53': 'DNS', '80': 'HTTP', '443': 'HTTPS', '161': 'SNMP', '3389': 'RDP',
              '110': 'POP', '143': 'IMAP', '389': 'LDAP', '636': 'LDAPS', '123': 'NTP','445': 'SMB', '20': 'FTP Data', '21': 'FTP Control',
              '67': 'DHCP Server', '68': 'DHCP Client'}

def protocolGame():
    right = 0
    wrong = 0
    #print('To end the game type quit')
    while(True):
        if(len(knownPorts) == 0):
            break
        question = random.choice(list(knownPorts.keys()))
        print('What protocol is used on port', question)
        guess = input()
        if(str(guess).lower() == str(knownPorts[question]).lower()):
            right += 1
            print('Correct')
        elif(guess == 'quit'):
            break
        else:
            wrong += 1
            print('Incorrect', knownPorts[question])
        del knownPorts[question]
    print('Correct:', right, 'Incorrect:', wrong)
    if(right > wrong):
        print('Great Job')
    else:
        print('Keep Studying')

def portGame():
    right = 0
    wrong = 0
    #print('To end the game type quit')
    while(True):
        if(len(knownPorts) == 0):
            break
        question = random.choice(list(knownPorts.keys()))
        print('What port is used for', knownPorts[question])
        guess = input()
        if(guess == question):
            right += 1
            print('Correct')
        elif(guess == 'quit'):
            break
        else:
            wrong += 1
            print('Incorrect', question)
        del knownPorts[question]
    print('Correct:', right, 'Incorrect:', wrong)
    if(right > wrong):
        print('Great Job')
    else:
        print('Keep Studying')
    
print('Welcome to the Port game')
print('Type quit at any time to exit')
while(True):
    game = input("To guess the Port Number type Port \nTo guess the Protocol type Protocol: ")
    if(str(game).lower() == 'port'):
        portGame()
    elif(str(game).lower() == 'protocol'):
        protocolGame()
    elif(game == 'quit'):
        break
    else:
        print('Unknown input')
        continue

    again = input('Play again y/n:')
    if(again == 'y'):
        continue
    else:
        break
        
        
</code></pre>