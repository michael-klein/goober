import { sel } from "./sel";

export const parseBlock = (hash, block) => {
    let data = block[1];
    let css = "";
  
    if (data.map) {
      css = data.map(item => parseBlock(hash, item)).join(" ");
    } else {
      for (let p in data) {
        css += `${p}: ${data[p]};`;
      }
    }
  
    return sel(hash, block[0], css);
  };