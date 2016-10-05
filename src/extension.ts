'use strict';

import * as vscode from 'vscode';
import { Github, GithubSettings, Comment } from "./github";

let settings = new GithubSettings();
settings.user = process.env["ghu"];
settings.password = process.env["ghp"];

let issues = [];

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "github-detial-comment" is now active!');

    let content = vscode.commands.registerCommand("extension.githubDetailComment", () => {

        let editor = vscode.window.activeTextEditor;
        
        if(!settings.user) {
            vscode.window.showErrorMessage("Not found environment variable 'ghu' (github user name)");
            return;
        }
        
        if(!settings.password) {
            vscode.window.showErrorMessage("Not found enviroment variable 'ghp' (github password/token)");
            return;
        }

        if(!editor) return;

        //let quickPick = vscode.window.showQuickPick(issues, { matchOnDescription: true, placeHolder: "Full issue url" });
        var input = vscode.window.showInputBox({prompt: 'Full issue url'})
        input.then((value) => {
            let content = editor.document.getText();
            if(!content || !value) {
                vscode.window.showInputBox()
                vscode.window.showErrorMessage("Please write comment in text editor");
            }else {
                createComment(value, content);
            }
        });
    });
    context.subscriptions.push(content);
}

function createComment(issuePath:string, content) {
    let github = new Github(settings);
    let token = issuePath.split("/");
    if (token.length != 7) return;
    
    let owner = token[3];
    let repo = token[4];
    let issue = parseInt(token[6]);
    let comment = new Comment(owner, repo,issue, content);
    
    if(!issues.find(x => x.label == issuePath)) {
        var item = {
            label: issuePath,
            description: issuePath
        }
        issues.push(item);
    }

    github.createComment(comment, (success, data) => {
        if(success) {
            vscode.window.showInformationMessage(data);
        }else {
            vscode.window.showErrorMessage(data);
        }
    });
}

export function deactivate() { }