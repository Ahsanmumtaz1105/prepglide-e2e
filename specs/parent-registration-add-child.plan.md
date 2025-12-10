# Parent Registration and Add Child

## Application Overview

Test plan for PrepGlide parent registration flow and adding a child account. This covers the complete onboarding journey from creating a parent/guardian account through setting up a child's learning profile.

## Test Scenarios

### 1. Parent Registration

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful parent registration with valid credentials

**File:** `tests/parent-registration/successful-registration.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Accept cookie consent banner by clicking 'Accept All'
  3. Enter valid email address (e.g., 'parent@example.com')
  4. Enter valid password (6-15 characters, e.g., 'Test@12345')
  5. Enter matching password in confirm password field
  6. Check 'I am a human' checkbox
  7. Answer the math captcha correctly (e.g., if '4 + 1', enter '5')
  8. Click 'Register' button

**Expected Results:**
  - Page loads successfully with registration form visible
  - Cookie banner dismisses and form remains visible
  - Email field accepts valid email format
  - Password field accepts the password
  - Confirm password field accepts matching password
  - Math captcha question appears after checking the checkbox
  - Captcha field accepts numeric answer
  - Registration succeeds and user is redirected to /add-child page
  - Success state shows 'Setting up your account...' loading message

#### 1.2. Registration validation - empty fields

**File:** `tests/parent-registration/empty-fields-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Click 'Register' button without filling any fields

**Expected Results:**
  - Error message 'Please fill in all required fields correctly.' appears at top
  - Email field shows 'Email is required' error
  - Password field shows 'Password is required' error
  - Confirm Password field shows 'Please confirm your password' error
  - Registration does not proceed

#### 1.3. Registration validation - invalid email format

**File:** `tests/parent-registration/invalid-email-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter invalid email format (e.g., 'invalid-email')
  3. Enter valid password in password field
  4. Enter matching password in confirm password field
  5. Click 'Register' button

**Expected Results:**
  - Email field shows 'Email must be valid' error message
  - Error message 'Please fill in all required fields correctly.' appears
  - Registration does not proceed

#### 1.4. Registration validation - password too short

**File:** `tests/parent-registration/password-too-short-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter valid email address
  3. Enter password with less than 6 characters (e.g., 'abc')
  4. Click 'Register' button

**Expected Results:**
  - Password field shows 'Password must be at least 6 characters' error
  - Error message 'Please fill in all required fields correctly.' appears
  - Registration does not proceed

#### 1.5. Registration validation - password too long

**File:** `tests/parent-registration/password-too-long-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter valid email address
  3. Enter password with more than 15 characters (e.g., 'ValidPassword123!')
  4. Enter same password in confirm password field
  5. Click 'Register' button

**Expected Results:**
  - Password field shows 'Password must be less than 15 characters' error
  - Error message 'Please fill in all required fields correctly.' appears
  - Registration does not proceed

#### 1.6. Registration validation - password mismatch

**File:** `tests/parent-registration/password-mismatch-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter valid email address
  3. Enter valid password (e.g., 'Test@12345')
  4. Enter different password in confirm password field (e.g., 'Different123')
  5. Click 'Register' button

**Expected Results:**
  - Confirm Password field shows 'Passwords do not match' error
  - Error message 'Please fill in all required fields correctly.' appears
  - Registration does not proceed

#### 1.7. Registration validation - incorrect captcha answer

**File:** `tests/parent-registration/incorrect-captcha-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter valid email, password, and matching confirm password
  3. Check 'I am a human' checkbox
  4. Enter incorrect answer to math captcha (e.g., if '8 + 3', enter '10')
  5. Click 'Register' button

**Expected Results:**
  - Math captcha question appears after checking the checkbox
  - Captcha field shows 'Incorrect answer, please try again' error
  - Error message 'Please fill in all required fields correctly.' appears
  - Registration does not proceed

#### 1.8. Password visibility toggle functionality

**File:** `tests/parent-registration/password-visibility-toggle.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter password in password field
  3. Click password visibility toggle button (eye icon)
  4. Verify password is visible
  5. Click toggle button again

