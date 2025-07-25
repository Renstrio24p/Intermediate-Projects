import DOMPurify from "dompurify";
import type { Config } from "dompurify";

export const useTSPurifier = (
  input: string | HTMLElement,
  config?: Config
) => {
  const defaultConfig: Config = {
    ADD_TAGS: ["my-custom-tag"],
  };

  const mergedConfig: Config = { ...defaultConfig, ...config };

  if (typeof input === "string") {
    return DOMPurify.sanitize(input, mergedConfig);
  } else {
    return DOMPurify.sanitize(input.innerHTML, mergedConfig);
  }
};
