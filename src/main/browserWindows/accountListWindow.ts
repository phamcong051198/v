import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { PlatformType } from '@shared/types'

export function createAccountListWindow(parent: BrowserWindow, sportBook: PlatformType) {
  const accountListWindow = new BrowserWindow({
    parent,
    modal: true,
    width: 1354,
    height: 542,
    show: true,
    resizable: false,
    autoHideMenuBar: true,
    center: true,
    title: `${sportBook.name} AccountInstance List`,
    vibrancy: 'under-window',
    alwaysOnTop: true,
    visualEffectState: 'active',
    trafficLightPosition: { x: 15, y: 10 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    accountListWindow.loadURL('http://localhost:5173/#/accountList')
  } else {
    accountListWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'accountList' })
  }

  return accountListWindow
}
