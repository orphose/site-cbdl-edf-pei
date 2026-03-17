# Clean Code Reference — Robert C. Martin

## The Philosophy

We are authors. Authors write for readers. The ratio of time spent reading code to writing code is well over **10:1**. Because of this ratio, making code easy to read makes it easier to write — there is no escape from this logic.

> "Writing clean code is what you must do in order to call yourself a professional." — Martin

The cost of messy code: a team that moved fast at project start slows to a crawl as complexity compounds. Every change breaks something. Every feature requires understanding more tangled code. Eventually the team rebels and demands a rewrite. The rewrite races the production system; it often fails to catch up. This is the death spiral of technical debt.

**The Boy Scout Rule**: Leave the campground cleaner than you found it. Change one variable name for the better, break up one overly large function, clean up one composite if statement. Small improvements compound over time.

---

## Chapter 2: Meaningful Names

### Use Intention-Revealing Names
A name should tell you why something exists, what it does, and how it is used. If a name requires a comment, it does not reveal its intent.

```java
// BAD
int d; // elapsed time in days

// GOOD
int elapsedTimeInDays;
int daysSinceCreation;
int fileAgeInDays;
```

### Avoid Disinformation
- Don't use `accountList` unless it's actually a `List` — use `accounts` or `accountGroup`
- Don't use names that differ only in subtle ways (`XYZControllerForEfficientHandlingOfStrings` vs `XYZControllerForEfficientStorageOfStrings`)
- Never use lowercase `l` or uppercase `O` as variable names (look like 1 and 0)

### Make Meaningful Distinctions
- Don't use number series: `a1, a2, a3` — use `source, destination`
- Don't use noise words: `ProductInfo` vs `ProductData` — what's the difference? There is none
- `variable` should never appear in a variable name; `table` never in a table name; `String` never suffix a string variable

### Use Pronounceable Names
You need to discuss code with other people. `genymdhms` vs `generationTimestamp` — one supports conversation.

### Use Searchable Names
Single-letter names and constants are hard to search for. The longer the constant will be used, the more important a good name is.

### Avoid Encodings
**Hungarian Notation is dead**: IDEs now tell you the type. `phoneString` just adds noise. If the type changes, now the name lies.

**Member prefixes** (`m_description`, `_description`) — unnecessary in modern IDEs.

**Interface prefixes** (`IShapeFactory`) — if you must encode one side, encode the implementation, not the interface: `ShapeFactory` (interface), `ShapeFactoryImp` (concrete).

### Class Names
Classes and objects should have **noun or noun phrase** names: `Customer`, `WikiPage`, `Account`, `AddressParser`. Never a verb. Avoid vague words: `Manager`, `Processor`, `Data`, `Info` — these reveal nothing.

### Method Names
Methods should have **verb or verb phrase** names: `postPayment`, `deletePage`, `save`. Accessors should use `get`/`set`/`is` JavaBean convention.

When overloading constructors, use static factory methods:
```java
// Better:
Complex fulcrumPoint = Complex.FromRealNumber(23.0);
// Than:
Complex fulcrumPoint = new Complex(23.0);
```

### One Word per Concept
Pick one word for one abstract concept and stick with it throughout. `fetch`, `retrieve`, and `get` as methods of different classes is confusing. Similarly `controller`, `manager`, and `driver`.

### Don't Pun
Don't use the same word for two different purposes. If `add` means "concatenate or append" in most classes but "insert into collection" in one class, that's a pun — use `insert` or `append`.

### Use Solution Domain Names
Readers of your code are programmers. Use CS terms, algorithm names, pattern names: `AccountVisitor`, `JobQueue`, `nameSet`.

### Use Problem Domain Names
When no programmer-oriented term exists, use the domain expert's language. Code that uses the problem domain language is self-documenting to the business stakeholders.

---

## Chapter 3: Functions

### Small!
The first rule: functions should be **small**. The second rule: they should be smaller than that.

Functions in a Swing program should not be hundreds of lines long. Every function should be 2–4 lines long, or at most 20 lines. Each should be **transparently obvious**. Each should tell a story. Each should lead you naturally to the next.

