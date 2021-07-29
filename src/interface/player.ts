export interface BasePlayer {
  name: string;
  position: string;
  nation: string;
  team: string;
}

export interface Player extends BasePlayer {
  id: number;
}
