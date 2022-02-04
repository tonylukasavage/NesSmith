# CV2 Game Editor

## Sections

* Map Editor
  * tiles
  * palettes
* Sprite Editor
  * with animation previews
* Text Editor

## Functionality

* Patch export (cv2r/ips)

*

// offset = 0;
  // const base = 0x1FA96;

  // // get dimensions of screen
  // const width = rombuffer[base + offset++];
  // const height = rombuffer[base + offset++];

  // // get pointers for each section of the room
  // const ptrSize = width *height* 2;
  // const ptrs = [];
  // for (let i = 0; i < ptrSize; i += 2) {
  //  const low = toHex(rombuffer[base + offset + i]);
  //  const high = toHex(rombuffer[base + offset + i + 1]);
  //  ptrs.push(parseInt(`0x${high}${low}`, 16));
  // }
  // offset += ptrSize;

  // console.log({
  //  width,
  //  height,
  //  ptrs: ptrs.map(p => p.toString(16))
  // });
