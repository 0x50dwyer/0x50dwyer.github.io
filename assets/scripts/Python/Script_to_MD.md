---
layout: default
title: Script to MD
description: Format scripts for display on a website
date: 2026-08-02
---
```import argparse
from pathlib import Path
from datetime import date
import html

parser = argparse.ArgumentParser()

parser.add_argument(&quot;-i&quot;, &quot;--input&quot;,
                    help=&quot;Script input file&quot;)
parser.add_argument(&quot;-d&quot;, &quot;--description&quot;,
                    help=&quot;Short description of the script&quot;)
parser.add_argument(&quot;-o&quot;, &quot;--output&quot;, required=False,
                    help=&quot;Output directory for the script MD&quot;)

args = parser.parse_args()
filePath = Path(args.input)
filename = filePath.name.split(&quot;.&quot;)[0]

#add something here to handle the post directory once I figure out argparse a bit better.
if args.output:
    outPath = Path(args.output)
    outFile = open(f&quot;{ outPath }/{filename}.md&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;)
else:
    outFile = open(f&quot;{filename}.md&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;)

if outFile:
    outFile.write(f&quot;&quot;&quot;---\nlayout: default\ntitle: { filename.replace(&quot;_&quot;, &quot; &quot;) }\ndescription: { args.description }\ndate: { date.today() }\n---\n```&quot;&quot;&quot;)
    with open(filePath, &quot;r&quot;, encoding=&quot;utf-8&quot;) as file:
        for line in file:
            outFile.write(f&quot;{ html.escape(line) }&quot;)
    outFile.write(f&quot;&quot;&quot;```&quot;&quot;&quot;)
    outFile.close()
    file.close()
else:
    print(&quot;An error occured&quot;)```