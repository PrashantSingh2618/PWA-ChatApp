module.exports = {
    globDirectory: 'dist/',
    globPatterns: ['**/{app,chunk-vendors}.*.{js,css}', 'index.html', '**/*.png'],
    swDest: 'dist/service-worker.js',
    swSrc: 'src/sw.js',

};