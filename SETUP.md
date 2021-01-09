# Setup

## Setting up GitHub, Node, and VSCode

These are the prerequisites for getting up and going on JavaScript/TypeScript projects that are hosted on GitHub.

We'll go through the steps to install and configure:

1. Node
2. Git
3. VSCode _(Yes, you can use another editor -- Sublime, Atom, etc. -- but then you're on your own.)_

### Command Prompt

Many of the steps below require use of the **command prompt**.  In Windows, there are two easy ways to open a command prompt:

1. Press the Windows key, then type `cmd` and press `enter`.

2. Open File Explorer in the desired folder, then click on the address bar, type `cmd`, and press enter.

Then a window will open with a command prompt:

    C:\Users\Myname>_

### Install Node

Download and install [Node.js](https://nodejs.org).  Nodejs is the JavaScript server, and enables the `node` and `npm` commands.  

After it's installed, you should be open a command prompt and run:

    node --version
    npm --version

### Install VSCode

Download and install [VSCode](https://code.visualstudio.com/).

During installation, when you reach the "Select Additional Tasks" dialog, check **all** the boxes:

- Add "Open with Code" to file context menu
- Add "Open with Code" to directory context menu
- Register Code as an editor for supported file types
- Add to PATH

These settings will make it easier to start VSCode when needed.

You can see [this YouTube video](https://www.youtube.com/watch?v=MlIzFUI1QGA) if you want step-by-step instructions.

After it's installed, you should be open a command prompt and run:

    code

and VSCode will open.

### Install Git

Download and install [git](https://git-scm.com/downloads), the source-code management tool.  This will enable you to pull and push code from the shared repository on GitHub.  

During installation, there will be many options for you to check.  You can just use the defaults (whatever is already checked).  You can see [this blog post](https://phoenixnap.com/kb/how-to-install-git-windows) for step-by-step instructions.

After it's installed, you should be open a command prompt and run:

    git --version

### Configure Git

After you run the install, open a command prompt, and run the following commands to tell `git` who you are.  Use your actual Github username and email address.

    git config --global user.name "Github Username"
    git config --global user.email "you@example.com"

Then run the script `configit.cmd` to configure Git to use VSCode.  The [script](./configit.cmd) is included in this folder, so if you've downloaded this already, you can just double-click it.  Otherwise, can just copy the following lines, open a command prompt, and past the lines into it:

    git config --global credential.helper wincred
    git config --global core.editor "code --wait --new-window"
    git config --global diff.tool vscode
    git config --global difftool.vscode.cmd "code --wait --new-window --diff $LOCAL $REMOTE"
    git config --global merge.tool vscode
    git config --global mergetool.vscode.cmd "code --wait --new-window $MERGED"

### Create a Root Directory

You'll need a top-level folder in which to keep your projects.  "Git" or "GitHub" or "Repo" are popular names.  Let's go with "git".  Open a command prompt and create the directory:

    mkdir \git

### Clone the Repository

Now, you can make a **clone** of the GitHub repository.  A clone is a local copy, but it has a reference to its "origin" on GitHub.

First, you'll need the **.git** URL for the repo.  You can find it by going to the main page for the repo, such as https://github.com/steveschmitt/phaser3demo,
and clicking on the green "Code" button.  That will show the .git URL.  Copy that URL.

Open a command prompt and run:

    cd \git
    git clone https://github.com/steveschmitt/phaser3demo.git

_(but use the URL you copied above)_.

Now you've got your own local repo.  Git will create a folder for the repo, so for this example you would now have folder **C:\git\phaser3demo**.

### Editing code in the repository

Start VSCode in the folder created above.  You can do this two ways:

1. Open the folder in File Explorer.  Right-click in the folder and choose "Open with Code".
2. Open a command prompt in the folder.  Then run command `code .`.

VSCode should open, with the list of files in the left-hand pane.  You are ready to start editing!

See [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-git-integration-in-visual-studio-code) about how to use **git** from within VSCode.
