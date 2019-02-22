import { astish } from "./astish";

const vv = [];

const compile = (obj, paren, wrapper) => {
  let current = [];
  
  // If we're dealing with keyframes just flatten them
  if (/^@k/.test(wrapper)) {
  	vv.push(wrapper + JSON.stringify(obj).replace(/","/g, ';').replace(/"|,"/g, '').replace(/:{/g, '{'));
    return;
  }
  
	for (let key in obj) {
    const val = obj[key];
    
    if (!val) return;
    
    // If this is a 'block'
    if (typeof val === "object") {
      // Regular selector
      let next = paren + " " + key;
      
      // Nsted
      if (/&/g.test(key)) next = key.replace(/&/g, paren);

      // Media queries or other
      if (key[0] == '@') next = paren;
      
      // Call the compile for this block
      compile(val, next, next == paren ? key : wrapper || '');
    } else {

      // Push the line for this property
	    current.push(`${key}: ${val};`);
    }
  }
  
  // If we have properties
  if (current.length) {
    // Standard rule compostion
    const rule = `${paren} { ${current.join("")} }`;
    
    // With wrapper
    if (wrapper) vv.push(`${wrapper} { ${rule} }`);
    // Else just push the rule
  	else vv.push(rule);
  }
}

/**
 * Parses the css syntax, line by line
 * @param {String} hash The className
 * @param {String} val Value to be parsed
 */
export const parse = (hash, val) => {
  vv.length = 0;

  // Compile the ast-ish structure
  compile(astish(val), hash);

  // Unshift the last block
  vv.unshift(vv.pop());

  // Join the rules by new lines
  return vv.join("\n");
};