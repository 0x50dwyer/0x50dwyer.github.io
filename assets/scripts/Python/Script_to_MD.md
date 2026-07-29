---
layout: default
title: Script to MD
description: Python script to create MD files out of scripts.
date: 2026-07-29
---
<pre><code>import argparse
from pathlib import Path
from datetime import date
import html

parser = argparse.ArgumentParser()

parser.add_argument(&quot;-i&quot;, &quot;--input&quot;,
                    help=&quot;Script input file&quot;)
parser.add_argument(&quot;-d&quot;, &quot;--description&quot;,
                    help=&quot;Short description of the script&quot;)

args = parser.parse_args()

filePath = Path(args.input)
filename = filePath.name.split(&quot;.&quot;)[0]

outFile = open(f&quot;{filename}.md&quot;, &quot;w&quot;, encoding=&quot;utf-8&quot;)
outFile.write(f&quot;&quot;&quot;---\nlayout: default\ntitle: { filename.replace(&quot;_&quot;, &quot; &quot;) }\ndescription: { args.description }\ndate: { date.today() }\n---\n&lt;pre&gt;&lt;code&gt;&quot;&quot;&quot;)
with open(filePath, &quot;r&quot;, encoding=&quot;utf-8&quot;) as file:
    for line in file:
        outFile.write(f&quot;{ html.escape(line) }&quot;)
outFile.write(f&quot;&quot;&quot;&lt;/code&gt;&lt;/pre&gt;&quot;&quot;&quot;)
outFile.close()
file.close()</code></pre>