export function hash(str: string) {
  let hash = "";
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) + "a";
  }
  return hash.substring(0, hash.length - 1);
}

export function decode(hash: string) {
  const charCodes = hash.split("a");
  let str = "";
  for (let i = 0; i < charCodes.length; i++) {
    str += String.fromCharCode(parseInt(charCodes[i]!));
  }
  return str;
}
