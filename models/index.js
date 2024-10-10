const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../db.config');

const models = {};

console.log("=======> creating tables <======");

// Helper function to load models recursively
function loadModelsFromDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recursively load models from subdirectories
            loadModelsFromDirectory(fullPath);
        } else if (file.endsWith('.model.js')) {
            // Ensure it's a model file and require it
            const modelDef = require(fullPath);
            if (typeof modelDef === 'function') {
                const model = modelDef(sequelize, Sequelize.DataTypes);
                models[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model;
            } else {
                console.error(`Failed to load model from ${file}: not a valid model definition`);
            }
        }
    });
}

// Load models from the models directory
loadModelsFromDirectory(__dirname);

console.log("=======> tables created <======");

// Set up associations after models are loaded
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = { sequelize, models };
