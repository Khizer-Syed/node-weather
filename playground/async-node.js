console.log(`Staring app`);

setTimeout(() => {
  console.log(`Inside callback`);
}, 2000);

setTimeout(() => {
  console.log(`Second callback works`);
},0);
console.log(`Finishing up`);
