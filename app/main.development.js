import path from 'path';
import { app, BrowserWindow, Menu, shell } from 'electron';

const PLATFORM = process.platform;

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (PLATFORM !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    icon: path.resolve('resources/icon.png'),
    minWidth: 800,
    minHeight: 600,
    show: false,
    title: 'DevDecks',
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // NOTE: BOTH
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  if (PLATFORM === 'darwin') {
    template = [{
      label: 'DevDecks',
      submenu: [{
        label: 'About DevDecks',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Hide DevDecks',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, {
      label: 'File',
      submenu: [{
        label: 'New',
        accelerator: 'Command+N',
        click() {
          mainWindow.send('newDeck');
        },
      }, {
        label: 'Open',
        accelerator: 'Command+O',
        click() {
          mainWindow.send('openFile');
        },
      }, {
        label: 'Save',
        accelerator: 'Command+S',
        click() {
          mainWindow.send('saveFile');
        }
      }, {
        label: 'Save As...',
        accelerator: 'Shift+Command+S',
        click() {
          mainWindow.send('saveFileAs');
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:',
        click() {
          mainWindow.send('undo');
        },
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:',
        click() {
          mainWindow.send('redo');
        },
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'Slides',
      submenu: [{
        label: 'Add Slide',
        accelerator: 'Command+Plus',
        click() {
          mainWindow.send('addSlide');
        }
      }, {
        label: 'Delete Slide',
        accelerator: 'Command+Backspace',
        click() {
          mainWindow.send('deleteSlide');
        }
      }, {
        type: 'separator'
      }, {
        label: 'Move Current Slide Up',
        accelerator: 'Alt+Up',
        click() {
          mainWindow.send('moveSlideUp');
        }
      }, {
        label: 'Move Current Slide Down',
        accelerator: 'Alt+Down',
        click() {
          mainWindow.send('moveSlideDown');
        }
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.send('toggleFullScreen');
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.send('toggleFullScreen');
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com/Team-CHAD/DevDecks');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&New',
        accelerator: 'Ctrl+N',
        click() {
          mainWindow.send('newDeck');
        }
      }, {
        label: '&Open',
        accelerator: 'Ctrl+O',
        click() {
          mainWindow.send('openFile');
        }
      }, {
        label: '&Save',
        accelerator: 'Ctrl+S',
        click() {
          mainWindow.send('saveFile');
        }
      }, {
        label: 'Save As...',
        accelerator: 'Ctrl+Shift+S',
        click() {
          mainWindow.send('saveFileAs');
        }
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Ctrl+Z',
        click() {
          mainWindow.send('undo');
        },
      }, {
        label: 'Redo',
        accelerator: 'Shift+Ctrl+Z',
        click() {
          mainWindow.send('redo');
        },
      }]
    }, {
      label: 'Slides',
      submenu: [{
        label: 'Add Slide',
        accelerator: 'Ctrl+Plus',
        click() {
          mainWindow.send('addSlide');
        }
      }, {
        label: 'Delete Slide',
        accelerator: 'Ctrl+Shift+Backspace',
        click() {
          mainWindow.send('deleteSlide');
        }
      }, {
        label: 'Move Current Slide Up',
        accelerator: 'Alt+Up',
        click() {
          mainWindow.send('moveSlideUp');
        }
      }, {
        label: 'Move Current Slide Down',
        accelerator: 'Alt+Down',
        click() {
          mainWindow.send('moveSlideDown');
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.webContents.reload();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.send('toggleFullScreen');
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.send('toggleFullScreen');
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com/Team-CHAD/DevDecks');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
