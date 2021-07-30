import { Router, Request, Response } from "express";
import { Player } from "../interface/player";
import { Search } from "../interface/search";
import * as PlayersService from "../services/player";

export const RouterPlayers = Router();

RouterPlayers.get("/", async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const order: string = (req.query.order as string) || "asc";
  let search: Search | undefined;
  if (req.query.search) {
    search = {
      field: "name",
      value: `'%${req.query.search as string}%'`,
    };
  }
  try {
    const players: Player[] = await PlayersService.getPlayers(
      page,
      order.toUpperCase(),
      search
    );
    const countPlayers: number =
      (await PlayersService.countPlayers(search)) || 1;
    res.status(200).json({
      data: {
        message: "Players listed",
        totalPages: Math.ceil(countPlayers / 24),
        Items: players.length,
        totalItems: countPlayers,
        players,
      },
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});
