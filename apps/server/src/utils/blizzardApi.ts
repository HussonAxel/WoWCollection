import { Buffer } from "node:buffer"; // Needed for Base64 encoding

// Define types for clarity
interface BlizzardTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // Seconds
  scope?: string;
}

interface CachedToken {
  accessToken: string;
  expiresAt: number; // Store expiry time as a timestamp (milliseconds)
}

// Simple in-memory cache for the token
// For production, consider a more robust cache (e.g., Redis) if scaling
let tokenCache: Record<string, CachedToken> = {}; // Store tokens per region

/**
 * Gets the appropriate Blizzard OAuth token endpoint URL for a given region.
 */
function getTokenEndpoint(region: string): string {
  switch (region.toLowerCase()) {
    case "eu":
      return "https://eu.battle.net/oauth/token";
    case "kr":
      return "https://kr.battle.net/oauth/token";
    case "tw":
      return "https://tw.battle.net/oauth/token";
    case "cn":
      return "https://www.battlenet.com.cn/oauth/token";
    case "us":
    default:
      return "https://us.battle.net/oauth/token";
  }
}

/**
 * Fetches a Blizzard API access token using the Client Credentials flow.
 * Manages a simple in-memory cache to avoid redundant requests.
 *
 * @param region The Blizzard API region (e.g., 'us', 'eu'). Defaults to process.env.BLIZZARD_REGION or 'us'.
 * @returns A valid access token.
 * @throws Error if fetching the token fails or credentials are missing.
 */
export async function getBlizzardAccessToken(
  region: string = process.env.BLIZZARD_REGION || "us",
): Promise<string> {
  const now = Date.now();
  const cached = tokenCache[region];

  // Check cache: return token if valid and not expiring within 60 seconds
  if (cached && cached.expiresAt > now + 60 * 1000) {
    console.log(`Using cached Blizzard token for region: ${region}`);
    return cached.accessToken;
  }

  console.log(`Fetching new Blizzard token for region: ${region}...`);

  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Blizzard API Client ID or Secret not found in environment variables.",
    );
  }

  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");
  const tokenUrl = getTokenEndpoint(region);

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch Blizzard token (${response.status} ${response.statusText}): ${errorBody}`,
      );
    }

    const data = (await response.json()) as BlizzardTokenResponse;

    // Cache the new token with its expiry time
    tokenCache[region] = {
      accessToken: data.access_token,
      // Calculate expiry timestamp (add a small buffer, e.g., subtract 60s)
      expiresAt: now + (data.expires_in - 60) * 1000,
    };

    console.log(`Successfully fetched and cached Blizzard token for region: ${region}`);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Blizzard access token:", error);
    // Clear potentially invalid cache entry on error
    delete tokenCache[region];
    throw error; // Re-throw the error to be handled by the caller
  }
}

// --- You will add functions here later to *use* the token ---
// Example structure:
/*
export async function getWowRealmIndex(region: string = 'us') {
    const token = await getBlizzardAccessToken(region);
    const apiUrl = `https://${region}.api.blizzard.com/data/wow/realm/index`;
    const namespace = `dynamic-${region}`;

    const response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Battlenet-Namespace': namespace
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch WoW Realm Index (${response.status})`);
    }
    return await response.json();
}
*/
