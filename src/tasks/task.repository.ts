import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum.ts';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async gettask(filterDto:GetTaskFilterDto):Promise<Task[]>{
   const query=this.createQueryBuilder('task');
   const {status,search} = filterDto;

   const task= await query.getMany();
   if(status){
     query.andWhere('task.status = :status', { status });
   }
   if(search){
        query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` });
   }

    return task;
  }
  async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
     const { title, description } = createTaskDto;

     const newTask = this.create({
       title,
       description,
       status: TaskStatus.OPEN,
     });

     await this.save(newTask);

     return newTask;
  }
}
