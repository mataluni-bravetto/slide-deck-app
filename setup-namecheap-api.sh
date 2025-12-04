#!/bin/bash
# Namecheap API Setup Script
# Pattern: NAMECHEAP × API × SETUP × ONE
# ∞ AbëONE ∞

echo "🔌 Namecheap API Setup"
echo ""
echo "⚠️  NOTE: Namecheap API is NOT needed for DNS management"
echo "   (DNS is managed via Cloudflare)"
echo ""
echo "Namecheap API is useful for:"
echo "  - Domain registration/renewal automation"
echo "  - Nameserver updates (if not using Cloudflare)"
echo "  - Bulk domain management"
echo ""
read -p "Do you want to set up Namecheap API? (y/n): " SETUP_API

if [ "$SETUP_API" != "y" ]; then
    echo "✅ Skipping Namecheap API setup (not needed for current use case)"
    exit 0
fi

echo ""
echo "📋 SETUP STEPS:"
echo ""
echo "1. Enable API in Namecheap:"
echo "   - Go to: https://www.namecheap.com/myaccount/profile/"
echo "   - Tools → Business & Dev Tools → Namecheap API Access"
echo "   - Toggle ON → Agree to Terms → Enter password"
echo ""
echo "2. Get Credentials:"
echo "   - API Key: Provided after enabling"
echo "   - API Username: Your Namecheap account username"
echo ""
echo "3. Whitelist IP:"
echo "   - Edit 'Whitelisted IPs'"
echo "   - Add your server IP: $(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_IP')"
echo ""
echo "4. Test API:"
echo "   - Base URL: https://api.namecheap.com/xml.response"
echo "   - Authentication: APIUser + APIKey + IP whitelist"
echo ""
echo "📚 Documentation:"
echo "   https://www.namecheap.com/support/api/methods/"
echo ""

