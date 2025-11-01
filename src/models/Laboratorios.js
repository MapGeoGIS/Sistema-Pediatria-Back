const { DataTypes } = require("sequelize");
const database = require("../db");

const Laboratorios = database.define(
  "Laboratorios",
  {
    id_laboratorio: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_laboratorio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hb_hto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gr_vcm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    n_e_l_m: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plaquetas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ferremia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ferritina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sat_transferrina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b12_ac_folico: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    axa_rin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ves: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tp_kptt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fvw_co_ristocetina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    f_v_vii: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    f_viii_ix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tgo_tgp_fal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grupo_rh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urea_creat_glu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pcd_ldh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tsh_t4l_acatg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c3_c4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fr_ana_anca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acl_beta2glicop_acacl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    veb_cmv_agvhb_hiv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proteinograma: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    game: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pamo_cf_cg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bmo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    retis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eco_abdominal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ agrega fecha actual automáticamente
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Laboratorios;
