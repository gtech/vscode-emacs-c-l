```bash
pnpm install
```

```bash
vsce package
```

Use the Command Palette -> Extensions: Install from VSIX

then add 
```json
{
    "key": "ctrl+l",
    "command": "emacs-ctrl-l.recenterCursor",
    "when": "editorTextFocus"
},
```
to keybindings.json
