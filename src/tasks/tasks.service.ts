import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum.ts';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
  /*CONSTRUCTOR ROR DEPENDANCY INJECTION*/
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  // GET ALL TASKS
  async getTask(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.gettask(filterDto);
  }

  // GET TASK BY ID---ASYNC FUNC--USING PROMISE..AND WHERE CLAUSE TO GET THE ID
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // CREATE A TASK TO OUR DB
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // DELETE TASK BY ID
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // UPDATE TASK STATUS
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    console.log('status:', status);
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