**Expected Results:**
  - Password is initially masked
  - Password becomes visible as plain text after first click
  - Icon changes to indicate visible state
  - Password is masked again after second click

#### 1.9. Navigation to login from registration

**File:** `tests/parent-registration/navigate-to-login.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Click 'Sign In' link under the form

**Expected Results:**
  - User is redirected to /login page
  - Login form is displayed with email and password fields

#### 1.10. Registration with existing email

**File:** `tests/parent-registration/duplicate-email-validation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Enter email address that already exists in the system
  3. Enter valid password and matching confirm password
  4. Check 'I am a human' checkbox
  5. Answer captcha correctly
  6. Click 'Register' button

**Expected Results:**
  - Error message indicates email already exists
  - Registration does not proceed
  - User remains on registration page

### 2. Add Child Account

**Seed:** `tests/seed.spec.ts`

#### 2.1. Successful child account creation with valid details

**File:** `tests/add-child/successful-child-creation.spec.ts`

**Steps:**
  1. Login as parent user or complete parent registration
  2. Verify redirect to /add-child page
  3. Enter child's full name (e.g., 'John Smith')
  4. Enter unique username (e.g., 'johnsmith123')
  5. Enter password (minimum 6 characters, e.g., 'Child@123')
  6. Verify age group is pre-filled as '10-11 years'
  7. Click 'Create Child Account' button

**Expected Results:**
  - Add child page loads with 'Child Account Setup' heading
  - Descriptive text: 'Let's create your child's profile so they can start learning right away.'
  - All form fields are visible and enabled
  - Age group field is pre-populated and disabled
  - Information text shows: 'Default year group for the 11+ exam preparation'
  - 'Create Child Account' button becomes enabled when all fields are valid
  - Child account is created successfully
  - Message appears: 'After creating your child's account, you'll be able to start a free 7-day trial.'

#### 2.2. Child account validation - empty child name

**File:** `tests/add-child/empty-name-validation.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Enter valid username and password
  3. Leave child name field empty
  4. Observe 'Create Child Account' button state

**Expected Results:**
  - 'Create Child Account' button is disabled
  - Button cannot be clicked while name field is empty

#### 2.3. Child account validation - invalid username characters

**File:** `tests/add-child/invalid-username-validation.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Enter valid child name
  3. Enter username with special characters (e.g., 'user@#$')
  4. Enter valid password

**Expected Results:**
  - Username field shows 'Username can only contain letters, numbers, and .-_' error
  - 'Create Child Account' button is disabled
  - Invalid characters are not accepted or trigger validation error

#### 2.4. Child account validation - valid username formats

**File:** `tests/add-child/valid-username-formats.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Test username with letters only (e.g., 'johnsmith')
  3. Test username with numbers (e.g., 'john123')
  4. Test username with dot (e.g., 'john.smith')
  5. Test username with underscore (e.g., 'john_smith')
  6. Test username with hyphen (e.g., 'john-smith')
  7. Ensure each format is accepted

**Expected Results:**
  - All valid username formats are accepted without error
  - No validation errors appear for allowed characters
  - Button remains enabled with valid usernames

#### 2.5. Child account validation - password too short

**File:** `tests/add-child/password-too-short-validation.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Enter valid child name and username
  3. Enter password with less than 6 characters (e.g., 'abc')

**Expected Results:**
  - Password field shows 'Password must be at least 6 characters' error
  - 'Create Child Account' button is disabled

#### 2.6. Child password visibility toggle

**File:** `tests/add-child/password-visibility-toggle.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Enter password in password field
  3. Click password visibility toggle button
  4. Verify password visibility
  5. Click toggle button again

**Expected Results:**
  - Password is initially masked
  - Password becomes visible after clicking toggle
  - Password is masked again after second click

#### 2.7. Child account with duplicate username

**File:** `tests/add-child/duplicate-username-validation.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Enter valid child name
  3. Enter username that already exists in the system
  4. Enter valid password
  5. Click 'Create Child Account' button

**Expected Results:**
  - Error message indicates username is already taken
  - Child account is not created
  - User remains on add-child page with form data retained

#### 2.8. Age group display verification

