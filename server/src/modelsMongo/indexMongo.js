import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = fs.readdirSync(__dirname);
const db = {};

for (const file of files) {
  if (["indexMongo.js", "mongo.js"].includes(file)) continue;
  const modelPath = path.join(__dirname, file);
  const { default: modelInit } = await import(modelPath);
  const model = modelInit(mongoose);
  db[model.modelName] = model;
}

for (let modelName in db) {
  if (db[modelName].associateModels) db[modelName].associateModels(db);
}

export default db;
