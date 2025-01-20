function FindProxyForURL(url, host) {
    // Проверяем, если порт 443 и это DNS-запрос
    if (shExpMatch(url, "https://*") && dnsDomainIs(host, "dns.example.com")) {
        return "PROXY 127.0.0.1:5354";
    }
    
    // Если не подходит, то прямое соединение
    return "DIRECT";
}
