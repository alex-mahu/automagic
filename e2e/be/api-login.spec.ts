import { expect, test } from '@playwright/test';
import { LoginService } from '../../source/services/login-service';

const EMAIL = 'alexandru.mahu@hotmail.com';
const PASSWORD = 'HelloSherpany87';
const WRONG_CREDENTIALS_STATUS_CODE = 400;
const MISSING_EMAIL_STATUS_CODE = 401;
const MISSING_PASSWORD_STATUS_CODE = 400;

test('login moves to request mobile code on correct credentials', async ({ request }) => {
    const loginService = new LoginService(request);
    const response = await loginService.login(EMAIL, PASSWORD);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeDefined();
    expect(body).toHaveProperty('code', 'completed-successfully');
    expect(body).toHaveProperty('status', 'success');
});

test(`login fails with ${WRONG_CREDENTIALS_STATUS_CODE} on wrong credentials`, async ({ request }) => {
    const loginService = new LoginService(request);
    const response = await loginService.login(EMAIL, 'ThisIsNotTheCorrectPassword');

    expect(response.status()).toBe(WRONG_CREDENTIALS_STATUS_CODE);
    const body = await response.json();
    expect(body).toBeDefined();
    expect(body).toHaveProperty('code', 'authentication:password:wrong-password');
    expect(body).toHaveProperty('status', 'fail');
});

test(`login fails with ${MISSING_EMAIL_STATUS_CODE} on missing email`, async ({ request }) => {
    const loginService = new LoginService(request);
    const response = await loginService.login(undefined, 'ThisIsNotTheCorrectPassword');

    expect(response.status()).toBe(MISSING_EMAIL_STATUS_CODE);
    const body = await response.json();
    expect(body).toBeDefined();
    expect(body).toHaveProperty('code', 'authentication:password:missing-email');
    expect(body).toHaveProperty('status', 'fail');
});

test(`login fails with ${MISSING_PASSWORD_STATUS_CODE} on missing password`, async ({ request }) => {
    const loginService = new LoginService(request);
    const response = await loginService.login(EMAIL, undefined);

    expect(response.status()).toBe(MISSING_PASSWORD_STATUS_CODE);
    const body = await response.json();
    expect(body).toBeDefined();
    expect(body).toHaveProperty('code', 'authentication:password:wrong-password');
    expect(body).toHaveProperty('status', 'fail');
});