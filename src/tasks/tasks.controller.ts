import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Task Controller')
  constructor(private tasksService: TasksService) {}

  // GET ALL TASKS
  @Get()
  getAllTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retreving all Task. Filters "${JSON.stringify(filterDto)}"`)
    return this.tasksService.getTask(filterDto, user);
  }

  /* GET TASK BY ID */
  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`
      User "${user.username}" trying to retrieve Task with id "${id}"
      `);  
    return this.tasksService.getTaskById(id, user);
  }

  // CREATE TASK CONTROLLER
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
     this.logger.verbose(`
      User "${user.username}" creating a new Task. Data: "${JSON.stringify(
        createTaskDto,
      )}"
      `);
    return this.tasksService.createTask(createTaskDto, user);
  }

  // DELETE TASK CONTROLLER
  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`
      User "${user.username}" trying to delete Task with id "${id}"
      `);
    return this.tasksService.deleteTask(id, user);
  }

  // UPDATE TASK STATUS
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    this.logger.verbose(`
      User "${user.username}" trying to update Task with id "${id}" status to "${status}"
      `);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
