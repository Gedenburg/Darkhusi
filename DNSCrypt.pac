var usingGoogle = false;  // Флаг для отслеживания посещения Google
var usingDuckDuckGo = false;  // Флаг для отслеживания посещения DuckDuckGo

function FindProxyForURL(url, host) {
  // Проверка на посещение Google
  if (shExpMatch(url, "https://www.google.com/*") || shExpMatch(url, "http://www.google.com/*")) {
    usingGoogle = true;  // Установим флаг, что мы в Google
    usingDuckDuckGo = false;  // Выключаем флаг для DuckDuckGo
    return "DIRECT";  // Прямой доступ для всего
  }

  // Если мы в Google, всегда прямой доступ
  if (usingGoogle) {
    return "DIRECT";  // Прямой доступ для всех сайтов
  }

  // Проверка на посещение DuckDuckGo
  if (shExpMatch(url, "*duckduckgo.com*") || shExpMatch(host, "*duckduckgo.com*")) {
    usingDuckDuckGo = true;  // Установим флаг, что мы в DuckDuckGo
    usingGoogle = false;  // Выключаем флаг для Google
    var proxy = getWorkingProxy();  // Получаем рабочий прокси для DuckDuckGo
    return proxy;  // Возвращаем прокси
  }

  // Если это Onion, всегда используем Tor
  if (shExpMatch(url, "onion:*") || shExpMatch(url, "i2p:*")) {
    // Для onion используем Tor, для i2p используем HTTP 127.0.0.1:4444
    if (shExpMatch(url, "onion:*")) {
      return "SOCKS5 127.0.0.1:9050";  // Используем Tor для .onion
    } else if (shExpMatch(url, "i2p:*")) {
      return "HTTP 127.0.0.1:4444";  // Используем I2P для .i2p
    }
  }

  // Если мы в DuckDuckGo, проксируем весь трафик
  if (usingDuckDuckGo) {
    var proxy = getWorkingProxy();  // Получаем рабочий прокси
    return proxy;
  }

  // Если не в Google или DuckDuckGo, возвращаем прямой доступ
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
    // Проверка доступности прокси (через предположительное подключение, без сокетов)
    if (proxyAvailable(proxy)) {
      return proxy;  // Возвращаем рабочий прокси
    }
  }

  // Если ни один прокси не работает, возвращаем Tor
  return "SOCKS5 127.0.0.1:9050";  // Используем Tor по умолчанию
}

// Функция для проверки доступности прокси
function proxyAvailable(proxy) {
  // Для демонстрации проверка доступности прокси осуществляется на основе конфигурации
  // Необходимо будет заменить на реальную проверку доступности через другие механизмы
  return true;  // В этом примере всегда считаем, что прокси доступен
}
