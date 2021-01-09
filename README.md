# Phaser 3 Demo

Simple game created using the [Phaser 3 tutorial](http://phaser.io/tutorials/making-your-first-phaser-3-game/part1)

Directory structure is based on the [Phaser 3 TypeScript Project Template](https://github.com/photonstorm/phaser3-typescript-project-template).

This quick-start project template combines Phaser 3.50 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Rollup](https://rollupjs.org) for bundling.

This demo adds some socket.io functionality from [this Dynetis Games tutorial](https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/) and [this Game Dev Academy tutorial](https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/).

## Getting Started for new users

1. See the [INTRO.md](./INTRO.md) document for info about getting your tools and folders set up.

2. Open a command prompt in the **phaser3demo** directory.

3. Run the following commands to install the libraries, compile the code, and start the server:

    npm install
    npm run dev
    node server

4. Open your browser to http://localhost:10001 and play the game!

![Screenshot](http://phaser.io/content/tutorials/making-your-first-phaser-3-game/part9.png)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev` | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Writing Code

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
