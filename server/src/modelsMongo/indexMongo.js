import fs from 'fs';
import path from 'path';
import { connectMongo } from "./mongo.js";
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};

async function initializeModels() {
  await connectMongo();
  
  const files = fs.readdirSync(__dirname);
  
  for (const file of files) {
    if (["indexMongo.js", "mongo.js"].includes(file)) continue;
    
    const modelPath = path.join(__dirname, file);
    const { default: modelInit } = await import(modelPath);
    const model = modelInit(mongoose);
    db[model.modelName] = model;
  }

}

initializeModels();

export { db, initializeModels };
