# Code Complete Reference — Steve McConnell

## Software's Primary Technical Imperative: Managing Complexity

Dijkstra observed that no human brain is capable of holding a program's full details in mind simultaneously. The primary goal of every design and coding decision must be to **reduce the cognitive load on the reader**. All design techniques are tools for managing complexity:

- Decomposition breaks a complex problem into smaller subproblems
- Abstraction hides implementation behind clean interfaces
- Encapsulation prevents outside code from depending on internal details
- Hierarchies organize complex relationships into comprehensible levels

> "The goal of all software design techniques is to decompose complex problems into parts that can be independently understood." — McConnell

---

## Design

### Desirable Characteristics of Good Design
1. **Minimal complexity** — avoid clever designs; simple is almost always better
2. **Ease of maintenance** — write for the maintenance programmer (who is you in 6 months)
3. **Loose coupling** — minimize dependencies between subsystems
4. **Extensibility** — enhance without violence to the existing structure
5. **High fan-in** — utility classes used by many; low fan-out — classes using few others
6. **Portability** — isolate environment-specific code
7. **Stratification** — define clear levels of abstraction; don't mix abstraction levels

### The Design Heuristics (design building blocks)

**Find real-world objects:** Identify what exists in the problem domain; model it in code. Start with objects (what they know, what they can do, what they hide, what can be inherited).

**Form consistent abstractions:** Abstraction is the ability to engage with a concept while safely ignoring some of its details. When you design a class, decide what level of abstraction it operates at, and be consistent throughout.

**Encapsulate implementation details:** Encapsulation is stronger than abstraction. Abstraction says "you can look at an object at a high level of detail." Encapsulation says "moreover, you CAN'T look at an object at any other level of detail."

**Inherit — when it simplifies design:** Use inheritance only when the subclass IS-A type of the base class. Avoid inheritance for code reuse alone — prefer containment (HAS-A). Deep hierarchies (> 2–3 levels) are danger signs.

**Hide secrets (information hiding):** Every class, routine, and data structure should have secrets — implementation details hidden from callers. Ask at every design decision: "What decision should I be hiding here?" This is Parnas's key insight and the most valuable design heuristic.

**Identify areas likely to change:** 
- Hardware dependencies
- Input/output formats
- Difficult design areas (wrap them with interfaces)
- Status variables (use enums, not booleans)
- Data-size constraints
- Business rules
- Anything the UI touches

**Keep coupling loose:** 
- Simple data coupling: passing primitive data — acceptable
- Object coupling: passing whole objects — can be too strong
- Semantic coupling (module A knows the internals of module B) — worst kind; avoid it
- Guidelines: make modules small, avoid friend classes, avoid global data, observe the Law of Demeter

**Look for common design patterns:** Patterns are vocabulary for design discussions. Key patterns: Abstract Factory, Singleton, Strategy, Observer, Template Method, Façade, Command, Decorator, Proxy. Don't force patterns where they don't fit.

### Design Practices

**Iterate:** Don't settle for the first design. Iteration is built into the design process.

**Divide and conquer:** Decompose the problem into subproblems. Complexity increases faster than linearly with size — decomposition is the antidote.

**Top-down vs bottom-up:** Top-down: start with the highest-level concept and decompose. Bottom-up: identify useful low-level utilities and build up. Real designs use both.

**Experimental prototyping:** Write throwaway code to explore a design. Use prototypes to answer specific questions, then discard.

**Capture design work:** Sketch designs in notebooks. Use UML lightly. Document key decisions and the alternatives considered. Comments in code, especially at the class and routine level.

---

## Working Classes

### Abstract Data Types (ADTs)
An ADT is a collection of data and operations that work on that data. The operations describe the data to the rest of the program and protect the data from external modification. Benefits of ADTs:
- Hide implementation details
- Interface changes don't propagate through the whole program
- Interface becomes more informative
- Easier to improve performance
- Program is self-documenting
- Don't have to pass data all around a program

### Good Class Interfaces

**Good abstraction:**
- Present a consistent level of abstraction in the class interface
- Be sure you understand what the class represents before creating it
- Provide services in pairs with their opposites (Open/Close, Add/Remove, Show/Hide)
- Move unrelated information to another class
- Classes should be shy: be wary of having too many public routines

**Good encapsulation:**
- Minimize accessibility of classes and members
- Don't expose member data in public — expose behaviors
- Avoid putting private implementation details in the class's public interface
- Don't make assumptions about callers (the class should defend itself)
- Semantic violations: don't expose `m_connection` just because `m_connection.Connect()` is used outside; let the class provide `Connect()` directly

### Design and Implementation Issues

**Containment (HAS-A relationships):** Use containment to implement "has a" or "uses a" relationships. One class contains another as a member. This is usually preferable to inheritance.

