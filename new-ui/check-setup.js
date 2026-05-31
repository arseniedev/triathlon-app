#!/usr/bin/env node
// Quick test runner to verify the setup

const fs = require('fs');
const path = require('path');

console.log('=== Triathlon App Test Environment ===\n');

// Check if files exist
const filesToCheck = [
    'src/training.js',
    'src/drill.js',
    'src/storage.js',
    'src/TrainingViewModel.js',
    'src/DrillViewModel.js',
    'src/StorageManager.js',
    'src/TrainingDrillFactory.js',
    'src/LocalStorageStrategy.js',
    'src/IndexedDBStrategy.js',
    'test/training.test.js',
    'test/drill.test.js',
    'test/storage.test.js',
    'index.html'
];

console.log('Checking files...');
filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✓' : '✗'} ${file}`);
});

console.log('\n=== Ready to run Jest tests ===');
console.log('Run: npm test\n');
