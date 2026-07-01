const supabase = require('../db/supabase')

const getAll = async (req, res) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })

    if (error) return res.status(500).json({ message: error.message })
    res.json(data)
}

const getOne = async (req, res) => {
    const { slug } = req.params
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) return res.status(404).json({ message: 'Artikel tidak ditemukan' })
    res.json(data)
}

const create = async (req, res) => {
    const { title, slug, content, cover_image, author, category, status, featured, excerpt } = req.body
    
    // Pastikan hanya 1 artikel yang featured
    if (featured) {
        await supabase.from('blog_posts').update({ featured: false }).eq('featured', true)
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
            title,
            slug,
            content,
            cover_image,
            author,
            category,
            status: status || 'draft',
            featured: featured || false,
            excerpt,
            published_at: new Date()
        }])
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.status(201).json(data[0])
}

const update = async (req, res) => {
    const { id } = req.params
    const { title, slug, content, cover_image, author, category, status, featured, excerpt } = req.body
    
    // Pastikan hanya 1 artikel yang featured
    if (featured) {
        await supabase.from('blog_posts').update({ featured: false }).eq('featured', true).neq('id', id)
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .update({
            title,
            slug,
            content,
            cover_image,
            author,
            category,
            status,
            featured,
            excerpt
        })
        .eq('id', id)
        .select()

    if (error) return res.status(500).json({ message: error.message })
    res.json(data[0])
}

const remove = async (req, res) => {
    const { id } = req.params
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

    if (error) return res.status(500).json({ message: error.message })
    res.json({ message: 'Artikel berhasil dihapus' })
}

module.exports = { getAll, getOne, create, update, remove }