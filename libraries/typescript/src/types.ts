/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type UISchemaSteps = UISchemaStep[]
/**
 * list of property names to determine form field order
 */
export type UISchemaOrder = string[]
export type UIDescription =
  | string
  | {
      [k: string]: string
    }
export type UIHelp =
  | string
  | UIFormattedString
  | {
      [k: string]: string
    }
/**
 * A boolean or formContext reference to a boolean
 */
export type UIDisabled = boolean | string
export type UIConditions = UICondition[]
export type UIValueMeta =
  | string
  | number
  | number
  | {
      [k: string]: any
    }
export type UISelectOptions = (UIValuePair | string | number | number)[]

/**
 * Exported JSON+UI schema dictionary. JSONSchema is in `data` and ui is in `ui`
 */
export interface FormSchema {
  ui: UISchema
  data: JSONSchema
}
/**
 * UISchema object that is associated with a JSONSchema. Contains form
 * configuration information, and a dictionary of properties.
 */
export interface UISchema {
  config: UISchemaConfig
  properties: UISchemaProps
}
/**
 * Configuration object that holds top-level UI configuration for the
 * given model. This includes information about the order of items, how
 * many steps are in a form, whether or not to translate the given UI
 * strings, and more.
 */
export interface UISchemaConfig {
  title?: string
  rootId?: string
  disabled?: boolean
  readonly?: boolean
  narrow?: boolean
  /**
   * whether or not the labels should be interpreted as locale keys
   */
  translate?: boolean
  steps?: UISchemaSteps
  order?: UISchemaOrder
}
/**
 * Text data to display for a single step in a form with multiple steps
 */
export interface UISchemaStep {
  label: string
  description?: string
}
/**
 * Dictionary of key/value where the key is a property name, and the value is a UIProp
 */
export interface UISchemaProps {
  [k: string]: UIProp
}
/**
 * Define UI attributes for the current FormProp
 */
export interface UIProp {
  title?: string
  widget?: string
  field?: string
  data?: string
  placeholder?: string
  autoFocus?: boolean
  fillFrom?: string
  minimumRows?: number
  text?: string
  classes?: string
  readonly?: boolean
  icon?: string
  step?: number
  small?: boolean
  prefix?: string
  suffix?: string
  description?: UIDescription
  help?: UIHelp
  disabled?: UIDisabled
  messages?: UIMessages
  conditions?: UIConditions
  options?: UISelectOptions
}
/**
 * A key into the localization table and a dictionary of values to be
 * used for substitution.
 */
export interface UIFormattedString {
  key: string
  args: UIFormatArgs
}
export interface UIFormatArgs {
  [k: string]: number | string
}
export interface UIMessages {
  [k: string]: UIFormattedString | string
}
/**
 * Determine if a field should be shown based some combination of other
 * fields in the Schema.
 */
export interface UICondition {
  [k: string]: any
}
/**
 * A value/label pair that describes an item that can be shown in the
 * UI for selection from a list. Optionally includes a metadata field.
 */
export interface UIValuePair {
  value: string
  label: string
  meta?: UIValueMeta
}
/**
 * Relaxed placeholder type for JSONSchema objects.
 */
export interface JSONSchema {
  [k: string]: any
}
