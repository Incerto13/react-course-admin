import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus, Put } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.input";
import { AuthorService } from "./author.service";
import { Author } from "./entity/author.entity";
import { UpdateAuthorDto } from "./dto/update-author.input";



@Controller('authors')
export class AuthorController {
    constructor(
        private readonly authorService: AuthorService
    ) { }

    @Post()
    async createCategory(@Body() createAuthor: CreateAuthorDto) {
        return this.authorService.create(createAuthor)
    }

    @Get()
    async getCategories(): Promise<Author[]> {
        return await this.authorService.findAll()
    }

    @Get('/:id')
    async getCategory(@Param('id') id: number): Promise<Author> {
        return await this.authorService.findOne(id)
    }

    @Put(':id')
    async updateOne(
        @Param('id') id: number, 
        @Body() updateAuthor: UpdateAuthorDto
    ): Promise<Author> {
        const updatedAuthor = await this.authorService.updateOne(id, updateAuthor);
        return updatedAuthor;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteLabel(@Param('id') id: number): Promise<void> {
        await this.authorService.deleteOne(id);
    }
}