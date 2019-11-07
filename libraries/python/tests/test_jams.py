import pytest
from ..mort_jams import UIProp, ScaleSchemaModel, ScaleProp, UIHidden, FormSchema


def test_json_and_ui_schema_serialize():
    class TestForm(ScaleSchemaModel):
        attribute: str = ScaleProp(..., ui=UIHidden)

    output = FormSchema(**TestForm.form_schema())
    assert output is not None
    # required field in JSONSchema
    assert "attribute" in output.data["required"]
    # hidden widget UI attribute
    assert output.ui.properties["attribute"].widget == "hidden"
