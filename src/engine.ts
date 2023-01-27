import { Connection } from "./Connection";
import * as PIXI from "pixi.js";
import { getSuit, Rank, SuitName } from "./util";

const app = new PIXI.Application({
    width: 1200,
    height: 720,
    backgroundColor: 0x888888
});

const loadBar = new PIXI.Graphics();
loadBar.lineStyle({ width: 3, color: 0x000000 });
loadBar.drawRect(0, 0, 400, 50);
loadBar.position.set(400, 370);
app.stage.addChild(loadBar);


const actionSection = document.getElementById('action');
const boardSection = document.getElementById('board');

export function engine(connection: Connection) {
    const state = {};

    actionSection.innerHTML = '';
    boardSection.innerHTML = '';

    boardSection.appendChild(app.view as HTMLCanvasElement);
    app.ticker.add(update);
    loadGame()
        .then((assets) => {
            startGame(connection, assets)
        })

    connection.on('state', onState);

    function onState(state) {
        console.log('received state', state);
    }
}

let elapsed = 0;
function update(dt) {
    elapsed += dt;
    loadBar.beginFill(0x000000);
    loadBar.drawRect(0, 0, Math.min(50 + (elapsed * 10), 400), 50);
}

async function loadGame() {
    //todo load background and card back
    let spreadsheet = await PIXI.Assets.load<PIXI.BaseTexture>('assets/deck.jpg');
    const clubs = getSuit(spreadsheet, SuitName.clubs);
    const hearts = getSuit(spreadsheet, SuitName.hearts);
    const spades = getSuit(spreadsheet, SuitName.spades);
    const diamonds = getSuit(spreadsheet, SuitName.diamonds);

    app.stage.removeChild(loadBar);

    return [clubs, hearts, spades, diamonds];
}

function startGame(connection: Connection, [clubs, hearts, spades, diamonds]: PIXI.Container[][]) {
    clubs[Rank.ace].position.set(10, 10);
    clubs[Rank._2].position.set(250, 10);
    app.stage.addChild(clubs[Rank.ace], clubs[Rank._2]);

    hearts[Rank.ace].position.set(10, 100);
    hearts[Rank._2].position.set(250, 100);
    app.stage.addChild(hearts[Rank.ace], hearts[Rank._2]);

}
