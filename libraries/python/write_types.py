from typing import List
from mort_jams import FormSchema
from subprocess import call
import os
import tempfile
import shutil
import srsly


# 1. Allocate a temporary working folder
temp_dir = tempfile.mkdtemp()

# 2. Export the top-level FormSchema and its types.
schema = FormSchema.schema()
title: str = schema["title"] if "title" in schema else "Unnamed"
json_file = f"{temp_dir}/{title}.json"
print(f" - {json_file}")


def process_schema_for_ts_gen(schema_obj, strict=True):
    """Drop "title" from properties that are simple types so they
    generate better Typescript.

    Add "additionalProperties=false" to remove index signature allowing
    any properties to be accessed. Not sure why this isn't set in the
    JSONSchema from pydantic... HACKS"""
    simple_types = ["string", "number", "integer", "boolean", "null"]

    prop_keys: List[str] = schema_obj["properties"].keys()
    if strict is True and "additionalProperties" not in schema_obj:
        schema_obj["additionalProperties"] = False
    for key in prop_keys:
        prop = schema_obj["properties"][key]
        if "title" in prop:
            if "type" in prop and prop["type"] in simple_types:
                del schema_obj["properties"][key]["title"]
    return schema_obj


# Schema.properties
schema = process_schema_for_ts_gen(schema)
# Scheme.definitions[i].properties
for def_key in schema["definitions"].keys():
    definition = schema["definitions"][def_key]
    schema["definitions"][def_key] = process_schema_for_ts_gen(definition)

srsly.write_json(json_file, schema)


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
