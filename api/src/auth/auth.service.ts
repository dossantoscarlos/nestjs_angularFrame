import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const usuarios = await this.usuarioService.auth(email, pass);
    return usuarios;
  }
}
