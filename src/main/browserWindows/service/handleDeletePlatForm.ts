import { Account, Platform, SportsBook } from '@db/model'
import { SportsBookType } from '@shared/types'
import { BrowserWindow } from 'electron'

export async function handleDeletePlatForm(mainWindow: BrowserWindow, id: number) {
  Platform.update({ id }, { sportsBook: null })

  const sportsBookActive = SportsBook.findOne({ status: 1 }) as SportsBookType
  const listPlatform = Platform.findAll({ sportsBook: sportsBookActive.name })
  const listAccount = Account.findAll()

  const dataSportsBook = listPlatform.map((sportBook) => {
    const accounts = listAccount.filter((account) => account.idPlatform === sportBook.id)
    return { ...sportBook, accounts }
  })

  mainWindow.webContents.send('DataSportsBook', dataSportsBook)
}
