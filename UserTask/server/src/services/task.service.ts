import { getRepository } from 'typeorm'
import Task from '../models/task.entity'
import User from '../models/user.entity'

class TaskService {
  private taskRepository
  private userRepository

  constructor() {
    this.taskRepository = getRepository(Task)
    this.userRepository = getRepository(User)
  }

  public createTask = async (body, accountId: number) => {
    const userId = body?.user?.id
    const user = await this.userRepository.findOne(userId)
    if (!user) {
      const error: any = new Error(`User with id = ${userId} not found.`)
      error.status = 404
      throw error
    }
    if (user.isDemo || user.ownerId !== accountId) {
      const error: any = new Error('Cannot assign task to this user.')
      error.status = 403
      throw error
    }

    const newTask = this.taskRepository.create({
      ...body,
      ownerId: accountId,
      isDemo: false,
      user: user,
    })
    await this.taskRepository.save(newTask)
    return newTask
  }

  public getAllTasks = async (accountId: number) => {
    const tasks = await this.taskRepository.find({
      where: [{ ownerId: accountId }, { isDemo: true }],
      relations: ['user'],
    })
    return tasks
  }

  public getTaskByIdUser = async (id: any, accountId: number) => {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      const error: any = new Error(`User with id = ${id} not found.`)
      error.status = 404
      throw error
    }
    if (!user.isDemo && user.ownerId !== accountId) {
      const error: any = new Error('Forbidden')
      error.status = 403
      throw error
    }
    const task = await this.taskRepository.find({ user: user })
    return task
  }

  public editTask = async (id, body, accountId: number) => {
    const existing = await this.taskRepository.findOne(id)
    if (!existing) {
      const error: any = new Error(`Task with id = ${id} not found.`)
      error.status = 404
      throw error
    }
    if (existing.isDemo) {
      const error: any = new Error('Demo records cannot be edited.')
      error.status = 403
      throw error
    }
    if (existing.ownerId !== accountId) {
      const error: any = new Error('Forbidden')
      error.status = 403
      throw error
    }

    await this.taskRepository.update(id, body)
    const updatedTask = await this.taskRepository.findOne(id)
    if (updatedTask) {
      return updatedTask
    } else {
      const error: any = new Error(`Task with id = ${id} not found.`)
      error.status = 404
      throw error
    }
  }

  public deleteTask = async (id, accountId: number) => {
    const existing = await this.taskRepository.findOne(id)
    if (!existing) {
      const error: any = new Error(`Task with id=${id} not found.`)
      error.status = 404
      throw error
    }
    if (existing.isDemo) {
      const error: any = new Error('Demo records cannot be deleted.')
      error.status = 403
      throw error
    }
    if (existing.ownerId !== accountId) {
      const error: any = new Error('Forbidden')
      error.status = 403
      throw error
    }

    const deleteResponse = await this.taskRepository.delete(id)
    if (deleteResponse.affected !== 0) {
      return 'Ok'
    } else {
      const error: any = new Error(`Task with id=${id} not found.`)
      error.status = 404
      throw error
    }
  }
}

export default TaskService
