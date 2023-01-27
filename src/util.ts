import * as PIXI from "pixi.js";

export enum SuitName {
    clubs, hearts, spades, diamonds
}

export enum Rank {
    ace, _2, _3, _4, _5, _6, _7, _8, _9, _10, jack, queen, king
}

export function getSuit(sheet: PIXI.BaseTexture, name: SuitName): Array<PIXI.Container> {
    const result = new Array<PIXI.Container>();

    for (let i = 0; i < 13; i++) {
        const container = new PIXI.Container();
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawRoundedRect(0, 0, 404, 618, 34);
        mask.endFill();

        const border = new PIXI.Graphics();
        border.lineStyle({ width: 4, color: 0x000000 });
        border.drawRoundedRect(-2, -2, 408, 622, 34);

        const cardTexture = new PIXI.Texture(sheet, new PIXI.Rectangle(50 + (i * 458), 850 + (name * 660), 404, 618));
        const card = PIXI.Sprite.from(cardTexture);
        card.mask = mask;

        container.addChild(card, mask, border);
        // container.pivot.set(204, 311)
        container.scale.set(0.3)

        result.push(container);
    }

    return result;
}
