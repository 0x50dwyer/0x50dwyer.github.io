---
layout: post
author: Patrick
description: Phishing prevention technologies
title: Phishing Prevention Technology
---
## Sender Policy Framework (SPF)

SPF is used to authenticate the sender of an email is authorized to send email for that domain. SPF TXT records stored on sender's DNS server contains a list of IP addresses allowed to send email for the domain. When an email is sent the recieving email server checks the SPF record of the sender's domain.

### SPF Evaluation Results

| Result | Description | Intended Action |
| Pass | The SPF record shows the host is allowed to send emails for the domain | Accept |
| Fail | The SPF record shows the host is NOT allowed to send emails for the domain | Reject |
| SoftFail | The SPF record shows the host is NOT  allowed to send, but is in transition (what does that mean?) | Accept but mark |
|Neutral | The SPF record specifies explicitly that nothing can be said about validity | Accept |
| None | The domain does not have an SPF record of the SPF record does not evaluate to a result | Accept |
PermError | A permanent error has occurred (poorly formatted SPF record) | Unspecified |
TempError | A transient error has occured | Reject |

[SPF Record Syntax](https://dmarcian.com/spf-syntax-table/)
[DMARC Academy](https://www.dmarc-academy.com/)

## DomainKeys Identified Mail (DKIM)

DKIM is an open standard for email authentication. A DKIM record exists in DNS, it is more complex than SPF. It can survive forwarding email. When an email is sent the sending mail server adds a digital signature using a private key. When the email is received the receiving email server gets the public key from the DKIM record on the domain's DNS server. If the signature matches then the email is authentic. If not then it might be flagged or rejected.

Sample DKIM Signature:
```
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=accounts.google.com; s=20251104; t=1785845893; x=1786450693; dara=google.com; h=content-type:to:from:subject:message-id:gmsai:feedback-id:date :mime-version:from:to:cc:subject:date:message-id:reply-to :content-type; bh=+7iuiNUnntkr9LbHr4bI/OQBAcvOSREsWq2BMaQz5FU=; b=qfzCvqqbj6Iq//1jaUMkJveKLd45huCTXc4ohwl5xrQQ0RpxcH5SL7dwXcXOa3NoOb QVjgxkqpW/+sfRzBHmgHWm9VG1zYVryYO0blr9PHQiT85nCzjtuVpV1tyXKSrx/q/4aQ zioKcQfYhm5nJEj+HznLOs/vr+djBob7ynklnA+t4vifJ2x1IfYhZP8gy9y772hO2eNx dgGxaXHo5UlqSFF08k0kGvhAMPyPJfperPaZFQ2sYrMTruXHptAfv7pbl5OhOu8ORtNA YFDpbBnN+fy50r2NMz+pWmxSLKmsix3xYW0+ls/2E0Ew8SsN0QVSUB6qcz8dJFNibvyh ev2g==
```
### Required DKIM Tags:

| Tag | Description |
| --- | --- |
| v= | Version of DKIM standard being used. The value should always be set to 1. |
| a= | Cryptographic algorithm used to generate the signature. The value should be rsa-sha256. |
| d= | Domain used with the selector record(s=) to locate the public key. The value is a domain name owned by the sender.
| s= | Selector record name used with the domain to locate the public key in DNS. The value is a name or number created by the sender |
| h= | List of headers that will be used in the signing algorithm to create the hash found in the b= tag. The order of the headers is the order in which they were presented during DKIM signing so should be presented for verification in the same order. The value is a list of header fields that will not change or be removed. |
| bh= | Computed hash of the message body. The value is a string of characters representing the hash determined by the hash algorithm. |
| b= | Cryptographic signature of the headers listed in the h= tag. This hash is also called the DKIM signature. |

### Optional DKIM Tags:

| Tag | Description |
| t= | (Recommended) DKIM signature timestamp. Meant to indicate the timet he message was sent. The format is the number of seconds from 01/01/1970 00:00:00 (UTC). |
| x= | (Recommended) DKIM signature expiration time. Uses the same format. The value of this tag must be greater than the value of the t= tag if both are used. |
| c= | Canonicalization algorithm that defines to a mailbox provider what level of modifications may be present as the email is in transit to the mailbox provider. Modifications can include whitespace or line wrapping. Some email servers make minor modifications to the email during transit, which can invalidate the signature. |
| i= | Identity of the user or agent. The value is an email address containing the domain or subdomains as defined in the d= tag. |
| l= | (Not Recommended) Number of characters from the message body that were used to computer the body hash (bh=). If the value is not present, it is assumed the entire message body was used. This tag can be difficult to control and could lead to verificatoin errors. |
| z= | (Not Recommended) List of the message's original headers and may differ from the headers listed in the h= tag. This tag may be used by some mailbox providers in the process of diagnosing a verificatoin error. Its valueis not well defined. |


[DKIM Signatures](https://mxtoolbox.com/dmarc/dkim/dkim-signature-tags)
[DKIM Resources](https://dmarcian.com/dkim-selectors/)