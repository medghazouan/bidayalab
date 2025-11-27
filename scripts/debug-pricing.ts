import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PricingPlan from '../models/PricingPlan';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function debugPricing() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        console.log('Fetching from collection: pricing_plans');
        // Explicitly using the model which I updated to point to 'pricing_plans'
        const plans = await PricingPlan.find({}).lean();

        console.log(`Found ${plans.length} plans`);
        if (plans.length > 0) {
            console.log('Sample plan:', JSON.stringify(plans[0], null, 2));
        } else {
            // Fallback check: list all collections to see if we have a typo
            const collections = await mongoose.connection.db?.listCollections().toArray();
            console.log('Available collections:', collections?.map(c => c.name));
        }

        await mongoose.disconnect();
        console.log('Disconnected');
    } catch (error) {
        console.error('Error:', error);
    }
}

debugPricing();
