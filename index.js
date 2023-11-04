console.clear();

class Task {
    #id;
    #description;
    #cost;

    constructor (id, description, cost) {
        this.#id = id
        this.#description = description;
        this.#cost = cost;
    }

    get id() {
        return this.#id;
    }

    get description() {
        return this.#description;
    }

    get cost() {
        return this.#cost;
    }

}

function IncomeTask(id, description, cost) {

    const _task = new Task (id, description, cost);

    this.makeDone = {

    }

    this.makeUnDone = {

    }

}

function ExpenseTask(id, description, cost) {

    const _task = new Task (id, description, cost);

    this.makeDone = {

    }

    this.makeUnDone = {

    }


}

class TasksController {

    #tasks;

    constructor(tasks) {

        this.#tasks = taskList;

        Object.defineProperty(this, 'taskList', {
            get() {
                return taskList;
            }
        })
        
        this.addTasks = function (...taskList) {
            taskList.push(...taskList);
        }
        
        this.delete = function(taskList) {
            const indexOfTaskList = taskList.indexOf(taskList);

            if (indexOfTaskList !== -1) {
                taskList.splice(indexOfTaskList, 1);
            }
        }

        this.getTasksSortedBy = function() {
            return taskList.sort(function(a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
    
                return 0;
            });
        }

        this.getFilteredTasks = function(inMainTeam) {
            const filteredFootballPlayers = [];
    
            for(const footballPlayer of _footballPlayers) {
                if (footballPlayer === inMainTeam) {
                    filteredFootballPlayers.push(footballPlayer);
                }
            }
    }

    taskList = [];
    
}

class BudgetController {

}