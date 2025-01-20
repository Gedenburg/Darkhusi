function FindProxyForURL(url, host) {
  
  // Остальные условия остаются без изменений
  if (host === "127.0.0.1" && (url.indexOf(":5000") !== -1 || url.indexOf(":8888") !== -1)) {
    return "DIRECT";
  }
  if (shExpMatch(host, "*.i2p")) {
    return "PROXY 127.0.0.1:4444";
  }
  if (shExpMatch(host, "*.onion")) {
    return "SOCKS5 127.0.0.1:9050";
  }
  return "PROXY 127.0.0.1:5354";
}
