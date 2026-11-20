class TaskScheduler {
    constructor(concurrencyLimit) {
        this.limit = concurrencyLimit; 
        this.running = 0;              
        this.queue = [];               
    }

    // Method to add a task (a function returning a Promise)
    addTask(task) {
        return new Promise((resolve, reject) => {
        
            const execute = () => {
                this.running++;
                task()
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        this.running--;
                        this.next(); 
                    });
            };

            
            if (this.running < this.limit) {
                execute();
            } else {
                this.queue.push(execute);
            }
        });
    }

   
    next() {
        if (this.running < this.limit && this.queue.length > 0) {
            const nextTask = this.queue.shift();
            nextTask();
        }
    }
}


const createAsyncTask = (id, delay) => () => {
    return new Promise((resolve) => {
        console.log(`[Start] Task ${id} started (Active tasks: ${scheduler.running})`);
        setTimeout(() => {
            console.log(`[Done]  Task ${id} finished after ${delay}ms`);
            resolve(`Result ${id}`);
        }, delay);
    });
};


const scheduler = new TaskScheduler(3);


const tasks = [
    createAsyncTask(1, 2000),
    createAsyncTask(2, 1000),
    createAsyncTask(3, 1500),
    createAsyncTask(4, 1000),
    createAsyncTask(5, 500),
    createAsyncTask(6, 1200)
];

tasks.forEach((task) => scheduler.addTask(task));