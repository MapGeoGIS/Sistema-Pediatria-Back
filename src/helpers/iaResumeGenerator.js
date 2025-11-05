require("dotenv").config();

const OPENAI_MODEL = process.env.OPENAI_IA_MODEL || "gpt-4o-mini";

const toPlainObject = (record) => {
	if (!record || typeof record !== "object") return record || {};
	if (typeof record.toJSON === "function") return record.toJSON();
	if (typeof record.get === "function") return record.get({ plain: true });
	return record;
};

const formatDate = (value) => {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return String(value);
	return date.toISOString().split("T")[0];
};

const sanitisePaciente = (paciente) => {
	const plain = toPlainObject(paciente);
	return {
		id_paciente: plain.id_paciente,
		origin_id: plain.origin_id,
		nombre: plain.nombre,
		apellido: plain.apellido,
		fecha_nac: formatDate(plain.fecha_nac),
		sexo: plain.sexo,
		edad_texto: plain.edad,
		diagnostico: plain.diagnostico,
		enfermedad_base: plain.enfermedad_base,
		localidad: plain.localidad,
		especialidad: plain.especialidad,
		ant_perinatales: plain.ant_perinatales,
		ant_familiares: plain.ant_familiares,
		createdAt: plain.createdAt ? new Date(plain.createdAt).toISOString() : null,
		updatedAt: plain.updatedAt ? new Date(plain.updatedAt).toISOString() : null,
	};
};

const sanitiseConsultas = (consultas) => {
	const list = Array.isArray(consultas) ? consultas : [];
	return list
		.map(toPlainObject)
		.map((consulta) => ({
			id_consulta: consulta.id_consulta,
			fecha_consulta: formatDate(consulta.fecha_consulta),
			edad: consulta.edad,
			uni_edad: consulta.uni_edad,
			edad_texto: consulta.edad_texto,
			peso: consulta.peso,
			talla: consulta.talla,
			imc: consulta.imc,
			pc: consulta.pc,
			motivo: consulta.motivo,
			conducta: consulta.conducta,
			createdAt: consulta.createdAt ? new Date(consulta.createdAt).toISOString() : null,
			updatedAt: consulta.updatedAt ? new Date(consulta.updatedAt).toISOString() : null,
		}))
		.sort((a, b) => {
			const dateA = a.fecha_consulta ? new Date(a.fecha_consulta) : null;
			const dateB = b.fecha_consulta ? new Date(b.fecha_consulta) : null;
			if (!dateA || Number.isNaN(dateA)) return 1;
			if (!dateB || Number.isNaN(dateB)) return -1;
			return dateA - dateB;
		});
};

const buildConsultasSummary = (consultas) => {
	if (!consultas.length) return "Sin consultas registradas";
	return consultas
		.map((consulta, index) => {
			const sections = [
				`Consulta #${index + 1} (${consulta.fecha_consulta || "fecha desconocida"})`,
				`Motivo: ${consulta.motivo || "No especificado"}`,
				`Conducta: ${consulta.conducta || "No registrada"}`,
			];

			const medidas = [
				consulta.peso != null ? `peso ${consulta.peso}` : null,
				consulta.talla != null ? `talla ${consulta.talla}` : null,
				consulta.imc != null ? `IMC ${consulta.imc}` : null,
				consulta.pc != null ? `PC ${consulta.pc}` : null,
			].filter(Boolean);

			if (medidas.length) {
				sections.push(`Medidas: ${medidas.join(", ")}`);
			}

			sections.push(
				`Edad registrada: ${consulta.edad_texto || consulta.edad || "No informada"} ${
					consulta.uni_edad || ""
				}`.trim()
			);

			return sections.join("\n");
		})
		.join("\n\n---\n\n");
};

const ensureApiKey = () => {
	if (!process.env.OPENAI_API_KEY) {
		throw new Error("Falta configurar la variable OPENAI_API_KEY");
	}
};

