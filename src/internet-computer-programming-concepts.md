# Internet Computer Programming Concepts

This chapters covers Internet Computer specific features of Motoko. The main topics of this chapter are actors and actor classes.

It is *recommended* to be familiar with the following items (and their types) from the last chapter:  
- functions
- records
- objects
- classes
- modules

A comparison of these concepts with actors and actor classes is available:  
[**Motoko Items Comparison Table**](https://docs.google.com/spreadsheets/d/1IqgPi9I9EmoknJBzzxea_7dN9WRwtFle7Y99UURXC7Y/edit?usp=sharing)

Before diving in, lets briefly describe four terms that look alike, but are not the same!

- **Actor** An abstract notion of a self-contained software execution unit that communicates with other actors through asynchronous message passing.

- **Canister** An instance of an actor that runs on the Internet Computer Blockchain.

- **WebAssembly Module** A file containing a binary representation of a program (that may have been written in Motoko) that is installed in a canister that runs on the Internet Computer. 

- **Smart Contract**  The traditional notion of a blockchain program with roughly the same security guarantees as canisters but with limited memory and computation power. 
