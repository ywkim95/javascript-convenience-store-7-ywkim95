import fs from 'fs';
import path from 'path';

const readFile = (fileName) => {
  const filePath = path.join(__dirname, 'public', fileName);
  const readFileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return readFileData;
};

export default readFile;