**Blocks and Indenting**: if/else/while blocks should be one line long — probably a function call. This keeps the enclosing function small and adds documentary value (the function name describes what the block does). The indent level of a function should not be greater than 2.

### Do One Thing
> **Functions should do one thing. They should do it well. They should do it only.**

If a function does only steps one level of abstraction below its stated name, it does one thing. If you can meaningfully extract another function from it — it does more than one thing.

**Sections within functions**: if a function has sections (declarations, initializations, sieve) it does more than one thing. Extract them.

### One Level of Abstraction per Function
The Stepdown Rule: reading code top-to-bottom, each function leads to the next at one lower level of abstraction. Like reading a narrative where each paragraph introduces the next.

```
// Level 0: high-level policy
To include setups and teardowns, include setups, then include the test page, then include teardowns.

// Level 1: implementation  
To include setups, include the suite setup if this is a suite, then include the regular setup.

// Level 2: details
To include the suite setup, search the parent hierarchy for the SuiteSetup page and add an include statement at the beginning.
```

### Switch Statements
Switch statements by nature do N things. Try to bury them in a low-level class and never repeat them. Use the Abstract Factory pattern: switch once to create the appropriate concrete class, then call polymorphic methods.

### Function Arguments
- **0 arguments (niladic)**: ideal
- **1 argument (monadic)**: good
- **2 arguments (dyadic)**: acceptable but harder to understand
- **3 arguments (triadic)**: avoid if at all possible
- **More than 3 (polyadic)**: requires special justification; almost always wrong

Why arguments are hard: they require conceptual power to interpret. Each argument forces a reader to track context. Testing all argument combinations grows factorially.

**Flag arguments** (`render(boolean isSuite)`) announce that the function does two things — one for true, one for false. Extract two functions.

**Argument Objects**: if a function needs more than 2–3 arguments, some of them deserve their own class:
```java
// Instead of:
makeCircle(double x, double y, double radius);
// Use:
makeCircle(Point center, double radius);
```

### Have No Side Effects
Side effects are lies. Your function says it does one thing but secretly does something else. Either rename the function (if it does two things, say so) or eliminate the side effect.

**Output Arguments**: avoid them. If a function must change the state of something, have it change the state of its owning object. `appendFooter(s)` is confusing — does it append s to the footer, or a footer to s? `report.appendFooter()` is clear.

### Command Query Separation
Functions should either **do something** (command) OR **answer something** (query) — never both. `public boolean set(String attribute, String value)` is a command that also answers a question. The caller's code looks like: `if (set("username", "unclebob"))` — confusing. Split into `attributeExists()` and `setAttribute()`.

### Prefer Exceptions to Returning Error Codes
Returning error codes requires immediate handling by the caller; it's easy to forget. Exceptions separate the happy path from error handling:

```java
// Clean:
try {
    deletePage(page);
    registry.deleteReference(page.name);
} catch (Exception e) {
    logger.log(e.getMessage());
}
```

**Extract Try/Catch Blocks**: `try` blocks are one thing; `catch` blocks are another. Extract the bodies:
```java
public void delete(Page page) {
    try { deletePageAndAllReferences(page); }
    catch (Exception e) { logError(e); }
}
```

**Error handling is one thing**: a function that handles errors should do nothing else.

### Don't Repeat Yourself
Duplication is at the root of all evil in software. When code is duplicated, algorithms change in one place but not another. The DRY principle may be the most important principle in software.

---

## Chapter 4: Comments

> "Don't comment bad code — rewrite it." — Kernighan and Plaugher

Comments are a **failure to express yourself in code**. Every time you write a comment, you've failed to find a way to express the intent in code itself. Comments lie — code changes, comments don't always follow.

### Good Comments (genuinely necessary)

**Legal comments**: copyright, license — required by organizational standards.

**Informative comments**: sometimes useful to clarify obscure regex, explain return value format.

**Explanation of Intent**: sometimes you need to explain *why* a decision was made:
```java
// We tried a balanced partition but the sort performance was unacceptable for
// datasets over 10k elements; this linear partition is adequate given our constraints.
```

