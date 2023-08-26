if("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log('service worker registered', reg))
    .catch(error => {
        console.error("serviceWorker registeration failed: ", error)
    })
} else {
    console.log("no hay serviceWorker")
}