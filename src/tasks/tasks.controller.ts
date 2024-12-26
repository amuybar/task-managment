import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  // dependancies injection in our constructor
  constructor(private tasksService: TasksService) {}
  //   GETT ALL TASKS
  @Get()
  getTasks(@Query() filteDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filteDto).length) {
      return this.tasksService.getTasksWithFilters(filteDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  //  GET TASK BY ID
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  //  CREATE TASK
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  //   DELETE TASK
  @Delete(':id')
  deteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
  //   PATCH TASK
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
