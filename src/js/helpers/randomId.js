const idPrefix = [1e7] + -1e3 + -4e3 + -8e3 + -1e11;

const generateRandomByte = () => {
  const byteBuffer = new Uint8Array(1);

  return crypto.getRandomValues(byteBuffer)[0];
};

const generateByteValue = (match) => {
  const randomByte = generateRandomByte();
  const byteValue = match ^ (randomByte & (15 >> (match / 4)));

  return byteValue.toString(16);
};

export const uuIdV4 = () => idPrefix.replace(/[018]/g, generateByteValue);