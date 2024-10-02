const accountSchema = `
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        loginID TEXT,
        password TEXT,
        expiredPassword TEXT,

        idPlatform INTEGER,
        platformName TEXT,
        loginURL TEXT,

        customIP TEXT,
        proxyIP TEXT,
        proxyPort TEXT,
        proxyUsername TEXT,
        proxyPassword TEXT,
        proxyScope TEXT,

        bet INTEGER,
        refresh INTEGER,
        autoLogin INTEGER,
        lockURL INTEGER,

        cookie TEXT,
        host TEXT,
        socketUrl TEXT,

        statusLogin INTEGER
      `

export default accountSchema
