
/** PlayerData is shared between client and server */
export interface PlayerData {
    rotation: number;
    x: number;
    y: number;
    playerId: string;
    team: "red" | "blue";
}

export interface TestMessage {
    name: string;
    weight: number;
}

export interface PositionMessage {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    playerId?: string;
}