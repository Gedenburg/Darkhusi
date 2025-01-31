var proxyMode = "DIRECT"; // Начинаем с прямого режима

function FindProxyForURL(url, host) {
    // Если посещаем DuckDuckGo, отключаем прокси для всего трафика
    if (shExpMatch(host, "*duckduckgo.com")) {
        proxyMode = "DIRECT";
        return "DIRECT";
    }

    // Если посещаем SearXNG, включаем прокси, но сам он идет напрямую
    if (shExpMatch(url, "http://127.0.0.1:8888*") || shExpMatch(host, "127.0.0.1")) {
        proxyMode = "PROXY";
        return "DIRECT"; // Исключаем SearXNG из проксирования
    }

    // Onion и I2P всегда через соответствующие прокси
    if (shExpMatch(url, "*.onion*") || shExpMatch(host, "*.onion")) {
        return "SOCKS5 127.0.0.1:9050";
    }
    if (shExpMatch(url, "*.i2p*") || shExpMatch(host, "*.i2p")) {
        return "HTTP 127.0.0.1:4444";
    }

    // Если включен режим прокси, направляем через WireGuard или Tor
    if (proxyMode === "PROXY") {
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
