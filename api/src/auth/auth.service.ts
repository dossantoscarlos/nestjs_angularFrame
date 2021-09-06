import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const usuarios = await this.usuarioService.findOne(email);
    usuarios.forEach((usuario) => {
      if (usuario && usuario.password === pass) {
        const { ...result } = usuario;
        return result;
      } else {
        return null;
      }
    });
    return usuarios;
  }
}
