---
layout: post
author: Patrick
description: Wireshark Traffic Analysis Notes
title: Wireshark Traffic Analysis
nav_items:
  - label: "Nmap Scans"
    id: "nmap-scans"
  - label: "ARP"
    id: "arp"
  - label: "Identifying Hosts"
    id: "identifying-hosts"
  - label: "Tunneling Traffic"
    id: "tunneling-traffic"
  - label: "FTP"
    id: "ftp"
  - label: "HTTP"
    id: "http"
---

## Nmap Scans
Extremely popular network mapping tool. It can be used to identify live hosts, open ports, running services and versions, fingerprinter, and pretty much anything else you could want as far as network/host scanning goes. Common scan types include:
- TCP connect scans
- SYN scans
- UDP scans

### TCP
Quick detour for some background on TCP before getting into how the scans work. Per Wikipedia "The Transmission Control Protocol (TCP) is one of the main protocols of the internet protocol suite, providing reliable*, ordered, and error-checked* delivery of a stream of octets (bytes) between applications running on hosts communicating via an IP network." It is cool how it works. TCP is a connection-oriented protocol so before 2 hosts can communicate the connection needs to be established. TCP doesn that with the "three-way handshake". The requesting host sends a SYN request -> the receiving host will send back a SYN/ACK -> the requesting host will then send an ACK to establish the connection. (add image)

{% include image.html image_src="/assets/images/wireshark_tcpconnect.png" alt_text="Wireshark TCP Connection Handshake" %}

### TCP Connect Scans
TCP Connect scans use the complete three-way handshake when trying a port.
Open TCP ports will have the full SYN ->, <- SYN/ACK, ACK ->  (RST/ACK) ->
Closed TCP ports will show a SYN ->, <- RST/ACK

### TCP SYN Scans
TCP SYN scans (as the name implies) only send the SYN -> and listen for the response.
An open TCP port will respond with <- SYN/ACK after that the connection is reset RST ->
A closed TCP port will still send back the <- RST/ACK

### UDP Scans
UDP is the transport protocol that is used when you just don't care if it gets there (not entirely true). It is a connectionless protocol so unlike TCP there is no setup handshake the packet gets sent and closed ports will respond with and ICMP error message (Destination unreachable, port unreachable)

## ARP

### ARP (Address Resolution Protocol)
The Address Resolution Protocol allows devices to identify themselves over the network. It connects the IP to the MAC address. (**Expand on this**)

- Local protocol, not routable
- Enables communication between MAC addresses
- No authentication function
- Common patterns are request & response, announcement and gratuitous packets.

| ARP Search | Filter |
| --- | --- |
| Global Search | arp |
| Opcode 1: ARP requests | arp.opcode == 1 |
| Opcode 2: ARP responses | arp.opcode == 2 |
| ARP scanning | arp.dst.hw_mac == 00:00:00:00:00:00 |
| Possible ARP poisoning detection | arp.duplicate-address-detected or arp.duplicate-address-frame |
| Possible ARP flooding | ((arp) && (arp.opcode == 1)) && (arp.src.hw_mac == target-mac=address) |

## Identifying Hosts
Protocols that can be used for Host and User identification:
- Dynamic Host Configuration Protocol (DHCP)
- NetBIOS (NBNS)
- Kerberos

| DHCP Search | Filter |
| --- | --- |
| Global search | dhcp or bootp |
| DHCP Request | dhcp.option.dhcp == 3 |
| DHCP ACK | dhco.option.dhcp == 5 |
| DHCP NAK | dhcp.option.dhcp == 6 |
| DCHP Requested address | dhcp.option.requested_ip_address == 192.168.15.2 |

| NetBIOS Search | Filter |
| --- | --- |
| Global Search | nbns |
| Query details can contain "name, TTL, and IP address | nbns.name contains "keywork" |

