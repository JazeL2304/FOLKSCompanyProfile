const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xcjvxqfkpsyztztdykhu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MDvKuNObvRHBU78QhNEWzw_D0HhIMVf'; // Anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    console.log('Mengambil data program...');
    const { data: programs, error } = await supabase.from('programs').select('id, title, category, level, price');
    
    if (error) {
        console.error('Error fetching:', error);
        return;
    }

    console.log(`Ditemukan ${programs.length} program. Sedang memperbarui harga...`);

    for (const prog of programs) {
        let newPrice = 0;
        
        // Harga masuk akal & terjangkau (dalam Rupiah)
        if (prog.category === 'General') {
            if (prog.level === 'SD') newPrice = 150000;
            else if (prog.level === 'SMP') newPrice = 200000;
            else if (prog.level === 'SMA') newPrice = 250000;
            else newPrice = 200000;
        } else if (prog.category === 'Conversation') {
            newPrice = 250000; // Harga flat untuk conversation
        } else if (prog.category === 'ESP') {
            newPrice = 350000; // Harga ESP lebih mahal sedikit
        } else if (prog.category === 'Professional Business') {
            newPrice = 500000; // Harga profesional paling mahal tapi tetap terjangkau
        } else {
            newPrice = 200000; // Default
        }

        const { error: updErr } = await supabase
            .from('programs')
            .update({ price: newPrice })
            .eq('id', prog.id);
            
        if (updErr) {
            console.error(`Gagal update harga untuk ${prog.title}:`, updErr);
        } else {
            console.log(`Update [${prog.category}] ${prog.title} -> Rp ${newPrice.toLocaleString('id-ID')}`);
        }
    }

    console.log('Selesai memperbarui harga program!');
}

run();
