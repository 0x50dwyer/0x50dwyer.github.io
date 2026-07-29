import argparse
from pathlib import Path
from datetime import date

parser = argparse.ArgumentParser()

parser.add_argument("-i", "--input",
                    help="Script input file")
parser.add_argument("-d", "--description",
                    help="Short description of the script")

args = parser.parse_args()

filePath = Path(args.input)
filename = filePath.name.split(".")[0]

outFile = open(f"{filename}.md", "w", encoding="utf-8")
outFile.write(f"""---\nlayout: default\ntitle: { filename.replace("_", " ") }\ndescription: { args.description }\ndate: { date.today() }\n---\n<pre><code>""")
with open(filePath, "r", encoding="utf-8") as file:
    for line in file:
        outFile.write(f"{ line }")
outFile.write(f"""</code></pre>""")
outFile.close()
file.close()