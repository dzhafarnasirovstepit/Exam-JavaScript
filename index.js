console.clear();

function Task(description, cost) {

    const _id = "id" + Math.random().toString(16).slice(2);
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


class IncomeTask extends Task {

    constructor(description, cost) {
        super(description, cost);
    }

    makeDone(budget) {
        if (budget && budget.income !== undefined) {
            budget.income += this.cost;
        }
    }

    makeUnDone(budget) {
        if (budget && budget.income !== undefined) {
            budget.income -= this.cost;
        }
    }

}

class ExpenseTask extends Task {

    constructor(description, cost) {
        super(description, cost);
    }

    makeDone(budget) {
        if (budget && budget.expenses !== undefined) {
            budget.expenses += this.cost;
        }
    }

    makeUnDone(budget) {
        if (budget && budget.expenses !== undefined) {
            budget.expenses -= this.cost;
        }
    }

}


class TasksController {

    #tasks;

    constructor() {
        this.#tasks = [];
    }

    addTasks(...newTasks) {

        for (const task of newTasks) {
            if (!this.#tasks.some(existingTask => existingTask.id === task.id)) {
                this.#tasks.push(task);
            }
        }
    }

    deleteTask(taskToDelete) {
        const taskIndex = this.#tasks.findIndex(task => task.id === taskToDelete.id);


        if (taskIndex !== -1) {
            this.#tasks.splice(taskIndex, 1);
        }

    }

    getTasks() {
        return this.#tasks;
    }

    getTasksSortedBy(sortBy) {
        const tasksCopy = [...this.#tasks];

        switch (sortBy) {
            case 'description':
                return tasksCopy.sort((a, b) => a.description.localeCompare(b.description));
            case 'status':
                return tasksCopy.sort((a, b) => a.status - b.status);
            case 'cost':
                return tasksCopy.sort((a, b) => b.cost - a.cost);
            default:
                console.error('Incorrect data for sorting tasks');
                return tasksCopy;
        }
    }

    getFilteredTasks(filters) {

        return this.#tasks.filter(task => {
            if (filters.description && !task.description.includes(filters.description)) {
                return false;
            }

            if (filters.hasOwnProperty('isIncome') && typeof filters.isIncome === 'boolean') {

                if (filters.isIncome && !(task instanceof IncomeTask)) {
                    return false;
                }

                if (!filters.isIncome && !(task instanceof ExpenseTask)) {
                    return false;
                }
            }

            if (filters.hasOwnProperty('isCompleted') && typeof filters.isCompleted === 'boolean') {

                if (filters.isCompleted && !task.isCompleted) {
                    return false;
                }

                if (!filters.isCompleted && task.isCompleted) {
                    return false;
                }
            }

            return true;

        });

    }

    markTaskAsDone(doneTask) {
        const task = this.#tasks.find(task => task.id === doneTask.id);
        if (task) {
            task.isCompleted = true;
        }
    }

    markTaskAsUnDone(unDoneTask) {
        const task = this.#tasks.find(task => task.id === unDoneTask.id);
        if (task) {
            task.isCompleted = false;
        }
    }

}

class BudgetController {

    #tasksController;
    #budget;

    constructor (initialBalance = 0) {
        this.#tasksController = new TasksController();

        this.#budget = {
            balance: initialBalance,
            income: 0,
            expenses: 0
        };
    }

    get balance() {
        return this.#budget.balance;
    }

    get income() {
        return this.#budget.income;
    }

    get expenses() {
        return this.#budget.expenses;
    }

    calculateBalance() {
        return this.#budget.balance + this.#budget.income - this.#budget.expenses;
    }

    getTasks() {
        return this.#tasksController.getTasks();
    }

    addTasks (...newTasks) {
        this.#tasksController.addTasks(...newTasks);
    }

    deleteTask(taskToDelete) {

        const taskExists = this.#tasksController.getTasks().some(task => task.id === taskToDelete.id);

        if(!taskExists) {
            console.log("Task ${task.id} isn't recognized");
            return;
        }

        if(taskToDelete.isCompleted) {
            taskToDelete.makeUnDone();
        }

        this.#tasksController.deleteTask(taskToDelete);

    }

    doneTask(taskToMarkDone) {

        const taskExists = this.#tasksController.getTasks().some(task => task.id === taskToMarkDone.id);

        if(!taskExists) {
            console.log("Task ${task.id} isn't recognized");
        }

        if(taskToMarkDone.isCompleted) {
            console.log("Task is already done");
            return;
        }

        taskToMarkDone.makeDone();

    }

    unDoneTask(taskToMarkUnDone) {

        const taskExists = this.#tasksController.getTasks().some(task => task.id === taskToMarkUnDone.id);

        if(!taskExists) {
            console.log("Task ${task.id} isn't recognized");
        }

        if(!taskToMarkUnDone.isCompleted) {
            console.log("Task isn't done before");
            return;
        }

        taskToMarkUnDone.makeUnDone();

    }

}




const myIncomeTask = new IncomeTask('salary', 200);

const myExpensesTask = new ExpenseTask('purchases', 100);

const myBudget = {
    income: 500,
    expenses: 200,
};

console.log('Current budget is', myBudget);

myIncomeTask.makeUnDone(myBudget);
myExpensesTask.makeDone(myBudget);

console.log('Budget after tasks is', myBudget);