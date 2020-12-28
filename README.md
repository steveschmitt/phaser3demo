# Phaser 3 Demo

Simple game created using the [Phaser 3 tutorial](http://phaser.io/tutorials/making-your-first-phaser-3-game/part1)

Directory structure is based on the [Phaser 3 TypeScript Project Template](https://github.com/photonstorm/phaser3-typescript-project-template).

This quick-start project template combines Phaser 3.50 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Rollup](https://rollupjs.org) for bundling.

This demo adds some socket.io functionality from [this Dynetis Games tutorial](https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/) and [this Game Dev Academy tutorial](https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/).

## Getting Started for new users

> Many of the steps below require use of the **command prompt**.  In Windows, the easiest way to open a command prompt is to open File Explorer in the desired folder, then click on the path in the bar at the top, type `cmd`, and press enter.  Then a window will open with a command prompt:

    C:\Users\Myname>_

Here are the steps to follow if you've never used GitHub or Nodejs before.

1. Install [Node.js](https://nodejs.org).  This is the JavaScript server, and enables the `node` and `npm` commands required later.  When it's installed, you should be open a command prompt and run:

        node --version
        npm --version

2. Install [git](https://git-scm.com/downloads), the source-code management tool.  This will enable you to pull and push code from the shared repository on GitHub.  After you run the install, open a command prompt (CMD), and run the following commands to tell `git` what who you are.:

        git config --global credential.helper wincred
        git config --global user.email "you@example.com"
        git config --global user.name "Github Username"

3. Create a folder/directory for the project.  "Git" or "GitHub" or "Repo" are popular names.  Open a command prompt in the directory, and run

        git clone https://github.com/steveschmitt/phaser3demo.git

    Now you've got a local copy of the code.

4. Run the following commands to install the libraries, compile the code, and start the server:

        npm install
        npm run dev
        node server

5. Open your browser to http://localhost:10001 and play the game!


![Screenshot](http://phaser.io/content/tutorials/making-your-first-phaser-3-game/part9.png)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev` | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Writing Code

You'll need a code editor or IDE with TypeScript and Github support.  We recommend you install [VSCode](https://code.visualstudio.com/).  During installation, check the boxes that say "Open with Code".  That will make it easier to start VSCode in the project directory.  _(You can use a different IDE or code editor (Sublime, Atom, etc.) if you know what you're doing, but we'll be assuming VSCode.)_

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:10001`
by default).

All of the client-side game code is currently in `src/game.ts`.

All of the server-side code is in `server.js`

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

You will find lots of comments inside the rollup config files to help you do this.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle. Times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.
