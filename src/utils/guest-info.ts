import { createClient } from "@libsql/client";

interface StreamGuestInfo {
  guestName: string;
  guestTitle: string;
  streamTitle: string;
}

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = import.meta.env;

export async function getStreamGuestInfo(streamDate: string) {
  const client = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });

  const result = await client.execute({
    sql: `SELECT guest_name, guest_title, title FROM stream_guests
          WHERE on_schedule = 1
            AND DATE(date) = ?
          LIMIT 1`,
    args: [streamDate],
  });

  const row = result.rows[0] as unknown as Record<string, unknown> | undefined;

  const streamGuestInfo: StreamGuestInfo = {
    guestName: row?.guest_name as string,
    guestTitle: row?.guest_title as string,
    streamTitle: row?.title as string,
  };

  return streamGuestInfo;
}