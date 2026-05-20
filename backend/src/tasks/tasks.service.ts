import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(userId: string, dto: CreateTaskDto): Promise<TaskDocument> {
    return this.taskModel.create({ ...dto, userId: new Types.ObjectId(userId) });
  }

  async findAll(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 });
  }

  async findOne(userId: string, taskId: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId.toString() !== userId) throw new ForbiddenException();
    return task;
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto): Promise<TaskDocument> {
    const task = await this.findOne(userId, taskId);
    Object.assign(task, dto);
    return task.save();
  }

  async remove(userId: string, taskId: string): Promise<{ message: string }> {
    await this.findOne(userId, taskId);
    await this.taskModel.findByIdAndDelete(taskId);
    return { message: 'Task deleted' };
  }
}
