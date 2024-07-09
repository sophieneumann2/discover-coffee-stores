import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get('longLat') || '';
    const limit = searchParams.get('limit') || '';

    if (longLat) {
      const response = await fetchCoffeeStores(
        '-73.986732,40.757046',
        parseInt(limit),
      );
      return NextResponse.json(response);
    }
  } catch (error) {
    NextResponse.json(`Error while fetching coffee stores ${error}`, {
      status: 500,
    });
  }
}
