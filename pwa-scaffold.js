if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/puzzel/serviceWorker.js")   // altijd vanuit de root van de app, anders kan de serviceworker niet overal bij
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
    })
}
