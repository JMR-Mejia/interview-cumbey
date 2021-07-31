import * as Database from "../database/postgres";
import { Player } from "../interface/player";

const table: string = "players";
const fields: string = "name, position, nation";

export const getDataTeam = async (
  page: number,
  order: string,
  team: string
): Promise<Player[]> => {
  const Players: Player[] = await Database.getAll(
    table,
    fields,
    page,
    order,
    "team",
    team
  );
  return Players;
};

export const countPlayersForTeam = async (team: string): Promise<number> => {
  const count: number = await Database.count(table, "team", team);
  return count;
};
