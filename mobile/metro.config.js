const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to prefer the "browser" field to avoid Node-specific bundles like in Axios
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
