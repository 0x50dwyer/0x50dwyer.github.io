---
layout: default
title: Add AD Group and User
description: PowerShell script for adding a new group and user to AD
date: 2026-07-29
---
<pre><code>﻿New-ADOrganizationalUnit -Name "TopSecret" -Path "DC=patd,DC=com" -ProtectedFromAccidentalDeletion $false -OtherAttributes @{"cn"="TopSecret"}
New-ADGroup -Name "TopSecret" -SamAccountName "TopSecret" -GroupCategory Security -GroupScope Global -DisplayName "TopSecret" -Path "OU=TopSecret,DC=patd,DC=com"
$password = ConvertTo-SecureString -String "P@ssw0rd" -AsPlainText -Force
New-ADUser -Name "Grace Hopper" -GivenName "Grace" -Surname "Hopper" -SamAccountName "ghopper" -UserPrincipalName "ghopper@patd.com" -Path "OU=TopSecret,DC=patd,DC=com" -AccountPassword $password -PasswordNeverExpires $true -Enabled $true
Add-ADGroupMember -Identity "TopSecret" -Members "ghopper"</code></pre>