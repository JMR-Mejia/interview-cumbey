import * as Database from "../database/postgres";
import { BasePlayer, Player } from "../interface/player";
import { Search } from "../interface/search";

const table: string = "players";
const fields: string = "name, position, nation, team"

export const getPlayers = async (
  page: number,
  order: string,
  search: Search | undefined
): Promise<Player[]> => {
  let field: undefined | string;
  let value: undefined | string;
  if (search) {
    field = search.field;
    value = search.value;
  }
  const player: Player[] = await Database.getAll(
    table,
    fields,
    page,
    order,
    field,
    value
  );
  return player;
};

export const countPlayers = async (
  search: Search | undefined
): Promise<number> => {
  let field: undefined | string;
  let value: undefined | string;
  if (search) {
    field = search.field;
    value = search.value;
  }
  const count: number = await Database.count(table, field, value);
  return count;
};

export const getPlayer = async (id: number): Promise<Player> => {
  const player: Player = await Database.get(table, id);
  return player;
};

export const createPlayer = async (player: BasePlayer): Promise<number> => {
  const dataPlayer: string[] = [
    player.name,
    player.nation,
    player.position,
    player.team,
  ];
  const idPlayer: number = await Database.create(table, dataPlayer);
  return idPlayer;
};

export const deletePlayer = async (id: number): Promise<number | undefined> => {
  const idPlayer: number | undefined = await Database.remove(table, id);
  return idPlayer;
};
