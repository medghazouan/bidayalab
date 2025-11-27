// Security utilities for production

/**
 * Rate limiting implementation
 */
interface RateLimitStore {
    [key: string]: { count: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = rateLimitStore[identifier];

    // Clean up expired records
    if (record && now > record.resetTime) {
        delete rateLimitStore[identifier];
    }

    // Check if rate limit exceeded
    if (record) {
        if (record.count >= limit) {
            return false; // Rate limit exceeded
        }
        record.count++;
    } else {
        rateLimitStore[identifier] = {
            count: 1,
            resetTime: now + windowMs
        };
    }

    return true; // Request allowed
}

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    return 'unknown';
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
    // Remove any path components
    const basename = filename.split('/').pop() || filename;

    // Remove special characters except dots, hyphens, and underscores
    const sanitized = basename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Limit length
    const maxLength = 255;
    if (sanitized.length > maxLength) {
        const ext = sanitized.split('.').pop();
        const name = sanitized.substring(0, maxLength - (ext ? ext.length + 1 : 0));
        return ext ? `${name}.${ext}` : name;
    }

    return sanitized;
}

/**
 * Validate file type
 */
export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext ? allowedTypes.includes(ext) : false;
}

/**
 * Validate file size
 */
export function isValidFileSize(size: number, maxSizeBytes: number): boolean {
    return size <= maxSizeBytes;
}

/**
 * Generate secure random string
 */
export function generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length];
    }

    return result;
}

/**
 * Basic XSS protection - escape HTML characters
 */
export function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
