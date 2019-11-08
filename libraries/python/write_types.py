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


output_file = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../typescript/src/types.ts")
)
call(["npx", "json2ts", json_file, output_file])

shutil.rmtree(temp_dir)
print(f"Done, output: {output_file}")
