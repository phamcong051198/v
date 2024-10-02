import { join } from 'path'
import { Account, Platform, Setting, SportsBook } from '@db/model'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { app, BrowserWindow, ipcMain } from 'electron'
import { createSettingWindow } from '@/browserWindows/settingWindow'
import { createListSportsBook } from '@/browserWindows/addSportsBook'
import { createAccountPairWindow } from '@/browserWindows/accountPairWindow'
import { createAccountListWindow } from '@/browserWindows/accountListWindow'
import { PlatformType, SportsBookType } from '@shared/types'
import { handleAddAccountPlatForm } from '@/browserWindows/service/handleAddAccountPlatForm'
import { handleDeleteAccount } from '@/browserWindows/service/handleDeleteAccount'
import { handleDeletePlatForm } from '@/browserWindows/service/handleDeletePlatForm'
import { handleUpdateDataListAccount } from '@/browserWindows/service/handleUpdateDataListAccount'
import { handleGetDataSportsBook } from '@/browserWindows/service/handleGetDataSportsBook'

export async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1142,
    height: 764,
    show: true,
    autoHideMenuBar: true,
    center: true,
    title: 'B-Soft',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    trafficLightPosition: { x: 15, y: 10 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  //************************************** SettingWindow *********************************************** */

  let settingWindow: BrowserWindow

  ipcMain.on('showSettingWindow', () => {
    settingWindow = createSettingWindow(mainWindow)
  })

  ipcMain.on('closeSettingWindow', () => {
    settingWindow.close()
  })

  ipcMain.handle('GetDataSetting', () => {
    return Setting.findAll()
  })

  ipcMain.on('SaveSettingWindow', (_, data) => {
    Setting.update({ id: 1 }, data)
    settingWindow.close()
  })

  //************************************************************************************* */

  //************************************** ListPlatformBookWindow *********************************************** */

  ipcMain.on('ShowListPlatform', () => {
    createListSportsBook(mainWindow)
  })

  ipcMain.handle('GetListPlatform', async () => {
    return Platform.findAll()
  })

  ipcMain.on('AddPlatForm', (_, platform: PlatformType) => {
    const sportsBookActive = SportsBook.findOne({ status: 1 }) as SportsBookType
    Platform.update({ id: platform.id }, { sportsBook: sportsBookActive.name })

    const dataSportsBook = handleGetDataSportsBook()
    mainWindow.webContents.send('DataSportsBook', dataSportsBook)
  })

  //************************************************************************************* */

  //************************************** AccountListWindow *********************************************** */
  let accountListWindow: BrowserWindow
  let platform: PlatformType

  ipcMain.on('ShowAccountList', (_, data) => {
    platform = data
    accountListWindow = createAccountListWindow(mainWindow, data)
  })

  ipcMain.handle('GetListAccountByPlatform', async () => {
    return Account.findAll({ idPlatform: platform.id })
  })

  ipcMain.on('SaveAccountListWindow', async (_, data) => {
    if (accountListWindow) {
      accountListWindow.close()
    }

    if (!data || !data.length) {
      return
    }
    handleUpdateDataListAccount(data)

    const dataSportsBook = handleGetDataSportsBook()
    mainWindow.webContents.send('DataSportsBook', dataSportsBook)
  })

  //************************************************************************************* */

  //************************************** AccountPairWindow *********************************************** */
  let accountPairWindow: BrowserWindow

  ipcMain.on('showAccountPairWindow', () => {
    accountPairWindow = createAccountPairWindow(mainWindow)
  })

  ipcMain.on('CloseAccountPairWindow', async () => {
    accountPairWindow.close()
  })

  //************************************************************************************* */

  //************************************** mainWindow *********************************************** */

  ipcMain.handle('GetListSportBook', () => {
    return SportsBook.findAll()
  })

  ipcMain.on('SelectSportsBook', (_, id) => {
    SportsBook.update({}, { status: 0 })
    SportsBook.update({ id }, { status: 1 })
  })

  ipcMain.handle('GetDataSportsBook', async () => {
    const sportsBookActive = SportsBook.findOne({ status: 1 }) as SportsBookType
    const listPlatform = Platform.findAll({ sportsBook: sportsBookActive.name })
    const listAccount = Account.findAll()

    const dataSportsBook = listPlatform.map((sportBook) => {
      const accounts = listAccount.filter((account) => account.idPlatform === sportBook.id)
      return { ...sportBook, accounts }
    })
    return dataSportsBook
  })

  ipcMain.on('AddAccountPlatForm', async (_, data) => {
    await handleAddAccountPlatForm(mainWindow, data)
  })

  ipcMain.on('DeleteAccount', async (_, account) => {
    await handleDeleteAccount(mainWindow, account)
  })

  ipcMain.on('RemovePlatform', async (_, id) => {
    await handleDeletePlatForm(mainWindow, id)
  })

  //************************************************************************************* */

  mainWindow.on('close', () => {
    app.quit()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL('http://localhost:5173/#/main')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'main' })
  }

  return mainWindow
}
