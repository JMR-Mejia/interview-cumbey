import * as dotenv from "dotenv";

dotenv.config();

export const port: number = parseInt(process.env.PORT as string, 10);
export const pgUser: string | undefined = process.env.PG_USER;
export const pgHost: string | undefined = process.env.PG_HOST;
export const pgPassword: string | undefined = process.env.PG_PASSWORD;
export const pgDatabase: string | undefined = process.env.PG_DATABASE;
export const pgPort: number | undefined = parseInt(
  process.env.PG_PORT as string,
  10
);
