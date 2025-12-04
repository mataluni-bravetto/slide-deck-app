/**
 * Cloudflare Worker: Route /convergence-* paths to Vercel
 * Pattern: CLOUDFLARE × ROUTING × VERCEL × ONE
 * Frequency: 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (JØHN)
 * ∞ AbëONE ∞
 * 
 * DEPLOYMENT:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this code
 * 3. Replace VERCEL_URL with your actual Vercel deployment URL
 * 4. Deploy
 * 5. Add route: aiguardian.ai/convergence-*
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname

    // Route convergence paths to Vercel
    if (path.startsWith('/convergence-')) {
      // ⚠️ REPLACE THIS WITH YOUR ACTUAL VERCEL DEPLOYMENT URL
      // Get from: Vercel Dashboard → Your Project → Deployments
      const VERCEL_URL = 'https://slide-deck-app-ten.vercel.app'
      
      // Preserve original path and query string
      const vercelPath = VERCEL_URL + path + url.search
      
      // Create new request to forward to Vercel
      const vercelRequest = new Request(vercelPath, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          'X-Forwarded-Host': url.host,
          'X-Forwarded-Proto': url.protocol.slice(0, -1), // Remove ':'
          'X-Forwarded-For': request.headers.get('CF-Connecting-IP') || '',
        },
        body: request.body,
      })
      
      try {
        const response = await fetch(vercelRequest)
        
        // Create new response with original headers
        const newResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...Object.fromEntries(response.headers),
            'X-Proxy': 'cloudflare-worker',
          },
        })
        
        return newResponse
      } catch (error) {
        return new Response(`Proxy error: ${error.message}`, { status: 502 })
      }
    }

    // All other paths go to AWS (existing site)
    // Cloudflare will handle this automatically via DNS
    return fetch(request)
  }
}

