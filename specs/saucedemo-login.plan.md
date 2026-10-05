# SauceDemo Login Test Plan

## Application Overview

Login-only functional test coverage for https://www.saucedemo.com. Each test starts from a fresh browser context on the login page and must not cover inventory, shopping, checkout, logout, or other post-login workflows.

## Test Scenarios

### 1. SauceDemo Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login succeeds with the standard user

**File:** `tests/login/standard-user-login.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
    - expect: The password input does not expose the entered value as readable text.
  2. Enter `standard_user` in Username and `secret_sauce` in Password.
    - expect: Both values are accepted by their respective fields.
  3. Click Login.
    - expect: The user is authenticated and navigated to `https://www.saucedemo.com/inventory.html`.
    - expect: The login error alert is not displayed.

#### 1.2. Locked-out user cannot log in

**File:** `tests/login/locked-out-user.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The blank login form is displayed.
  2. Enter `locked_out_user` in Username and `secret_sauce` in Password.
    - expect: The credentials remain in the form fields.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Sorry, this user has been locked out.`.
    - expect: The inventory page is not opened.

#### 1.3. Unknown username is rejected

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The blank login form is displayed.
  2. Enter `invalid_user` in Username and `secret_sauce` in Password.
    - expect: The credentials remain in the form fields.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Username and password do not match any user in this service`.
    - expect: The inventory page is not opened.

#### 1.4. Incorrect password is rejected

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The blank login form is displayed.
  2. Enter `standard_user` in Username and an incorrect password such as `wrong_password`.
    - expect: The credentials remain in the form fields.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Username and password do not match any user in this service`.
    - expect: The inventory page is not opened.

#### 1.5. Empty form submission shows username validation

**File:** `tests/login/empty-form.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: Username and Password are empty.
  2. Click Login without entering either value.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Username is required`.
    - expect: The password-required message is not shown until Username is supplied.

#### 1.6. Missing password is rejected

**File:** `tests/login/missing-password.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The blank login form is displayed.
  2. Enter `standard_user` in Username and leave Password empty.
    - expect: The username is present and the password remains blank.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Password is required`.
    - expect: The inventory page is not opened.

#### 1.7. Credentials are case-sensitive

**File:** `tests/login/case-sensitive-credentials.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser context.
    - expect: The blank login form is displayed.
  2. Enter `STANDARD_USER` in Username and `SECRET_SAUCE` in Password.
    - expect: The values are accepted as input without client-side normalization that changes their visible values.
  3. Click Login.
    - expect: The user remains on the login page.
    - expect: An error alert displays `Epic sadface: Username and password do not match any user in this service`.
    - expect: The inventory page is not opened.
