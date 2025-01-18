function FindProxyForURL(url, host) {
    if (dnsResolve(host)) {
        return "SOCKS5 127.0.0.1:5354"; // Указываем локальный прокси
    }
    return "DIRECT"; // Если прокси недоступен, прямое соединение
}
