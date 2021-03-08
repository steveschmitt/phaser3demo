
/** PlayerData is shared between client and server */
export interface PlayerData {
    rotation: number;
    x: number;
    y: number;
    playerId: string;
    color: number;
    name: string;
}

export interface PositionMessage {
    /** position x */
    x: number;
    /** position y */
    y: number;
    /** velocity x */
    vx: number;
    /** velocity y */
    vy: number;
    /** player id and socket id */
    pid?: string;
}
