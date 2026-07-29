import sys
from pathlib import Path
import html

if len(sys.argv) < 2:
    print("Usage: script_to_md.py <filename>")


filePath = Path(sys.argv[1])
filename = filePath.name.split(".")[0]

outFile = open(f"{filename}.md", "w", encoding="utf-8")
outFile.write(f"""---\nlayout: default\n---\n<pre><code>""")
with open(filePath, "r", encoding="utf-8") as file:
    for line in file:
        outFile.write(f"{ line }")
outFile.write(f"""</code></pre>""")
outFile.close()
file.close()
print("done")