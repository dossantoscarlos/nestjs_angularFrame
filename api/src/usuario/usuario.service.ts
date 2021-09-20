import { Injectable, Inject } from '@nestjs/common';
import { Index, Repository } from 'typeorm';
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

  async save(email: string, password: string, name: string) {
    try {
      const created = await this.usuarioRepository.insert({
        email: email,
        password: await this.hashPassword(password),
        name: name,
      });
      if (
        created.identifiers[0].id != 0 ||
        created.identifiers[0].id != undefined
      ) {
        return {
          message: 'salvo com sucesso',
          statusCode: 204,
        };
      }
    } catch (error) {
      return { mensagem: error.message, statusCode: error.code };
    }
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
