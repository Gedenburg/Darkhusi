var usingSearXNG = false;  // Флаг для отслеживания посещения SearXNG
var usingDuckDuckGo = false;  // Флаг для отслеживания посещения DuckDuckGo

function FindProxyForURL(url, host) {
  // Если посещаем DuckDuckGo, сбрасываем флаг для SearXNG и включаем прямой доступ
  if (shExpMatch(url, "*duckduckgo.com*") || shExpMatch(host, "*duckduckgo.com*")) {
    usingDuckDuckGo = true;  // Запоминаем, что мы на DuckDuckGo
    usingSearXNG = false;  // Сбрасываем флаг SearXNG
    return "DIRECT";  // Прямой доступ для всего
  }

  // Если посещаем SearXNG (127.0.0.1:8888), сбрасываем флаг DuckDuckGo и активируем проксирование
  if (shExpMatch(url, "http://127.0.0.1:8888*") || shExpMatch(host, "127.0.0.1:8888")) {
    usingSearXNG = true;  // Запоминаем, что мы в SearXNG
    usingDuckDuckGo = false;  // Сбрасываем флаг DuckDuckGo
    return "DIRECT";  // Исключаем сам SearXNG из проксирования
  }

  // Если это Onion или I2P, всегда используем Tor/I2P
  if (shExpMatch(url, "onion:*") || shExpMatch(url, "i2p:*")) {
    if (shExpMatch(url, "onion:*")) {
      return "SOCKS5 127.0.0.1:9050";  // Tor для .onion
    } else if (shExpMatch(url, "i2p:*")) {
      return "HTTP 127.0.0.1:4444";  // I2P для .i2p
    }
  }

  // Если ранее был открыт SearXNG, проксируем весь трафик, но сам SearXNG исключаем
  if (usingSearXNG) {
    var proxy = getWorkingProxy();  // Получаем рабочий прокси
    return proxy;
  }

  // Если не было посещения SearXNG и DuckDuckGo, то прямой доступ
  return "DIRECT";
}

// Функция для получения рабочего прокси (WireGuard или Tor)
function getWorkingProxy() {
  var proxies = [
    "SOCKS5 127.0.0.1:8086",  // WireGuard
    "SOCKS5 127.0.0.1:9050",  // Tor
  ];

  // Проверяем доступность прокси
  for (var i = 0; i < proxies.length; i++) {
    var proxy = proxies[i];
    if (proxyAvailable(proxy)) {
      return proxy;
    }
  }

  // Если ничего не работает, пробуем Tor
  return "SOCKS5 127.0.0.1:9050";
}

// Функция проверки доступности прокси (заглушка, всегда true)
function proxyAvailable(proxy) {
  return true;
}
