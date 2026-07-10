import { Task } from "../Models/TaskModel"

export function formatData  (data: { [key: string]: Task }) {
    const  allTasks : Task[]= []
    const listOfIds = Object.keys(data ?? {})
    const listOfTasks = Object.values(data ?? {})
    listOfTasks.map((task, index) => allTasks.push({ ...task, id: listOfIds[index] }))
   
    return allTasks

}