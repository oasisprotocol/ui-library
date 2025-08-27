
# Input utilities

This library delivers some utilities for building forms in an easy but powerful
way.

The basic idea is that you define your input fields using hooks, on the data
layer of your application, independently of the UI.
You can provide as little or as much configuration as you want; everything is
fully customizable, but there are also sensible default values.
The hooks take the configuration for the field as input, will handle the
internal logic and behavior of the field, and will return a control interface
to interact with the data.
When building the UI, we feed this control interface (returned by the hook)
to the UI component, configuring it automatically.
Therefore, the UI and the logic will always behave consistently, according to
the current configuration.
The hooks are different for each data type, but we can use the same common UI
component, which will automatically render the correct UI component for the
provided field (or fields).
The UI components use the widgets in the ui-library (whenever available),
configuring it according to the features and state described by the data
coming from the hooks.

## Supported data types

Currently, the following data types are supported:

- Text
- Boolean
- OneOf (a.k.a. Select)
- Label (this is read-only, for displaying messages)
- Date / time
- Action (this is for buttons and doing stuff)

## Supported features for individual fields

### All data types

- Every field can have a name and a description, which is available on the UI
- Markdown code is supported everywhere
  (names, description, error messages, etc.)
- Fields can be dynamically shown or hidden, based on data
- Fields can be dynamically enabled or disabled, based on data.  
  When it's disabled, we explain the reason in a tooltip.
- Fields can be marked required
- `value` and `setValue()` are provided, to interact with the data
- Configurable default value, `reset()` function to revert
- Full type safety, both for basic types (string, boolean, etc),
  also for specific sub-types, automatically detected using generics
- Optional data normalization, based on type
- Validation, using both built-in and user-provided validators
- Automatic displaying of validation state (warning, errors)
- Validation can be triggered by the user calling the `validate()` function
  manually on the returned control interface, or by changes (if enabled),
  or by applying validation to a group of fields together.
- State tracking for validation.
  (`isEmpty`, `isValidated`, `validationPending`, etc.)
- Validators can return error(s) or warning(s).
- Validators can be sync or async
- Long-running validators can provide status updates about progress,
  which is also channeled to the UI.
- Clashing and stale validation attempts are handled automatically

## [Text input][1]

[1]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-usetextfield-and-textinput--docs

- Built-in validators for min and max length
- Support for hidden (password) input

## [Boolean input][2]

[2]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-usebooleanfield-and-booleaninput--docs

- Supports rendering as both checkbox and switch

## [OneOf (a.k.a. Select)][3]

[3]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-useoneoffield-and-selectinput--docs

- You need to provide a list of choices
- All choice can have a value, and label and description, can be dynamically
  hidden or disabled, and can be rendered using a different classname.
- Choices can be provided as a simple list of strings, or as a list of objects
  with detailed configuration, or a mixture of both.
- When configured accordingly, a strict enum type will be generated for `value`.
- Optional placeholder element (for no selection)

## [Date][4]

[4]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-usedatefield-and-dateinput--docs

- Uses React's calendar, fow now
- Built-in validator for min and max date

## [Labels][5]

[5]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-uselabel-and-labeloutput--docs

- These are useful for rendering some data or message as part of a form
- it accepts optional render functions for rendering arbitrary widgets based
  on the data. (i.e. status indicators, links, etc.)

## [Action][6]

[6]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-useaction-and-actionbutton--docs

- Actions can be defined by providing a name and a function
- They are rendered as buttons.
- Size, color, style, className can be customized
- Actions can be dynamically disabled based on the current state. When this is
  the case, the button will be disabled, and the appropriate explanation will
  be provided in a tooltip.
- The provided function can be sync or async
- Pending state will be shown then the action is running
- The functions can provide errors and warnings, which will be displayed
  accordingly.
- The functions can also throw exceptions, which will be displayed accordingly.
- The functions can also provide status updates or log messages, which will be
  displayed accordingly.
- Actions may require confirmation before execution. This well be handled using
  dialogs.
- The control interface returned by the hook also provides a `isPending` flag
  and an `execute()` call.

## [Working with groups of fields][7]

[7]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-validate-and-inputfieldgroup--docs

There are multiple ways for building form with multiple fields layouts:

- [Defining fields individually, and collecting them in an array later][8]
  - Define the fields individually,
  - Collect them in an array,
  - Pass the array to `<InputFieldGroup>` for rendering.
  - Pass the array to a `validate()` function for triggering validation
    on all fields.
  - Pass the array to `getFieldValues()` function for getting a map of the
    values, where the keys of the map will the names for the field provided as
    part of the field definition. There is TypeScript-level type safety here,
    but you can also access the value at the individual fields, which is type
    safe.
- [Defining fields using hooks in an array][9]
  - You can also define the fields directly inside an array, without storing
    them individually
  - Then you can do rendering, validation, value extraction the same way as
    above.
  - The benefit of this method is that this results in an even more terse code,
    at the cost of type safety
- [Defining fields using hooks in a map][10]
  - You can also define fields in a map `{ admin: useBooleanField(...) }`.
  - Rendering, validation and value extraction works the same as above.
  - When using `getFieldValues()`, the keys of the returned data will be the
    same keys you used in the initial map of fields, and they will have the
    appropriate type.

[8]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-validate-and-inputfieldgroup--docs#default-1
[9]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-validate-and-inputfieldgroup--docs#minimal-array-form
[10]: https://pr-40.oasis-ui.pages.dev/?path=/docs/ui-plus-behavior-validate-and-inputfieldgroup--docs#type-safe-form

All methods will result in identical behavior for common actions
(validation etc.)

## Examples

Please see the Storybook stories for examples.
