import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    const data = this.tasks;
    return data;
  }
  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let task = this.getAllTasks();
    if (status) {
      task = task.filter((T) => T.status === status);
    }
    if (search) {
      task = task.filter((S) => {
        if (S.title.includes(search) || S.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return { ...task };
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
