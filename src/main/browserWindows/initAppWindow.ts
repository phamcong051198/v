import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { createMainWindow } from '@/browserWindows/mainWindow'

export function createInitAppWindow() {
  const initAppWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    roundedCorners: false,
    width: 380,
    height: 180,
    show: true,
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

  ipcMain.on('InitAppSuccess', () => {
    initAppWindow.close()
    createMainWindow()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    initAppWindow.loadURL('http://localhost:5173/#/initApp')
  } else {
    initAppWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'initApp' })
  }
  return initAppWindow
}
