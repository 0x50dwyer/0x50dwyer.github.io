---
layout: script
title: IP by Powershell
description: PowerShell script to set a new IP and DNS
date: 2026-07-29
---
<pre><code>
New-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet0" -IPAddress "176.16.160.12" -PrefixLength "24" -DefaultGateway "176.16.160.1"
Set-DnsClientServerAddress -InterfaceAlias "Ethernet0" -ServerAddresses 10.254.1.101, 10.254.1.102
</code></pre>