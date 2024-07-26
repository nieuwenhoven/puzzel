if ("serviceWorker" in navigator) {
    window.addEventListener("load", function(registration) {
        navigator.serviceWorker
            .register("/puzzel/serviceWorker.js")   // altijd vanuit de root van de app, anders kan de serviceworker niet overal bij
            .then(console.log("service worker geregisteerd met scope:", registration.scope))
            .catch(err => console.log("service worker not registered", err))
    })
}
