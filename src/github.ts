var octonode = require("octonode")

export class GithubSettings {
    user: string;
    password: string;
}

export class Github {
    client: any;
    
    constructor(private settings: GithubSettings) {
        let client = octonode.client({
            username: settings.user,
            password: settings.password
        })        
        this.client = client;
    }
    
    createComment(content) {
        var issue = this.client.issue("wk-j/github-detail-comment",1);
        var comment = {
            body: content
        }
        issue.createComment(comment, (err, data, headers) => {
            console.log(err);
            console.log(data);
            console.log(headers);
        });
    }
}