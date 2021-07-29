import { Client } from "pg";
import { pgDatabase, pgHost, pgPassword, pgPort, pgUser } from "../config";

const client: Client = new Client({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});
client.connect();

export const getAll = async (
  table: string,
  page: number,
  order: string,
  field?: string,
  value?: string
): Promise<any[]> => {
  const where: string = `WHERE ${field} iLIKE ${value}`;
  return client
    .query(
      `
    SELECT * FROM ${table}
    ${!field || !value ? "" : where}
    ORDER BY id ${order}
    LIMIT 24
    OFFSET ${(page - 1) * 24}
    `
    )
    .then((res) => res.rows)
    .catch((e) => {
      throw new Error(e);
    });
};

export const count = async (
  table: string,
  field?: string,
  value?: string
): Promise<number> => {
  const where: string = `WHERE ${field} iLIKE ${value}`;
  return client
    .query(
      `
  SELECT COUNT(*) FROM ${table}
  ${!field || !value ? "" : where}
  `
    )
    .then((res) => res.rows[0].count)
    .catch((e) => {
      throw new Error(e);
    });
};

export const get = async (table: string, id: number): Promise<any> => {
  return client
    .query(`SELECT * FROM ${table} WHERE id = ${id}`)
    .then((res) => res.rows[0])
    .catch((e) => {
      throw new Error(e);
    });
};

export const create = async (
  table: string,
  values: string[]
): Promise<number> => {
  return client
    .query(
      `INSERT INTO ${table}(
    name,
    position,
    nation,
    team
  ) values ($1, $2, $3, $4) RETURNING *`,
      values
    )
    .then((res) => res.rows[0].id)
    .catch((e) => {
      throw new Error(e);
    });
};

export const remove = async (
  table: string,
  id: number
): Promise<number | undefined> => {
  return client
    .query(`DELETE FROM ${table} WHERE id = ${id}`)
    .then((res) => {
      if (res.rowCount === 1) {
        return id;
      }
    })
    .catch((e) => {
      throw new Error(e);
    });
};