**Inheritance (IS-A relationships):**
- Inherit only when you truly have an IS-A relationship
- Design inheritance hierarchies to be as shallow as possible
- Make all data members private (not protected) — classes should only inherit behavior
- Be leery of overriding a non-overridable method
- Avoid deeply nested class hierarchies (> 2–3 levels is a code smell)
- Multiple inheritance: use sparingly if at all; prefer composition

**Constructors:**
- Initialize all member data in the constructor
- Prefer deep copies of objects to shallow copies
- Use factory methods when construction is complex or when you want to hide the class name

### Reasons to Create a Class
- Model a real-world object
- Model an abstract object
- Reduce complexity (hide implementation)
- Isolate complexity
- Hide sources of change
- Centralize control over something
- Facilitate reuse
- Accomplish a specific refactoring

### Classes to Avoid
- God classes (know everything, do everything)
- Classes with inappropriate intimacy (classes that access each other's private members)
- Classes with incompatible abstractions

---

## High-Quality Routines

### Valid Reasons to Create a Routine
- Reduce complexity (the single most important reason)
- Introduce an intermediate, understandable abstraction
- Avoid duplicate code
- Support subclassing
- Hide sequences (hide the ordering of events)
- Hide pointer operations
- Improve portability
- Simplify complicated boolean tests
- Even operations that seem too simple benefit from being in routines (clear naming, no duplication)

### Design at the Routine Level
Functional cohesion is the strongest and best kind: the routine performs a single, clearly defined operation. Warning cohesion types:
- Communicational cohesion: operations that use the same data but are otherwise unrelated
- Temporal cohesion: operations combined because they happen at the same time (e.g., "init()" doing many things)
- Procedural cohesion: operations that must be done in a certain order
- Logical cohesion: operations selected by a flag — use separate routines instead

### Good Routine Names
- Describe everything the routine does (including side effects)
- Avoid meaningless verbs: `HandleOutput()`, `ProcessInput()`, `DoRecords()` — meaningless
- Don't differentiate routine names solely by number: `OutputUser1()`, `OutputUser2()`
- Use a verb plus noun: `PrintDocument()`, `CalcMonthlyRevenues()`, `CheckOrderInfo()`, `RepaginateDocument()`
- For functions that return a value: name describes the return value: `customerName()`, `nextCustomerId()`

### Routine Length
Studies show routines of 100–200 lines are no more error-prone than shorter ones. Let complexity dictate length: cohesion, depth of nesting, number of variables, number of comments needed. **Warning: anything over 200 lines should be split.** 12,000-line routines exist in the wild — they are nightmares.

### Routine Parameters
- Put parameters in input-modify-output order
- Don't use input parameters as working variables — create local copies
- Document interface assumptions about parameters (valid ranges, units, null handling)
- Limit to about 7 (Miller's Law: humans can hold ~7 chunks simultaneously)
- Keep calling signature consistent across similar routines

---

## Defensive Programming

### Protecting from Invalid Inputs
Garbage in, garbage out — but a defensive program rejects garbage:
- Check the values of all data from external sources
- Check the values of all routine input parameters
- Decide how to handle bad inputs (every routine, every module)

### Assertions
Assertions verify assumptions during development. Use them to document and verify:
- Preconditions: what is guaranteed to be true before the routine is called
- Postconditions: what the routine guarantees on exit
- Class invariants: what is always true about the class's state

Guidelines:
- Use assertions for conditions that should never occur
- Use error handling for conditions that can occur even in a correct program
- Never put code with side effects in assertions
- Assertions can (and often should) stay in production code for critical conditions

### Error-Handling Techniques
Decision matrix (choose based on system type):
- **Robustness**: continue processing even if data is bad (display systems, low-criticality)
- **Correctness**: never return incorrect results; shut down instead (safety-critical systems)

Specific techniques:
- Return a neutral value
- Substitute the next valid piece of data
- Return the same answer as the previous time
- Substitute the closest legal value
- Log a warning message
- Return an error code
- Call an error-handling routine/object
- Display an error message
- Shut down

### Exceptions
- Use exceptions to signal truly exceptional conditions
- Don't use exceptions for normal flow control
- Throw exceptions at the right level of abstraction
- Include all information relevant to the exception in the exception message
- Avoid empty catch blocks

### Barricade Your Program
Define a clean/dirty boundary in your program. Routines outside the barricade validate all inputs. Routines inside the barricade can assume clean data. This is like a surgical ward — before operating, scrub up; inside, trust is established.

---

## The Pseudocode Programming Process (PPP)

1. **Check prerequisites** — is the routine actually needed? Is the design right?
2. **Define the problem** — state in a sentence what the routine will accomplish
3. **Name the routine** — a good name signals you understand what it does
4. **Decide how to test it** — before writing a line of code
5. **Research the algorithms and data types** — don't reinvent the wheel
6. **Write the pseudocode** — use English-language sentences describing operations
7. **Check the pseudocode** — read it; is it correct? is it complete?
8. **Code the routine** — translate the pseudocode into code; the pseudocode becomes comments
9. **Check the code** — desk-check; review; test
10. **Clean up leftovers** — check parameter order, unused variables, side effects

---

## Variables

### General Issues in Using Variables
- **Initialize all variables close to where they're first used** — "Variables shouldn't wander" 
- **Minimize scope** — keep variables "live" for as short a time as possible; localize references; don't span much code between first and last use
- **Single purpose** — use each variable for exactly one purpose; never use a variable for two different uses
- **Avoid global variables** — they create invisible coupling; pass data explicitly instead
- **Binding time** — prefer late binding (runtime) over early binding (hard-coded constants); prefer named constants over magic numbers

### Variable Name Considerations
- Optimal average length: 9–15 characters
- Short names (i, j, k) only for loop counters in trivially short loops
- Scope affects appropriate name length: small scope → shorter name acceptable; large scope → longer, fully descriptive name required
- Qualifiers in computed value names go at the end: `revenueTotal`, `expenseAverage` (not `totalRevenue`)
- Common opposites: begin/end, first/last, locked/unlocked, min/max, next/previous, old/new, opened/closed, visible/invisible, source/destination, up/down, start/stop

### Naming Conventions — Why They Matter
- Compensate for language limitations
- Differentiate between local/class/global variables
- Identify named constants, enumerations, typedefs
- Provide instant understanding of type/purpose
- Reduce reliance on memory (conventions encode information automatically)

### Data Types
- **Boolean**: name as a question (`isDone`, `isFound`, `wasSuccessful`)
- **Enumerated types**: use them liberally; they document intent; prevent invalid states; enable compiler checking
- **Named constants**: use CONSTANT_NAME convention; never put numeric literals in code
- **Arrays**: check bounds; prefer structures with named fields over parallel arrays

---

## Control Structures

### Conditionals
- Write the normal case first, then the exception
- Follow the if clause with a meaningful statement (avoid empty if bodies)
- Consider converting complex if-then-else chains to a case/switch statement
- Simplify nested ifs: use break, return, continue — or restructure

### Loops
- Enter only from the top (never jump into a loop)
- Initialize loop variables immediately before the loop
- Put the loop exit test at the top or bottom, not in the middle (prefer while over loop-with-break)
- Limit a loop to one function (if you need more, extract a function)
- Keep loop bodies short — avoid deep nesting inside loops
- Avoid multiple exit points; consolidate exit conditions

### Deep Nesting
A reliable sign of code that needs redesigning. Techniques to reduce:
- Retest part of the condition
- Use break
- Extract a routine
- Use guard clauses (return early)
- Convert to polymorphism

### Complexity Measurement (Cyclomatic Complexity)
Count 1 + number of decision points (if, while, for, case, and, or):
- 0–5: routine is probably fine
- 6–10: start to think about simpler solutions
- 10+: break into smaller routines; this routine is too complex to test

---

## Code Quality

### Defect Detection Methods (effectiveness rates)
From empirical studies:
| Method | Typical Detection Rate |
|--------|----------------------|
| Formal design inspections | 45–55% |
| Formal code inspections | 45–60% |
| Modeling/prototyping | 35–65% |
| Personal desk-checking | 20–40% |
| Unit testing | 15–30% |
| Integration testing | 25–35% |
| System testing | 25–40% |

**The most important lesson:** No single technique finds all defects. Use multiple, complementary techniques. The combinations matter: inspections + testing together achieve 80%+ defect removal.

### Collaborative Construction

**Pair Programming:**
- One programmer types; one thinks, checks, considers implications
- Pairs catch errors at the source — before test, before review
- Quality rises to the level of the better programmer
- Keeps code quality high under schedule pressure
- Keys to success: coding standards, active participation by both partners, pair rotation

**Formal Inspections:**
- Much more structured than walkthroughs
- Roles: moderator, author, reviewers, scribe
- Defect detection only — fixes are not discussed in the meeting
- Preparation: reviewers read code independently first
- Inspection rate: 100–500 lines per hour depending on complexity
- Inspections show defect rates of 45–70%

---

## Layout and Comments

### Fundamental Theorem of Formatting
Code formatting should show the logical structure of the program. Every formatting choice should make the code easier to read and understand.

### Layout Principles
- Use indentation to show hierarchy (2 or 4 spaces, not tabs — pick one project-wide)
- Use blank lines to separate logical sections
- Put only one statement per line
- Format continuation lines clearly (indent to show they're not separate statements)
- Align related code vertically when it helps

### Comments — Self-Documenting Code
The code itself is the primary documentation. Good comments explain the **why**, not the what.

**What code alone should express:**
- Variable names, function names, class names
- Constant names (MAXIMUM_EMPLOYEES, not 100)
- Structure of the algorithm (clear code structure)

**What comments add:**
- Intent: why the code exists (not what it does)
- Summary: high-level description of a complex algorithm
- Assumptions: preconditions that are not enforced by code
- Limitations: what the code doesn't handle and why
- Historical notes: why a non-obvious approach was taken
- References: to requirements, algorithms, or external documentation

**Comments to avoid:**
- Restating what the code says (`i = i + 1; // add one to i`)
- Explaining bad code (refactor instead)
- "Notebook comments" recording history (use version control instead)

---

## Personal Character

### Intelligence and Humility
The best programmers constantly remind themselves that their brains have limits. They respond by:
- Writing simpler code
- Reviewing their work
- Seeking reviews from others
- Never writing code they can't explain

### Curiosity
Read everything — trade magazines, books, other people's code, language specifications. Experiment with new approaches. Ask how things work.

### Intellectual Honesty
Admit mistakes. Acknowledge limitations. When you don't know something, say so. Defend technical decisions with evidence, not ego.

### Habits
"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle

You build habits by repeating behaviors until they become automatic. Build good habits:
- Always initialize variables
- Always comment the why
- Always consider edge cases
- Always check return values
- Always write tests

### The Themes of Software Craftsmanship (Ch. 34)
1. **Conquer complexity** — the overarching theme; everything else is in service to this
2. **Pick your process** — different problems require different approaches; be deliberate
3. **Write programs for people first, computers second** — the compiler can handle almost anything; humans cannot
4. **Program into your language, not in it** — don't limit your thinking to what your language provides
5. **Focus your attention with conventions** — conventions eliminate arbitrary variation; they free your brain for real decisions
6. **Program in terms of the problem domain** — name things in the language of the business, not the machine
7. **Watch for falling rocks** — warning signs (deep nesting, magic numbers, huge routines) mean danger
8. **Iterate** — first attempts are rarely best; iterate on design, on code, on everything
9. **Thou shalt rend software and religion asunder** — pragmatism over dogma; no methodology is perfect

---

## Managing Construction

### Estimating
- Base estimates on the most similar past projects
- Use Cocomo II or function point models for formal estimates
- Account for project size nonlinearity: larger projects take disproportionately more time per line
- Always add contingency

### Configuration Management
- Put everything under version control: source code, builds, test data, documentation, requirements
- Use branches for parallel development streams
- Daily build and smoke test: keep the build always working

### Managing Programmers
- 10:1 productivity ratio between best and worst programmers (not 2:1 or 3:1)
- Physical environment matters: quiet, private space, no interruptions
- Religious issues (naming style, brace style) matter for cohesion but should be decided once, not endlessly debated

---

## Debugging (Ch. 23) — The Scientific Method

> "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." — Kernighan

Debugging occupies up to 50% of total development time on some projects. Quality must be built in from the start; debugging is a last resort, not a quality technique.

### The Systematic Debugging Process
1. **Stabilize the error** — make it occur reliably; non-reproducible bugs are impossible to fix
2. **Locate the source** — find the actual fault, not just a symptom
3. **Gather data** that produces the defect
4. **Analyze the data** and form a hypothesis about the defect
5. **Prove or disprove the hypothesis** by testing or code inspection
6. **Fix the defect** — address root cause, not symptom
7. **Test the fix** — make sure the fix didn't break anything else
8. **Look for similar errors** — bugs cluster; where there's one, there are often more

### Tips for Finding Defects
- **Use all available data** — create a hypothesis that accounts for all observed data; if data doesn't fit, modify the hypothesis
- **Refine test cases** — narrow the failing test to the simplest case that still fails; when any change to the test changes behavior, you've isolated the cause
- **Exercise in unit tests** — defects are easier to find in small fragments than in large integrated programs
- **Reproduce in isolation** — reproduce the defect in a small stand-alone program if possible; this confirms understanding and eliminates interactions

### Psychological Set — The Invisible Enemy
People see what they expect to see. "Psychological set" causes debuggers to overlook obvious errors:
- A programmer who used both `SYSTSTS` and `SYSSISTS` thought they were the same variable
- Code missing braces (`if (x < y) swap = x; x = y;`) is read as if the braces were there
- Similar variable names (`shiftrn`/`shiftrm`) are nearly invisible to the eye

**Implications:**
- Good naming and formatting help errors stand out as variations in the expected pattern
- When you've been staring at code for hours, fresh eyes find things immediately
- Step away, or ask someone else — the outside observer often spots the error in seconds

### Psychological Distance
Use psychologically distant names for similar things. `dcount` and `bcount` differ by one letter (small distance — easy to confuse). `product` and `sum` have large distance — easy to distinguish. Choose names for maximum psychological distance when similar concepts coexist.

### Tips for Fixing Defects
- **Understand before fixing** — make sure you understand the cause completely before patching
- **Is this the only error of this type?** — when you find one, look for others like it
- **Fix the symptom too, if needed** — sometimes you fix the root cause but the symptom persists due to cached state
- **Change code carefully** — each change introduces new risk; the fix should be as minimal as possible
- **Add test cases for the fixed defect** — prevent regression

---

## Integration (Ch. 29)

### Phased vs. Incremental Integration

**Phased Integration ("Big Bang"):** Design, code, test, and debug all classes, then combine them all at once. Problems: when things break after integration (and they will), it's impossible to tell where the problem is because every class is suspect simultaneously. Programmers go into "panicky debugging mode."

**Incremental Integration (strongly preferred):**
1. Develop a small functional skeleton — the hardest or most central part
2. Thoroughly test and debug the skeleton
3. Design, code, test, and debug one new class
4. Integrate and test the combination before adding anything else
5. Repeat

Benefits of incremental integration:
- **Errors are easy to locate** — the newest addition is obviously involved when new problems surface
- **The system works earlier** — there's always a working version; you can ship something at any point
- **Morale is better** — you're always making progress on a working system, not waiting to see if anything works
- **Progress is visible** — you can see the system grow

### Daily Build and Smoke Test
Build the entire system daily. Run a "smoke test" — a set of minimal, fast tests that confirm the system hasn't been catastrophically broken. If the build breaks, fix it immediately — that day. Never let the build stay broken. The daily build creates a stable baseline that everyone can rely on.

Continuous integration is the modern extension of this principle: build automatically on every commit, run the full test suite, and never allow broken code to remain in the main branch.

---

## Table-Driven Methods (Ch. 18)

Instead of complex conditional logic, replace it with table lookups. The table is:
- Easier to understand
- Easier to modify (especially from external data sources)
- More compact

**Classic example:** days in a month. Instead of 12 `if` statements, one array: `{31, 28, 31, 30, ...}` → `days = daysPerMonth[month-1]`

**More powerful example:** insurance rates varying by age, gender, marital status, smoking status. A four-dimensional array replaces hundreds of nested `if` statements. The complex logic disappears; the data drives the behavior.

**Key insight:** When you find yourself writing many similar `if` statements differentiated only by data values, consider moving the data into a table and replacing the `if` structure with a table lookup.

Types of table access: direct (index maps directly), indexed (index maps to an index in the real table), stair-step (ranges map to entries).

---

## Design Is a Wicked Problem

Horst Rittel defined "wicked" problems as problems that can only be clearly defined by solving them. Software design is inherently wicked: you have to "solve" the problem once in order to understand it well enough to design a real solution.

> "No system has ever been developed in a rational, error-free way from a statement of requirements. … Even the small program developments shown in textbooks are unreal. They have been revised and polished until the author has shown us what he wishes he had done, not what actually did happen." — Parnas and Clements

Design is also **sloppy** even when it produces a tidy result. Taking false steps and going down blind alleys is the point of design — it's far cheaper to make mistakes and correct them in design than to make the same mistakes in code. Good design is iterative; the more design possibilities you try, the better your final design.

The key question to ask at every design decision: **"What should I hide here?"** Information hiding settles more difficult design issues than any other single heuristic.

---

## Class Design — ADTs in Depth

The greatest power of ADTs is **allowing you to work in the problem domain rather than the implementation domain**. Instead of inserting a node into a linked list, you add a cell to a spreadsheet. Instead of setting a bit flag, you call `employee.SetAvailability(true)`.

**Benefits of ADTs (vs ad hoc data manipulation):**
- Hide implementation details (if you switch from linked list to array, only one place changes)
- Make interfaces more informative (operations make sense in context)
- Easier to improve performance (implementation can be replaced without changing interface)
- Program is self-documenting (operations read naturally)
- Don't have to pass data everywhere (the ADT carries its own operations)
- Can create multiple instances without conflicts

The distinction between ADTs and Classes: ADTs are the conceptual foundation; classes are the language mechanism that implements them. Understanding ADTs first leads to better class design.

---

## Managing Construction (Ch. 28)

### Encouraging Good Coding
- Define and enforce coding standards — consistency reduces cognitive load
- Review code — pair programming and formal inspections catch things testing misses
- Measure the code — track defect counts, complexity metrics, coverage

### Treating Programmers as People
The Weinberg-Schulman experiment: five teams were told to optimize for five different objectives (speed, memory, readability, least code, minimum time). The astonishing result: four of five teams finished first in their assigned objective. **People actually do what you ask them to do.** Explicitly define what objectives matter.

Physical environment matters substantially:
- Quiet, private workspace enables the "flow state" needed for complex problem solving
- Open offices are the enemy of deep work; programmers need long stretches of uninterrupted time
- The 10:1 productivity differential between best and worst programmers dwarfs any tool improvement

### Managing Your Manager
If your manager doesn't understand what you need to do quality work, educate them gently. If they insist on shortcuts, document the risks. If quality is not a valued objective, code quality will not improve regardless of individual effort — the entire team must prioritize it.

---

## Refactoring — Complete Catalog of Reasons (Ch. 24)

Refactor when you see any of these:
- Code is **duplicated**
- A routine is **too long**
- A loop is **too long or too deeply nested**
- A class has **poor cohesion**
- A class interface does not provide a **consistent level of abstraction**
- A parameter list has **too many parameters**
- **Changes tend to be compartmentalized** within a class (class is doing too much)
- Changes **require parallel modifications** to multiple classes (coupling)
- **Inheritance hierarchies** have to be modified in parallel (fragile base class)
- `case` statements have to be modified in parallel
- Related data items are **not organized into classes**
- A routine uses **more features of another class** than its own (misplaced method)
- A **primitive data type** is overloaded with special meanings
- A class **doesn't do very much**
- A chain of routines passes **tramp data** (data passed through functions that don't use it)
- A **middleman object** isn't doing anything (just delegating)
- One class is **overly intimate** with another
- A routine has a **poor name**
- **Data members are public**
- A subclass uses only a **small percentage of its parents' routines**
- Comments are used to **explain difficult code** (refactor instead)
- **Global variables** are used
- A routine uses **setup code** before a call or **takedown code** after

**Don't refactor when:** the code is near a deadline; changing it would require a massive rewrite; the code is barely understood and not tested; the change would be purely cosmetic without making the code easier to understand or modify.

---

## The General Principle of Software Quality

The single most important insight in the entire book:

> **Improving quality improves the development schedule and reduces development costs.**

This seems counterintuitive — taking time to do quality work should slow you down. But defect removal is expensive, especially late in the process. Every defect you avoid early:
- Does not require testing time to find
- Does not require debugging time to locate
- Does not require fixing time to repair
- Does not require re-testing time to verify the fix

Building quality in from the start is almost always faster than testing it in at the end. Rushing leads to more defects, which leads to more time spent fixing, which leads to schedule slippage. Quality is not a luxury; it is efficiency.

---

## What Is Software Construction? (Ch. 1)

Construction is the central activity in software development — the activity developers spend most of their time on (30–65% of total project effort, up to 75% on smaller projects). Understanding its boundaries matters.

**Construction includes:**
- Detailed design and design decisions made while coding
- Coding and debugging
- Unit testing
- Integration testing
- Code reviews and walkthroughs
- Code formatting and commenting

**Construction does NOT include** (but is preceded/supported by):
- Requirements development
- High-level architecture
- System testing
- Project management

Construction is also known as "coding" or "programming," but "coding" is misleading — it implies mechanical transcription of a pre-existing design. Construction is not mechanical. It involves substantial creativity and judgment. Virtually no system is designed so completely that construction can proceed mechanically.

**Why construction is important:** Construction is unavoidable. Every project requires it. It's the one phase where every bug must ultimately be addressed. And the quality of construction directly determines the quality of the product — no amount of testing can fix fundamentally poorly constructed code.

---

## Organizing Straight-Line Code (Ch. 14)

Even in sequential code (no branches, no loops), organization matters. Two key principles:

### Statements With Order Dependencies
When statements have dependencies that require specific ordering, make those dependencies **visible**:

- **Organize so dependencies are obvious** — if `ComputeQuarterly()` must run after `ComputeMonthly()`, structure the code to show it, or put them in one routine that runs both in order
- **Name routines to reveal dependencies** — if `ComputeMarketingExpense()` also initializes data, rename it `InitializeAndComputeMarketingExpense()` — or better, extract a separate `InitializeExpenseData()` routine
- **Use parameters to make dependencies obvious** — if one routine uses data produced by another, pass that data explicitly as a parameter rather than through shared state

```java
// UNCLEAR - what depends on what?
ComputeMarketingExpense();
ComputeSalesExpense();
DisplaySummary();

// CLEAR - dependencies visible through parameters
expenseData = InitializeExpenseData();
ComputeMarketingExpense(expenseData);
ComputeSalesExpense(expenseData);
DisplaySummary(expenseData);
```

### Statements Whose Order Doesn't Matter
When order is truly flexible, organize for readability:
- **Make code read top-to-bottom** — readers expect sequential execution; arrange code to match that mental model
- **Group related statements** — treat logically related code as a paragraph; separate groups with blank lines
- **Keep statements near where their variables are used** — minimize the "live time" of each variable

---

## Unusual Control Structures (Ch. 17)

### Multiple Returns from a Routine
Multiple `return` statements are not inherently bad. Guidelines:

**Use return when it enhances readability:**
```cpp
// Clear: return as soon as answer is known
Comparison Compare(int a, int b) {
    if (a < b) return Comparison_LessThan;
    if (a > b) return Comparison_GreaterThan;
    return Comparison_Equal;
}
```

**Use guard clauses to eliminate deep nesting:**
```vb
' UGLY - nominal case buried in nested ifs
If file.validName() Then
    If file.Open() Then
        If encryptionKey.valid() Then
            ' ... nominal case ...
        End If
    End If
End If

' CLEAR - errors checked first, nominal case obvious
If Not file.validName() Then Exit Sub
If Not file.Open() Then Exit Sub
If Not encryptionKey.valid() Then Exit Sub
' ... nominal case runs here, unindented and visible ...
```

**Limit to one per routine when multiple returns cause confusion.** If a routine is complex enough that multiple exits are confusing, that complexity is the real problem — simplify the routine.

### Recursion
Recursion solves problems by having a routine call itself on a progressively smaller sub-problem until a base case is reached.

**When recursion is good:** When the problem is naturally recursive (trees, mazes, mathematical induction). Quicksort is a classic example: split array in two, sort each half recursively.

**When recursion is bad:** Most problems. Simple iteration is almost always more understandable. For a small group of problems, recursion produces simple elegant solutions; for a slightly larger group, it produces simple elegant *hard-to-understand* solutions; for most problems, it produces massively complicated solutions.

**Tips for using recursion:**
- Define a clear base case that stops the recursion — infinite recursion is the main hazard
- Make sure the recursive case always moves toward the base case
- Verify the recursion terminates (track that progress is being made)
- Watch out for stack overflow with deep recursion
- Consider iteration if recursion makes the code hard to understand

### goto
The verdict from decades of practice: **avoid `goto` in modern languages.**

**The case against goto (Dijkstra, 1968):**
- Code quality is inversely proportional to the number of gotos
- goto defeats compiler optimizations
- goto makes code difficult to format (indentation can't show structure)
- gotos spread like termites — once introduced, more appear
- Java has no goto; most modern languages discourage it

**The limited case for goto:** In languages lacking proper loop constructs, goto was occasionally the only way to write certain control structures. In modern languages with `break`, `continue`, `return`, and exceptions, there are no legitimate use cases.

**The summary:** Use `return` to exit early, `break` to exit loops, exceptions for error handling. Never use goto.

---

## Code-Tuning Techniques (Ch. 26)

These are **anti-refactorings** — they trade code clarity for performance. Use them only *after* profiling identifies a real bottleneck. Measure before and after every change; the results often surprise.

### Logic Techniques

**Stop Testing When You Know the Answer (short-circuit evaluation):**
Replace full evaluations with early exits:
```cpp
// Search through array; stop when found
for (i = 0; i < count; i++) {
    if (input[i] < 0) {
        negativeFound = true;
        break;  // Don't test remaining elements
    }
}
```
If your language doesn't short-circuit `and`/`or`, use nested ifs.

**Order tests by frequency:** Put the most commonly true condition first in an if-else chain. Put the most commonly matched case first in a switch.

**Lazy Evaluation:** Don't compute values until they're actually needed. If a program builds a table of 5000 values at startup but uses only a few, compute each entry on demand and cache it.

### Loop Techniques

**Unswitching:** Move a decision that doesn't change outside a loop:
```cpp
// SLOW: decision made every iteration
for (i = 0; i < n; i++) {
    if (sumType == REVENUE)  a[i] = b[i] * revenueRate;
    else                     a[i] = b[i] * costRate;
}

// FAST: decision made once, outside loop
if (sumType == REVENUE) {
    for (i = 0; i < n; i++) a[i] = b[i] * revenueRate;
} else {
    for (i = 0; i < n; i++) a[i] = b[i] * costRate;
}
```

**Loop Unrolling:** Process multiple elements per iteration to reduce loop overhead. Useful when the loop body is tiny and the overhead of the loop machinery is significant relative to the body.

**Sentinel Values:** For search loops, place a guaranteed-to-match value just past the end of the array. This eliminates the bounds check on each iteration, halving the number of comparisons:
```cpp
// Without sentinel: 2 tests per iteration (found? and in-bounds?)
// With sentinel: place testValue at item[count], then loop only tests item[i]==testValue
// When loop exits, check if i < count to know whether it was found legitimately
```

### Data Transformation

**Strength Reduction:** Replace expensive operations with cheaper ones:
```vb
' SLOW: multiplication on every iteration
For i = 0 To n-1
    commission(i) = (i+1) * revenue * baseRate * discount
Next

' FAST: addition instead of multiplication
incrementalCommission = revenue * baseRate * discount
cumulativeCommission = incrementalCommission
For i = 0 To n-1
    commission(i) = cumulativeCommission
    cumulativeCommission += incrementalCommission
Next
```

**Caching:** If a value is expensive to compute and used repeatedly, compute it once and store it. Trading memory for speed.

**The key rule:** Code-tuning results are environment-specific. What speeds up code on one compiler/CPU may slow it on another. Always measure. Never guess.

---

## Controlling Loops (Ch. 16)

Loops are one of the most complex aspects of programming; choosing the right kind matters for clarity and correctness.

### Selecting the Kind of Loop

| Loop Type | Use When |
|-----------|----------|
| `for` / counted | You know the exact number of iterations before entering |
| `while` (test at top) | You may need to iterate 0 or more times |
| `do-while` (test at bottom) | You need to iterate at least once |
| `foreach` | Iterating over a container |
| Loop-with-exit (break in middle) | The exit condition is in the middle of the loop body |

**When to use a `while` loop:** When you don't know ahead of time how many iterations are needed. Test at the top for the most common case (may iterate zero times). Test at the bottom (`do-while`) only when the loop must execute at least once.

**Loop-with-exit:** Use when the natural exit point is in the middle of the loop body, not at the top or bottom. Prefer `while (true) { ... if (exitCondition) break; ... }` over the "loop-and-a-half" pattern that duplicates code.

### Controlling the Loop

**Entering the loop:**
- Enter from only one place — always from the top, never jumping in mid-loop
- Initialize loop variables immediately before the loop, not lines above it
- Put the loop's initialization code right next to the loop

**Processing the middle:**
- Limit the loop to one function's worth of code — if the body is getting long, extract a function
- Avoid writing to the loop index variable in the body
- Make the loop body do something meaningful each iteration

**Exiting the loop:**
- Use a single exit point when possible — makes it easier to reason about state
- Loop-with-exit loops (one break in the middle) are acceptable and often cleaner
- Verify endpoints: check that the loop runs 0 times, 1 time, and many times in tests
- Don't use the loop variable after the loop exits (its value is unreliable)

**How long should a loop be?**
- Short enough to view on one screen (~15–20 lines)
- Long enough to do one meaningful thing
- If you can't see the loop's beginning and end at the same time, it's probably too long

### The Correspondence Between Loops and Arrays
Loops and arrays are intimately related. A loop that processes an array should traverse exactly the array's full range. Array bounds defined with named constants should be reused in the loop bounds. Mismatches between how an array is defined and how it is traversed are a common source of off-by-one errors.

---

## How Program Size Affects Construction (Ch. 27)

One of the most significant and underappreciated insights in all of software engineering: **project size is not linear**.

### Communication Overhead Grows Superlinearly
The number of communication paths between n people = n×(n-1)/2. Adding one person to a 4-person team (5 paths → 10 paths) doubles the coordination cost. Adding one to a 10-person team (45 → 55 paths) increases it 22%.

This is why small teams outperform large ones on a per-person basis, and why Brooks's Law holds: "Adding manpower to a late software project makes it later."

### Effect on Errors
Error rates per line of code are higher on large projects than small ones:
- Small projects (10 KLOC): ~15 defects per 1000 lines
- Large projects (500+ KLOC): ~50+ defects per 1000 lines

Larger projects have more interfaces, more people, more misunderstandings, and more opportunities for errors to interact.

### Effect on Productivity
Individual productivity drops on large projects:
- A developer on a solo project may produce 10–20 KLOC/year
- The same developer on a 100K-line project may produce 1–3 KLOC/year

Most of the difference is coordination overhead, not individual capability.

### Methodology and Size
The right development process depends heavily on project size:
- **Tiny (1-3 people):** Informal methods, little documentation, direct communication
- **Small (4-10 people):** Light formal process, some documentation, defined interfaces
- **Medium (10-50 people):** Formal processes, architecture documentation, design reviews
- **Large (50+ people):** Full software engineering formality required

Applying heavy process to small projects wastes time. Applying light process to large projects causes chaos. **Scale your methodology to your project.**

---

## Programming Tools (Ch. 30)

Good tools don't replace good thinking, but they amplify it. A craftsman knows their tools.

### Source-Code Tools
**Editing:** IDE features that save time — auto-completion, rename refactoring, go-to-definition, find all references. Invest in learning your IDE deeply. The distance between thought and code should be small.

**Code quality analysis / Static analysis:** Tools that analyze code without running it. They find unreachable code, unused variables, suspicious patterns, security vulnerabilities, and style violations. Use them. Fix what they flag. They catch bugs for free.

**Refactoring tools:** Automated rename, extract method, move class, inline variable. Use them in preference to manual text editing — they're safer (they understand syntax) and faster.

**Version control:** Non-negotiable. Git is the universal standard. Every project — personal, professional, throwaway — should be under version control from day one. Branches, diffs, blame, history, rollback.

### Testing Tools
**Test frameworks:** JUnit, pytest, Jest, etc. — choose the standard for your ecosystem and use it consistently. The framework's conventions matter; follow them so the test suite is readable to all team members.

**Coverage monitors:** Measure which lines are executed by tests. Aim high (80%+ for non-trivial code). Coverage doesn't guarantee quality, but gaps in coverage are always worth understanding.

**Memory checkers, sanitizers:** Valgrind, AddressSanitizer, etc. — find memory errors, race conditions, and undefined behavior that tests alone miss.

### The Toolbox Principle
A good craftsman's toolbox grows over time. When you encounter a problem that your current tools can't solve well, search for a better tool. Let need drive acquisition. Master your current tools before adding new ones.

The worst anti-pattern: picking one IDE/framework/language and never leaving its comfort zone. Comfort and mastery are different. Comfort means you've stopped growing.
