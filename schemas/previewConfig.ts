export const commonPreviewConfig = (name: string = "compname") => ({
  select: {
    lang: "lang",
    title: "title",
  },
  prepare(selection: Record<"lang" | "title", any>) {
    const { lang, title } = selection;
    return {
      title: `${title ? title : name} - ${lang}`, // Replace (Component Name) with actual component name
    };
  },
});
