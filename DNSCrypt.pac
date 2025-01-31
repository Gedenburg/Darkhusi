var useProxy = false;  // Флаг использования прокси

function FindProxyForURL(url, host) {
    // Если посещаем DuckDuckGo, отключаем прокси
    if (shExpMatch(host, "*duckduckgo.com")) {
        useProxy = false;
        return "DIRECT";
    }

    // Если посещаем SearXNG, включаем прокси, но сам он идет напрямую
    if (shExpMatch(url, "http://127.0.0.1:8888*") || shExpMatch(host, "127.0.0.1")) {
        useProxy = true;
        return "DIRECT";
    }

    // Onion и I2P всегда через соответствующие прокси
    if (shExpMatch(url, "*.onion*") || shExpMatch(host, "*.onion")) {
        return "SOCKS5 127.0.0.1:9050";
    }
    if (shExpMatch(url, "*.i2p*") || shExpMatch(host, "*.i2p")) {
        return "HTTP 127.0.0.1:4444";
    }

    // Если активирован режим прокси, используем WireGuard или Tor
    if (useProxy) {
        return getWorkingProxy();
    }

    // По умолчанию — прямой доступ
    return "DIRECT";
}

// Функция выбора рабочего прокси
function getWorkingProxy() {
    var proxies = [
        "SOCKS5 127.0.0.1:8086",  // WireGuard
        "SOCKS5 127.0.0.1:9050"   // Tor
    ];

    for (var i = 0; i < proxies.length; i++) {
        if (proxyAvailable(proxies[i])) {
            return proxies[i];
        }
    }

    // Если ничего не работает, пробуем Tor по умолчанию
    return "SOCKS5 127.0.0.1:9050";
}

// Функция проверки доступности прокси (заглушка, всегда true)
function proxyAvailable(proxy) {
    return true;
}
