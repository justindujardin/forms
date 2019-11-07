export interface ScaleJSONUISchema {
  schema: ScaleJSONSchema
  ui: ScaleUISchema
}

/** Dictionary of data names to enumerated values */
export interface ScaleJSONUIContext {
  [dataKey: string]:
    | SelectValuePair[]
    | string
    | boolean
    | number
    | string[]
    | boolean[]
    | number[]
}

/** Common interface for base field properties */
export interface ScaleFieldBaseProps<UISchemaType = ScaleUIFieldSchema> {
  /** onChange must be passed to all fields so they have a way of communicating change to the form */
  onChange: (newValue, errorSchema?) => void
  /** name element assigned to this fields DOM element */
  name?: string
  fieldName?: string
  fieldData?: any
  className?: string
  id?: string
  uiSchema?: UISchemaType
  uiConfig?: UISchemaConfig
  idPrefix?: string
  hidden?: boolean
  label?: string
  value?: string
  help?: string | any
  placeholder?: string
  readonly?: boolean
  formData?: any
  required?: boolean
  rawErrors?: any[]
  rawHelp?: string
  children?: any
  registry?: any
  schema?: any
  errorSchema?: any
  idSchema?: any
  formContext?: any
  onBlur?: any
  onFocus?: any
  disabled?: boolean
  // options stuff
  options?: any
}

/** Interface for select value/label pairs */
export interface SelectValuePair<T = string> {
  value: T
  label: string
  /** Optional metadata. Starting with a strict string type, but could be any */
  meta?: string
}

export type ScaleUIEnumeratedTypes = SelectValuePair | string | boolean | number

/** Interface for sources from Broker */
export interface Source extends SelectValuePair<string> {
  id: string
  error?: any
  path?: string
}

export interface UISchemaStep {
  readonly label: string
  readonly description?: string
}

/** the `options` key for field-specific data */
export interface ScaleUIFieldSchemaOptions {}

/**
 * A condition set to use in determining if a field should be shown.
 *
 * Accepts any string key that maps to a schema property and then a supported
 * value type
 */
export interface ScaleUIFieldConditionSet {
  readonly [schemaPropKey: string]: boolean | string | string[]
}

/** UI configuration for a single schema field */
export interface ScaleUIFieldSchema {
  readonly autoFocus?: boolean
  readonly label?: boolean
  readonly small?: boolean
  readonly fillFrom?: string
  readonly prefix?: string
  readonly suffix?: string
  readonly hidden?: boolean
  readonly icon?: string
  readonly minimumRows?: number
  readonly field?: string
  readonly data?: string
  readonly help?: string
  readonly text?: string
  readonly classes?: string
  readonly title?: string
  readonly placeholder?: string
  readonly disabled?: boolean
  readonly readonly?: boolean
  /**
   * For enumerations, can contain value/label mappings or simple datatypes in
   * list form.
   *
   * Examples:
   *   - [{value:"cool", label:"Cool Project"}]
   *   - [10,4,3,12]
   *   - [{value:12, label: "Administrator"}]
   *   - ["cool","other","third"]
   */
  readonly uiSelectOptions?: ScaleUIEnumeratedTypes[]
  readonly description?: string | { [key: string]: string }
  // TODO: use keyof valueof trick to get a string enumeration of all widget types
  //       from the mappings lookup.
  readonly widget?: string
  readonly step?: number
  readonly narrow?: boolean

  /** Field Ordering is applied to certain types like arrays and objects */
  readonly order?: string[]
  /** Condition set for determining when to show this field */
  readonly conditions?: ScaleUIFieldConditionSet | ScaleUIFieldConditionSet[]
  /**
   * A dictionary mapping of string for specific error messages.
   * For example:
   *
   *    {
   *      "minLength": "input must be 5 characters long!"
   *    }
   */
  readonly messages?: { [key: string]: string }
}

/**
 * JSON Schema placeholder type.
 */
export interface ScaleJSONSchema {
  // TODO: better JSONSchema types
  [name: string]: any
}
/**
 * Base UI Schema that combines with a JSONSchema object to describe how to build
 * a dynamic form. Extend this interface for created UI schemas to get strong typing.
 */
export interface ScaleUISchema {
  readonly config?: UISchemaConfig
  readonly properties: { [name: string]: ScaleUIFieldSchema }
}

export interface UISchemaConfig {
  readonly title?: string
  readonly translate?: boolean
  readonly disabled?: boolean
  readonly readonly?: boolean
  readonly narrow?: boolean
  readonly steps?: UISchemaStep[]
  readonly order?: string[]
  /**
   * A string to use as the root form's field id. You should probably not use this
   * unless it's really needed, because IDs need to be unique in the page so you'll
   * have to manage that expectation if setting this manually with multiple forms.
   */
  readonly rootId?: string
}
