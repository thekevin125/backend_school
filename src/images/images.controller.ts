import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importar los decoradores de Swagger

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

@Controller('images')
@ApiTags('Images') // Etiqueta para agrupar los endpoints de imágenes
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApiOperation({ summary: 'Subir una imagen a Cloudinary' }) // Descripción de la operación
  @ApiBody({ description: 'Imagen que se subirá', type: String }) // Descripción del cuerpo de la solicitud
  @ApiResponse({ status: 201, description: 'Imagen subida exitosamente', type: Object })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: file.path }; // URL generada por Cloudinary
  }

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de imágenes' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de imágenes', type: [String] }) // Lista de URLs de imágenes
  async listImages() {
    const images = await this.imagesService.listImages();
    return { images };
  }

  @Get(':publicId')
  @ApiOperation({ summary: 'Obtener una imagen por su publicId' }) // Descripción de la operación
  @ApiParam({ name: 'publicId', description: 'ID público de la imagen en Cloudinary' }) // Parámetro publicId
  @ApiResponse({ status: 200, description: 'Imagen encontrada', type: String }) // Respuesta con URL de la imagen
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  async getImage(@Param('publicId') publicId: string) {
    const imageUrl = await this.imagesService.getImage(publicId);
    return { imageUrl };
  }

  @Delete(':publicId')
  @ApiOperation({ summary: 'Eliminar una imagen por su publicId' }) // Descripción de la operación
  @ApiParam({ name: 'publicId', description: 'ID público de la imagen en Cloudinary' }) // Parámetro publicId
  @ApiResponse({ status: 200, description: 'Imagen eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  async deleteImage(@Param('publicId') publicId: string) {
    await this.imagesService.deleteImage(publicId);
    return { message: 'Image deleted successfully' };
  }
}
