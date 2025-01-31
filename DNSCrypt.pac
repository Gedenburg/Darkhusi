function FindProxyForURL(url, host) {
  if (url.substring(0, 5) == "onion:") {
    return "SOCKS5 127.0.0.1:9050";
  } else if (url.substring(0, 4) == "i2p:") {
    return "HTTP 127.0.0.1:4444";
  } else {
    var proxies = [
      "SOCKS5 127.0.0.1:2080",
      "SOCKS5 127.0.0.1:9050",
      "DIRECT"
    ];
    for (var i = 0; i < proxies.length; i++) {
      try {
        var proxy = proxies[i];
        if (proxy == "DIRECT") {
          return proxy;
        } else {
          var sock = new Socket();
          var parts = proxy.split(" ");
          var type = parts[0];
          var address = parts[1].split(":")[0];
          var port = parseInt(parts[1].split(":")[1]);
          sock.connect(address, port);
          sock.close();
          return proxy;
        }
      } catch (err) {
        // Пробуем следующий вариант
      }
    }
  }
}
