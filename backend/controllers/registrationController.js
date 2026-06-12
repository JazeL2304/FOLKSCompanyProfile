const supabase = require('../db/supabase')

const getAll = async (req, res) => {
    const { data, error } = await supabase
        .from('registrations')
        .select('*, programs(title, level)')
        .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ message: error.message })
    res.json(data)
}

const create = async (req, res) => {
    const { student_name, phone, program_id, notes, gender } = req.body
    const { data, error } = await supabase
        .from('registrations')
        .insert([{ student_name, phone, program_id, notes, gender, status: 'pending' }])
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.status(201).json(data[0])
}

const updateStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const { data, error } = await supabase
        .from('registrations')
        .update({ status })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.json(data[0])
}

const remove = async (req, res) => {
    const { id } = req.params
    const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ message: error.message })
    res.json({ message: 'Registrasi berhasil dihapus' })
}

module.exports = { getAll, create, updateStatus, remove }