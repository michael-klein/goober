export const astish = val => {
    let out = val

    // Comments, Newline and spaces
    .replace(/(\/\*([\s\S]*?)\*\/)|(\s{2,})/gm, "")

    // "attribute": "value",
    .replace(/([a-z0-9-%]+)\s*?:\s*([\sa-z0-9(),%-."'\/]+);/g, '"$1":"$2",')

    // "selector": {
    .replace(/([^;}{"]*?)\s{/g, '"$1": {')

    // Double "", removal
    .replace(/"",/g, '","')

    // ",} -> "},
    .replace(/(",})+/g, '"},')

    // "},}" -> "}},"
    .replace(/("},}")+/g, '"}},"')

    // There's a special case, where sometimes nesting might result in braces with comma interlaced
    .replace(/([}]+),([}]+)/g, '$1$2');

    // // The string is ending into 
    if (out.substr(-1) == ",") 
        out = out.substr(0, out.length - 1);

    return JSON.parse("{" + out + "}");
}