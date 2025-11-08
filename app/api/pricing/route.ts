// app/api/pricing/route.ts - OPTIMIZED VERSION
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { PRICING_PLAN_COLLECTION, PricingPlan } from '@/models/PricingPlan';

export async function GET() {
  try {
    const db = await getDatabase();

    // Optimized projection - fetch only needed fields
    const projection = {
      name: 1,
      tagline: 1,
      price: 1,
      currency: 1,
      period: 1,
      description: 1,
      features: 1,
      popular: 1,
      isCustom: 1,
      createdAt: 1,
    };

    const plans = await db
      .collection(PRICING_PLAN_COLLECTION)
      .find({}, { projection })
      .sort({ price: 1 })
      .toArray();

    return NextResponse.json(
      plans.map((plan) => ({
        ...plan,
        _id: plan._id.toString(),
      })),
      {
        headers: {
          // Aggressive caching since pricing rarely changes
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}

// POST - Create new pricing plan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const newPlan = {
      name: body.name,
      tagline: body.tagline,
      price: body.price,
      currency: body.currency || 'MAD',
      period: body.period || 'one-time',
      description: body.description,
      features: body.features || [],
      popular: body.popular || false,
      isCustom: body.isCustom || false,
      createdAt: new Date(),
    };

    const result = await db
      .collection(PRICING_PLAN_COLLECTION)
      .insertOne(newPlan);

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
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