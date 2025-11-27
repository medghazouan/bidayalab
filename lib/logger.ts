// Centralized logging utility for production

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    data?: any;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            ...(data && { data })
        };
    }

    private shouldLog(level: LogLevel): boolean {
        // In production, only log warnings and errors
        if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
            return false;
        }
        return true;
    }

    info(message: string, data?: any) {
        if (this.shouldLog('info')) {
            const log = this.formatLog('info', message, data);
            console.log(`[INFO] ${log.timestamp}: ${message}`, data || '');
        }
    }

    warn(message: string, data?: any) {
        if (this.shouldLog('warn')) {
            const log = this.formatLog('warn', message, data);
            console.warn(`[WARN] ${log.timestamp}: ${message}`, data || '');
        }
    }

    error(message: string, error?: any) {
        if (this.shouldLog('error')) {
            const log = this.formatLog('error', message, error);
            // In production, you might want to send errors to a monitoring service
            console.error(`[ERROR] ${log.timestamp}: ${message}`, error || '');

            // TODO: Integrate with error tracking service (e.g., Sentry)
            // if (process.env.NODE_ENV === 'production') {
            //   sendToErrorTracking(log);
            // }
        }
    }

    debug(message: string, data?: any) {
        if (this.shouldLog('debug')) {
            const log = this.formatLog('debug', message, data);
            console.debug(`[DEBUG] ${log.timestamp}: ${message}`, data || '');
        }
    }
}

export const logger = new Logger();
