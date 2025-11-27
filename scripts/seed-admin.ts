const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@bidayalab.com';
        const password = 'admin123';
        const name = 'Super Admin';

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await Admin.create({
            name,
            email,
            passwordHash,
            role: 'admin',
        });

        console.log(`Admin created successfully: ${email} / ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
