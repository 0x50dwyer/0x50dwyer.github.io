---
layout: post
author: Patrick
description: Notes on EDR components and functions.
title: Endpoint Detection & Response (EDR)
---
EDR main features are visibility, detection, and response.

**Visibility**
Data collection including Process modifications, Registry modification, File and Folder modifications, User actions, Network connections.

**Detection**
Signature-based along with behavior-based detections. Machine learning allows for deviation from baseline behavior. It can detect fileless malware. Allows inputting custom IOCs for threat detection.

**Response**
Allows for threat response on any endpoint from the central EDR console. 

**Agents**
Monitor endpoints sending information back to the EDR console. Also known as a sensor.

Telemetry collected includes:

| Telemetry                           | Description                                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Process Executions and Terminations | Keeps track of all the running and idle processes. Helps identify suspicious parent-child process relationships, suspicious executables initiating a process, malware payload. |
| Network Connection                  | All the endpoint's network connections are monitored. Helps identity any connections to C2 servers, data exfiltration, or lateral movement within the network.                 |
| Command Line Activity               | Captures all the commands executed on the endpoints in CMD, PowerShell. Helps identify malicious command execution, obfuscated PowerShell script execution.                    |
| File and Folder Modifications       | Track file and folder modifications. Malicious file drops, ransomware execution.                                                                                               |
| Registry Modifications              | Windows registry is a great source of information . Many changes happen during malicious activity which can be tracked.                                                        |


**EDR Console**
Centralized point that collects information sent from the EDR agents. Information is correlated and matched with threat intelligence. Once an alert is triggered an analyst can see all the details of the detection including files accessed, processes started, network connections, registry modifications, etc. If determined to be a true positive an analyst can take action through the EDR console. 

**Detection**

| Detection                   | Description                                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Behavioral Detection        | Instead of just matching signatures the EDR observes the complete behavior of a file.  Advanced threats craft malware to look clean and use legitimate processes. EDR can catch this behavior. |
| Anomaly Detection           | EDRs can understand the baseline behavior of the endpoint and flag activity that deviates from the norm.                                                                                       |
| IOC Matching                | EDR can be combined with threat intelligence feeds to flag known indicators of compromise.                                                                                                     |
| Mitre ATT&CK Mapping        | Activity flagged by the EDR is mapped to the Mitre Tactic and Technique.                                                                                                                       |
| Machine Learning Algorithms | Machine learning trained on large datasets of malicious behaviors can assist in flagging suspicious activity.                                                                                  |

**Response**

| Response             | Description                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Isolate Host         | Isolating the host can stop the threat from spreading to other endpoints.                                                                                       |
| Terminate Process    | Not every host can be isolated. EDR gives the ability to terminate the malicious process.                                                                       |
| Quarantine           | Malicious files can be quarantined. Moved to an isolated environment for investigation. The file can be restored if benign or permanently removed if malicious. |
| Remote Access        | EDR's can allow analysts remote access to the endpoint. Allowing remote investigation, running scripts, and collecting data.                                    |
| Artifacts Collection | EDR's can extract important Artifacts like memory dumps, event logs, specific folder contents, and registry hives.                                              |