**Clarification**: translating an obscure argument into something readable:
```java
assertTrue(a.compareTo(a) == 0);    // a == a
assertTrue(a.compareTo(b) != 0);    // a != b
```

**Warning of Consequences**: when you need to warn other programmers:
```java
// Don't run unless you have some time to kill.
public void _testWithReallyBigFile() { ... }
```

**TODO Comments**: acceptable for notes on work that can't be done now; review regularly and clean them up.

### Bad Comments (most comments are bad)

**Mumbling**: comments written quickly that no one will understand.

**Redundant Comments**: restating what the code already says clearly:
```java
// The processor delay for this component.
protected int backgroundProcessorDelay = -1;
```

**Mandated Comments**: rules requiring every function to have a Javadoc — usually degrade into empty noise that fills screen space.

**Journal Comments**: git exists for history. Remove them.

**Noise Comments**: `/** Default constructor. */` — noise.

**Scary Noise**: Javadoc comments with copy-paste errors are worse than no comments — they lie.

**Don't Use a Comment When You Can Use a Variable or Function**:
```java
// Bad:
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))

// Good:
if (employee.isEligibleForFullBenefits())
```

**Commented-Out Code**: delete it immediately. Source control remembers.

---

## Chapter 5: Formatting

### The Purpose of Formatting
Code formatting is about communication. Communication is a professional developer's first order of business. Your coding style and discipline survives long after your code does — future maintainers judge you by it.

### Vertical Formatting

**The Newspaper Metaphor**: source files should read like newspaper articles — high-level summary first, then increasingly detailed. The name at the top should be sufficient to tell us what module this is. Upper sections provide high-level concepts; lower sections provide details.

**Vertical Openness Between Concepts**: blank lines separate distinct concepts. Each group of lines represents a thought. Without blank lines, code is visually impenetrable.

**Vertical Density**: lines that are tightly related should appear together vertically without visual interruption.

**Vertical Distance**: concepts that are closely related should be kept vertically close. Don't force readers to scroll or navigate to understand a concept:
- **Variable declarations** as close to usage as possible
- **Instance variables** at the top of the class
- **Dependent functions** caller above callee; the program reads naturally downward
- **Conceptual affinity**: functions that share the same operation style should be near each other

### Horizontal Formatting

**Limit line length**: 80–120 characters. Scrolling horizontally is mentally exhausting. Respect this limit.

**Horizontal Openness**: use spaces to associate strongly related things and disassociate weakly related:
- `f(a, b)`: arguments separated by comma-space
- `return b*b - 4*a*c`: multiplication operators bind tighter; show it with spacing

**Avoid horizontal alignment**: aligning `=` signs across multiple declarations looks pretty but actually draws attention to the alignment rather than the meaning.

### Team Rules
A team should agree on one formatting style and every member should use it. A good software system reads consistently; the reader should be able to trust that formatting gestures mean the same thing throughout the codebase.

---

## Chapter 6: Objects and Data Structures

### Data Abstraction
Expose abstractions, not implementations:
```java
// Data (exposing implementation):
public double getX();
public double getY();

// Abstraction (hiding implementation):
public double getDistanceFromOrigin();
```

The interface of a class should represent a coherent *abstraction*, not just a list of accessor methods that leak the underlying data structure.

### The Dichotomy: Objects vs Data Structures (Data/Object Anti-Symmetry)
The **Data/Object Anti-Symmetry**: Objects and data structures are virtual opposites.
- **Objects** hide their data behind abstractions and expose behavior that operates on that data.
- **Data structures** expose their data and have no meaningful behavior.

These are polar opposites, and each has strengths:

| | Objects | Data Structures |
|--|---------|----------------|
| Adding new types | Easy (polymorphism) | Hard (change every function) |
| Adding new operations | Hard (change every class) | Easy (add one function) |

**Procedural code** (using data structures) makes it easy to add new functions without changing existing data structures. Object-oriented code makes it easy to add new classes without changing existing functions.

**The Law of Demeter**: don't reach through objects. A method should only call methods on its own object, its parameters, objects it creates, and its direct instance variables. Don't write `ctxt.getOptions().getScratchDir().getAbsolutePath()` — that's a train wreck of coupling.

---

## Chapter 7: Error Handling

