const express = require('express');
const router = express.Router();
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const Libro = require('../schemas/Libro');

router.get('/', requiredScopes("read:libros"), async (req, res, next) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Error al obtener los libros"});
    };
});

router.post('/', requiredScopes("write:libros"), async (req, res, ) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({error: "Error al crear un nuevo libro"});
    }
});

router.put('/:id', requiredScopes("write:libros"), async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(libro)
    } catch (error) {
        res.status(500).json({error: "Error al actualizar el libro"})
    }
});

router.delete('/:id', requiredScopes("write:libros"), async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: "Libro eliminado correctamente"})
    } catch (error) {
        res.status(5000).json({error: "Error al eliminar el Libro"})
    }
});

module.exports = router;