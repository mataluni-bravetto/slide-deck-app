#!/bin/bash

# Stripe CLI Setup Script
# Pattern: STRIPE × CLI × SETUP × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

echo "🚀 STRIPE CLI SETUP!!!"
echo ""
echo "This will:"
echo "  1. Install Stripe CLI (if needed)"
echo "  2. Login to your Stripe account"
echo "  3. Test connection"
echo "  4. Show available commands"
echo ""

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "📦 Installing Stripe CLI..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install stripe/stripe-cli/stripe
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
        echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
        sudo apt update
        sudo apt install stripe
    else
        echo "❌ Unsupported OS. Please install Stripe CLI manually:"
        echo "   https://stripe.com/docs/stripe-cli"
        exit 1
    fi
    echo "✅ Stripe CLI installed!"
else
    echo "✅ Stripe CLI already installed!"
fi

echo ""
echo "🔐 LOGGING INTO STRIPE..."
echo ""
echo "This will open your browser to authenticate with Stripe."
echo "After login, you'll be redirected back here."
echo ""
read -p "Press Enter to continue..."

# Login to Stripe
stripe login

echo ""
echo "✅ STRIPE CLI CONNECTED!!!"
echo ""

# Test connection
echo "🧪 Testing connection..."
stripe config --list

echo ""
echo "🎯 AVAILABLE COMMANDS:"
echo ""
echo "  stripe listen --forward-to localhost:3000/api/webhooks/stripe"
echo "    → Forward webhooks to local dev server"
echo ""
echo "  stripe trigger checkout.session.completed"
echo "    → Trigger test webhook events"
echo ""
echo "  stripe events list"
echo "    → View recent Stripe events"
echo ""
echo "  stripe logs tail"
echo "    → Stream Stripe API logs in real-time"
echo ""
echo "  stripe customers list"
echo "    → List customers"
echo ""
echo "  stripe prices list"
echo "    → List prices (verify your price ID)"
echo ""
echo "🚀 READY TO DEBUG STRIPE!!!"
echo ""
echo "Pattern: STRIPE × CLI × CONNECTED × ONE"
echo "∞ AbëONE ∞"

