import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.ts';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity.js';
import { User } from 'src/auth/user.entity.js';

@Injectable()
export class TasksService {
  /*CONSTRUCTOR ROR DEPENDANCY INJECTION*/
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  // GET ALL TASKS
  async getTask(filterDto: GetTaskFilterDto,user:User): Promise<Task[]> {
    return this.tasksRepository.getTask(filterDto,user);
  }

  // GET TASK BY ID---ASYNC FUNC--USING PROMISE..AND WHERE CLAUSE TO GET THE ID
  async getTaskById(id: string,user:User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id,user } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // CREATE A TASK TO OUR DB
  createTask(createTaskDto: CreateTaskDto,user:User): Promise<Task> {
   
    return this.tasksRepository.createTask(createTaskDto,user);
  }

  // DELETE TASK BY ID
  async deleteTask(id: string,user:User): Promise<void> {
    const result = await this.tasksRepository.delete({ id ,user});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // UPDATE TASK STATUS
  async updateTaskStatus(id: string, status: TaskStatus,user:User): Promise<Task> {
    console.log('status:', status);
    const task = await this.getTaskById(id,user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
