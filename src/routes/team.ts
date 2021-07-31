import { Router, Request, Response } from "express";
import { Player } from "../interface/player";
import * as TeamsService from "../services/team";

export const RouterTeams = Router();

RouterTeams.get("/", async (req: Request, res: Response) => {
  const team: string | undefined = req.body.name;
  if (!team) {
    res.status(400).json({ error: { message: "Bad Request" } });
    return;
  }
  const page: number = parseInt(req.body.page as string, 10) || 1;
  const order: string = req.body.order || "asc";
  try {
    const playersTeam: Player[] = await TeamsService.getDataTeam(
      page,
      order,
      `'%${team}%'`
    );
    const countPlayersTeam: number = await TeamsService.countPlayersForTeam(
      `'%${team}%'`
    );

    res.status(200).json({
      data: {
        message: `Listed Players of ${team}`,
        page,
        totalPages: Math.ceil(countPlayersTeam / 24),
        items: playersTeam.length,
        TotalItems: countPlayersTeam,
        playersTeam,
      },
    });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: { message: error.message } });
  }
});
