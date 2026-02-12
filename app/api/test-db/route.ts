import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('landslide_readings')
            .select('*')
            .limit(5);

        if (error) {
            return NextResponse.json({ success: false, error: error.message, details: error }, { status: 500 });
        }

        return NextResponse.json({ success: true, count: data?.length, data });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