const createChain = async () => {
	const [{ PromptTemplate }, { ChatOpenAI }, { StringOutputParser }] = await Promise.all([
		import("@langchain/core/prompts"),
		import("@langchain/openai"),
		import("@langchain/core/output_parsers"),
	]);

	const prompt = new PromptTemplate({
		inputVariables: ["paciente", "consultas"],
		template: `### preparacion de datos de paciente y evoluciones
        Paciente: {paciente}
        Evoluciones: {consultas}
        ### Preparacion de Prompt
        Eres un asistente que ayuda a redactar notas medicas a partir de los datos del paciente y sus evoluciones. Tu tarea es generar un resumen de la historia clinica del paciente, incluyendo los datos relevantes de las evoluciones.
        Debes tener en cuenta:
            - que las evoluciones pueden tener diferentes formatos y contenidos, por lo que debes ser capaz de interpretar y sintetizar la informacion de manera coherente.
            - cruzar informacion de las diferentes evoluciones para identificar patrones, cambios y tendencias en la salud del paciente.
            - cruzar los antecendentes personales y familiares del paciente, asi como su diagnostico y enfermedad base.
        ### Salida esperada:
        Se espera que la salida sea un texto en pocos parrafos.
        El texto debe ser claro y conciso, utilizando lenguaje medico apropiado.
        Al comenzar la redaccion, incluye una breve introduccion con los datos personales del paciente (nombre, edad, diagnostico -si es que lo tiene-, enfermedad base -si es que lo tiene-).
        Cada patron, tendencia o cambio identificado debe ser explicado de manera clara y breve precisa en un parrafo aparte, utilizando como dato de referencia la fecha de la evolucion en la que se toma la informacion.
        No debes:
            - enumerar las evoluciones ni copiar literalmente su contenido.
            - incluir informacion sobre obras sociales ni numero de documento. 
            - confundir el termino "Control de salud" con diagnosticos ni enfermedades. simplemente obvia ese dato si es que aparece en las evoluciones.
            - confundir "Otra" con diagnosticos ni enfermedades. simplemente obvia ese dato si es que aparece en las evoluciones.
            - inventar informacion que no este presente en los datos del paciente y sus evoluciones.
        ### Formato del texto de salida:
        - usar formato HTML para los parrafos, utilizando etiquetas <p> para cada parrafo.
        - separar los parrafos con saltos de linea (usa saltos de linea reales, no secuencias escapadas como "\\n").
        - NO envolver la salida entre comillas ni devolverla como JSON-encoded string.
        - no reemplazar caracteres especiales por secuencias escapadas (p. ej. no devolver \\n, \\t, \\r, ni comillas escapadas).
        - usar listas o viñetas en caso de necesitar enumerar items.
        `,
	});

	const llm = new ChatOpenAI({
		model: OPENAI_MODEL,
		apiKey: process.env.OPENAI_API_KEY,
		temperature: 0.7,
	});

	return prompt.pipe(llm).pipe(new StringOutputParser());
};

const generateClinicalSummary = async (paciente, consultas) => {
	ensureApiKey();

	const safePaciente = sanitisePaciente(paciente);
	const safeConsultas = sanitiseConsultas(consultas);

	const chain = await createChain();

	try {
		const response = await chain.invoke({
			paciente: JSON.stringify(safePaciente, null, 2),
			consultas: buildConsultasSummary(safeConsultas),
		});
        const cleanText = response
            .replace(/\\n/g, '\n') // Convierte "\n" en saltos reales
            .replace(/\n{2,}/g, '\n\n') // Normaliza dobles saltos
            .trim();

            console.log(cleanText);
		return typeof cleanText === "string" ? cleanText : "";
	} catch (error) {
		const message = "Error al generar el resumen clínico con OpenAI";
		const customError = new Error(error.message || message);
		customError.cause = error;
		throw customError;
	}
};

module.exports = {
	generateClinicalSummary,
};
