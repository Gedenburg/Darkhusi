function FindProxyForURL(url, host) {
    var proxy = "PROXY 127.0.0.1:8086";
    var direct = "DIRECT";

    // Пробуем соединиться напрямую
    if (isResolvable(host)) {
        return direct;
    }

    // Если не удалось, используем прокси
    return proxy;
}
