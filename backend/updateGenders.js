const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://xcjvxqfkpsyztztdykhu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MDvKuNObvRHBU78QhNEWzw_D0HhIMVf'; // Anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function guessGender(name) {
    const firstName = name.split(' ')[0].toLowerCase();
    try {
        const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(firstName)}`);
        const data = await response.json();
        if (data && data.gender) {
            // genderize returns 'male' or 'female'
            return data.gender === 'male' ? 'Male' : 'Female';
        }
    } catch (err) {
        console.error(`Gagal nebak nama ${firstName}`, err);
    }
    // Fallback simple dictionary jika API gagal/tidak yakin
    if (['budi', 'agus', 'zainal', 'dika', 'putra'].includes(firstName)) return 'Male';
    if (['siti', 'ayu', 'putri', 'delia', 'nikita', 'mariana', 'erica'].includes(firstName)) return 'Female';
    return null;
}

async function run() {
    console.log('Mengambil data registrasi...');
    const { data: registrations, error } = await supabase.from('registrations').select('id, student_name, gender');
    
    if (error) {
        console.error('Error fetching:', error);
        return;
    }

    const toUpdate = registrations.filter(r => !r.gender);
    console.log(`Ditemukan ${toUpdate.length} data yang belum ada gendernya.`);

    for (const reg of toUpdate) {
        const guessed = await guessGender(reg.student_name);
        if (guessed) {
            console.log(`Update ${reg.student_name} -> ${guessed}`);
            const { error: updErr } = await supabase
                .from('registrations')
                .update({ gender: guessed })
                .eq('id', reg.id);
            if (updErr) console.error(`Gagal update ${reg.student_name}:`, updErr);
        } else {
            console.log(`Tidak bisa menebak gender untuk: ${reg.student_name}`);
        }
    }

    console.log('Selesai!');
}

run();
