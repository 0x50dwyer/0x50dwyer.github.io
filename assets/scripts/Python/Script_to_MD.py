import argparse
from pathlib import Path
from datetime import date
import html

parser = argparse.ArgumentParser()

parser.add_argument("-i", "--input",
                    help="Script input file")
parser.add_argument("-d", "--description",
                    help="Short description of the script")
parser.add_argument("-o", "--output", required=False,
                    help="Output directory for the script MD")

args = parser.parse_args()
filePath = Path(args.input)
filename = filePath.name.split(".")[0]

#add something here to handle the post directory once I figure out argparse a bit better.
if args.output:
    outPath = Path(args.output)
    outFile = open(f"{ outPath }/{filename}.md", "w", encoding="utf-8")
else:
    outFile = open(f"{filename}.md", "w", encoding="utf-8")

if outFile:
    outFile.write(f"""---\nlayout: default\ntitle: { filename.replace("_", " ") }\ndescription: { args.description }\ndate: { date.today() }\n---\n<pre><code>\n""")
    with open(filePath, "r", encoding="utf-8") as file:
        for line in file:
            outFile.write(f"{ html.escape(line) }")
    outFile.write(f"""</code></pre>""")
    outFile.close()
    file.close()
else:
    print("An error occured")