const { app, session, BrowserWindow } = require('electron');
const os = require('os');
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

app
  .whenReady()
  .then(() => {
    return session.defaultSession.loadExtension(
      path.join(
        os.homedir(),
        '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0',
      ),
    );
  })
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
