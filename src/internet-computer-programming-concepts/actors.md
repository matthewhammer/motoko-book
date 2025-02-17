# Actors

Actors, like objects, are like a package of *state* and a *public API* that accesses and modifies that state. They are declared using the `actor` keyword and have an *actor type*. 

## Top level actors
Today (Jan 2023), an actor in Motoko is defined as a top-level item in its own Motoko source file. Optionally, it may be preceded by one or more imports:

```motoko
{{#include _mo/actors.mo:a}}
```

We declared an empty actor in its own source file `actor.mo`. It is preceded by an import of a module defined in `mod.mo` and named `Mod` for use inside the actor.

You may feel disappointed by the simplicity of this example, but this setup (one source file containing **only** *imports* and *one actor*) is the core of every Motoko program!

## Actors vs. objects
To understand actors it is useful to compare them with objects:

**Public API**  
- Public functions in actors are accessible from outside the Internet Computer.
- Public functions in objects are only accessible from within your Motoko code.

**Public shared functions**  
- Actors only allow *[shared](#public-shared-functions)* public functions
- Objects only allow non-shared public functions

**Public state**  
- Actors don't allow public mutable or immutable variables
- Objects allow public mutable or immutable variables

**Class and Actor Class**
- Actors have 'factory' functions called [Actor Classes](/internet-computer-programming-concepts/actor-classes.html)
- Objects have 'factory' functions called [Classes](/common-programming-concepts/objects-and-classes/classes.html)

For a full comparison checkout: [**Motoko Items Comparison Table**](https://docs.google.com/spreadsheets/d/1IqgPi9I9EmoknJBzzxea_7dN9WRwtFle7Y99UURXC7Y/edit?usp=sharing)


## Public Shared Functions
Besides private (mutable or immutable) variables and private functions, actors allow *three kinds* of public functions:

1. Public **shared query** functions:  
Can only *read* state

1. Public **shared update** functions:  
Can *read* and *write* state

1. Public **shared oneway** functions:  
Can *read* and *write*, but don't have any *return value*. 

*Query* and *update* functions always have the special `async` return type.  
*Oneway* functions always have the unit `()` return type. 

```motoko
{{#include _mo/actors2.mo:a}}
```

Since shared functions are only allowed in actors, we declared an actor with three public shared functions. Lets analyze their *function signatures* and *function types*.

The first function named `read` is declared with `public shared query` and returns `async ()`. This function is not allowed to modify the state of the actor because of the `query` keyword. It can only read state and return most types. It returns `()`. Query functions are fast.

The second function named `write` is declared with `public shared` and also returns `async ()`. This function is allowed to modify the state of the actor. There is no other special keyword (like query) to indicate that this is an update function. It returns `()`. Update functions take 2 seconds per call. 

The third function named `oneway` is also declared with `public shared` but does not have a return type. This function is allowed to modify the state of the actor. Because it has no return type, it is assumed to be a oneway function which always returns `()`. Oneway functions also take 2 seconds per call. 

In our example none of the functions take any arguments for simplicity.

## A simple actor
Here's an actor with one *state* variable and some functions that *read* or *write* that variable:

```motoko
{{#include _mo/actors3.mo:a}}
```

This actor has one private mutable variable named `latestComment` of type `Text` and is initially set to the empty string `""`. This variable is not visible 'from the outside', but only available internally inside the actor. The actor also demonstrates the three possible public functions in any actor. 

Then first function `readComment` is a *query* function that takes no arguments and only reads the state variable `latestComment`. It returns `async Text`.

The second function `writeComment` is an *update* function that takes one argument and modifies the state variable. It could return some value, but in this case it returns `async ()`.

The third function `deleteComment` is a *oneway* function that doesn't take any arguments and also modifies the state. But it can not return any value and always returns `()`.

## Actor type
Only public shared functions are part of the type of an actor. 

The type of the actor above is the following:

```motoko
{{#include _mo/actors4.mo:a}}
```

We named our actor type `CommentActor`. The type itself starts with the `actor` keyword followed by curly braces `{}` (like objects). Inside we find the three function names as fields of the type definition. 

Every field name is a public shared function with its own *function type*. The order doesn't matter, but the Motoko orders them alphabetically.

`readComment` has type `shared query () -> async Text` indicating it is a *shared query* function with no arguments and `async Text` return type.

`writeComment` has type `shared Text -> async ()` indicating it is an *shared update* function that takes one `Text` argument and returns no value `async ()`.

`deleteComment` has type `shared () -> ()` indicating it is a *shared oneway* function that takes no arguments and always returns `()`.

