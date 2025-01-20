function FindProxyForURL(url, host) {
    if (url.indexOf(":443") !== -1) {
        return "PROXY 127.0.0.1:5354";
    }
    return "DIRECT";
}

