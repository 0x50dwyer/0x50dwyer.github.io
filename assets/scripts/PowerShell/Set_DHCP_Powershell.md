---
layout: default
title: Set DHCP Powershell
description: Enable DHCP through PowerShell
date: 2026-07-29
---
<pre><code>﻿Set-NetIPInterface -InterfaceAlias "Ethernet0" -AddressFamily IPv4 -Dhcp Enabled</code></pre>