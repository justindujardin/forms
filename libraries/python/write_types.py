from mort_jams import FormSchema
from subprocess import call
import os
import tempfile
import shutil
import srsly


# 1. Allocate a temporary working folder
temp_dir = tempfile.mkdtemp()

# 2. Export the top-level FormSchema and its types.
json = FormSchema.schema()
title: str = json["title"] if "title" in json else "Unnamed"
json_file = f"{temp_dir}/{title}.json"
print(f" - {json_file}")
srsly.write_json(json_file, json)


file_dir = os.path.dirname(__file__)
# Set CWD to the root
os.chdir(os.path.join(file_dir, "../../"))
prettier_rc = os.path.abspath(".prettierrc")
output_file = os.path.abspath("libraries/typescript/src/types.ts")

args = [
    "npm",
    "run",
    "write_types",
    json_file,
    output_file,
    prettier_rc,
]
call(args)

shutil.rmtree(temp_dir)
print(f"Done, output: {output_file}")
