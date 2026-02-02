/**
 * Spotify Refresh Token Generator
 * 
 * Run this with: npx ts-node scripts/get-spotify-token.ts
 * Or: node scripts/get-spotify-token.js (after compiling)
 * 
 * This will give you instructions to get your refresh token.
 * 
 * IMPORTANT: Make sure you have these environment variables set in .env.local:
 * - SPOTIFY_CLIENT_ID
 * - SPOTIFY_CLIENT_SECRET
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '<YOUR_CLIENT_ID>';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '<YOUR_CLIENT_SECRET>';
const REDIRECT_URI = 'http://localhost:3000/api/spotify-callback';
const SCOPES = 'user-read-currently-playing user-read-playback-state user-top-read';

console.log(`
================================================================================
🎵 SPOTIFY REFRESH TOKEN SETUP
================================================================================

Follow these steps to get your Spotify Refresh Token:

1. First, make sure your Spotify App has the correct Redirect URI:
   - Go to https://developer.spotify.com/dashboard
   - Click on your app
   - Click "Edit Settings"
   - Add this Redirect URI: ${REDIRECT_URI}
   - Click "Save"

2. Set your environment variables in .env.local:
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here

3. Open this URL in your browser (replace <YOUR_CLIENT_ID> if needed):

https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}

4. After authorizing, you'll be redirected to a URL like:
   http://localhost:3000/api/spotify-callback?code=XXXXXXX

5. Copy the "code" value from the URL (everything after ?code=)

6. Run this command in your terminal (replace placeholders with your values):

   curl -X POST https://accounts.spotify.com/api/token \\
     -H "Content-Type: application/x-www-form-urlencoded" \\
     -d "grant_type=authorization_code" \\
     -d "code=CODE_HERE" \\
     -d "redirect_uri=${REDIRECT_URI}" \\
     -d "client_id=${CLIENT_ID}" \\
     -d "client_secret=${CLIENT_SECRET}"

7. The response will contain a "refresh_token" - copy that value

8. Put it in your .env.local file:
   SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token_here

9. Restart your dev server (npm run dev)

================================================================================
`);
