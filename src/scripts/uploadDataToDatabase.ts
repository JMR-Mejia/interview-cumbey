#!/usr/bin/env ts-node

import fetch from "node-fetch";
import * as Database from "../database/postgres";

const start: number = new Date().getTime();

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
      await Database.create("players", player).catch((err) =>
        console.error("\x1b[31m", err)
      );
    });
    pageEquals = page !== data.totalPages;
  }
  const end: number = new Date().getTime();
  console.log("\x1b[33m", (end - start) / 1000 + " segundos");
  console.log("\x1b[32m", "Upload data sucessfull");
  process.exit(0);
}

uploadDataToDatabase();
