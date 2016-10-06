'use strict';

import * as vscode from 'vscode';
import { Github, GhUtility } from "./github";

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "github-detial-comment" is now active!');

    let user = process.env["ghu"];
    let password = process.env["ghp"];
    
    if(!user) { 
        vscode.window.showErrorMessage("Not found key 'ghu' in enviroment variables");
        return;
    }
    
    if(!password) {
        vscode.window.showErrorMessage("Not found key 'ghu' in enviroment variables");
        return;
    }

    let github = new Github(user, password);
    
    let getText = () => {
        var editor = vscode.window.activeTextEditor;
        if(!editor) return "";
        return editor.document.getText();
    }

    vscode.commands.registerCommand("extension.createIssue", () => {
        let content = getText();
        var urls = GhUtility.findGithubUrls(content);
        var input = vscode.window.showInputBox({ 
            prompt: "Full repository url", 
            value: urls.length > 0 ? urls[0] : "" ,
            validateInput: (x) => x.startsWith("https://github.com") ? "" : "Invalid repository url"
        });

        input.then((url) => {
            if(!content || !url) {
                vscode.window.showErrorMessage("Please write issue in text editor");
            }else {
                let [owner, repo] = GhUtility.extractRepoUrl(url);
                let title = GhUtility.findTitle(content);
                let clean = GhUtility.cleanText(content);
                github.createIssue(owner, repo, title, clean, (ok, data) => {
                    if(ok) vscode.window.showInformationMessage(data);
                    else vscode.window.showErrorMessage(data);
                });
            }
        });
    });

    vscode.commands.registerCommand("extension.createIssueComment", () => {
        let content = getText(); 
        var urls = GhUtility.findGithubUrls(content);
        var input = vscode.window.showInputBox({
            prompt: 'Full issue url', 
            value: urls.length > 0 ? urls[0] : "" ,
            validateInput: (x) => x.startsWith("https://github.com") ? "" : "Invalid issue url"
        });
        input.then((url) => {
            if(!content || !url) {
                vscode.window.showErrorMessage("Please write comment in text editor");
            }else {
                let [owner, repo, issue] = GhUtility.extractIssueUrl(url);
                let clean = GhUtility.cleanText(content);
                github.createComment(owner, repo, issue, clean, (ok, data) => {
                    if(ok) vscode.window.showInformationMessage(data);
                    else vscode.window.showErrorMessage(data);
                });
            }
        });
    });
}

export function deactivate() { }