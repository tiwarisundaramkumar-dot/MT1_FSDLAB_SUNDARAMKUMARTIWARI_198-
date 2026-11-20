console.log("1. Synchronous: Start of script");


setTimeout(() => {
    console.log("2. setTimeout: Macrotask 1 executed");
}, 0);


Promise.resolve().then(() => {
    console.log("3. Promise.then: Microtask 1 executed");
});


queueMicrotask(() => {
    console.log("4. queueMicrotask: Microtask 2 executed");
});


setTimeout(() => {
    console.log("5. setTimeout: Macrotask 2 executed");
}, 0);

console.log("6. Synchronous: End of script");