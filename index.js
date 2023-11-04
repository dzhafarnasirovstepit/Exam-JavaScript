console.clear();

class Task {
    #id;
    #description;
    #cost;

    constructor (id, description, cost) {
        this.#id = id;
        id = "id" + Math.random().toString(16).slice(2);
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

function IncomeTask() {

}

function ExpenseTask() {

}

class TasksController {
    
}

class BudgetController {

}