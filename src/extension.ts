import * as vscode from 'vscode';

let lastCommandTime: number = 0;
let cyclePosition: number = 0;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Emacs Ctrl+L extension is now active!');

    outputChannel = vscode.window.createOutputChannel('emacs-ctrl-l');

    let disposable = vscode.commands.registerCommand('emacs-ctrl-l.recenterCursor', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const currentTime = Date.now();
        if (currentTime - lastCommandTime > 1000) { // Reset if more than 1 second has passed
            cyclePosition = 0;
        }
        lastCommandTime = currentTime;

        const visibleRange = editor.visibleRanges[0];
        const cursorPosition = editor.selection.active;
        const visibleLines = Math.floor(editor.visibleRanges[0].end.line - editor.visibleRanges[0].start.line);

        let revealType: vscode.TextEditorRevealType;
        switch (cyclePosition) {
            case 0: // Center
                revealType = vscode.TextEditorRevealType.InCenter;
                break;
            case 1: // Top
                // outputChannel.show(true);
                // outputChannel.appendLine(`Top positioning: 
                //     cursorLine: ${cursorPosition.line},
                //     visibleRangeStart: ${editor.visibleRanges[0].start.line},
                //     visibleRangeEnd: ${editor.visibleRanges[0].end.line}`
                // );
                editor.revealRange(
                    new vscode.Range(cursorPosition.line, 0, cursorPosition.line + 5, 0),
                    vscode.TextEditorRevealType.AtTop
                );
                cyclePosition++;
                return;
            case 2: // Bottom
                const visibleRanges = editor.visibleRanges[0];
                const visibleLines = visibleRanges.end.line - visibleRanges.start.line;
                const targetLine = Math.max(0, cursorPosition.line - visibleLines - 1);
                editor.revealRange(
                    new vscode.Range(targetLine, 0, cursorPosition.line, 0),
                    vscode.TextEditorRevealType.Default
                );
                cyclePosition = -1;
                return;
            default:
                revealType = vscode.TextEditorRevealType.InCenter;
        }

        editor.revealRange(
            new vscode.Range(cursorPosition, cursorPosition),
            revealType
        );
        cyclePosition++;
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}