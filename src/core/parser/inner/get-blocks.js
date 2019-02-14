export const getBlocks = (data, hash) => {
    let out;
    let blocks = [];
  
    for (let k in data) {
      const entry = data[k];
      const type = typeof entry;
  
      // Avoid conflict with first type char 's' just as Symbol
      if (type[1] === "t") {
        out = out || {};
        out[k] = entry;
        delete data[k];
      } else {
        let innerBlocks = getBlocks(entry, hash);
        blocks.push([
          k,
          !innerBlocks[1] ? innerBlocks[0][1] : innerBlocks
        ]);
      }
    }
  
    if (out) {
      return [
        [ hash, out ]
      ].concat(blocks);
    }
  
    return blocks;
  };