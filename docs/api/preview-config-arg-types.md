---
title: 'argTypes'
---

<!-- TODO: Should nearly _all_ of this move to api/arg-types.md? Much of this doesn't only apply at the project level. -->

Parent: [preview.js|ts configuration](./Overview.md)

Type:

```ts
{
  [key: string]: {
    description?: string;
    if?: Conditional;
    name?: string;
    type?: SBType | SBScalarType['name'];
    defaultValue?: any;
    [key: string]: any;
  }
}
```

<!-- TODO -->

TK - Do these come from addon-controls?

```ts
{
  [key: string]: {
    control?: ControlType | { type: ControlType };
    options?: string[];
    table?: {
      type?: { summary?: string; detail?: string };
      defaultValue?: { summary: string; detail?: string };
    },
  }
}
```

ArgTypes specify the behavior of [`args`](./preview-config-args.md) with `argTypes`, an object with keys matching the name of args. By specifying the type of an arg, you constrain the values that it can accept and provide information about args that are not explicitly set (i.e., description).

You can also use argTypes to “annotate” args with information used by addons that make use of those args. For instance, to instruct the [controls addon](../essentials/controls.md) to render a color picker, you could specify the `'color'` control type.

For most Storybook projects, `argTypes` are [automatically inferred](#automatic-argtype-inference) from your components. Any `argTypes` specified manually will override the inferred values.

The most concrete realization of argTypes is the [`ArgTypes` doc block](./doc-block-argtypes.md) ([`Controls`](./doc-block-controls.md) is similar). Each row in the table corresponds to a single argType and the current value of that arg.

![Storybook inferring automatically the argType](./doc-block-argtypes.png)

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/preview-config-arg-types.js.mdx',
    'common/preview-config-arg-types.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## `description`

Type: `string`

<!-- TODO: #table doesn't exist yet -->

Describe the arg. (If you intend to describe the type of the arg, you should use [`table.type.summary`](#table), instead.) [Inferred](#automatic-argtype-inference) from the component’s prop types.

<!-- prettier-ignore-start -->

<!-- TODO <CodeSnippets
  paths={[
    'common/preview-config-arg-types-description.js.mdx',
    'common/preview-config-arg-types-description.ts.mdx',
  ]}
/> -->

<!-- prettier-ignore-end -->

## `if`

Type:

```ts
{ arg: string } | { global: string } &&
  { truthy: boolean } | { exists: boolean } | { eq: any } | { neq: any };
```

Conditionally render an argType based on the value of another arg or a global.

<!-- prettier-ignore-start -->

<!-- TODO <CodeSnippets
  paths={[
    'common/preview-config-arg-types-if.js.mdx',
    'common/preview-config-arg-types-if.ts.mdx',
  ]}
/> -->

<!-- prettier-ignore-end -->

```ts
// .storybook/preview.ts

// Replace your-renderer with the renderer you are using (e.g., react, vue3, angular, etc.)
import { Preview } from '@storybook/your-renderer';

const preview: Preview = {
  argTypes: {
    parent: { control: 'select', options: ['one', 'two', 'three'] },

    // 👇 Only shown when `parent` arg value is truthy
    parentIsTruthy: { if: { arg: 'parent' } },

    // 👇 Only shown when `parent` arg value is not truthy
    parentIsNotTruthy: { if: { arg: 'parent', truthy: false } },

    // 👇 Only shown when `parent` arg value is 'three'
    parentIsEqToValue: { if: { arg: 'parent', eq: 'three' } },
  },
};

export default preview;
```

## `name`

Type: `string`

The `argTypes` object uses the name of the arg as the key. By default, that key is used when displaying the argType in Storybook. You can override the displayed name by specifying a `name` property.

<!-- prettier-ignore-start -->

<!-- TODO <CodeSnippets
  paths={[
    'common/preview-config-arg-types-name.js.mdx',
    'common/preview-config-arg-types-name.ts.mdx',
  ]}
/> -->

<!-- prettier-ignore-end -->

## `type`

Type: `TK`

TK <!-- TODO: Not sure how this differs from `table.type.summary` -->

<!-- prettier-ignore-start -->

<!-- TODO <CodeSnippets
  paths={[
    'common/preview-config-arg-types-if.js.mdx',
    'common/preview-config-arg-types-if.ts.mdx',
  ]}
/> -->

<!-- prettier-ignore-end -->

## `defaultValue` (deprecated)

Type: `any`

Deprecated in favor of defining the [`arg`](../writing-stories/args.md) value directly.

<!-- prettier-ignore-start -->

<!-- TODO <CodeSnippets
  paths={[
    'common/preview-config-arg-types-default-value.DEPRECATED.js.mdx',
    'common/preview-config-arg-types-default-value.DEPRECATED.ts.mdx',
    'common/preview-config-args.js.mdx',
    'common/preview-config-args.ts.mdx',
  ]}
/> -->

<!-- prettier-ignore-end -->

## Automatic argType inference

If you are using the Storybook [docs](../writing-docs/introduction.md) addon (installed by default as part of [essentials](../essentials/introduction.md)), then Storybook will infer a set of argTypes for each story based on the `component` specified in the [default export](./csf.md#default-export) of the CSF file.

To do so, Storybook uses various static analysis tools depending on your framework.

- React
  - [react-docgen](https://github.com/reactjs/react-docgen)
  - [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
- Vue
  - [vue-docgen-api](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api)
- Angular
  - [compodoc](https://compodoc.app/)
- WebComponents
  - [custom-element.json](https://github.com/webcomponents/custom-elements-json)
- Ember
  - [YUI doc](https://github.com/ember-learn/ember-cli-addon-docs-yuidoc#documenting-components)
