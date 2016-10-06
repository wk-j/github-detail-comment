## Github Detail Comment

Create github issue and comment from VS Code.

## Requirement

You must provide following environment variables

- `ghu` : Github user name
- `ghp` : Github password / token

## Install

> ext install github-detial-comment

## Usage

### Create issue

- Write issue in VS Code editor.
- `Command + Shift + P`
- Type `Create issue`
- Paste repository url, press `Enter`

### Create comment

- Write comment in VS Code editor.
- `Command + Shift + P`
- Type `Create issue comment`
- Paste full issue url, press `Enter`


### Comment format

```
||| https://github.com/wk-j/github-detail-comment/issues/1 (issue url)

Enter comment here ...
```

### Issue format (set issue title after ||| at line 2)

```
||| https://github.com/wk-j/github-detail-comment (project url)
||| Please enter issue title here 

Enter issue content here ...
```