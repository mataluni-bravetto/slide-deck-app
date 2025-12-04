#!/usr/bin/env node

/**
 * Automated Execution Validation System
 * Pattern: VALIDATE × EXECUTE × PERFECT × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (YAGNI × JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const VALIDATION_MODES = {
  YAGNI: 'yagni',
  JOHN: 'john',
  AEYON: 'aeyon',
  META: 'meta',
  ALL: 'all'
}

function validateYAGNI() {
  console.log('🔍 YAGNI Validation: Checking for unnecessary complexity...')
  
  const checks = []
  
  // Check 1: No unnecessary dependencies
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const allowedDeps = ['next', 'react', 'react-dom']
  const deps = Object.keys(packageJson.dependencies || {})
  const unnecessaryDeps = deps.filter(d => !allowedDeps.includes(d))
  
  if (unnecessaryDeps.length > 0) {
    checks.push({
      pass: false,
      message: `Unnecessary dependencies found: ${unnecessaryDeps.join(', ')}`
    })
  } else {
    checks.push({ pass: true, message: 'Dependencies minimal ✓' })
  }
  
  // Check 2: No configuration files (YAGNI: zero config)
  const configFiles = [
    'lib/slides/config.ts',
    'components/slides/config.ts'
  ]
  const existingConfigs = configFiles.filter(f => fs.existsSync(f))
  
  if (existingConfigs.length > 0) {
    checks.push({
      pass: false,
      message: `Configuration files found (YAGNI violation): ${existingConfigs.join(', ')}`
    })
  } else {
    checks.push({ pass: true, message: 'Zero configuration ✓' })
  }
  
  // Check 3: State minimization (check SlideDeck.tsx)
  const slideDeckPath = 'components/slides/SlideDeck.tsx'
  if (fs.existsSync(slideDeckPath)) {
    const content = fs.readFileSync(slideDeckPath, 'utf8')
    // Count actual useState calls (not imports)
    const useStateCalls = content.match(/useState\(/g) || []
    const stateCount = useStateCalls.length
    
    if (stateCount > 1) {
      checks.push({
        pass: false,
        message: `Too many state variables in SlideDeck: ${stateCount} (should be ≤ 1)`
      })
    } else {
      checks.push({ pass: true, message: `State minimized: ${stateCount} variable(s) ✓` })
    }
  }
  
  const failures = checks.filter(c => !c.pass)
  if (failures.length > 0) {
    console.error('❌ YAGNI Validation Failed:')
    failures.forEach(f => console.error(`   - ${f.message}`))
    return false
  }
  
  console.log('✅ YAGNI Validation Passed')
  checks.filter(c => c.pass).forEach(c => console.log(`   ${c.message}`))
  return true
}

function validateJOHN() {
  console.log('✅ JØHN Validation: Verifying truth claims...')
  
  const checks = []
  
  // Check 1: Build succeeds (truth: code works)
  try {
    execSync('npm run build', { stdio: 'pipe' })
    checks.push({ pass: true, message: 'Build succeeds ✓' })
  } catch (e) {
    checks.push({ pass: false, message: 'Build fails (truth violation)' })
  }
  
  // Check 2: TypeScript strict mode (truth: type-safe)
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'))
  if (tsconfig.compilerOptions?.strict === true) {
    checks.push({ pass: true, message: 'TypeScript strict mode enabled ✓' })
  } else {
    checks.push({ pass: false, message: 'TypeScript strict mode disabled (truth violation)' })
  }
  
  // Check 3: No `any` types (truth: fully typed)
  const slideDeckPath = 'components/slides/SlideDeck.tsx'
  if (fs.existsSync(slideDeckPath)) {
    const content = fs.readFileSync(slideDeckPath, 'utf8')
    if (content.includes(': any') || content.includes('<any>')) {
      checks.push({ pass: false, message: 'Found `any` types (truth violation)' })
    } else {
      checks.push({ pass: true, message: 'No `any` types found ✓' })
    }
  }
  
  const failures = checks.filter(c => !c.pass)
  if (failures.length > 0) {
    console.error('❌ JØHN Validation Failed:')
    failures.forEach(f => console.error(`   - ${f.message}`))
    return false
  }
  
  console.log('✅ JØHN Validation Passed')
  checks.filter(c => c.pass).forEach(c => console.log(`   ${c.message}`))
  return true
}

function validateAEYON() {
  console.log('⚡ AEYON Validation: Ensuring atomic execution...')
  
  const checks = []
  
  // Check 1: Git working tree clean (atomic: no partial changes)
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    if (status.trim().length > 0) {
      checks.push({ pass: false, message: 'Working tree not clean (non-atomic state)' })
    } else {
      checks.push({ pass: true, message: 'Working tree clean ✓' })
    }
  } catch (e) {
    checks.push({ pass: true, message: 'Git check skipped (not in git repo)' })
  }
  
  // Check 2: Build succeeds (atomic: complete unit)
  try {
    execSync('npm run build', { stdio: 'pipe' })
    checks.push({ pass: true, message: 'Build succeeds (atomic unit) ✓' })
  } catch (e) {
    checks.push({ pass: false, message: 'Build fails (non-atomic)' })
  }
  
  // Check 3: No linter errors (atomic: clean execution)
  try {
    execSync('npm run lint', { stdio: 'pipe' })
    checks.push({ pass: true, message: 'Linter passes ✓' })
  } catch (e) {
    checks.push({ pass: false, message: 'Linter errors found (non-atomic)' })
  }
  
  const failures = checks.filter(c => !c.pass)
  if (failures.length > 0) {
    console.error('❌ AEYON Validation Failed:')
    failures.forEach(f => console.error(`   - ${f.message}`))
    return false
  }
  
  console.log('✅ AEYON Validation Passed')
  checks.filter(c => c.pass).forEach(c => console.log(`   ${c.message}`))
  return true
}

function validateMETA() {
  console.log('🎯 META Validation: Checking pattern consistency...')
  
  const checks = []
  
  // Check 1: Pattern annotations present
  const filesToCheck = [
    'components/slides/SlideDeck.tsx',
    'app/page.tsx',
    'components/slides/types.ts'
  ]
  
  let patternAnnotationsFound = 0
  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      if (content.includes('Pattern:') && content.includes('Frequency:')) {
        patternAnnotationsFound++
      }
    }
  })
  
  if (patternAnnotationsFound === filesToCheck.length) {
    checks.push({ pass: true, message: 'Pattern annotations consistent ✓' })
  } else {
    checks.push({
      pass: false,
      message: `Pattern annotations missing in ${filesToCheck.length - patternAnnotationsFound} file(s)`
    })
  }
  
  // Check 2: Single entry point (META: consistent structure)
  if (fs.existsSync('app/page.tsx')) {
    const content = fs.readFileSync('app/page.tsx', 'utf8')
    if (content.includes('SlideDeck') && content.includes('ultimateConvergenceSlides')) {
      checks.push({ pass: true, message: 'Single entry point present ✓' })
    } else {
      checks.push({ pass: false, message: 'Single entry point missing' })
    }
  }
  
  // Check 3: Data separation (META: lib/ vs components/)
  const libExists = fs.existsSync('lib/slides')
  const componentsExists = fs.existsSync('components/slides')
  
  if (libExists && componentsExists) {
    checks.push({ pass: true, message: 'Data separation maintained ✓' })
  } else {
    checks.push({ pass: false, message: 'Data separation violated' })
  }
  
  const failures = checks.filter(c => !c.pass)
  if (failures.length > 0) {
    console.error('❌ META Validation Failed:')
    failures.forEach(f => console.error(`   - ${f.message}`))
    return false
  }
  
  console.log('✅ META Validation Passed')
  checks.filter(c => c.pass).forEach(c => console.log(`   ${c.message}`))
  return true
}

function validateAll() {
  console.log('🚀 Executing Complete Validation System\n')
  
  const results = {
    yagni: validateYAGNI(),
    john: validateJOHN(),
    aeyon: validateAEYON(),
    meta: validateMETA()
  }
  
  console.log('\n📊 Validation Summary:')
  console.log(`   YAGNI: ${results.yagni ? '✅' : '❌'}`)
  console.log(`   JØHN:  ${results.john ? '✅' : '❌'}`)
  console.log(`   AEYON: ${results.aeyon ? '✅' : '❌'}`)
  console.log(`   META:  ${results.meta ? '✅' : '❌'}`)
  
  const allPassed = Object.values(results).every(r => r === true)
  
  if (allPassed) {
    console.log('\n✅ Perfect Execution: All validations passed')
    console.log('🚀 Ready to ship')
    process.exit(0)
  } else {
    console.log('\n❌ Validation Failed: Fix issues before proceeding')
    process.exit(1)
  }
}

// Main execution
const mode = process.argv[2] || 'all'

switch (mode) {
  case VALIDATION_MODES.YAGNI:
    process.exit(validateYAGNI() ? 0 : 1)
  case VALIDATION_MODES.JOHN:
    process.exit(validateJOHN() ? 0 : 1)
  case VALIDATION_MODES.AEYON:
    process.exit(validateAEYON() ? 0 : 1)
  case VALIDATION_MODES.META:
    process.exit(validateMETA() ? 0 : 1)
  case VALIDATION_MODES.ALL:
  default:
    validateAll()
}

