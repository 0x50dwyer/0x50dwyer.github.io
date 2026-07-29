---
layout: default
title: Domain Add Script
description: PowerShell script to add a new computer to a domain
date: 2026-07-29
---
<pre><code>﻿$dc = "patd.com" #Domain to join
$password = "insert_password" | ConvertTo-SecureString -AsPlainText -Force #Password for domain admin
$user = "$dc\Administrator" #Admin account
$creds = New-Object System.Management.Automation.PSCredential($user, $password) #New class object with domain admin account and password

Write-Host "Welcome to my Domain Script"
$continue = Read-Host -Prompt "Continue Y or N" #Prompt user and store input
if ($continue -eq "Y") {
    Add-Computer -DomainName $dc -Restart
} else {
    Write-Host "Cancelled"
}</code></pre>