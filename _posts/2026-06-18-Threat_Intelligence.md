---
layout: post
author: Patrick
description: Cyber Threat Intelligence. Sources, lifecycle.
title: Cyber Threat Intelligence (CTI)
nav_items:
  - label: "Cyber Threat Intelligence"
    id: "cyber-threat-intelligence"
  - label: "Indicator Types"
    id: "indicator-types"
  - label: "Sources of Threat Intelligence"
    id: "sources-of-threat-intelligence"
  - label: "Threat Intelligence Classifications"
    id: "threat-intelligence-classification"
  - label: "Threat Intelligence Lifecycle"
    id: "threat-intelligence-lifecycle"
  - label: "File and Hash Threat Intel"
    id: "file-and-hash-threat-intel"
  - label: "Sandbox Analysis"
    id: "sandbox-analysis"
---
## Cyber Threat Intelligence

Threat intelligence provides the context to help analysts make informed decisions.

"Cyber threat intelligence (CTI) is the process of collecting, analyzing, and applying data on cyber threats, adversaries, and attack methodologies to enhance an organization's security posture. It involves taking raw threat data from various sources and transforming it into actionable insights that enable organizations to anticipate, detect, and respond to cyber risks." - [paloalto](https://www.paloaltonetworks.com/cyberpedia/what-is-cyberthreat-intelligence-cti)

Distinction between data and Intelligence

| Layer | Definition | Alert-queue example | Analyst Action |
| --- | --- | --- | --- |
| Data | An unprocessed observable | 45.155.205.3:443 | Capture the artifact |
| Information | Data plus factual annotation | IP registered to Hetzer, first seen 2023-07-14 | Record attributes |
| Intelligence | Analysed information that answers so-what? | IP belongs to the current BumbleBee C2; block immediately | Escalate or suppress |

Data goes through enrichment adding details until be becomes actual intelligence that can be acted upon. An IP itself is not neccessarily suspicious, but an IP known to be actively used in a malware campaign is something that you can take immediate action on. During enrichment a couple other definitions become needed.
- Indicator of Compromise (IOC): Evidence of a breach, such as a C2 address in the logs, or detecting the hash of a malicious file.
- Indicator of Attack (IOA): A malicious action, like say a Word document launching PowerShell.
- Tactics, Techniques, Procedures (TTP): A threat actors documents methods. Typically mapped to Mitre ATT&CK.

## Indicator Types

| Indicator | Example | First Resources | Associated IOA or TTP Examples |
| --- | --- | --- | --- |
| IPv4/IPv6 | 132.155.122.5, 2001:db8:3333:4444:5555:6666:7777:8888 | WHOIS (ASN, allocation date), VirusTotal, Shodan | IOA: Repeated SSH failures TTP: T1110.003 Password Guessing |
| Domain/FQDN | suspicious-website[.]com | WHOIS age, RiskIQ, or SecurityTrails passive-DNS, urlscan.io | IOA: Surge of DNS queries to a domain registered 24hr ago |
| URL | hxxp://suspicious-website[.]com/login | URLhaus reputation, urlscan.io, any.run | IOA: Browser POST to gatewy.php with payload |
| File hash | 9BE90DCEA2F411E24FFA... | VirsTotal analysis, Hybrid-Analysis | TTP: T1055 Process Injection into regsvr32.exe |
| Email address | unsuspicious@not-evil.com | MXToolbox header analysis | IOA: SPF failure plus recent domain registration |
| Local artifact | HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run\benign.exe | Sigma rules, EDR prevalence query, Vendor knowledge base | TTP: T1060.001 Registry Run Keys |

## Sources of Threat Intelligence

- Internal telemetry: SIEM Logs, EDR detections, phishing-mailbox submissions
- Commercial services: Vendor premium feeds, paid sandboxes, closed-source analytics
- Open-source intelligence (OSINT): AbuseIPDB, URLhaus, academic research
- Communities and Information Sharing & Analysis Centers (ISACs): Sector specific lists marked with labels and rich context [ISACs](https://www.nationalisacs.org/members)

## Threat Intelligence Classifications

- Strategic intel: High-level intelligence that gives an overall view of the threat landscape, including threat actors, their capabilities, motivations, and attack trends. Allows organizations to make informed security decisions. (Ransomware trends report)  
- Tactical intel: helps detect threats in networks by analyzing indicators like IP addresses, file hashes, and domains. (Advisory notes)
- Operational intel: real-time monitoring of networks and systems to identify vulnerabilities and threats. Analysts and responders use this intelligence to detect and respond to threats quickly.


## Threat Intelligence Lifecycle

The 6 stages of CTI:
1. Direction/Planning
2. Collection
3. Processing
4. Analysis
5. Dissemination/Action
6. Feedback

### Direction/Planning

This phase involves collaboration between security teams and business people to define the program's goals. Often starts with figuring out what needs to be protected, sorting out the budget, and setting up the key performance indicators (KPIs) to measure the program's success. Essentially, what do we want it to do, how are we going to pay for it/implement it, and how will we know if it succeeded.

### Collection

This phase involves collecting the relevant data from various sources identified during the direction phase. This can come from internal logs, external threat feeds, security tools, OSINT, Social media intelligence (SOCMINT), government agencies, industry groups and  vendors, or dark web intelligence.

### Processing

The raw data needs to be cleaned and structured before it can be useful. The various data sources are filtered and relevant fields are extracted, formats need to be normalized for efficient analysis. Remove duplicate data and adding any additional context.

### Analysis

The processed data can now be analyzed for potential threats or attacks. Looking for patterns, anomalies, or other signs of malicious activity. Cross-referencing data from different sources is made easier by the previous processing.

### Dissemination/Action

The analyzed intelligence is distributed to the intended audience. The business people, security teams, or can be shared with external partners to enrich everyone's security.

### Feedback

Feedback on the intelligence is important for refining the process. The KPIs established in the direction/planning phase can be used to measure the success and drive further improvements or more targeted intelligence. 

## File and Hash Threat Intel

### Filename and Path

Some file paths to keep an eye on for suspicious activity.
- C:\Windows\System32: Core system files, target for DLL hijacking
- C:\Windows\Temp: Temp files, malware drop location
- %HOMEPATH%\AppData\Roaming: Stores user-specific application data (persistant across domain)
- %HOMEPATH%\AppData\Local: Contains cached files, can hide malware
- %HOMEPATH%\AppData\LocalLow: Used by low-integrity applications, browsers in sandbox
- C:\Program Files + (x86): Installed applications
- C:\Windows\Tasks: Scheduled tasks, persistence

Filename issues to watch for:
- Double extensions: Windows hides extensions by default. ex. notsuspiciouse.pdf.exe
- System binary impersonation: svchost.exe running from outside C:\System32 or scvhost.exe running at all. (Read twice)
- High-entropy strings: Filenames like ad78a834.exe
- Masquerading: Files like backup-files.exe can look benign on a list of applications

### Hash Lookups

Filenames can be changes easily. Hashes are a way to identify a specific file based on its contents rather than its name. The file is run through a hashing algorithm that produces a fixed length hex string representing the contents of the file. Changing a single bit of the file contents will alter the hash making it easy to confirm files are identical. SHA256 is pretty standard. MD5 shouldn't be used due to hash collisions (2 different files with the same hash)

```
  Powershell: Get-FileHash -Path FILENAME -Algorithm SHA256
  CMD: certutil -hashfile FILENAME SHA256
  Linux: sha256sum FILENAME
```

File hashes can be input to VirusTotal and/or MalwareBazaar. This can provide detailed information about the file associated with the hash. 

VirusTotal can show:
- Detection Score: An overview number of detections from various malware scanners
- Threat labels and categories: Help classify threats
- Detection rules: YARA rules, heuristic patters, behavioral triggers
- Properties: Core metadata for the file (file type, size compilation time)
- Contained domains and IPs: IPs and domains contacted by the malware
- Contained files: Files embedded or dropped during execution

MalwareBazaar can provide:
- Malware Family tagging: Malware classified by family. Example IcedID
- YARA rule integration: Submissions may include detection rules related to the sample
- Campaign attribution: Can help identify coordinated attacks by threat actors
- Sample availablity: Malware samples are available for download and analysis.

## Sandbox Analysis

Strings and hashes can be useful for identifying a malicious file. But, it doesn't really tell you what it's actually doing. Suspicious files can be run in a sandbox environment (not always) to determine its full functionality. 

- [Hybrid Analysis](https://hybrid-analysis.com/): Hybrid Analysis is a free, public malware analysis portal. It safely runs suspicious files and URLs in isolated virtual sandbox environments across various operating systems to record real-time behavior, extract indicators of compromise (IOCs), and generate detailed threat reports.
- [Joe Sandbox](https://www.joesandbox.com/): Joe Sandbox is a deep malware analysis and threat detection platform. It safely detonates suspicious files, URLs, emails, and packages in a controlled virtual environment to observe their behavior, identify security threats, and generate detailed intelligence reports for cybersecurity professionals.

Considerations for sandbox analysis:
- Sandbox Evasions: Malware can be designed to check its environment for indicators that it is running in a virtual environment and stop exectution.
- Limited execution time: Sandboxes usually terminate analysis after a few minutes so multistage malware may not fully execute.
- Encrypted & Obfuscated traffic: Many sandboxes cannot decrypt TLS traffic. 
- Fileless & Living off the land malware: Some threats don't create a file to analyze.