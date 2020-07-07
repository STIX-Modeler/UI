# STIX 2.1 Drag and Drop Modeler

# Definitions

The definitions are a direct copy from the OASIS schemas repository without mutation.

# Definition Adapters

The definition adapters are a way to mutate the definitions to help control the flow of the visualization. All adapters inherit the Base.js adapter where much of the initial mutating happens.

# Control Property

The control property can be used to help extend custom options to display and/or interact with the properties in the details panel. Some properties default based on their type but if more complex or unique controls are required, the control property is the way to extend functionality.

Current controls:
- hidden: Hides the property in the details panel.
- literal: Outputs values as is with a control or input to edit.
- slider: Custom slider-bar control.
- csv: The csv control will take a comma separated list of values in a text control and split them into an array for the object property values.

    Example: foo,bar will mutate to ["foo", "bar"]

- killchain: Used to select complex arrays.
- externalrefs: Used to build complex objects.
- stringselector: Works like the array selector but only allows for selecting a single value to populate a string.
- textarea: Allows for cleaner input of larger text amounts.

# Hoisting Vocabs

In the definitions specific to an object, I hoist the vocabs onto the property it belongs to. This makes it seamless to pass along to the array control used to select options.

Specific vocab notes

- labels: there are placeholder values located in definition-adapters/Base.js. This can easily be updated to reflect your sharing group or company's standard list for each object or even hidden with the `control` property.
