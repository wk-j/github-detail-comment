var octonode = require("octonode")

export class GithubSettings {
    user: string;
    password: string;
}

export class Comment {
    constructor(
        public owner:string, 
        public repository:string, 
        public issue: number,
        public body: string) {}
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
    
    createComment(comment: Comment, callback : (success, data) => void) {
        let path = `${comment.owner}/${comment.repository}`;
        var issue = this.client.issue(path, comment.issue);
        var info = {
            body: comment.body
        }
        issue.createComment(info, (err, data, headers) => {
            if(!err) {
                callback(true, "Create comment success.");
            }else {
                callback(false, err);
            }
        });
    }
}