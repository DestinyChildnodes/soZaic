Naming;
camelCase
Self documenting


Es6
Double quotes for html
Strings as template literals (use back tick)
No var, use let/const/class/etc.
Use arrow functions when possible/appropriate

Comments
For multiple lines (i.e. more than 2), use /* */, not //

Use this to annotate problems:
// FIXME: shouldn't use a global here


// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
……………………………………………………………..
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
…………………………………………….
// bad
const x=y+5;

// good
const x = y + 5;
