import { Controller, Post, Body, Get, Param, Delete, Put, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.input";
import { CourseService } from "./course.service";
import { Course } from "./entity/course.entity";
import { UpdateCourseDto } from "./dto/update-course.input";



@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService
    ) { }

    @Post()
    async createCourse(@Body() createTask: CreateCourseDto) {
        return this.courseService.create(createTask)
    }

    @Get()
    async getCourses(): Promise<Course[]> {
        return await this.courseService.findAll()
    }

    @Get('/:id')
    async getCourse(@Param('id') id: number): Promise<Course> {
        return await this.courseService.findOne(id)
    }

    @Put('/:id')
    async updateCourse(
        @Param('id') id: number, 
        @Body() updateTask: UpdateCourseDto
    ): Promise<Course> {
        const updatedTask = await this.courseService.updateOne(id, updateTask);
        return updatedTask;
    }



    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async deleteTask(@Param('id') id: number): Promise<void> {
        await this.courseService.deleteOne(id);
    }
}