**File:** `tests/add-child/age-group-display.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Observe age group field and its information text

**Expected Results:**
  - Age group field shows '10-11 years'
  - Field is disabled and cannot be edited
  - Helper text displays: 'Default year group for the 11+ exam preparation'
  - Field has an icon (calendar/date icon) next to it

#### 2.9. Trial message display

**File:** `tests/add-child/trial-message-display.spec.ts`

**Steps:**
  1. Navigate to /add-child page as logged-in parent
  2. Locate the trial information message

**Expected Results:**
  - Message states: 'After creating your child's account, you'll be able to start a free 7-day trial.'
  - Message is visible below the create button

### 3. Complete Registration Flow

**Seed:** `tests/seed.spec.ts`

#### 3.1. End-to-end parent registration and child creation

**File:** `tests/complete-flow/e2e-parent-and-child-creation.spec.ts`

**Steps:**
  1. Navigate to https://app.prepglide.co.uk/parent-register
  2. Accept cookies
  3. Complete parent registration with valid details
  4. Answer captcha correctly
  5. Submit registration
  6. Verify automatic redirect to /add-child
  7. Complete child account form with valid details
  8. Submit child account creation
  9. Verify successful account creation

**Expected Results:**
  - Parent account is created successfully
  - Parent is authenticated and redirected to add-child page
  - Navigation shows parent menu items (Dashboard, Assign Tests, Track Progress, Billing, Settings)
  - Parent can see 'Sign Out' button in header
  - User profile shows role as 'Parent'
  - Child account is created and linked to parent
  - User can proceed to start 7-day trial

#### 3.2. Parent registration and skip child creation

**File:** `tests/complete-flow/skip-child-creation.spec.ts`

**Steps:**
  1. Complete parent registration
  2. Navigate to /add-child page
  3. Click on Dashboard link in navigation menu without creating child

**Expected Results:**
  - Parent can navigate away from add-child page
  - Parent account exists without child accounts
  - Can access parent dashboard and other features

#### 3.3. Parent logout after registration

**File:** `tests/complete-flow/parent-logout.spec.ts`

**Steps:**
  1. Complete parent registration
  2. On /add-child page, click 'Sign Out' button in header
  3. Verify logout

**Expected Results:**
  - User is logged out successfully
  - User is redirected to login page or home page
  - Attempting to access /add-child redirects to login
  - Parent session is terminated

#### 3.4. Create multiple children for one parent

**File:** `tests/complete-flow/multiple-children-creation.spec.ts`

**Steps:**
  1. Login as existing parent with one child
  2. Navigate to add-child or settings to add another child
  3. Create second child account with different username
  4. Verify both children are associated with parent account

**Expected Results:**
  - Parent can create multiple child accounts
  - Each child has unique username
  - All children appear in parent's child list/dashboard
  - Parent can manage multiple child profiles

### 4. Navigation and UI

**Seed:** `tests/seed.spec.ts`

#### 4.1. Parent navigation menu accessibility

**File:** `tests/navigation/parent-menu-items.spec.ts`

**Steps:**
  1. Login as parent user
  2. Verify navigation menu items are visible and accessible

**Expected Results:**
  - Dashboard link is visible
  - Assign Tests link is visible
  - Track Progress link is visible
  - Billing link is visible
  - Settings link is visible
  - Each menu item has appropriate icon
  - User role displays as 'Parent'

#### 4.2. Mobile menu toggle

**File:** `tests/navigation/mobile-menu-toggle.spec.ts`

**Steps:**
  1. Login as parent user
  2. Verify hamburger menu button in header
  3. Click menu toggle button
  4. Verify navigation drawer opens

**Expected Results:**
  - Menu toggle button is visible in header
  - Navigation drawer opens when button is clicked
  - All menu items are accessible in drawer
  - Drawer can be closed

#### 4.3. PrepGlide logo navigation

**File:** `tests/navigation/logo-navigation.spec.ts`

**Steps:**
  1. Navigate to /add-child or any authenticated page
  2. Click PrepGlide logo in header

**Expected Results:**
  - Logo is clickable
  - Clicking logo navigates to home or dashboard
  - Logo is consistently placed across all pages
