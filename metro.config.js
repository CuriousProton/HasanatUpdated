// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Reduce file watching
config.watchFolders = [__dirname];
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx'];

// Ignore unnecessary files
config.resolver.blockList = [
  /\/__tests__\/.*/,
  /\/android\/.*/,
  /\/ios\/.*/,
  /node_modules\/.*\/node_modules\/react-native\/.*/,
];

// Reduce the number of workers
config.maxWorkers = 2;

module.exports = config;