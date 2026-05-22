const supabase = require('../db/supabase')

const getAll = async (req, res) => {
    const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ message: error.message })
    res.json(data)
}

const getOne = async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return res.status(404).json({ message: 'Program tidak ditemukan' })
    res.json(data)
}

const create = async (req, res) => {
    const { title, level, category, description, price, features, active } = req.body
    const { data, error } = await supabase
        .from('programs')
        .insert([{ title, level, category: category || 'General', description, price, features, active }])
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.status(201).json(data[0])
}

const update = async (req, res) => {
    const { id } = req.params
    const { title, level, category, description, price, features, active } = req.body
    const { data, error } = await supabase
        .from('programs')
        .update({ title, level, category, description, price, features, active })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.json(data[0])
}

const remove = async (req, res) => {
    const { id } = req.params
    const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ message: error.message })
    res.json({ message: 'Program berhasil dihapus' })
}

module.exports = { getAll, getOne, create, update, remove }