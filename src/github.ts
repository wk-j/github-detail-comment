import * as vscode from "vscode";
var octonode = require("octonode");

let callback: (err, data, headers) => void;

export class GhUtility {
    static extractRepoUrl(url: string): [string, string] {
        var token = url.split("/");
        var owner = token[3];
        var repo = token[4];
        return [owner, repo];
    }
    static extractIssueUrl(url: string): [string, string, number] {
        var token = url.split("/");
        var owner = token[3];
        var repo = token[4];
        var issue = token[6];
        return [owner, repo, parseInt(issue)];
    }
}

interface GhRepo {
    issue: {
        (issue: any, callback): void;
    }
}

interface GhIssue {
    issue: {
        (path: string, issue: number): any;
    }
}

class GhFactory {
    private client: any;

    constructor(private user, private password) {
        this.client = octonode.client({
            username: user,
            password: password 
        });
    }

    createRepo(owner, repository) {
        return this.client.repo(`${owner}/${repository}`) as GhRepo
    }
    
    createIssue(owner, repository, issue) {
        return this.client.issue(`${owner}/${repository}`, issue) as GhIssue
    }
}

export class Github {
    
    factory: GhFactory;
    
    constructor(private user, private password) {
        this.factory = new GhFactory(user, password);
    }
    
    createIssue(owner, repo, title, body, callback: (success, data) => void) {
        var repository = this.factory.createRepo(owner, repo);
        repository.issue({
            title: title,
            body: body
        }, (err, data, headers) => {
            if(!err) callback(true, "Create issue success");
            else callback(false, err);
        });
    }
    
    createComment(owner, repo, issueId, body: string, callback : (success, data) => void) {
        var issue = this.factory.createIssue(owner, repo, issue);
        issue.createComment({
            body: body
        }, (err, data, headers) => {
            if(!err) callback(true, "Create issue comment success");
            else callback(false, err);
        });
     }
}