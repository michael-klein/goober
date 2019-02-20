export const sel = (hash, rule = "", body) => {
    if (hash == rule) {
      return `${hash} { ${body} }`;
    }
  
    if (rule.indexOf("&") != -1 || rule[0] == "@" || rule.endsWith("%") || ["from", "to"].indexOf(rule) !== -1) {
      return `${rule.replace(/&/gim, hash)} { ${body} }`;
    }
  
    return `${hash} ${rule} { ${body} }`;
  };