import StyleDictionary from "style-dictionary";

const FONT_WEIGHTS = { regular: 400, medium: 500, semibold: 600, bold: 700 };

const toCssValue = (path, value) => {
  if (typeof value === "number") return `${value}px`;
  if (path.includes("weight")) return FONT_WEIGHTS[value] ?? value;
  return value;
};

const setNested = (target, path, value) => {
  const last = path.length - 1;
  path.reduce(
    (node, key, i) => (node[key] ??= i === last ? { $value: value } : {}),
    target,
  );
};

// Figma export is flat ("a/b/c": value), so nest it for Style Dictionary.
StyleDictionary.registerParser({
  name: "figma-flat-tokens",
  pattern: /tokens\.json$/,
  parser: ({ contents }) => {
    const { tokens, unboundValues } = JSON.parse(contents);
    const out = {};
    for (const [key, value] of Object.entries(tokens)) {
      const path = key.split("/");
      setNested(out, path, toCssValue(path, value));
    }
    for (const [key, value] of Object.entries(unboundValues ?? {})) {
      setNested(out, ["unbound", key], toCssValue([key], value));
    }
    return out;
  },
});

const sd = new StyleDictionary({
  source: ["tokens/tokens.json"],
  parsers: ["figma-flat-tokens"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
  },
});

await sd.buildAllPlatforms();