### Use Exceptions Rather Than Return Codes
Error codes clutter the caller and are easy to ignore. Exceptions allow the happy path to be clear and separate from the error path.

### Write Your Try-Catch-Finally Statement First
Try blocks are like transactions: the catch must leave the program in a consistent state. Define the scope with try-catch-finally before filling in the details.

### Use Unchecked Exceptions
The debate is settled: checked exceptions violate the Open/Closed Principle. Adding a checked exception to a method forces changes in every caller up the call chain, even though those callers can't handle the exception. Use unchecked exceptions unless you're writing a critical library.

### Provide Context with Exceptions
Include the operation that failed and the type of failure. Don't just throw `Exception()` — throw `OrderNotFoundForCustomer("customerId: " + id + ", orderId: " + orderId)`.

### Define Exception Classes in Terms of the Caller's Needs
Rather than exposing third-party exception hierarchies, wrap them:
```java
// All these become one:
} catch (DeviceResponseException e) { ... }
} catch (ATM1212UnlockedException e) { ... }

// Instead:
LocalPort port = new LocalPort(12);  // wraps the mess
try { port.open(); } catch (PortDeviceFailure e) { ... }
```

### Define the Normal Flow (Special Case Pattern)
When exceptional behavior clutters the algorithm, create a Special Case class:
```java
// Instead of:
try {
    MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
    m_total += expenses.getTotal();
} catch (MealExpensesNotFound e) {
    m_total += getMealPerDiem();
}

// Create a PerDiemMealExpenses class that returns the per diem as its total
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();  // Always works; special case handled in DAO
```

### Don't Return Null
Returning null forces every caller to check for null and is a major source of NullPointerExceptions:
- Return an empty collection instead of null
- Return a Special Case object
- Throw an exception

### Don't Pass Null
Passing null is even worse — it causes NullPointerExceptions deep inside functions. If null is a possible argument, the function must defend against it (adding noise) or trust the caller (risk). Forbid null arguments instead.

---

## Chapter 9: Unit Tests

### The Three Laws of TDD
1. You may not write production code until you have written a failing unit test
2. You may not write more of a unit test than is sufficient to fail (not compiling counts as failing)
3. You may not write more production code than is sufficient to pass the currently failing test

### Keeping Tests Clean
> **Dirty tests are equivalent to, or worse than, having no tests.**

Test code must be maintained as rigorously as production code. As production code evolves, tests must change. Dirty tests become impossible to change — they become a liability that forces the team to delete the suite. Without a test suite, you lose the ability to refactor safely. Code rots.

**Tests enable fearless refactoring.** With tests you can clean up code knowing you'll catch breakage. Without tests, every change is a potential land mine.

### Clean Tests: Readability
Build-Operate-Check pattern (or Given-When-Then):
- **Build**: set up the test data
- **Operate**: perform the operation
- **Check**: verify the result

### One Concept per Test
Each test function should test exactly one concept. Avoid long test functions that test many things — when they fail, you don't know which thing failed.

### FIRST
Clean tests are:
- **F**ast — run in milliseconds; slow tests don't get run
- **I**ndependent — no test depends on another; each can run in any order
- **R**epeatable — same result every time, in any environment
- **S**elf-Validating — boolean pass/fail; no manual log reading
- **T**imely — written just before the production code they test (or at least immediately after)

---

## Chapter 10: Classes

### Single Responsibility Principle (SRP)
A class should have **one reason to change**. Every class should have one responsibility. When a class has multiple reasons to change, it will break in unexpected ways when either reason occurs.

> "We want our systems to be composed of many small classes, not a few large ones. Each small class encapsulates a single responsibility, has a single reason to change, and collaborates with a few others to achieve the desired system behaviors."

### Cohesion
Classes should have a small number of instance variables. Each method should manipulate as many of them as possible. When cohesion is high, methods and variables are co-dependent and hang together as a logical whole.

When methods manipulate only a subset of variables, there may be a hidden class trying to get out.

### Keeping Classes Small
The measure of class size is not lines — it's responsibilities. If you can't describe what a class does in 25 words (without "and," "or," "but," or "if"), it's too large.

