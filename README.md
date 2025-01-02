pnpm install
vsce package
Use the Command Palette -> Extensions: Install from VSIX

then add 
```
{
        "key": "ctrl+l",
        "command": "emacs-ctrl-l.recenterCursor",
        "when": "editorTextFocus"
    },
```
to keybindings.json
