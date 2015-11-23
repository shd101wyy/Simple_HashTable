

function hash_function(input_str, hash_table_size) {
	var hash = 0;
	var R = 31; // where R is small prime
	for(var i = 0; i < input_str.length; i++) {
		hash = (R * hash + input_str.charCodeAt(i)) % hash_table_size;
	}
	return hash
}

function HashTable(default_size) {
	if(typeof(default_size) === "undefined")
		default_size = 64; // default size = 64


	this.elem_num = 0;
	this.size = default_size;
	this.table = new Array(this.size);

	/*
		resize hashtable
	*/
	this.resize = function() {
		this.size = this.size * 2;
		var new_table = new Array(this.size);
		for(var i = 0; i < this.table.length; i++) {
			if(this.table[i] === undefined)
				continue;
			var chain = this.table[i];
			for(var a = 0; a < chain.length; a++) {
				var pair = chain[a];
				var hash = hash_function(pair[0], this.size);
				if(new_table[hash] === undefined)
					new_table[hash] = [];
				new_table[hash].push(pair);
			}
			this.table = new_table;
		}
	}
	/*
		set key value
	*/
	this.set = function(key, value) {
		if(this.elem_num / this.size >= 0.7) {
			this.resize(); // increase size
		}
		var hash = hash_function(key, this.size);
		if(this.table[hash] === undefined) {
			this.table[hash] = [];
		}
		this.table[hash].push([key, value]);
		this.elem_num += 1;
	}

	/*
		get value according to key
	*/
	this.get = function(key) {
		var hash = hash_function(key, this.size);
		var chain = this.table[hash];
		if(chain === undefined) return "undefined";
		for(var i = 0; i < chain.length; i++) {
			if(chain[i][0] === key)
				return chain[i][1];
		}
		return "undefined";
	}
}


/*
console.log(hash_function("Hello", 5));
console.log(hash_function("Hi", 5));
console.log(hash_function("Hia", 5));
console.log(hash_function("Hib", 5));
console.log(hash_function("Hic", 5));
console.log(hash_function("Hid", 5));
console.log(hash_function("Hie", 5));
console.log(hash_function("Hif", 5));
console.log(hash_function("Hifa", 5));
*/


/*
var t = new HashTable();
t.set("Hello", 12);
t.set("Hellogh", 13);
t.set("Helloddf", 15);
console.log(t.get("Helloddfh")); // => undefined
console.log(t.get("Hello"));     // => 12
*/
