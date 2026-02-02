/**
 * Spotify OAuth Callback Handler
 * This helps you get the authorization code needed for the refresh token
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    const error = request.nextUrl.searchParams.get('error');

    if (error) {
        return new NextResponse(`
            <html>
                <body style="font-family: system-ui; padding: 40px; background: #1a1a1a; color: white;">
                    <h1 style="color: #ef4444;">❌ Authorization Failed</h1>
                    <p>Error: ${error}</p>
                    <p>Please try again.</p>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (!code) {
        return new NextResponse(`
            <html>
                <body style="font-family: system-ui; padding: 40px; background: #1a1a1a; color: white;">
                    <h1 style="color: #ef4444;">❌ No Code Received</h1>
                    <p>No authorization code was received from Spotify.</p>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Exchange code for tokens
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REDIRECT_URI = 'http://127.0.0.1:3000/api/spotify-callback';

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return new NextResponse(`
                <html>
                    <body style="font-family: system-ui; padding: 40px; background: #1a1a1a; color: white;">
                        <h1 style="color: #ef4444;">❌ Token Exchange Failed</h1>
                        <p>Error: ${data.error}</p>
                        <p>${data.error_description || ''}</p>
                    </body>
                </html>
            `, { headers: { 'Content-Type': 'text/html' } });
        }

        return new NextResponse(`
            <html>
                <body style="font-family: system-ui; padding: 40px; background: #1a1a1a; color: white; max-width: 800px;">
                    <h1 style="color: #33E092;">✅ Success! Here's your Refresh Token</h1>
                    <p>Copy this value and add it to your <code>.env.local</code> file:</p>
                    <div style="background: #0a0a0a; padding: 20px; border-radius: 8px; margin: 20px 0; word-break: break-all; border: 1px solid #333;">
                        <code style="color: #33E092; font-size: 14px;">${data.refresh_token}</code>
                    </div>
                    <p>Set it like this:</p>
                    <pre style="background: #0a0a0a; padding: 15px; border-radius: 8px; border: 1px solid #333;">
SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
                    <p style="margin-top: 20px; color: #888;">Then restart your dev server.</p>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    } catch (err) {
        return new NextResponse(`
            <html>
                <body style="font-family: system-ui; padding: 40px; background: #1a1a1a; color: white;">
                    <h1 style="color: #ef4444;">❌ Error</h1>
                    <p>${err}</p>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    }
}
