@parent bitcentivez-client
@module {can.Component} ~/components/ui/model-edit-property <model-edit-property>

This component takes a model and a property name.
The property value is initially displayed as hypertext.
If clicked, the property value is placed in a text field for editing.
The new value is saved on enter.
The user can discard uncommitted changes with the escape key.

@signature `<model-edit-property model:from="this" property:raw="email" />`

@body

## Use

```
<can-import from="~/components/ui/model-edit-property/" />
<model-edit-property model:from="this" property:raw="email" />
```