### The Open/Closed Principle (OCP)
Classes should be open for extension but closed for modification. In concrete terms: adding a new feature should require writing new code, not modifying existing code. Achieve this through abstractions and polymorphism.

### Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules — both should depend on abstractions. Abstractions should not depend on details — details should depend on abstractions.

If your `Portfolio` class depends directly on `TokyoStockExchange`, you've coupled high-level policy to low-level detail. Introduce a `StockExchange` interface; both depend on the abstraction.

---

## Chapter 11: Systems

### Separate Constructing a System from Using It
Construction and use are very different concerns. The startup process of an object — getting it initialized and wired together — is one concern; what the object does is another.

**Dependency Injection**: let a separate object (an IoC container, or just a factory) be responsible for wiring the system together. Objects themselves don't know how they were created.

### Scaling Up
Systems must grow over time. Make economic decisions incrementally — you don't need a perfect upfront architecture. Implement simple, working systems and then grow them as needs demand.

---

## Chapter 12: Emergence (Kent Beck's Simple Design)

A design is "simple" if it:
1. **Runs all the tests** — a system must be testable; testable systems tend toward better design
2. **Contains no duplication** — duplication is the primary enemy of a well-designed system
3. **Expresses the intent of the programmer** — code should clearly express its intent through naming, small functions, standard patterns, well-written tests
4. **Minimizes the number of classes and methods** — eliminate unnecessary complexity; this is last priority because it's the least important

The rules are in order of importance.

---

## Appendix: Code Smells and Heuristics

These are the signs that something is wrong. When you see these smells, fix them.

### Comments
- **C1: Inappropriate Information** — comments about version history, authorship. These belong in VCS.
- **C2: Obsolete Comment** — outdated or irrelevant comment. Delete or update.
- **C3: Redundant Comment** — describes what the code says. Delete.
- **C4: Poorly Written Comment** — if it's worth writing, write it well.
- **C5: Commented-Out Code** — delete it. VCS will remember.

### Environment
- **E1: Build Requires More Than One Step** — build should be a single command
- **E2: Tests Require More Than One Step** — running tests should be a single command

### Functions
- **F1: Too Many Arguments** — functions should have few arguments; more than 3 is very suspicious
- **F2: Output Arguments** — if your function must change something's state, it should change the state of its owning object
- **F3: Flag Arguments** — indicates the function does more than one thing; split it
- **F4: Dead Function** — methods never called should be deleted

### General
- **G1: Multiple Languages in One Source File** — minimize and contain
- **G2: Obvious Behavior is Unimplemented** — the code doesn't do what you'd expect
- **G3: Incorrect Behavior at the Boundaries** — bugs live at boundaries; test every corner case
- **G4: Overridden Safeties** — don't override warning levels, turn off failing tests, ignore linter rules
- **G5: Duplication** — every time you see duplication, extract it
- **G6: Code at Wrong Level of Abstraction** — separate high-level concepts from low-level details into different classes/functions
- **G7: Base Classes Depending on Their Derivatives** — base classes should know nothing about their derivatives
- **G8: Too Much Information** — well-defined interfaces have very little surface area
- **G9: Dead Code** — code that is never executed; delete it
- **G10: Vertical Separation** — define variables and functions close to where they are used
- **G11: Inconsistency** — if you do something a certain way, do all similar things the same way
- **G12: Clutter** — functions never called, variables never used, comments adding no information — delete them all
- **G13: Artificial Coupling** — things that don't depend on each other should not be coupled
- **G14: Feature Envy** — a method uses excessive amounts of data from another class; move it
- **G15: Selector Arguments** — boolean arguments that select behavior; split into multiple functions
- **G16: Obscured Intent** — code should express its intent; dense expressions and magic numbers obscure it
- **G17: Misplaced Responsibility** — put code where the reader expects it (Principle of Least Surprise)
- **G18: Inappropriate Static** — don't use static functions when they should be instance functions
- **G19: Use Explanatory Variables** — break calculations into intermediate variables with descriptive names
- **G20: Function Names Should Say What They Do** — the name should be sufficient to understand what the function does
- **G21: Understand the Algorithm** — don't leave code that "seems to work"; understand why it works
- **G22: Make Logical Dependencies Physical** — if module A depends on module B, make that explicit via the dependency structure
- **G23: Prefer Polymorphism to If/Else or Switch/Case** — use polymorphism when behavior changes by type
- **G24: Follow Standard Conventions** — every team should follow a coding standard; no exceptions
- **G25: Replace Magic Numbers with Named Constants** — almost every numeric literal deserves a name
- **G26: Be Precise** — when you make a decision in your code, commit to it precisely
- **G27: Structure over Convention** — enforce design decisions with structure, not convention
- **G28: Encapsulate Conditionals** — extract boolean conditions: `if (shouldBeDeleted(timer))` instead of `if (timer.hasExpired() && !timer.isRecurrent())`
- **G29: Avoid Negative Conditionals** — `if (buffer.shouldNotCompact())` forces double-negative thinking
- **G30: Functions Should Do One Thing** — the SOLID single responsibility principle at function level
- **G31: Hidden Temporal Couplings** — if A must be called before B, make it structurally impossible to call B without A
- **G32: Don't Be Arbitrary** — if structure of code appears arbitrary, readers will feel empowered to change it randomly
- **G33: Encapsulate Boundary Conditions** — boundary conditions are hard to track; put them in one place
- **G34: Functions Should Descend Only One Level of Abstraction** — the stepdown rule
- **G35: Keep Configurable Data at High Levels** — constants, defaults, and configuration at the top
- **G36: Avoid Transitive Navigation** — "Law of Demeter" — don't reach through an object to another

