

// crear resumen
export const createResumen = async (req, res) => {
    try {
        const resumen = await Resumen.create(req.body);
        res.status(201).json(resumen);
    } catch (err) {
        res.status(500).json({ error: "Error al crear resumen" });
    }
};

// obtener resumen por ID de paciente
export const getResumenById = async (req, res) => {
    try {
        const resumen = await Resumen.findOne({ where: { id_paciente: req.params.id } });
        if (!resumen) return res.status(404).json({ error: "Resumen no encontrado" });
        res.json(resumen);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener resumen" });
    }
}

// verificar si hay resumen y si el resumen es el mas actualizado respecto de las consultas
/**
 * 1. obtener el resumen mas actual del paciente
 * 2. obtener la consulta mas actual del paciente tanto por fecha de created_at como updated_at
 * 3. comparar las fechas, si la consulta es mas actual que el resumen, null
 * 4. si el resumen es mas actual que la consulta, el resumen
 */
export const obtainLastResumenIfExistsAndIsUpdated = async (id_paciente) => {
    try {
        // obtener el resumen mas reciente
        const resumen = await Resumen.findOne({ where: { id_paciente }, order: [['created_at', 'DESC']] });
        if (!resumen) return false;
        
        // obtener la consulta mas reciente por created_at
        const consulta_last_created = await Consultas.findOne({ where: { origin_id_paciente: id_paciente }, order: [['created_at', 'DESC']] });
        if (!consulta_last_created) return null;
        
        // obtener la consulta mas reciente por updated_at
        const consulta_last_updated = await Consultas.findOne({ where: { origin_id_paciente: id_paciente }, order: [['updated_at', 'DESC']] });

        // si no hay consultas con actualizaciones, solo comparar con created_at
        let date_to_compare = null;
        if (!consulta_last_updated){
            if (resumen.created_at > consulta_last_created) {
                return resumen;
            }
            return null;
        }

        // hay actualizaciones, comparar con la mas reciente entre created_at y updated_at
        if (consulta_last_created.created_at > consulta_last_updated.updated_at) {
            date_to_compare = consulta_last_created.created_at;
        } else {
            date_to_compare = consulta_last_updated.updated_at;
        }
        if (resumen.created_at >= date_to_compare) return resumen;
        return null;
    } catch (err) {
        console.error("Error al verificar si el resumen está actualizado:", err);
        throw new Error("Error al obtener y verificar si el resumen está actualizado");
    }
};