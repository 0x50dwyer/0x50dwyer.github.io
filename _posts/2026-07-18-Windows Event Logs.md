---
layout: post
author: Patrick
description: Common Windows Event Logs for security investigations
title: Windows Event Logs
---
**Authentication IDs**

| Event ID  | Description                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 4624      | Successful logon. <br>Logon types:<br>Type 2 - sitting at the keyboard<br>Type 3 - network logon (SMB, file shares)<br>Type 10 - RDP |
| 4625      | Failed logon. High volumes indicate a brute force attack.                                                                            |
| 4648      | Logon with explicit credentials (runas). When someone specifies different credentials to log in. LIke using runas or PsExec.         |
| 4672      | Special privileges assigned. Admin-level account login.                                                                              |
| 4634/4647 | Logoff. Correlate with 4624 to determine session length                                                                              |


**Kerberos IDs**

| Event ID | Description                                                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4768     | Kerberos TGT requested. Initial ticket request.                                                                                                                 |
| 4769     | Kerberos service ticket (TGS) requested. A flood of TGS requests from a single account, especially with RC4 encryption, is a strong indicator of kerberoasting. |
| 4771     | Kerberos pre-auth failed. High volumes indicate brute force against domain accounts.                                                                            |


**Account Management IDs**

| Event ID | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| 4720     | User account created.                                                        |
| 4722     | User account enabled. Re-enabling disabled accounts for persistance.         |
| 4724     | Password reset attempt.                                                      |
| 4728     | Member added to a global security group. For example, Domain Admin.          |
| 4732     | Member added to a local security group. Same as above, but for local groups. |
| 4756     | Member added to a universal security group. Enterprise Admin, Schema Admin.  |


**Process and Service IDs**

| Event ID | Description                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 4688     | New process created. Without command-line auditing will just see cmd.exe ran. With auditing will show the full command that was run. |
| 4697     | Service Installed. Services can be used to run payloads as SYSTEM.                                                                   |
| 4698     | Scheduled task created. Common persistence mechanism.                                                                                |
| 4699     | Scheduled task deleted. Task created and deleted quickly could be suspicious.                                                        |



**Defense Evasion IDs**

| Event ID | Description              |
| -------- | ------------------------ |
| 1102     | Audit log was cleared.   |
| 4719     | Audit policy was changed |


**System Log IDs**

| Event ID | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| 7045     | New service installed. Similar to 4697, but from the System log.        |
| 7036     | Service state changed. A service started or stopped.                    |
| 7040     | Service start type changed. Change from manual to automatic or disable. |
| 104      | Event log cleared (System log)                                          |


**Sysmon IDs**

| Sysmon ID | Description                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| 1         | Process creation. Full command line, parent process, file hashes, and user context                                 |
| 3         | Network connection. Logs outbound and inbound connectoins with the process that initiated them.                    |
| 8         | CreateRemoteThread. Process creates a thread in another process; process injection.                                |
| 10        | Process access. A process opens a handle to another process.                                                       |
| 11        | File created. Track file drops.                                                                                    |
| 12/13     | Registry object created or value set. Watches for registry changes.                                                |
| 22        | DNS query. Logs every DNS query with the process that made it.                                                     |
| 25        | Process tampering. Detects advanced evasion: process hollowing, process herpaderping, and process ghosting. (wild) |


**PowerShell IDs**

| Event ID | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| 4104     | Script block logging. Captures the full text of every script that runs.                  |
| 4103     | Module logging. Logs which PowerShell cmdlets are being called and with what parameters. |
| 400/403  | PowerShell engine start/stop. Can detect downgrade attacks.                              |
