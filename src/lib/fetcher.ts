/**
 * Generic Fetch Wrapper
 * 
 * Type-safe fetch utility for SWR and direct API calls.
 * Handles error extraction and provides consistent error messaging.
 * 
 * @template T - Expected response data type
 * @param url - API endpoint to fetch
 * @param method - HTTP method (defaults to GET)
 * @returns Parsed JSON response
 * @throws Error with status code and response body on non-2xx responses
 */
export default async function fetcher<T>(url: string, method: string = 'GET'): Promise<T> {
    const res = await fetch(url, {
        method,
        // Content-Type header only needed for requests with body (POST, PUT, PATCH)
        ...(method !== 'GET' && {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    });

    if (!res.ok) {
        // Attempt to extract error message from response body for debugging
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Fetch error [${res.status}] ${url}: ${errorText}`);
    }

    return res.json();
}
