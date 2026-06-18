/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
      maxLength: 160,
    },
    {
      fieldName: "heroHeadline",
      type: "string",
      required: false,
      label: "Hero Headline",
      maxLength: 120,
    },
    {
      fieldName: "heroSubheadline",
      type: "string",
      required: false,
      label: "Hero Subheadline",
      maxLength: 240,
    },
    {
      fieldName: "listInputPlaceholder",
      type: "string",
      required: false,
      label: "Grocery Input Placeholder",
      maxLength: 120,
    },
    {
      fieldName: "compareCtaLabel",
      type: "string",
      required: false,
      label: "Compare Button Label",
      maxLength: 60,
    },
    {
      fieldName: "checkoutCtaLabel",
      type: "string",
      required: false,
      label: "Checkout Button Label",
      maxLength: 60,
    },
    {
      fieldName: "searchRadiusMiles",
      type: "number",
      required: false,
      label: "Search Radius (miles)",
      min: 1,
      max: 100,
    },
    {
      fieldName: "currencySymbol",
      type: "string",
      required: false,
      label: "Currency Symbol",
      maxLength: 4,
    },
    {
      fieldName: "showDemoDataBadge",
      type: "boolean",
      required: false,
      label: "Show Demo Data Badge",
    },
    {
      fieldName: "enablePhotoInput",
      type: "boolean",
      required: false,
      label: "Enable Photo Input (stub)",
    },
    {
      fieldName: "enableVoiceInput",
      type: "boolean",
      required: false,
      label: "Enable Voice Input (stub)",
    },
    {
      fieldName: "starterListItems",
      type: "array",
      required: false,
      label: "Starter List Suggestions",
      item: { type: "string", required: true },
    },
    {
      fieldName: "valueProps",
      type: "array",
      required: false,
      label: "Value Propositions",
      item: {
        type: "object",
        fields: [
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "description", type: "string", required: true, label: "Description" },
        ],
      },
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
      maxLength: 200,
    },
  ],
};