| Kerberos Search | Filter |
| --- | --- |
| Global Search | kerberos |
| User account search CNameString: The username | kerberos.CNameString contains "keyword" or kerberos.CNameString and !(kerberos.CNameString contains "$") |
| Protocol version (PVNO) | kerberos.pvno == 5 |
| realm: Domain name for the generated ticket | kerberos.realm contains ".org" |
| sname: Service and domain name for the generated ticket | kerberos.SNameString == krbtg |

## Tunneling Traffic
Traffic tunneling is used to encapsulate data inside other protocol packets for example ICMP and DNS.

| ICMP search | Filter |
| --- | --- |
| Global search | icmp |
| Data longer than standard 64 bytes length | icmp && data.len > 64 |
| DF (Don't Fragment) flag set | ip.flags.df == 1 |

| DNS Search | Filter |
| --- | --- |
| Global Search | dns |
| Abnormally long Query, Long DNS addresses with encoded subdomains | 

## FTP
File Transfer Protocol (FTP) is used to transfer files easily. No encryption with login or transfer, although secure protocols are available (SFTP, FTPS).
FTP messages:
- x1x series: Information request responses
- x2x series: Connection messages
- x3x series: Authentication messages
**Note:** "200" means command successful


| FTP Search | Filter |
| --- | --- |
| Global Search | ftp |
| 211: System status | ftp.response.code == 211 |
| 212: Directory status | ftp.response.code == 212 |
| 213: File status | ftp.response.code == 213 |
| 220: Service ready | ftp.response.code == 220 |
| 227: Entering passive mode | ftp.response.code == 227 |
| 228: Long passive mode | ftp.response.code == 228 |
| 229: Extended passive mode | ftp.response.code == 229 |
| 230: User login | ftp.response.code == 230 |
| 231: User logout | ftp.response.code == 231 |
| 331: Valid username | ftp.response.code == 331 |
| 430: Invalid username or password | ftp.response.code == 430 |
| 530: No login, invalid passowrd | ftp.response.code == 530 |
| User: Username | ftp.request.command == "USER" |
| PASS: Password | ftp.request.command == "PASS" |
| CWD: Current working directory | ftp.request.command == "CWD" |
| List bruteforce attempt for target 'username' | (ftp.response.code == 530) && (ftp.response.arg contains "username") |
| Show Password Spray attempts for "password" | (ftp.request.command == "PASS") && (ftp.request.arg == "password") |

## HTTP
Hypertext Transfer Protocol (HTTP) is the plaintext version of the HTTPS protocol that most websites use now. Though websites are moving away from it for browsing HTTP still pops up in communications. 

| HTTP Response Codes | Description |
| 200 OK | Request successful |
| 301 Moved Permanently | The resource has moved to a new URL/path permanently |
| 302 Moved Temporarily | The resource has moved to a new URL/path temporarily |
| 400 Bad Request | The server didn't understand the request |
| 401 Unauthorized | URL needs authorization (login) |
| 403 Forbidden | No access to the requested URL |
| 404 Not Found | The server can't find the requested URL |
| 405 Method Not Allowed | Used method is blocked |
| 408 Request Timeout | Request took loger than server wait time |
| 500 Internal Server Error | The server encountered an error processing the request |
| 503 Service Unavailable | Request not completed the server or service is down. |

| HTTP search | Filter |
| --- | --- |
| Glocal Search | http, http2, http3 |
| All requests | http.request |
| Specify Request Methods | http.request.method == "METHOD" (GET, POST) |
| HTTP Response Codes | http.response.code == "CODE" |
| User agent: Browser/OS identification | http.user_agent contains "nmap" (sqlmap, wfuzz, Nikto) |
| Request for resources | http.request.uri contains "admin" |
| HTTP Server: Server service name | http.server contains "SERVER" (Apache, IIS) lower(http.server) for case issues |
| HTTP Host: Hostname of the server | http.host contains "KEYWORD" |
| Connections Status | http.connection == "Keep-Alive" |
| Line-based text data | data-text-lines contains "KEYWORD" |