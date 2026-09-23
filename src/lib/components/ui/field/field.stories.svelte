<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { Input } from "../input/index.js";
  import FieldContent from "./field-content.svelte";
  import FieldDescription from "./field-description.svelte";
  import FieldError from "./field-error.svelte";
  import FieldGroup from "./field-group.svelte";
  import FieldLabel from "./field-label.svelte";
  import FieldLegend from "./field-legend.svelte";
  import FieldSeparator from "./field-separator.svelte";
  import FieldSet from "./field-set.svelte";
  import Field from "./field.svelte";

  const { Story } = defineMeta({
    title: "UI/Field",
    component: Field,
    tags: ["autodocs"],
  });
</script>

<Story name="Default" asChild>
  <Field>
    <FieldLabel for="profile-name">Display name</FieldLabel>
    <Input id="profile-name" placeholder="Ada Lovelace" />
    <FieldDescription>This is how your name appears to other users.</FieldDescription>
    <FieldError errors={[{ message: "This field is required." }]} />
  </Field>
</Story>

<Story name="Horizontal" asChild>
  <Field orientation="horizontal">
    <FieldLabel for="username">Username</FieldLabel>
    <FieldContent>
      <Input id="username" placeholder="ada.lovelace" />
      <FieldDescription>Your public handle across the site.</FieldDescription>
    </FieldContent>
  </Field>
</Story>

<Story name="Group" asChild>
  <FieldSet>
    <FieldLegend>Billing details</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel for="billing-name">Name</FieldLabel>
        <Input id="billing-name" placeholder="Ada Lovelace" />
        <FieldDescription>The name shown on invoices.</FieldDescription>
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel for="billing-email">Email</FieldLabel>
        <Input id="billing-email" type="email" placeholder="ada@example.com" />
        <FieldDescription>We send receipts to this address.</FieldDescription>
      </Field>
    </FieldGroup>
  </FieldSet>
</Story>
