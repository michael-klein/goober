let SHEET_ID = "data-goober";
let ssr = {
  innerHTML: ""
};
const createTag = css => "<style " + SHEET_ID + ">" + css + "</style>";
/**
 * Creates a sheet if needed and returns it. Returns ssrTarget for SSR
 * @param {Element} target
 * @return {Array}
 */
const getDataContainer = target => {
  let result = ssr;
  try {
    if (
      (target = target || document.head) &&
      !(result = target.querySelector("[" + SHEET_ID + "]"))
    ) {
      const xs = document.createElement("x-s");
      xs.innerHTML = createTag("");
      result = target.appendChild(xs.firstChild);
    }
  } catch (e) {}
  return result ? (ssr = result) : ssr;
};
/**
 * Returns the values and clear the styles
 * @return {Array}
 */
export const extractCss = target => {
  target = target || ssr;
  let sheet = createTag(target.innerHTML);
  ssr.innerHTML = "";
  return sheet;
};

/**
 * Adds the hash and it's css to cache and to appends it to stylesheet
 * @param {String} css
 * @param {Element} target
 */
export const add = (css, target) => {
  // If we're not the client
  const dataContainer = getDataContainer(target);
  if (!~dataContainer.innerHTML.indexOf(css)) {
    dataContainer.innerHTML += css;
  }
};
