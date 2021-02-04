
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
