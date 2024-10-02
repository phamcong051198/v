import { BrowserWindow } from 'electron'
import { AccountType } from '@shared/types'
import { Account, Platform } from '@db/model'

export async function handleDeleteAccount(mainWindow: BrowserWindow, account: AccountType) {
  Account.delete({ id: account.id })

  const listPlatform = Platform.findAll()
  const listAccount = Account.findAll()

  const dataSportsBook = listPlatform.map((sportBook) => {
    const accounts = listAccount.filter((account) => account.idPlatform === sportBook.id)
    return { ...sportBook, accounts }
  })

  mainWindow.webContents.send('DataSportsBook', dataSportsBook)
}
