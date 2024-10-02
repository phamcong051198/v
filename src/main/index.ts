import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { createInitAppWindow } from '@/browserWindows/initAppWindow'
import { Platform, Setting, SportsBook } from '@db/model'

function createWindow(): void {
  const loginWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    roundedCorners: false,
    width: 242,
    height: 284,
    show: false,
    autoHideMenuBar: true,
    center: true,
    resizable: false,
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

  ipcMain.on('LoginSuccess', () => {
    loginWindow.close()
    createInitAppWindow()
  })

  ipcMain.on('CloseLoginWindow', () => {
    loginWindow.close()
    app.quit()
  })

  loginWindow.on('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    loginWindow.loadURL('http://localhost:5173/#/login')
  } else {
    loginWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'login' })
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  if (Platform.count() === 0) {
    Platform.insertMany([
      { name: 'P88bet', url: 'https://www.p88.bet/', sportsBook: null },
      { name: 'Viva88bet', url: 'https://www.viva88.bet/', sportsBook: null }
    ])
  }

  if (SportsBook.count() === 0) {
    SportsBook.insertMany([{ name: 'SportsBook1', status: 1 }])
  }

  if (Setting.count() === 0) {
    Setting.create({ profitMin: -0.5, profitMax: 1, gameType: 'Early' })
  }
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
