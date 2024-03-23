interface StreamGuestInfo {
  guestName: string;
  guestTitle: string;
  streamTitle: string;
}

const { AIRTABLE_API_KEY, AIRTABLE_STREAM_GUEST_BASE_ID } = import.meta.env;

export async function getStreamGuestInfo(streamDate: string) {
  const filterByFormula = encodeURIComponent(
    `AND(DATESTR({Date}) = "${streamDate}")`
  );

  // Generates querystring key value pairs that look like this, Name&fields[]=Guest%20Title&fields[]=Stream%20Title
  const fields = ["Name", "Guest Title", "Stream Title"]
    .map(encodeURIComponent)
    .join("&fields[]=");

  // Uses the Airtable API's filterByFormula (see https://support.airtable.com/docs/how-to-sort-filter-or-retrieve-ordered-records-in-the-api)
  const streamGuestInfoQueryUrl = `https://api.airtable.com/v0/${AIRTABLE_STREAM_GUEST_BASE_ID}/Stream%20Guests?filterByFormula=${filterByFormula}&fields[]=${fields}`;
  const response = await fetch(streamGuestInfoQueryUrl, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  const { records } = await response.json();

  const streamGuestInfo: StreamGuestInfo = {
    guestName: records[0]?.fields.Name,
    guestTitle: records[0]?.fields["Guest Title"],
    streamTitle: records[0]?.fields["Stream Title"],
  };

  return streamGuestInfo;
}