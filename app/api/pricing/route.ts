// app/api/pricing/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { PRICING_PLAN_COLLECTION, PricingPlan } from '@/models/PricingPlan';

export async function GET() {
  try {
    console.log('📦 Fetching pricing plans...');
    
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    const plans = await db
      .collection(PRICING_PLAN_COLLECTION)
      .find({})
      .sort({ price: 1 })
      .toArray();
    
    console.log(`✅ Found ${plans.length} pricing plans`);
    
    return NextResponse.json(plans);
  } catch (error) {
    console.error('❌ Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}

// ✅ Optional: POST method for creating plans (for future admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const client = await clientPromise;
    const db = client.db('meddigital');
    
    const newPlan: PricingPlan = {
      name: body.name,
      tagline: body.tagline,
      price: body.price,
      currency: body.currency || 'MAD',
      period: body.period || 'one-time',
      description: body.description,
      features: body.features || [],
      popular: body.popular || false,
      isCustom: body.isCustom || false,
      createdAt: new Date()
    };
    
    const result = await db
      .collection(PRICING_PLAN_COLLECTION)
      .insertOne(newPlan);
    
    console.log('✅ Created pricing plan:', result.insertedId);
    
    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error creating pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to create pricing plan' },
      { status: 500 }
    );
  }
}
