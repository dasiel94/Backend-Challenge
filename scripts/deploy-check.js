#!/usr/bin/env node

/**
 * Deployment Check Script
 * Verifies that all required environment variables are configured
 */

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
  'CORS_ORIGIN'
];

const optionalEnvVars = [
  'NODE_ENV'
];

console.log('🔍 Checking deployment configuration...\n');

let allGood = true;

// Check required environment variables
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (!value) {
    console.log(`❌ Missing required environment variable: ${envVar}`);
    allGood = false;
  } else {
    console.log(`✅ ${envVar}: ${envVar.includes('SECRET') || envVar.includes('KEY') ? '[HIDDEN]' : value}`);
  }
});

// Check specific values
if (process.env.NODE_ENV === 'production') {
  console.log('\n📋 Production environment detected');
  
  if (process.env.CORS_ORIGIN !== 'https://lovely-sprite-4c8d0c.netlify.app') {
    console.log('⚠️  Warning: CORS_ORIGIN should be set to https://lovely-sprite-4c8d0c.netlify.app for production');
  }
  
  if (process.env.FIREBASE_PRIVATE_KEY && !process.env.FIREBASE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----')) {
    console.log('⚠️  Warning: FIREBASE_PRIVATE_KEY should include the full private key with headers');
  }
}

console.log('\n' + (allGood ? '🎉 All required environment variables are configured!' : '❌ Some required environment variables are missing.'));

if (!allGood) {
  console.log('\n📝 Please configure the missing environment variables in your Render dashboard.');
  process.exit(1);
}

console.log('\n🚀 Ready for deployment!'); 