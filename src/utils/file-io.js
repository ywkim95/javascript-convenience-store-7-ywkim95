import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const productFileName = 'products.md';
export const promotionFileName = 'promotions.md';

export const readFile = (fileName) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);
  const filePath = path.join('..','public', fileName);
  // const filePath = path.join(__dirname, '..', '..', 'public', fileName);
  return fs.readFileSync(filePath, { encoding: 'utf-8' });

};

export const writeFile = (fileName, data) => {
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);
  const filePath = path.join('..','public', fileName);
  // const filePath = path.join(__dirname, '..', '..', 'public', fileName);
  fs.writeFileSync(filePath, data, { encoding: 'utf-8' });
};
