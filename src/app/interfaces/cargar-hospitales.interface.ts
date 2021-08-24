import { Hospitales } from "../models/hospital.model";

export interface cargaHospitales {
    total: number;
    hopitales: Hospitales[];
    desde: number;
}