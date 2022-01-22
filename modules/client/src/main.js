const { app, BrowserWindow } = require('electron');
const __dev__ = require('electron-is-dev');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(
    __dev__
      ? 'http://localhost:3000'
      : `file://${path.join(process.cwd(), 'build', 'index.html')}`,
  );
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
