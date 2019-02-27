let SHEET_ID = "goober";
let ssrTarget = {
  innerHTML: ""
};
/**
 * Creates a sheet if needed and returns it. Returns ssrTarget for SSR
 * @param {Element} target
 * @return {Array}
 */

const getSheet = target => {
  try {
    if ((target = target || (ssrTarget = document.head))) {
      let sheet = target.querySelector("style[data-" + SHEET_ID + "]");
      if (!sheet) {
        sheet = document.createElement("style");
        target.appendChild(sheet).dataset[SHEET_ID] = 1;
      }
      return sheet;
    }
  } catch (e) {}
  return ssrTarget;
};
/**
 * Returns the values and clear the styles
 * @return {Array}
 */
export const flush = () => {
  let sheet = getSheet();
  let s = sheet.innerHTML;
  sheet.innerHTML = "";
  return s;
};

/**
 * Adds the hash and it's css to cache and to appends it to stylesheet
 * @param {String} css
 * @param {Element} target
 */
export const add = (css, target) => {
  // If we're not the client
  const sheet = getSheet(target);
  if (!~sheet.innerHTML.indexOf(css)) {
    sheet.innerHTML += css;
  }
};
