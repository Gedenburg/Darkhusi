function FindProxyForURL(url, host) {
    if (url.indexOf(":53") !== -1) {
        return "PROXY 127.0.0.1:5354"
    }
}

