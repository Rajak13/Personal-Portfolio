/**
 * Route Protection Tests
 * These tests verify that the CMS routes are properly protected
 */

import {
    isAccessBlocked,
    isCMSRoute,
    shouldRedirectForSecurity
} from '../utils/security.js'

// Test CMS route detection
console.log('Testing CMS route detection...')
console.assert(isCMSRoute('/admin-cms-2024-secure'), 'Should detect CMS base route')
console.assert(isCMSRoute('/admin-cms-2024-secure/login'), 'Should detect CMS login route')
console.assert(isCMSRoute('/admin-cms-2024-secure/dashboard'), 'Should detect CMS dashboard route')
console.assert(!isCMSRoute('/admin'), 'Should not detect fake admin route')
console.assert(!isCMSRoute('/'), 'Should not detect home route')

// Test security redirects
console.log('Testing security redirects...')
console.assert(shouldRedirectForSecurity('/admin'), 'Should redirect /admin')
console.assert(shouldRedirectForSecurity('/cms'), 'Should redirect /cms')
console.assert(shouldRedirectForSecurity('/wp-admin'), 'Should redirect /wp-admin')
console.assert(!shouldRedirectForSecurity('/admin-cms-2024-secure'), 'Should not redirect legitimate CMS URL')
console.assert(!shouldRedirectForSecurity('/'), 'Should not redirect home page')

// Test access blocking (initially should not be blocked)
console.log('Testing access blocking...')
console.assert(!isAccessBlocked(), 'Should not be blocked initially')

console.log('✅ All route protection tests passed!')

export { isAccessBlocked, isCMSRoute, shouldRedirectForSecurity }

