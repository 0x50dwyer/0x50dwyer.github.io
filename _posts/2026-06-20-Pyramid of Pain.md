---
layout: post
author: Patrick
description: Climbing the Pyramid of Pain
---
**Hash Values**
(trivial)
Fixed length hexadecimal number representing some data. Hashes should be unique for each file (some algorithms like MD5 should not be used due to the possibility of collisions; where 2 different files can have the same hash) and can be used to easily identify malicious files. The hash can also be easily changed by altering the file by even 1 bit. 

**IP Address**
(easy)
IP address are used to identity devices connected to a network (like the internet). Blocking known malicious IP addresses is a common defense. But, for an attacker it is relatively easy to get a new public IP address. Especially when using VPNs which any attacker is likely to do.

**Domain Names**
(simple)
Domain names link IP addresses to human readable text. Domain names are not as easy to change as IP addresses, but it's not too difficult either. A new domain name would need to be registered (or stolen) which takes time and resources.

**Host Artifacts**
(Annoying)
Observable traces left on the system by an attacker. Registry values, processes, dropped files, and persistence techniques are all Indicators of Compromise (IOC) that cane be used to identity an attack is taking place. An attacker would need to change or reconfigure tools and methods to remain undetected. Now it's starting to be not just about what the attacker is using, but how they are using it.

**Network Artifacts**
(Annoying)
Network traffic traces like user-agent strings, C2 information, URI patterns, port scanning traffic. Similar to the host artifacts detections here will cause the attacker to have to reconfigure tools or change methods.

**Tools**
(Challenging)
Seems similar to the host and network artifacts. Those will point you to the tools being used (and also the endpoint that is compromised). At this point the attacker can reconfigure tools, find and learn new tools, create a new tool, or just give up and attack someone else. 

**Tactics, Techniques, and Procedures**
(Tough)
At this point everything (or enough things) the attacker uses and how they use it are mapped. The attacker needs to completely change their methods and tools to remain undetected. That takes time and resources. A motivated attacker will probably still take the time. Anyone else will have likely already moved on.
