#!/usr/bin/env ts-node

import fetch from "node-fetch";
import { Client } from "pg";

import { pgDatabase, pgHost, pgPassword, pgPort, pgUser } from "../src/config";

const start: number = new Date().getTime();

const client: Client = new Client({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

client.connect();

async function uploadDataToDatabase() {
  let pageEquals: boolean = true;
  let page: number = 0;
  while (pageEquals) {
    const url: string = `https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${page++}`;
    const data: any = await fetch(url)
      .then((res) => res.json())
      .then();
    data.items.forEach(async (item: any) => {
      const player: string[] = [
        item.name,
        item.position,
        item.nation.name,
        item.club.name,
      ];
      await client
        .query(
          `
          INSERT INTO players(
            name,
            position,
            nation,
            team
          ) values ($1, $2, $3, $4) RETURNING *
          `,
          player
        )
        .then((res) => res.rows[0])
        .catch((err) => console.error("\x1b[31m", err));
    });
    pageEquals = page !== data.totalPages;
  }
  const end: number = new Date().getTime();
  console.log("\x1b[33m", (end - start) / 1000 + " segundos");
  console.log("\x1b[32m", "Upload data sucessfull");
  process.exit(0);
}

uploadDataToDatabase();
