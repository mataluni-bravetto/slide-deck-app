#!/bin/bash
# Add root A record for aiguardian.ai
# Pattern: DNS × ADD × ROOT × ONE
# ∞ AbëONE ∞

AWS_IP="172.67.210.252"  # From www.aiguardian.ai

echo "🔧 Adding root A record for aiguardian.ai"
echo "IP: $AWS_IP"
echo ""
echo "⚠️  Manual step required:"
echo "1. Go to: https://dash.cloudflare.com → aiguardian.ai → DNS → Records"
echo "2. Add A record:"
echo "   Type: A"
echo "   Name: @"
echo "   IPv4: $AWS_IP"
echo "   Proxy: Proxied (orange cloud) ✅"
echo "   TTL: Auto"
echo "3. Save"
echo ""
echo "After adding, test: curl -I https://aiguardian.ai/convergence-slides"
