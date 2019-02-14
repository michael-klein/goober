import { astish } from "./astish";
import { getBlocks } from "./inner/get-blocks";
import { parseBlock } from "./inner/parse-block";

/**
 * Parses the css syntax, line by line
 * @param {String} hash The className
 * @param {String} val Value to be parsed
 */
export const parse = (hash, val) => {
    return getBlocks(astish(val), hash)
      .map(item => parseBlock(hash, item))
      .join("\n");
  };