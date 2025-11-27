import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../models/Testimonial';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function debugTestimonials() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        // Check what collection Mongoose is using
        console.log('Model collection name:', Testimonial.collection.name);

        console.log('Fetching testimonials...');
        const testimonials = await Testimonial.find({}).lean();

        console.log(`Found ${testimonials.length} testimonials`);
        if (testimonials.length > 0) {
            console.log('Sample testimonial:', JSON.stringify(testimonials[0], null, 2));
        } else {
            console.log('No testimonials found. Listing all collections:');
            const collections = await mongoose.connection.db?.listCollections().toArray();
            console.log('Available collections:', collections?.map(c => c.name));
        }

        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (error) {
        console.error('Error:', error);
    }
}

debugTestimonials();
