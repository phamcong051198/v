import { Account, Platform } from '@db/model'
import { BrowserWindow } from 'electron'

export async function handleAddAccountPlatForm(
  mainWindow: BrowserWindow,
  data: { idPlatform: number; loginURL: string; platformName: string }
) {
  Account.create({
    loginID: null,
    password: null,
    expiredPassword: null,
    customIP: null,
    proxyIP: null,
    proxyPort: null,
    proxyUsername: null,
    proxyPassword: null,
    proxyScope: 'None',
    bet: 0,
    refresh: 0,
    autoLogin: 0,
    lockURL: 0,
    cookie: null,
    host: null,
    socketUrl: null,
    statusLogin: 0,
    ...data
  })

  const listPlatform = Platform.findAll()
  const listAccount = Account.findAll()

  const dataSportsBook = listPlatform.map((sportBook) => {
    const accounts = listAccount.filter((account) => account.idPlatform === sportBook.id)
    return { ...sportBook, accounts }
  })

  mainWindow.webContents.send('DataSportsBook', dataSportsBook)
}
