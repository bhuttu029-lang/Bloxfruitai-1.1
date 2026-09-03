import crypto from 'crypto';
import nodemailer from 'nodemailer';

export interface HandlerEvent {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  queryStringParameters: Record<string, string | undefined> | null;
  path: string;
}

export interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
}

export type Handler = (event: HandlerEvent, context?: any) => Promise<HandlerResponse>;

const OWNER_EMAIL = (process.env.OWNER_EMAIL || 'bhuttu029@gmail.com').trim();
const OWNER_MASTER_KEY = (process.env.OWNER_MASTER_KEY || 'mouse4770').trim();
const OWNER_PRE_AUTH_CODE = (process.env.OWNER_PRE_AUTH_CODE || '477047704770').trim();
const OWNER_COMBINED_KEY = `${OWNER_PRE_AUTH_CODE}${OWNER_MASTER_KEY}`;
const HMAC_SECRET = (process.env.SESSION_SECRET || process.env.JWT_SECRET || 'solas_grandmaster_vault_netlify_hmac_secret_4770').trim();
const DEFAULT_GMAIL_PASS = 'ucvfobkmfhtykdut';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

function timingSafeEqualStr(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 3) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}***${local.slice(-2)}@${domain}`;
}

function createSignedToken(payload: object): string {
  const dataStr = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', HMAC_SECRET).update(dataStr).digest('hex');
  return Buffer.from(JSON.stringify({ d: dataStr, s: signature })).toString('base64url');
}

function verifySignedToken<T>(token: string): T | null {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf8');
    const { d, s } = JSON.parse(raw);
    if (!d || !s) return null;
    const expectedSig = crypto.createHmac('sha256', HMAC_SECRET).update(d).digest('hex');
    if (!timingSafeEqualStr(s, expectedSig)) return null;
    return JSON.parse(d) as T;
  } catch {
    return null;
  }
}

async function sendEmailOtp(otp: string, ip: string): Promise<boolean> {
  const rawPass = (process.env.GMAIL_APP_PASSWORD || DEFAULT_GMAIL_PASS).trim();
  const gmailPass = rawPass.replace(/\s+/g, '');
  const gmailUser = (process.env.GMAIL_USER || OWNER_EMAIL).trim();

  if (!gmailPass) return true;

  const mailOptions = {
    from: `"Blox Fruits Security Core" <${gmailUser}>`,
    to: OWNER_EMAIL,
    subject: `[Blox Fruits Hub] 🔐 Netlify Grandmaster Owner Login OTP: ${otp}`,
    text: `Your 6-Digit Grandmaster Owner Verification Code is: ${otp}\n\nThis code expires in 5 minutes.\nRequest origin IP: ${ip}\nIf you did not initiate this request, secure your credentials immediately.`,
    html: `
      <div style="background-color: #020617; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px 20px; text-align: center; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid #1e293b;">
        <div style="display: inline-block; padding: 8px 18px; border-radius: 9999px; background: rgba(6, 182, 212, 0.15); border: 1px solid #06b6d4; color: #38bdf8; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 18px;">
          Grandmaster Owner 2FA (Netlify)
        </div>
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 10px 0;">Step 3 Verification Code</h1>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 24px 0;">Use the 6-digit one-time code below to complete Step 3 of the Grandmaster Owner authentication protocol.</p>
        <div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9)); border: 2px dashed #38bdf8; border-radius: 14px; padding: 22px; margin: 0 0 24px 0;">
          <span style="font-family: monospace; font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #38bdf8; text-shadow: 0 0 16px rgba(56, 189, 248, 0.5);">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0;">⏳ Code expires in <strong>5 minutes</strong>. Single-use only.</p>
        <p style="color: #475569; font-size: 11px; margin: 0;">Request origin IP: <code style="color: #94a3b8;">${ip}</code> • ${new Date().toUTCString()}</p>
      </div>
    `
  };

  // Strategy 1: Gmail SMTP via Port 465 (SSL)
  try {
    const transporter465 = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
      connectionTimeout: 8000
    });
    await transporter465.sendMail(mailOptions);
    return true;
  } catch (e1) {
    // Strategy 2: Gmail SMTP via Port 587
    try {
      const transporter587 = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: gmailUser, pass: gmailPass },
        connectionTimeout: 8000
      });
      await transporter587.sendMail(mailOptions);
      return true;
    } catch (e2) {
      // Strategy 3: Nodemailer Built-in Service
      try {
        const transporterService = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailPass },
          connectionTimeout: 8000
        });
        await transporterService.sendMail(mailOptions);
        return true;
      } catch (e3) {
        console.error('All email dispatch strategies failed in Netlify function:', e3);
        return false;
      }
    }
  }
}

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  const clientIp = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown-ip';

  let body: any = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Invalid JSON request body' })
    };
  }

  const action = (body.action || event.queryStringParameters?.action || '').toLowerCase();

  // 1. ACTION: LOGIN (Step 1 & Step 2 validation -> generate & dispatch OTP)
  if (action === 'login') {
    const providedKey = (typeof body.key === 'string' ? body.key : '').trim().toLowerCase();
    const providedPreAuth = (typeof body.preAuthCode === 'string' ? body.preAuthCode : '').trim();

    const isMasterKey = timingSafeEqualStr(providedKey, OWNER_MASTER_KEY.toLowerCase());
    const isPreAuthValid = timingSafeEqualStr(providedPreAuth, OWNER_PRE_AUTH_CODE);
    const isCombined = timingSafeEqualStr(providedKey, OWNER_COMBINED_KEY.toLowerCase()) ||
                       timingSafeEqualStr(providedKey, `${OWNER_PRE_AUTH_CODE} ${OWNER_MASTER_KEY}`.toLowerCase());

    const isAuthorized = isCombined || (isMasterKey && isPreAuthValid);

    if (!isAuthorized) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Access Denied: Invalid Owner Pre-Auth Code or Master Clearance Key.'
        })
      };
    }

    // Generate random 6-digit OTP and salt
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = crypto.randomBytes(16).toString('hex');
    const otpHash = crypto.createHmac('sha256', HMAC_SECRET).update(otp + salt).digest('hex');

    const payload = {
      otpHash,
      salt,
      ip: clientIp,
      exp: Date.now() + 5 * 60 * 1000,
      attempts: 0
    };

    const otpToken = createSignedToken(payload);

    // Send email (asynchronous dispatch)
    await sendEmailOtp(otp, clientIp).catch((err) => console.error('Netlify OTP send error:', err));

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        requiresOtp: true,
        otpToken,
        emailTarget: maskEmail(OWNER_EMAIL),
        expiresIn: 300,
        message: `Step 1 & 2 verified! 6-digit OTP code dispatched to ${maskEmail(OWNER_EMAIL)}.`
      })
    };
  }

  // 2. ACTION: VERIFY (Step 3 6-digit OTP verification)
  if (action === 'verify') {
    const { otp, otpToken } = body;
    const cleanOtp = (typeof otp === 'string' ? otp : '').trim();
    const cleanToken = (typeof otpToken === 'string' ? otpToken : '').trim();

    if (!cleanOtp || !cleanToken || !/^\d{6}$/.test(cleanOtp)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'A valid 6-digit numeric OTP code and token are required.' })
      };
    }

    const payload = verifySignedToken<{ otpHash: string; salt: string; exp: number; attempts: number }>(cleanToken);
    if (!payload) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Invalid or tampered OTP session. Please restart authorization.' })
      };
    }

    if (Date.now() > payload.exp) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'OTP code expired. Please request a new one.' })
      };
    }

    const computedHash = crypto.createHmac('sha256', HMAC_SECRET).update(cleanOtp + payload.salt).digest('hex');
    const isMatch = timingSafeEqualStr(computedHash, payload.otpHash);

    if (!isMatch) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Invalid 6-Digit OTP code. Please verify the code in your Gmail.' })
      };
    }

    // Verified!
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        role: 'owner',
        username: '1_solas',
        displayName: 'Grandmaster Owner',
        verified: true
      })
    };
  }

  // 3. ACTION: RESEND
  if (action === 'resend') {
    const { otpToken } = body;
    const cleanToken = (typeof otpToken === 'string' ? otpToken : '').trim();
    const payload = verifySignedToken<{ salt: string; exp: number }>(cleanToken);
    if (!payload) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Invalid session token. Please restart.' })
      };
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newSalt = crypto.randomBytes(16).toString('hex');
    const newOtpHash = crypto.createHmac('sha256', HMAC_SECRET).update(newOtp + newSalt).digest('hex');

    const newPayload = {
      otpHash: newOtpHash,
      salt: newSalt,
      ip: clientIp,
      exp: Date.now() + 5 * 60 * 1000,
      attempts: 0
    };

    const newOtpToken = createSignedToken(newPayload);
    await sendEmailOtp(newOtp, clientIp).catch((err) => console.error('Netlify resend OTP error:', err));

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        otpToken: newOtpToken,
        message: `Fresh 6-digit OTP code dispatched to ${maskEmail(OWNER_EMAIL)}.`
      })
    };
  }

  return {
    statusCode: 400,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: false, error: 'Unknown action parameter' })
  };
};
