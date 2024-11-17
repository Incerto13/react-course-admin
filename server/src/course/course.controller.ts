import { Controller, Post, Body, Get, Param, Delete, Put, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto } from "./dto/create-course.input";
import { CourseService } from "./course.service";
import { Course } from "./entity/course.entity";
import { UpdateCourseDto } from "./dto/update-course.input";


@ApiTags('Course')
@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }

    @ApiCreatedResponse({ type: Course })
    @Post()
    async createCourse(@Body() createTask: CreateCourseDto) {
        return this.courseService.create(createTask)
    }

    @ApiOkResponse({ type: Course, isArray: true })
    @Get()
    async getCourses(): Promise<Course[]> {
        return await this.courseService.findAll()
    }

    @ApiOkResponse({ type: Course })
    @Get('/:id')
    async getCourse(@Param('id') id: number): Promise<Course> {
        return await this.courseService.findOne(id)
    }

    @ApiOkResponse({ type: Course })
    @Put('/:id')
    async updateCourse(
        @Param('id') id: number, 
        @Body() updateTask: UpdateCourseDto
    ): Promise<Course> {
        const updatedTask = await this.courseService.updateOne(id, updateTask);
        return updatedTask;
    }

    @ApiNoContentResponse({ description: 'No content' })
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteTask(@Param('id') id: number): Promise<void> {
        await this.courseService.deleteOne(id);
    }
}