### Names
- **N1: Choose Descriptive Names** — 90% of readability comes from names
- **N2: Choose Names at the Appropriate Level of Abstraction** — don't use implementation detail names
- **N3: Use Standard Nomenclature Where Possible** — use patterns names, domain terms
- **N4: Unambiguous Names** — names should be long enough that they are unambiguous
- **N5: Use Long Names for Long Scopes** — short names for short scopes, long for long
- **N6: Avoid Encodings** — no Hungarian notation, no type prefixes
- **N7: Names Should Describe Side-Effects** — if a function creates a session as a side effect, say so in the name

### Tests
- **T1: Insufficient Tests** — test everything that can possibly break
- **T2: Use a Coverage Tool** — measure test coverage; aim for 100% of non-trivial code
- **T3: Don't Skip Trivial Tests** — they document behavior and are cheap to write
- **T4: An Ignored Test Is a Question about an Ambiguity** — if a test is disabled, document why
- **T5: Test Boundary Conditions** — off-by-one errors live at boundaries
- **T6: Exhaustively Test Near Bugs** — bugs tend to cluster; when you find one, look for others nearby
- **T7: Patterns of Failure Are Revealing** — look at the pattern of failing tests to find the root cause
- **T8: Test Coverage Patterns Can Be Revealing** — where tests don't reach is where bugs hide
- **T9: Tests Should Be Fast** — slow tests won't be run; if they won't be run, they're worthless

---

## Chapter 8: Boundaries

### Learning Tests — Better Than Free
When you use a third-party library, you must learn its API. Instead of experimenting in production code, write **learning tests**: focused experiments that call the API as you expect to use it in your application.

Benefits:
- You learn the API in a controlled environment, isolated from your production code
- The tests document exactly what you understand the API to do
- When the library upgrades, run the learning tests to detect behavioral changes immediately
- They cost nothing — you had to learn the API anyway

```java
@Test
public void testLogAddAppender() {
    Logger logger = Logger.getLogger("MyLogger");
    logger.removeAllAppenders();
    logger.addAppender(new ConsoleAppender(
        new PatternLayout("%p %t %m%n"),
        ConsoleAppender.SYSTEM_OUT));
    logger.info("hello");
}
```

The learning tests are *precise experiments* that increase understanding and guard against API changes.

### Using Code That Doesn't Exist Yet
When working near an unknown boundary (an API not yet defined, a subsystem being built by another team), don't wait. Define the interface *you wish you had*. Then write code against your wished-for interface and wrap it with an adapter when the real API is delivered.

