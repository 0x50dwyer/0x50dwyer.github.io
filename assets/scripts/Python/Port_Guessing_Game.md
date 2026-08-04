---
layout: script
title: Port Guessing Game
description: Python guessing game for common Ports/Protocols
date: 2026-08-02
---
<pre><code>
import random

knownPorts = {&#x27;22&#x27;: &#x27;SSH&#x27;, &#x27;23&#x27;: &#x27;Telnet&#x27;, &#x27;25&#x27;: &#x27;SMTP&#x27;, &#x27;53&#x27;: &#x27;DNS&#x27;, &#x27;80&#x27;: &#x27;HTTP&#x27;, &#x27;443&#x27;: &#x27;HTTPS&#x27;, &#x27;161&#x27;: &#x27;SNMP&#x27;, &#x27;3389&#x27;: &#x27;RDP&#x27;,
              &#x27;110&#x27;: &#x27;POP&#x27;, &#x27;143&#x27;: &#x27;IMAP&#x27;, &#x27;389&#x27;: &#x27;LDAP&#x27;, &#x27;636&#x27;: &#x27;LDAPS&#x27;, &#x27;123&#x27;: &#x27;NTP&#x27;,&#x27;445&#x27;: &#x27;SMB&#x27;, &#x27;20&#x27;: &#x27;FTP Data&#x27;, &#x27;21&#x27;: &#x27;FTP Control&#x27;,
              &#x27;67&#x27;: &#x27;DHCP Server&#x27;, &#x27;68&#x27;: &#x27;DHCP Client&#x27;}

def protocolGame():
    right = 0
    wrong = 0
    #print(&#x27;To end the game type quit&#x27;)
    while(True):
        if(len(knownPorts) == 0):
            break
        question = random.choice(list(knownPorts.keys()))
        print(&#x27;What protocol is used on port&#x27;, question)
        guess = input()
        if(str(guess).lower() == str(knownPorts[question]).lower()):
            right += 1
            print(&#x27;Correct&#x27;)
        elif(guess == &#x27;quit&#x27;):
            break
        else:
            wrong += 1
            print(&#x27;Incorrect&#x27;, knownPorts[question])
        del knownPorts[question]
    print(&#x27;Correct:&#x27;, right, &#x27;Incorrect:&#x27;, wrong)
    if(right &gt; wrong):
        print(&#x27;Great Job&#x27;)
    else:
        print(&#x27;Keep Studying&#x27;)

def portGame():
    right = 0
    wrong = 0
    #print(&#x27;To end the game type quit&#x27;)
    while(True):
        if(len(knownPorts) == 0):
            break
        question = random.choice(list(knownPorts.keys()))
        print(&#x27;What port is used for&#x27;, knownPorts[question])
        guess = input()
        if(guess == question):
            right += 1
            print(&#x27;Correct&#x27;)
        elif(guess == &#x27;quit&#x27;):
            break
        else:
            wrong += 1
            print(&#x27;Incorrect&#x27;, question)
        del knownPorts[question]
    print(&#x27;Correct:&#x27;, right, &#x27;Incorrect:&#x27;, wrong)
    if(right &gt; wrong):
        print(&#x27;Great Job&#x27;)
    else:
        print(&#x27;Keep Studying&#x27;)
    
print(&#x27;Welcome to the Port game&#x27;)
print(&#x27;Type quit at any time to exit&#x27;)
while(True):
    game = input(&quot;To guess the Port Number type Port \nTo guess the Protocol type Protocol: &quot;)
    if(str(game).lower() == &#x27;port&#x27;):
        portGame()
    elif(str(game).lower() == &#x27;protocol&#x27;):
        protocolGame()
    elif(game == &#x27;quit&#x27;):
        break
    else:
        print(&#x27;Unknown input&#x27;)
        continue

    again = input(&#x27;Play again y/n:&#x27;)
    if(again == &#x27;y&#x27;):
        continue
    else:
        break
        
        
</code></pre>