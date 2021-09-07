import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async List(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async auth(username: string, pass: string): Promise<Usuario> {
    const find = await this.usuarioRepository.find({
      where: { email: username },
      take: 1,
    });

    const findOne = await this.usuarioRepository.findOne(find[0].id);
    const usuario = { ...findOne };
    const validaPassword = await this.comparePassword(pass, usuario.password);

    if (usuario && validaPassword) {
      const { ...result } = usuario;
      return result;
    } else {
      return null;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(
    password: string,
    passwordSql: string,
  ): Promise<boolean> {
    const hash = await bcrypt.compare(password, passwordSql);
    return hash;
  }
}
