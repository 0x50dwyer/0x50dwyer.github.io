---
layout: post
author: Patrick
description: Breakdown of the Cyber Kill Chain
---
**Reconnaissance**
The research and planning phase against a target. Information gathered here will be used to plan the next phases of the attack. 
Information can include:

    - Infrastructure details
    - Employee information
    - Business processes
    - Exposed technologies
    - Physical building information (not all attacks are purely digital)

More information gathered can lead to more targeted and successful attacks.

OSINT(open-source intelligence) is a great source of information about a target. This information can come from:

    - Search engines
    - Print and online media
    - Social media
    - Forums and blogs
    - Online public record databases
    - WHOIS and technical data
    - Job postings (posting in technical departments can expose what technology they are using)

There are 2 types of reconnaissance active and passive. 
Passive reconnaissance: Does not involve contact with the target. OSINT would be passive recon.
Active reconnaissance: Involves direct contact with the target. Port scanning, probing, information gathering through social engineering. All deal directly with the target and could potentially alert the target if the attacker is not careful.

**Weaponization**
The attacker can use what was learned in the recon phase to setup the attack. During this phase the attacker creates the exploits, malware, and other infrastructure needed to carry out the attack. 

    - Find an exploit for exposed software, or make one if you're really good.
    - Setup back-end infrastructure based on the type of attack.
    - Purchase or "obtain" domain names
    - Craft malware specific to the target, or buy it from a service (if this were a game I would say that's cheating, but I guess business is business)
    
Probably a good idea to test everything here before going on to the next phase. (Just saying)

**Delivery**
This is where the attacker gets to send that nice new malware or exploit to the target. Phishing is a common delivery technique. With the information gathered from recon specific people could be targeted, or just sent to every email that was gathered. Exposed vulnerable software can be exploited to delivery more persistent malware. USBs can be infected and left around for employees to find and plug in. Maybe during recon a username/password came up that still works. Access could even be purchased from someone who has already compromised the target.

**Exploitation**
This phase is where the attacker's code executes on the target. With phishing the distinction is pretty straightforward the code is delivered in the email and the exploitation happens when the user opens the attachment or clicks the link. With software exploitation it seems more combined. The exploit delivers the payload which I guess would be the exploitation, but that can come in stages too so...(they go hand in hand). Strange files, registry changes, suspicious processes all bad signs from this phase. This is also where an attacker may try to elevate their privileges (if needed) to facilitate the next phase.

**Installation**
Seems like it could be more accurately described as persistence, this is where the attacker attempts to maintain access to the compromised system. Installing a remote shell, creating or modifying services, creating new accounts are all persistence mechanisms. MITRE ATT&CK lists 22 techniques under persistence. 

**Command & Control**
After executing the malware and achieving persistence

**Actions on Objectives**

