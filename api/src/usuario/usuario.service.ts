import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async List(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(username: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({ where: { email: username } });
  }
}
