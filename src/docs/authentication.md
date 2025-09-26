# Authentication System Documentation

## Overview

The authentication system for the Blog CMS is built using Supabase Auth and provides secure access to the content management interface.

## Components

### 1. AuthContext (`src/contexts/AuthContext.jsx`)
- Provides authentication state management across the application
- Handles user session persistence in localStorage
- Manages authentication state changes
- Provides methods for sign in/out operations

### 2. AuthGuard (`src/components/auth/AuthGuard.jsx`)
- Protects CMS routes from unauthorized access
- Redirects unauthenticated users to login page
- Shows loading spinner during authentication checks

### 3. Login Component (`src/pages/cms/Login.jsx`)
- Secure login form with email/password authentication
- Form validation and error handling
- Password visibility toggle
- Responsive design with loading states

### 4. Auth Service (`src/services/authService.js`)
- Centralized authentication operations
- Wraps Supabase Auth methods
- Provides consistent error handling
- Session management utilities

## Features

### Security Features
- Hidden CMS URL (`/admin-cms-2024-secure`)
- Session-based authentication
- Automatic session refresh
- Secure password handling
- CSRF protection via Supabase

### User Experience
- Persistent login sessions
- Smooth loading states
- Clear error messages
- Responsive design
- Theme-aware styling

### Session Management
- Automatic session persistence
- Session expiration handling
- Graceful logout functionality
- Session state synchronization

## Usage

### Accessing the CMS
1. Navigate to `/admin-cms-2024-secure/login`
2. Enter valid credentials
3. System redirects to CMS dashboard upon successful authentication

### Authentication Flow
1. User visits protected CMS route
2. AuthGuard checks authentication status
3. If not authenticated, redirects to login page
4. After successful login, redirects to originally requested page
5. Session persists across browser refreshes

### Testing Authentication
Development utilities are available in the browser console:
- `runAuthTests()` - Tests basic authentication functionality
- `testAuthFlow(email, password)` - Tests complete sign in/out flow
- `testAuthUtils` - Utilities for creating test users

## Configuration

### Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

### Supabase Setup
- Uses Supabase Auth for user management
- Leverages existing `auth.users` table
- Row Level Security (RLS) policies applied

## Error Handling

### Authentication Errors
- Invalid credentials → Clear error message displayed
- Network errors → Retry mechanism with user feedback
- Session expired → Automatic redirect to login

### Form Validation
- Required field validation
- Email format validation
- Real-time error display
- Form state preservation on errors

## Security Considerations

### Access Control
- Hidden URL prevents discovery
- No navigation links to CMS from main site
- Authentication required for all CMS routes
- Session timeout handling

### Data Protection
- Secure password transmission
- Session token management
- Automatic logout on inactivity
- Input sanitization

## Future Enhancements

### Planned Features
- Multi-factor authentication (MFA)
- Role-based access control
- Password reset functionality
- Account lockout after failed attempts
- Audit logging for authentication events

### Performance Optimizations
- Lazy loading of authentication components
- Optimized session checks
- Reduced bundle size for auth modules