Benefits:
- Your code stays clean and focused — it doesn't depend on details not yet defined
- You control the interface; it fits your code's needs exactly
- When the real API arrives, only the adapter needs to change

### Clean Boundaries
Code at the boundaries needs:
- Clear separation from internal code
- Tests that define expectations for boundary behavior
- Minimal exposure — as few places as possible should reference the third-party code

Wrap third-party code so that it speaks the language of your application, not the other way around. The wrapper is easy to swap; your core logic should never know what's on the other side of the boundary.

---

## Chapter 11: Systems

### Separate Constructing a System from Using It
Startup (constructing objects and wiring them together) is a completely different concern from runtime operation. Most applications blur them, leading to:
- Hard-coded dependencies that prevent testing
- Lazy initialization scattered throughout the code
- Code that's hard to reason about — when does initialization happen?

**Dependency Injection (DI):** Let a separate object (a container, factory, or test setup) be responsible for creating and wiring objects. Objects themselves don't know how they were created. This makes objects easier to test (pass mock dependencies in tests) and easier to replace (swap implementations without changing the object).

### Scaling Up Incrementally
> "It is a myth that we can get systems 'right the first time.'"

Software architectures can grow incrementally **if** we maintain proper separation of concerns. Start with the simplest design that works. Add infrastructure as needs demand. Avoid Big Design Up Front (BDUF) — it introduces psychological resistance to change when you learn you were wrong.

The agility provided by a POJO (Plain Old Object) system with modularized concerns allows optimal, just-in-time decisions based on current knowledge.

**The corollary:** Always use the simplest thing that can possibly work. You can add complexity later; removing it is much harder.

### Test Drive the System Architecture
If you write application domain logic using POJOs, decoupled from architecture concerns, you can truly test drive your architecture. You can evolve from simple to sophisticated as needed, adopting new technologies on demand without rewriting core logic.

### Domain-Specific Languages (DSLs)
A good DSL minimizes the communication gap between a domain concept and its code implementation. It raises the abstraction level above code idioms and design patterns, allowing developers to reveal intent at the appropriate level.

---

## Chapter 12: Emergence (Kent Beck's Four Rules)

A design is "simple" if it (in order of priority):

### Rule 1: Runs All the Tests
A system must be verifiable. A system that cannot be tested cannot be deployed with confidence. The act of making a system testable drives it toward better design:
- Testable code tends to have small, single-purpose classes (testing a class that does one thing is trivial)
- High coupling makes testing hard; the pressure to write tests drives you to reduce coupling
- More tests → more use of DIP, interfaces, dependency injection → better design

**Writing tests leads to better designs** — this is a profound emergent property of TDD.

### Rules 2-4: Refactoring (Duplication, Expressiveness, Minimalism)
Once you have tests, you can refactor fearlessly. Tests eliminate the fear that cleaning up will break something. During refactoring, apply rules 2-4:

**No Duplication:** Every form of duplication is an enemy of well-designed systems. Even subtle duplication:
```java
boolean isEmpty() { return 0 == size(); }  // eliminates duplication with size()
```

**Expressive:** Code should clearly express the intent of its author. Achieve expressiveness through:
- Good names (hear a name, not be surprised by its responsibilities)
- Small functions and classes (easy to name, write, understand)
- Standard nomenclature (pattern names, domain terms)
- Well-written unit tests (the best documentation by example)

**Minimal Classes and Methods:** Even fundamental principles can be taken too far. An interface for every class, fields always separated from behavior — these are dogmas, not wisdom. Keep system-wide counts low, but this rule has lowest priority. Tests, no duplication, and expressiveness matter more.

---

## Chapter 13: Concurrency

### Why Concurrency? It's a Decoupling Strategy
Concurrency decouples *what* gets done from *when* it gets done. In a single-threaded system, what and when are tightly coupled — the entire state of the application is knowable from a stack backtrace.

Decoupling what from when can dramatically improve throughput and structure. From a structural view, the application looks like many small collaborating computers rather than one large main loop.

### The Fundamental Challenge
Even `++lastIdUsed` is not atomic. In Java's bytecode, it's a read + increment + write — 12,870 different possible execution paths for two threads. Most produce correct results; some don't. The bug surfaces only under load, unpredictably.

