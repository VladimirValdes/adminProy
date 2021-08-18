import { Usuario } from "../models/user.model";

export interface cargaUsuarios {
    total: number;
    usuarios: Usuario[];
    desde: number;
}