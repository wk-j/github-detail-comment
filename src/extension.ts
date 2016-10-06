'use strict';

import * as vscode from 'vscode';
import { Github, GhUtility } from "./github";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "github-detial-comment" is now active!');

    let user = process.env["ghu"];
    let password = process.env["ghp"];
    let github = new Github(user, password);
    
    let getText = () => {
        var editor = vscode.window.activeTextEditor;
        if(!editor) return "";
        return editor.document.getText();
    };

    vscode.commands.registerCommand("extension.createIssue", () => {
        var input = vscode.window.showInputBox({ prompt: "Full repository url"});
        input.then((url) => {
            let content = getText();
            if(!content || !url) {
                vscode.window.showErrorMessage("Please write issue in text editor");
            }else {
                let [owner, repo] = GhUtility.extractRepoUrl(url);
                github.createIssue(owner, repo, "Test Title", content, (ok, data) => {
                    if(ok) vscode.window.showInformationMessage(data);
                    else vscode.window.showErrorMessage(data);
                });
            }
        });
    });

    vscode.commands.registerCommand("extension.createIssueComment", () => {
        var input = vscode.window.showInputBox({prompt: 'Full issue url'})
        input.then((url) => {
            let content = getText(); 
            if(!content || !url) {
                vscode.window.showErrorMessage("Please write comment in text editor");
            }else {
                let [owner, repo, issue] = GhUtility.extractIssueUrl(url)
                github.createComment(owner, repo, issue, content, (ok, data) => {
                    if(ok) vscode.window.showInformationMessage(data);
                    else vscode.window.showErrorMessage(data);
                });
            }
        });
    });
}

export function deactivate() { }