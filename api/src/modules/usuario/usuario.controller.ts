import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('list')
  async list(): Promise<Usuario[]> {
    return this.usuarioService.List();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async created(@Request() req): Promise<any> {
    const param = req.body;
    return this.usuarioService.save(param.email, param.password, param.name);
  }
}
