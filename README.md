Simple HashTable implementation
using separate chaining

var t = new HashTable();
t.set("Hello", 12);
t.set("Hellogh", 13);
t.set("Helloddf", 15);
console.log(t.get("Helloddfh")); // => undefined
console.log(t.get("Hello"));     // => 12