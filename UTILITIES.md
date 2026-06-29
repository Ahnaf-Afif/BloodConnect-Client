# Utility Functions Documentation

## Overview
This document provides a comprehensive guide to all utility functions available in the BloodConnect application.

## Library Utilities

### api.js
Centralized API client with automatic credential handling and error management.

```javascript
import { api } from '@/lib/api';

// Authentication
await api.register(userData);
await api.login(credentials);
await api.logout();
await api.me();

// Donations
await api.getDonationRequests(query);
await api.createDonationRequest(data);
await api.confirmDonation(requestId, data);

// Funding
await api.getFunds();
await api.createFundCheckout(data);
await api.confirmFund(paymentId);

// Search
await api.searchDonors(query);

// Profiles
await api.updateProfile(data);
await api.getProfile();

// Admin operations
await api.getAllUsers();
await api.blockUser(userId);
await api.unblockUser(userId);
await api.makeAdmin(userId);
await api.makeVolunteer(userId);
```

### validators.js
Input validation utilities for forms and data validation.

```javascript
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateName,
  validateBloodGroup,
  validateDate,
  validateTime,
  getValidationError
} from '@/lib/validators';

// Validate individual fields
validateEmail('user@example.com'); // true/false
validatePassword('secret123'); // true/false
validatePhoneNumber('01712345678'); // true/false

// Get error message for a field
getValidationError('email', 'invalid-email'); // "Invalid email address"
```

### formatters.js
Data formatting and string utilities.

```javascript
import {
  formatPhoneNumber,
  formatDateTime,
  formatDateOnly,
  formatTimeOnly,
  truncateText,
  capitalizeWords,
  getInitials,
  pluralize
} from '@/lib/formatters';

// Format phone numbers
formatPhoneNumber('01712345678'); // "+8801712345678"

// Format dates and times
formatDateTime(new Date()); // "Jan 1, 2024, 10:30:00 AM"
formatDateOnly(new Date()); // "Jan 1, 2024"
formatTimeOnly('14:30'); // "2:30 PM"

// String utilities
truncateText('Long text...', 10); // "Long text...."
capitalizeWords('hello world'); // "Hello World"
getInitials('John Doe'); // "JD"
pluralize('donor', 5); // "donors"
```

### errors.js
Error handling and recovery utilities.

```javascript
import { AppError, handleError, logError, retryAsync } from '@/lib/errors';

// Custom error class
throw new AppError('Invalid input', 400);

// Handle API errors
try {
  // API call
} catch (error) {
  const message = handleError(error);
  toast.error(message);
}

// Log errors in development
logError(error, 'DataFetch');

// Retry failed operations
const result = await retryAsync(
  () => api.getDonationRequests(),
  3, // retries
  1000 // delay in ms
);
```

### storage.js
Safe localStorage management with error handling.

```javascript
import { storage } from '@/lib/storage';

// Set value
storage.set('user', { id: 1, name: 'John' });

// Get value with default
const user = storage.get('user', null);

// Remove value
storage.remove('user');

// Clear all storage
storage.clear();

// Get all keys
const keys = storage.keys();
```

### performance.js
Performance monitoring and accessibility utilities.

```javascript
import {
  debounce,
  throttle,
  observeImages,
  moveFocus,
  announce,
  measurePerformance
} from '@/lib/performance';

// Debounce search input
const debouncedSearch = debounce((query) => {
  api.searchDonors(query);
}, 300);

// Throttle scroll events
const throttledScroll = throttle(() => {
  console.log('Scrolling...');
}, 1000);

// Announce to screen readers
announce('Data loaded successfully', 'polite');

// Measure performance
const endMeasure = measurePerformance('DataFetch');
// ... do work ...
endMeasure(); // Logs: "DataFetch: 123.45ms"
```

## Hooks

### useAuthUser
Get current authenticated user throughout the app.

```javascript
import { useAuthUser } from '@/hooks/useAuthUser';

export default function MyComponent() {
  const { user, loading } = useAuthUser();

  if (loading) return <LoadingSpinner />;
  if (!user) return <PrivateRouteClient />;

  return <div>Welcome, {user.name}</div>;
}
```

### useForm
Simplified form state management and handling.

```javascript
import { useForm } from '@/hooks/useForm';

export default function LoginForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '', password: '' },
    async (values) => {
      await api.login(values);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
```

### useDebounce
Debounced value for optimized search and filtering.

```javascript
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    api.searchDonors(debouncedQuery);
  }, [debouncedQuery]);

  return <input onChange={(e) => setQuery(e.target.value)} />;
}
```

## Configuration

### app.js
Centralized application configuration.

```javascript
import { API_CONFIG, ROUTES, STORAGE_KEYS } from '@/config/app';

// API configuration
console.log(API_CONFIG.BASE_URL); // http://localhost:5000
console.log(API_CONFIG.TIMEOUT); // 10000

// Navigate using constants
router.push(ROUTES.DASHBOARD);

// Use storage keys
storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
```

## Best Practices

1. **Use validators before API calls** to catch errors early
2. **Use debounce for search inputs** to reduce server load
3. **Use error handling utilities** for consistent error messages
4. **Use formatters for consistent output** across the app
5. **Use storage utility** for safe localStorage operations
6. **Use performance utilities** to measure and improve app performance
7. **Use custom hooks** to reduce code duplication