### Concurrency Defense Principles

**Single Responsibility Principle for concurrency:** Concurrency-related code has its own life cycle, its own challenges, and its own failure modes. Keep concurrency-related code separate from other code.

**Limit the scope of shared data:** The more places shared data can be updated, the more likely you'll forget to protect one. Use the `synchronized` keyword at the narrowest possible scope.

**Prefer independent copies:** If possible, don't share data at all. Copy objects needed by threads, operate on the copies, and merge results at the end. Avoid the problem entirely.

**Know your execution models:**
- **Producer-Consumer:** Producer fills a bounded buffer; consumer empties it. Each signals the other.
- **Readers-Writers:** One resource shared by many readers and occasional writers; balance throughput vs. starvation
- **Dining Philosophers:** Multiple threads competing for multiple shared resources; deadlock risk

**Keep synchronized sections small:** Locks create delays and add overhead. Make critical sections as small as possible — only what absolutely must be protected.

**Write correct shutdown code:** Getting a multithreaded system to shut down gracefully is surprisingly hard. Deadlocks during shutdown are common. Think about shutdown early and get it working early.

### Testing Concurrent Code
- **Treat spurious failures as threading issues** — "one-offs" that happen rarely are almost always threading bugs, not cosmic rays
- **Get non-threaded code working first** — test core logic in a single-threaded environment before adding concurrency
- **Make threaded code pluggable** — so you can run with one thread, several threads, and various numbers
- **Make threaded code tunable** — adjust thread count at runtime to find optimal settings
- **Run with more threads than processors** — context switching exposes timing bugs
- **Run on different platforms** — threading behavior varies across OS and JVM implementations
- **Instrument your code to force failures** — add `Thread.yield()` or `Thread.sleep()` in strategic places to expose race conditions

---

## Case Studies: Successive Refinement and the Boy Scout Rule

The SerialDate case study and the Args command-line parser case study both demonstrate the same principle:

**It is not enough for code to work.** Code that merely works is often badly broken. The obligation of a professional programmer is not just to make code work, but to leave it clean.

> "Of course bad code can be cleaned up. But it's very expensive... keeping code clean is relatively easy. If you made a mess in the morning, clean it up in the afternoon. Better yet, if you made a mess five minutes ago, it's very easy to clean it up right now. Never let the rot get started."

The complete workflow:
1. Write code to make tests pass (make it work)
2. Refactor continuously to improve structure (make it right)
3. Never add features and refactor simultaneously — separate concerns completely

The Boy Scout Rule in practice: When Martin reviewed SerialDate, he found adequate but imperfect code. His process: add tests for uncovered behavior → make the tests pass → refactor one issue at a time → run all tests after each change. The code that emerged was smaller, cleaner, and better tested. **This is professional code review.**

---

## Chapter 15: JUnit Internals — Refactoring a Real Module

This chapter is a worked example of refactoring applied to production code from the JUnit framework itself. The module is `ComparisonCompactor`, which generates helpful diff messages like `<...B[X]D...>` when two strings differ.

**The lesson is in the method, not the code:**

1. **Start with a complete test suite** that verifies current behavior
2. **Read and understand the existing code** before changing anything
3. **Apply the Boy Scout Rule incrementally** — each change should make the code slightly cleaner
4. **Name things precisely** — `fExpected` → `expected` (remove Hungarian notation); `compact()` does more than compact → rename to reflect what it really does
5. **Remove negative conditionals** — `if (!canBeCompacted())` → `if (shouldNotCompact())` — clearer intent
6. **Extract meaningful methods** — if an expression needs a comment to explain it, it should be a method instead
7. **Run tests after every single change** — even tiny renames can introduce bugs; tests are your safety net

**The meta-lesson on professional code review:** Martin opens this chapter by explicitly reviewing and criticizing David Gilbert's code (the JCommon library SerialDate). He frames it as a professional review — the kind pilots, doctors, and lawyers do. Programmers should welcome this. Only through peer critique do we improve. The goal is never personal; it's to make the code better.

This is what professional code craftsmanship looks like in practice: systematic, incremental, test-driven improvement of real code written by real people trying their best.
