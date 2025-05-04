import { defineField, defineType, FieldDefinition } from "sanity";

const commonFields = [
  defineField({
    name: "lang",
    title: "Language",
    type: "language",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "subTitle",
    title: "Sub Title",
    type: "text",
  }),
];

const commonPreview = {
  select: {
    title: "title",
    subtitle: "lang",
  },
};

const createBaseForm = (
  name: string,
  title: string,
  additionalFields: FieldDefinition[] = []
) =>
  defineType({
    name,
    title,
    type: "document",
    fields: [...commonFields, ...additionalFields],
    preview: commonPreview,
  });

export const woodForm = createBaseForm("woodForm", "Wood Form");
export const brandingForm = createBaseForm("brandingForm", "Branding Form");
export const websiteForm = createBaseForm("websiteForm", "Website Form");
export const contactForm = createBaseForm("contactForm", "Contact Form");
