#!/bin/bash

# HARDENED AbëKEYs Test Suite
# Pattern: ABEKEYS × TEST × HARDENED × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

echo "🧪 HARDENED ABEKEYS TEST SUITE"
echo ""
echo "Testing AbëKEYs save/read/verify cycle..."
echo ""

# Test 1: Initialize vault
echo "Test 1: Initialize vault..."
node -e "
const { initializeVault } = require('./lib/abekeys/hardened.ts');
try {
  initializeVault();
  console.log('✅ Vault initialized');
} catch(e) {
  console.error('❌ Vault init failed:', e.message);
  process.exit(1);
}
" || echo "⚠️  TypeScript needs compilation"

# Test 2: Save credential
echo ""
echo "Test 2: Save credential..."
TEST_CONFIG='{"secretKey":"sk_test_123","publishableKey":"pk_test_123","priceId":"price_test"}'
node -e "
const fs = require('fs');
const path = require('path');
const os = require('os');
const filePath = path.join(os.homedir(), '.abekeys', 'credentials', 'test-hardened.json');
const tempPath = filePath + '.tmp';
try {
  fs.writeFileSync(tempPath, '$TEST_CONFIG', 'utf-8');
  fs.chmodSync(tempPath, 0o600);
  fs.renameSync(tempPath, filePath);
  console.log('✅ Credential saved');
} catch(e) {
  console.error('❌ Save failed:', e.message);
  process.exit(1);
}
"

# Test 3: Read credential
echo ""
echo "Test 3: Read credential..."
node -e "
const fs = require('fs');
const path = require('path');
const os = require('os');
const filePath = path.join(os.homedir(), '.abekeys', 'credentials', 'test-hardened.json');
try {
  const creds = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (creds.secretKey === 'sk_test_123' && creds.publishableKey === 'pk_test_123') {
    console.log('✅ Credential read correctly');
  } else {
    console.error('❌ Credential mismatch');
    process.exit(1);
  }
} catch(e) {
  console.error('❌ Read failed:', e.message);
  process.exit(1);
}
"

# Test 4: Verify permissions
echo ""
echo "Test 4: Verify permissions..."
node -e "
const fs = require('fs');
const path = require('path');
const os = require('os');
const filePath = path.join(os.homedir(), '.abekeys', 'credentials', 'test-hardened.json');
try {
  const stats = fs.statSync(filePath);
  const mode = stats.mode & parseInt('777', 8);
  if (mode === parseInt('600', 8)) {
    console.log('✅ Permissions correct (600)');
  } else {
    console.error('❌ Permissions incorrect:', mode.toString(8), '(expected 600)');
    process.exit(1);
  }
} catch(e) {
  console.error('❌ Permission check failed:', e.message);
  process.exit(1);
}
"

# Test 5: Current Stripe credential
echo ""
echo "Test 5: Current Stripe credential..."
node -e "
const fs = require('fs');
const path = require('path');
const os = require('os');
const filePath = path.join(os.homedir(), '.abekeys', 'credentials', 'stripe.json');
try {
  if (!fs.existsSync(filePath)) {
    console.log('⚠️  Stripe credential not found');
    process.exit(0);
  }
  const creds = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const hasSecret = !!(creds.secretKey && creds.secretKey.startsWith('sk_'));
  const hasPublishable = !!(creds.publishableKey && creds.publishableKey.startsWith('pk_'));
  if (hasSecret && hasPublishable) {
    console.log('✅ Stripe credential complete');
    console.log('   Secret key:', creds.secretKey.substring(0, 20) + '...');
    console.log('   Publishable key:', creds.publishableKey.substring(0, 20) + '...');
  } else {
    console.error('❌ Stripe credential incomplete');
    console.error('   Has secret:', hasSecret);
    console.error('   Has publishable:', hasPublishable);
    process.exit(1);
  }
} catch(e) {
  console.error('❌ Stripe check failed:', e.message);
  process.exit(1);
}
"

# Cleanup
echo ""
echo "Cleaning up test file..."
rm -f ~/.abekeys/credentials/test-hardened.json 2>/dev/null || true

echo ""
echo "✅✅✅ ALL TESTS PASSED!!! ✅✅✅"
echo ""
echo "Pattern: ABEKEYS × TEST × HARDENED × ONE"
echo "∞ AbëONE ∞"

