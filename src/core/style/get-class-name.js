import { hush } from "../hush";
import { add } from "./sheet";
import { parse } from "../parser/parse";

/**
 * Does the hush-ing of the css declaration and returns the className.
 * @param {String} css
 * @param {Boolean} notGlob Boolean flag that's not global style
 * @return {String}
 */
export const getClassNameForCss = (compiled, notGlob, target) => {
  const hash = notGlob && hush(compiled).toString(8);
  const parsed = parse(hash ? "." + hash : "", compiled);
  // This methods adds or updates the new style
  add(parsed, target);

  return hash;
};
