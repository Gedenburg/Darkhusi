var usingDuckDuckGo = false;  // Флаг для отслеживания посещения DuckDuckGo
var usingBrave = false;  // Флаг для отслеживания посещения Brave Search

function FindProxyForURL(url, host) {
  // Если посещаем DuckDuckGo, сбрасываем флаг для Brave
  if (shExpMatch(url, "*duckduckgo.com*") || shExpMatch(host, "*duckduckgo.com*")) {
    usingDuckDuckGo = true;  // Устанавливаем флаг, что мы в DuckDuckGo
    usingBrave = false;  // Сбрасываем флаг для Brave
    return "DIRECT";  // Прямой доступ для всего
  }

  // Если посещаем Brave Search, сбрасываем флаг для DuckDuckGo
  if (shExpMatch(url, "*search.brave.com*") || shExpMatch(host, "*search.brave.com*")) {
    usingBrave = true;  // Устанавливаем флаг, что мы в Brave
    usingDuckDuckGo = false;  // Сбрасываем флаг для DuckDuckGo
    var proxy = getWorkingProxy();  // Получаем рабочий прокси для Brave
    return proxy;  // Возвращаем прокси
  }

  // Если это Onion или i2p, всегда используем Tor
  if (shExpMatch(url, "onion:*") || shExpMatch(url, "i2p:*")) {
    if (shExpMatch(url, "onion:*")) {
      return "SOCKS5 127.0.0.1:9050";  // Используем Tor для .onion
    } else if (shExpMatch(url, "i2p:*")) {
      return "HTTP 127.0.0.1:4444";  // Используем I2P для .i2p
    }
  }

  // Если мы в Brave, проксируем весь трафик
  if (usingBrave) {
    var proxy = getWorkingProxy();  // Получаем рабочий прокси
    return proxy;
  }

  // Если не в DuckDuckGo или Brave, возвращаем прямой доступ
  return "DIRECT";
}

// Функция для цикличной попытки подключения к рабочему прокси
function getWorkingProxy() {
  var proxies = [
    "SOCKS5 127.0.0.1:8086",  // WireGuard
    "SOCKS5 127.0.0.1:9050",  // Tor
  ];

  // Пробуем прокси по очереди
  for (var i = 0; i < proxies.length; i++) {
    var proxy = proxies[i];
    // Проверка доступности прокси (здесь всегда считаем, что он доступен)
    if (proxyAvailable(proxy)) {
      return proxy;  // Возвращаем рабочий прокси
    }
  }

  // Если ни один прокси не работает, используем Tor
  return "SOCKS5 127.0.0.1:9050";  // Используем Tor по умолчанию
}

// Функция для проверки доступности прокси
function proxyAvailable(proxy) {
  return true;  // В этом примере всегда считаем, что прокси доступен
}
