function FindProxyForURL(url, host) {
    if (dnsResolve(host) == "127.0.0.1") {
        return "DIRECT";
    }
    return "PROXY 127.0.0.1:5354";
}
