module.exports = {
    
    pwa:{
        name:"pwa-chatapp",
        workboxPluginMode : "InjectManifest",
        workboxOption:{
            swSrc : "src/service-worker.js"
        }

    }
};