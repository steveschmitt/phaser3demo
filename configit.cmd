:: configure git to use VSCode as an editor
git config --global credential.helper wincred
git config --global core.editor "code --wait --new-window"
git config --global diff.tool vscode
git config --global difftool.vscode.cmd "code --wait --new-window --diff $LOCAL $REMOTE"
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd "code --wait --new-window $MERGED"

