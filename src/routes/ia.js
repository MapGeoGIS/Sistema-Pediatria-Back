const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();
const Resumenes = require('../models/Resumenes');
const Pacientes = require('../models/Pacientes');
const Consultas = require('../models/Consultas');
const { generateClinicalSummary } = require('../helpers/iaResumeGenerator');
const { verifyToken, verifyRole } = require("../middlewares/auth");


// POST crear resumen (solo admin)
router.post("/:id", verifyToken, verifyRole("admin"), async (req, res) => {

    // obtener paciente por id
    let paciente;
    try {
        paciente = await Pacientes.findByPk(req.params.id);
        if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    } catch (err) {
        return res.status(400).json({ error: "Error al obtener paciente" });

    }

    // verificar si existe un resumen para el paciente
    let resumeIAstored;
    try {
        resumeIAstored = await Resumenes.findOne({ where: { id_paciente: paciente.id_paciente } });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Error al verificar resumen" });
    }

    // si el resumen existe, veirificar que este actualizado
    if (resumeIAstored) {
        // obtengo la consulta mas actual
        const consultaMasActual = await Consultas.findOne(
            {
                where: { origin_id_paciente: paciente.origin_id },
                order: [
                    [Sequelize.literal("GREATEST(COALESCE(\"updatedAt\",'1970-01-01'::timestamp), \"createdAt\")"), 'DESC']
                ]
            });
        // comparo fechas de resumen con la consulta mas actual
        const fechaResumen = new Date(resumeIAstored.updatedAt);
        const fechaConsulta = new Date(consultaMasActual.updatedAt);
        if (fechaResumen > fechaConsulta)
            return res.status(200).json(resumeIAstored);
    
    }

    // el resumen no existe o no esta actualizado

    // obtener el consultas por id paciente
    let consultas;
    try {
        consultas = await Consultas.findAll({ where: { origin_id_paciente: paciente.origin_id } });
        if (!consultas) return res.status(400).json({ error: 'el paciente no tiene consultas' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error al procesar las consultas' });
    }

    // crear el resumen llamando a la IA
    let resumeIaGenerated;
    try {
        resumeIaGenerated = await generateClinicalSummary(paciente, consultas);
        // return res.status(201).json(resumen);
    } catch (err) {
        return res.status(500).json({ error: "Error al crear resumen", details: err.message});
    }

    // almacenar el resumen en la base de datos
    try {
        const resumeIaNew = await Resumenes.create(
            { 
                id_paciente: paciente.id_paciente, 
                origin_id: paciente.origin_id,
                createdAt: new Date(),
                evoluciones: 0,
                consultas: consultas.length,
                resumen: resumeIaGenerated,
            });
        return res.status(201).json(resumeIaNew);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al almacenar resumen", details: error.message });
    }

});

module.exports = router;