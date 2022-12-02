import { join } from "https://deno.land/std/path/mod.ts";
import { dirname } from "https://deno.land/std@0.166.0/path/mod.ts";
import { writableStreamFromWriter } from "https://deno.land/std@0.166.0/streams/mod.ts";
import { SOLUTIONS_PATH } from "./load.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

const BASE_URL = "https://adventofcode.com";

const YEAR = 2022;

interface DownloadOptions {
  force: boolean;
}

export async function download(
  session: string,
  day: number,
  { force = false }: DownloadOptions,
) {
  const response = await fetch(`${BASE_URL}/${YEAR}/day/${day}/input`, {
    headers: {
      "cookie": `session=${session}`,
    },
    referrer: "https://adventofcode.com/2022/day/2",
  });
  if (!response.ok) {
    throw new Error(
      `cant't download input for day ${day}`,
      new Error(`${response.status} ${response.statusText}`),
    );
  }
  if (!response.body) {
    throw new Error(
      `empty response body for day ${day}`,
      new Error(`${response.status} ${response.statusText}`),
    );
  }
  try {
    const openOptions: Deno.OpenOptions = force
      ? { create: true, write: true, truncate: true }
      : { createNew: true, write: true };
    const file = Deno.openSync(
      join(SOLUTIONS_PATH, `day${day}`, "input.txt"),
      openOptions,
    );
    const writableStream = writableStreamFromWriter(file);
    await response.body.pipeTo(writableStream);
  } catch (error) {
    if (error instanceof Deno.errors.AlreadyExists) {
      throw new Error(
        `input file for day ${day} already exits. Try again using -f option to replace it.`,
        error,
      );
    }
    throw error;
  }
}
