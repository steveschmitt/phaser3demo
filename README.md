# Phaser 3 Demo

Simple game created using the [Phaser 3 tutorial](http://phaser.io/tutorials/making-your-first-phaser-3-game/part1)

Directory structure is based on the [Phaser 3 TypeScript Project Template](https://github.com/photonstorm/phaser3-typescript-project-template).

This quick-start project template combines Phaser 3.50 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Rollup](https://rollupjs.org) for bundling.

This demo adds some socket.io functionality from [this Dynetis Games tutorial](https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/) and [this Game Dev Academy tutorial](https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/).

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev` | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run watch`. The first time you run this you should see the following demo run:

![Screenshot](http://phaser.io/content/tutorials/making-your-first-phaser-3-game/part9.png)

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:10001`
by default).

All of the user code is currently in `src/game.ts`.

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

You will find lots of comments inside the rollup config files to help you do this.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle. Times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.
