import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { rateLimit, getClientIp, sanitizeFilename, isValidFileType, isValidFileSize } from "@/lib/security";
import { logger } from "@/lib/logger";

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'pdf'];

export async function POST(request: Request) {
    try {
        // Authentication check
        const session = await auth();
        if (!session || !session.user) {
            logger.warn('Upload attempt without authentication');
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Rate limiting
        const clientIp = getClientIp(request);
        if (!rateLimit(`upload_${clientIp}`, 10, 60000)) { // 10 uploads per minute
            logger.warn(`Rate limit exceeded for IP: ${clientIp}`);
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // File size validation
        if (!isValidFileSize(file.size, MAX_FILE_SIZE)) {
            logger.warn(`File too large: ${file.size} bytes, max: ${MAX_FILE_SIZE}`);
            return NextResponse.json(
                { error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
                { status: 400 }
            );
        }

        // File type validation
        if (!isValidFileType(file.name, ALLOWED_TYPES)) {
            logger.warn(`Invalid file type: ${file.name}`);
            return NextResponse.json(
                { error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` },
                { status: 400 }
            );
        }

        // Sanitize filename
        const timestamp = Date.now();
        const originalName = sanitizeFilename(file.name);
        const filename = `${timestamp}-${originalName}`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        const fileUrl = `/uploads/${filename}`;

        logger.info(`File uploaded successfully: ${filename}`, {
            user: session.user.email,
            size: file.size,
            type: file.type
        });

        return NextResponse.json({
            url: fileUrl,
            filename,
            size: file.size
        });

    } catch (error) {
        logger.error('File upload failed', error);
        return NextResponse.json(
            { error: "File upload failed" },
            { status: 500 }
        );
    }
}
