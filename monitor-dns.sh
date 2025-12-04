#!/bin/bash
# DNS Propagation Monitor
# Pattern: DNS × MONITOR × PROPAGATION × ONE
# ∞ AbëONE ∞

DOMAIN="aiguardian.ai"
ROUTE="https://aiguardian.ai/convergence-slides"
CHECK_INTERVAL=30  # Check every 30 seconds
MAX_CHECKS=20       # Check for up to 10 minutes (20 * 30s)

echo "🔍 DNS PROPAGATION MONITOR"
echo "Domain: $DOMAIN"
echo "Checking every $CHECK_INTERVAL seconds..."
echo ""

check_count=0

while [ $check_count -lt $MAX_CHECKS ]; do
    check_count=$((check_count + 1))
    
    echo "[Check $check_count/$MAX_CHECKS] $(date '+%H:%M:%S')"
    
    # Check DNS resolution
    DNS_RESULT=$(dig $DOMAIN A +short 2>&1 | head -1)
    
    if [ -n "$DNS_RESULT" ] && [ "$DNS_RESULT" != "" ]; then
        echo "✅✅✅ DNS PROPAGATED!!! ✅✅✅"
        echo "IP Address: $DNS_RESULT"
        echo ""
        
        # Test route
        echo "🧪 Testing route..."
        HTTP_RESULT=$(curl -I "$ROUTE" 2>&1 | head -1)
        
        if echo "$HTTP_RESULT" | grep -q "HTTP"; then
            echo "✅✅✅ ROUTE WORKING!!! ✅✅✅"
            echo "Response: $HTTP_RESULT"
            echo ""
            echo "🎉🎉🎉 DEPLOYMENT LIVE!!! 🎉🎉🎉"
            echo ""
            echo "✅ Production URLs:"
            echo "   - $ROUTE"
            echo "   - https://aiguardian.ai/convergence-purchase"
            echo "   - https://aiguardian.ai/convergence-purchase/success"
            echo ""
            exit 0
        else
            echo "⚠️  DNS resolved but route not responding yet"
            echo "Response: $HTTP_RESULT"
        fi
    else
        echo "⏳ DNS not propagated yet..."
    fi
    
    echo ""
    
    if [ $check_count -lt $MAX_CHECKS ]; then
        sleep $CHECK_INTERVAL
    fi
done

echo "⏱️  Monitoring complete. DNS may still be propagating."
echo "Continue checking manually:"
echo "  dig $DOMAIN A +short"
echo "  curl -I $ROUTE"

