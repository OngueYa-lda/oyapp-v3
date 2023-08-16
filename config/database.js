import { log } from "next-axiom";
import { createClient } from "@astrajs/collections";

function readCollection(astraClient) {
  return name => {
    try {
      return astraClient.namespace(process.env.ASTRA_BD_KEYSPACE)
        .collection(name);
    } catch (err) {
      log.debug("Failed reading an Astra DB collection", {
        err
      });
    }
  };
}

export async function getDb(name) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
  });


  try {
    const collection = readCollection(astraClient)(name);
    return collection;
  } catch (err) {
    log.debug("DB error", {
      err
    });
  }
}
