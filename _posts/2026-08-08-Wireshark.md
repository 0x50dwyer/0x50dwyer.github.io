---
layout: post
author: Patrick
description: Wireshark Basics and Usage
title: Wireshark
nav_items:
  - label: "Introduction"
    id: "introduction"
  - label: "GUI and Data"
    id: "gui-and-data"
  - label: "Packet Navigation"
    id: "packet-navigation"
  - label: "Statistics"
    id: "statistics"
  - label: "Packet Filtering"
    id: "packet-filtering"
---

## Introduction
Wireshark is a powerful free network traffic analyzer. It is able to parse and analyze thousands of packet types, provides statistics on protocol usage, has strong scripting ability through LUA, and many other great features. 
Some use cases include:
- Detecting and troubleshooting network issues
- Detecting and analyzing suspicious network traffic
- Learning and under standing network protocols


## GUI and Data
Wireshark comes with a fairly easy to navigate GUI interface. 
On the opening page there are options for choosing either a capture interface or opening a PCAP file (ex. traffic that was captured earlier). Multiple pcap files can be loaded and merged together. Loaded PCAP files (or live captures) show packets with different coloring based on the packet (different colors for different protocols, marked packets, retransmissions)

{% include image.html image_src='/assets/images/wireshark_landing.png' alt_text='Wireshark Landing Page' %}


## Packet Navigation

**Packet Number**
Wireshark assigns a unique number to each packet making it easier to reference individual packets. You can also use the "Go to Packet" feature to jump directly to a specific packet.

**Find Packets**
We can also find packets by content. When using Find Packets there are several options on how the search will be done. We can search by Display filter, Hex value, string, and regular expressions. 

**Marking Packets**
Marking packets can make it easier to find specific packets for later analysis. Marked packets will have a black background regardless of other color schemes.

**Packet Comments**
Comments can be added to packets to assist with documenting or troubleshooting. 

**Export Packets**
Exporting specific packets from a larger PCAP file.

**Exporting Objects**
Extracting files from selected formats (HTTP, SMB, TFTP, IMF, DICOM)

**Time Display Format**
Wireshark lists the packets as they are captured. By default Wireshark shows the time in "seconds since the beginning of capture". Better choice is using UTC time display format. This can be changed through view -> time display format.

**Expert Info**
Wireshark also detects specific states of protocols to help analysts easily spot possible anomalies. Expert info can provide a group of categories in three different severities

| Severity | Color | Info |
| --- | --- | --- |
| Chat | Blue | Information on usual workflow |
|Note | Cyan | Notable events like application error codes |
| Warn | Yellow | Warnings like unusual error codes or problem statements |
| Error | Red | Problems like malformed packets |

[Wireshark Docs](https://www.wireshark.org/docs/)


## Statistics
The statistics menu provides a broad overview of the traffic including protocols, endpoints, conversations. 

**Resolved Addresses**
This option helps analysts identify IP address and DNS names available in the traffic. hostname information is taken from DNS answers in the capture file. 

**Protocol Hierarchy**
This option breaks down all available protocols form the capture file and helps analysts view the protocols in a tree view based on packet counters and percentages.

**Conversation**
Conversations represent traffic between two specific endpoints. Can be viewd as Ethernet IPv4 IPv6 TCP and UDP.

**Endpoints**
Provides information on traffic from individual endpoints. Wireshark can translate MAC addresses into human readable format for known ethernet manufacturers. Can also resolve IP address and port names (setting enabed through preferences). IPGeolocation mapping is also available.


## Packet Filtering

**Capture Filters**

Filter the captured traffic so only the packets of interest are saved. Reduces traffic noise by only capturing relevant traffic. Downside is it only captures the traffic based on the filter so if the filter isn't correct then important traffic could be missed. Most general use cases just capture all the traffic and use the extremely useful display filters to find the interesting traffic.

**Display Filters**

[Wireshark's display filter](https://www.wireshark.org/docs/dfref/) supports 3000 (more?) protocols. Searching can be done for the general protocol tcp, or for specific information tcp.port as an example, each protocol is broken down into it's unique parts. 
Display filters allow for comparison operations:

| Comparison | Op | Symbol | Example |
| --- | --- | --- | --- |
| Equal | eq | == | tcp.port == 4444 |
| Not equal | ne | != | ip.src != 10.88.112.3 |
| Greater than | gt | > | example |
| Less than | lt | < | example |
| Greater than or equal | ge | >= | example |
| Less than or equal | le | <= | example |

and logical expressions:

| Expression | Symbol | Example | Description |
| --- | --- | --- |
| and | && | (ip.src == 192.168.112.28) && (tcp.port == 80) | Displays only traffic associated with 192.168.112.28 and using port 80 |
| or | \|\| | (tcp.port == 80) \|\| (tcp.port == 443) | Display only traffic associated with port 80 or 443 |
| not | ! | !(ip.src == 192.168.112.28) | Display all traffic except from 192.168.112.28 |

The display filter bar is very friendly. It will turn green if you expression is valid, turn red if it's invalid, and turn yellow if it's sort of right, but could be better(I don't think I've gotten an expression to trigger that other than an example).

**Protocol Filtering**
Some examples of building protocol filters

| Filter | Description |
| --- | --- |
| ip | Shows all IP packets |
| ip.addr == 192.168.112.28 | Show all packets where 192.168.112.28 is the source or destination IP |
| ip.addr == 192.168.112.0/24 | Show all packets where the IP is part of the 192.168.112.0/24 subnet |
| ip.src == 192.168.112.28 | Show only packets that were sent FROM 192.168.112.28 |
| ip.dst == 192.168.112.28 | Show only packets that were sent TO 192.168.112.28 |
| tcp.port == 80 | Show all packets associated with port 80 |
| tcp.srcport == 4444 | Show only packets originating from port 4444 |
| tcp.dstport == 4444 | Show only packets going to port 4444 |
| http.response.code == 200 | Show only packets with HTTP response code 200 |
| !(http.response.code == 404) | Do not show packets with HTTP response code 404 |
| !(http.request.method == "HEAD") | Do not show HTTP HEAD request packets |
| dns | Show all DNS packets |
| dns.flags.response == 0 | Show all DNS requests |
| dns.flags.response == 1 | Show all DNS responses |

**Advanced Filtering**

| Filter | Type | Description | Example |
| --- | --- | --- | --- |
| contains | Comparison Operator | Search for a value inside a packet. It is case-sensitive  | http.server contains "Apache" |
| matches | Comparison Operator | Allows for regular expression pattern matching | http.host matches "\\.(php\|html)" |
| in | Set Membership | Search a value or field inside a specific range | tcp.port in {80 443 8080} |
| upper | Function | Convert a string value to uppercase | upper(http.server) contains "APACHE" |
| lower | Function | Convert a string value to lowercase | lower(http.server) contains "apache" |
| string | Function | Convert a non-string value to string | string(frame.number) matches "[13479]$" |
