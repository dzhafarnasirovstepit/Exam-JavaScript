console.clear();

function Task(id, description, cost) {

    const _id = id;
    const _description = description;
    const _cost = cost;

    Object.defineProperties(this, {

        id: {
            get() {
                return _id;
            }
        },

        description: {
            get() {
                return _description;
            }
        },

        cost: {
            get() {
                return _cost;
            }
        }

    })
}

class IncomeTask {

    #task;

    constructor (description, cost) {
        this.#task = new Task("id" + Math.random().toString(16).slice(2), description, cost);
    }

    makeDone (budget) {
        if (budget && budget.income !== undefined) {
            budget.income += this.#task.cost;
        }
    }

    makeUnDone (budget) {
        if (budget && budget.income !== undefined) {
            budget.income -= this.#task.cost;
        }
    }
    
}

class ExpenseTask {

    #task;


    constructor (description, cost) {
    
        this.#task = new Task("id" + Math.random().toString(16).slice(2), description, cost);
    }

    makeDone (budget) {
        if (budget && budget.expenses !== undefined) {
            budget.expenses += this.#task.cost;
        }
    }

    makeUnDone (budget) {
        if (budget && budget.expenses !== undefined) {
            budget.expenses -= this.#task.cost;
        }
    }

}


/* class TasksController {

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

        this.delete = function (taskList) {
            const indexOfTaskList = taskList.indexOf(taskList);

            if (indexOfTaskList !== -1) {
                taskList.splice(indexOfTaskList, 1);
            }
        }

        this.getTasksSortedBy = function () {
            return taskList.sort(function (a, b) {
                if (a > b) return 1;
                if (a < b) return -1;

                return 0;
            });
        }

        this.getFilteredTasks = function (inMainTeam) {
            const filteredFootballPlayers = [];

            for (const taskList of taskList) {
                if (taskList === inMainTeam) {
                    filteredFootballPlayers.push(footballPlayer);
                }
            }
        }


        taskList = [];

    }

}

class BudgetController {

} */


const myIncomeTask = new IncomeTask ('salary', 200);

const myExpensesTask = new ExpenseTask('purchases', 100);

const myBudget = {
    income: 500,
    expenses: 200,
};

console.log('Current budget is', myBudget);

myIncomeTask.makeUnDone(myBudget);
myExpensesTask.makeDone(myBudget);

console.log('Budget after tasks is', myBudget);