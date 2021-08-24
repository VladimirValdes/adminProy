import { Medicos } from "../models/medicos.moderl";

export interface cargaMedicos {
    total: number;
    medicos: Medicos[];
    desde: number;
}