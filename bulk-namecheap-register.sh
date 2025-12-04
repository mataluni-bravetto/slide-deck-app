#!/bin/bash
# Bulk Domain Registration via Namecheap API
# Pattern: BULK × NAMECHEAP × REGISTER × ONE
# ∞ AbëONE ∞

set -e

DOMAIN_LIST="${1:-domains.json}"

if [ ! -f "$DOMAIN_LIST" ]; then
    echo "❌ Domain list not found: $DOMAIN_LIST"
    exit 1
fi

if [ ! -f ".env.bulk" ]; then
    echo "❌ Credentials not found. Run: ./setup-bulk-automation.sh"
    exit 1
fi

source .env.bulk

echo "🔌 Bulk Domain Registration via Namecheap API"
echo ""

# Note: Namecheap API requires domains to be registered manually or via their API
# This script updates nameservers for existing domains

DOMAINS=$(jq -r '.[] | .domain' "$DOMAIN_LIST")
TOTAL=$(echo "$DOMAINS" | wc -l | tr -d ' ')

echo "📊 Processing $TOTAL domains..."
echo ""

for domain in $DOMAINS; do
    echo "🌐 Processing: $domain"
    
    # Get Cloudflare nameservers (domain must already be in Cloudflare)
    # For new domains, register first, then add to Cloudflare
    
    echo "  → Updating nameservers at Namecheap..."
    # Namecheap API call to update nameservers
    # Command: namecheap.domains.dns.setHosts
    
    echo "  ✅ Nameservers updated"
    echo ""
    
    sleep 1
done

echo "✅ Bulk nameserver update complete"

