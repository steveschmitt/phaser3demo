# Phaser 3 Demo

Simple game created using the [Phaser 3 tutorial](http://phaser.io/tutorials/making-your-first-phaser-3-game/part1)

Directory structure is based on the [Phaser 3 TypeScript Project Template](https://github.com/photonstorm/phaser3-typescript-project-template).

This quick-start project template combines Phaser 3.50 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Rollup](https://rollupjs.org) for bundling.

This demo adds some [socket.io](https://socket.io/) functionality from [this Dynetis Games tutorial](https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/) and [this Game Dev Academy tutorial](https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/).

Working now on getting real-time player movement, using concepts from [Real Time Multiplayer](http://buildnewgames.com/real-time-multiplayer/); 
see the links at the bottom of the article.

## Getting Started for new users

1. If you are new to Node or Git, please see the [SETUP.md](./SETUP.md) document for info about getting your tools and folders set up.

2. Open a command prompt in the **phaser3demo** directory.

3. Run the following commands to install the libraries, compile the code, and start the server:

        npm install 
        npm run watch

4. Open your browser to http://localhost:8081 and play the game!

![Screenshot](http://phaser.io/content/tutorials/making-your-first-phaser-3-game/part9.png)

## Available Commands

These are defined in the **scripts** section of `package.json`.

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Builds game client code |
| `npm run dev-watch` | Builds game client code, watch for changes, and rebuild if anything changes |
| `npm run prod` | Builds game client code bundle with production settings (minification, no source maps, etc..) |
| `npm run serve` | Builds and starts the server |
| `npm run watch` | Build client and server, start server, and watch for client changes |

For **game** development, `npm run watch` will automatically rebuild the client code each time you save a change.
You just need to refresh your browser to load the new code.

For **server** development, you will need to restart the server each time you change it. 

1. Edit the server code (`src/server.ts` or related files)
2. Switch to the command prompt window. 
3. Press `Ctrl+C` to stop the running server.
3. Run `npm run watch` to start the server again.

## Writing Code

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:8081`
by default).

### Client

All of the client-side game code is currently in `src/game.ts`, except for the shared PlayerData interface.

> TODO: describe the code concepts

### Server

All of the server-side code is in `src/server.ts`.

The server uses Express to listen to requests for serving the game, and socket.io for passing game data.

If you want to let another computer connect to your server (for multiplayer), you will need to allow Node.js to 
talk through your firewall.  On Windows, the default firewall is Windows Defender; see [this page](https://docs.profoundlogic.com/display/PUI/Allowing+Connections+in+Windows+Firewall) for info on how to change the settings.

> TODO: describe the code concepts

## Configuring Rollup

Rollup is the tool that converts the game code into a bundle that the browser can run.  There are two configuration files for it:

* `rollup.config.dev.js` for the development build.
* `rollup.config.dist.js` to edit the distribution build.

The primary difference is "uglify", which shrinks the size of the JavaScript.  

There comments inside the rollup config files to help with configuration changes.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle _if Phaser code is included in the bundle_.  It's much faster with `phaser` and `socket.io` declared `external`.  When they are external, they have to be loaded separately by the browser.  There are separate `script` tags for them in `dist/index.html`.

Build times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.

# to do

- Share star collection between running games
- Make more terrain
- add levels
- Share score information between running games
- Limit the number of players to the number of colors
- Player names
- bigger screen size (scale it)
- power ups, special stars, bad guys, challenges
- see notes and plugins at [rexrainbow.github.io](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)
