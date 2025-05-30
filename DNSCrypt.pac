function FindProxyForURL(url, host) {
    // Список доменов, заблокированных в Украине (на основе известных данных до 2023 года и предположений на 2025)
    var blockedSites = [
        "vk.com",           // ВКонтакте
        "ok.ru",            // Одноклассники
        "yandex.ru",        // Яндекс
        "yandex.ua",
        "mail.ru",          // Mail.ru
        "kaspersky.ru",     // Лаборатория Касперского
        "kaspersky.ua",
        "rt.com",           // Russia Today
        "ria.ru",           // РИА Новости
        "lenta.ru",         // Лента.ру
        "rbc.ru",           // РБК
        "rambler.ru",
        "dzen.ru",
        "www.xnxx-ru.com",   //порно
        "truthsocial.com",  //Трамп мать его
        // Новые домены, предположительно добавленные позже (нуждаются в проверке)
        "telegram.org",     // Возможные ограничения на отдельные ресурсы
        "livejournal.com",  // ЖЖ (блокировался в 2021)
        "github.com",       // Блокировка отдельных страниц в прошлом
        // Добавьте сюда другие домены из актуального реестра
    ];

    // Проверяем, является ли хост одним из заблокированных
    for (var i = 0; i < blockedSites.length; i++) {
        if (dnsDomainIs(host, blockedSites[i])) {
            return "SOCKS5 127.0.0.1:8086";
        }
    }

    // Для всех остальных сайтов — прямое соединение
    return "DIRECT";
}
