function FindProxyForURL(url, host) {
    var proxy = "PROXY 127.0.0.1:8086";
    var direct = "DIRECT";

    // Если сайт в списке недоступных, используем прокси
    if (shExpMatch(host, "*.blocked.com") || dnsResolve(host) == null) {
        return proxy;
    }

    // В остальных случаях – прямая связь
    return direct;
}
