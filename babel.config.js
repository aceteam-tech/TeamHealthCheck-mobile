module.exports = function babelConfig(api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [['babel-plugin-dotenv', {
            replacedModuleName: 'babel-dotenv'
        }]]
    }
}
