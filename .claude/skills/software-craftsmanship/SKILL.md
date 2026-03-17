---
name: software-craftsmanship
description: >
  Ultra-complete software craftsmanship advisor synthesizing Code Complete (McConnell),
  The Pragmatic Programmer (Thomas & Hunt), and Clean Code (Martin). Use for ANY code
  quality, design, naming, refactoring, testing, debugging, architecture, or professional
  coding practice question. Trigger for code reviews, naming variables/functions/classes,
  function design, class design, commenting strategies, error handling, defensive
  programming, testing strategies, debugging, refactoring, DRY, SOLID, coupling,
  cohesion, abstraction, encapsulation, information hiding, managing complexity, code
  smells, programming philosophy, pair programming, code inspections, technical debt,
  broken windows, performance tuning, concurrency, API design. Also trigger when the user
  asks about clean code, good code, code quality, best practices, or how experienced
  developers write code.
---

# Software Craftsmanship — The Complete Canon

This skill synthesizes three foundational books of software craftsmanship:
- **Code Complete** (Steve McConnell, 2nd ed.) — the encyclopedia of construction
- **The Pragmatic Programmer** (David Thomas & Andrew Hunt, 20th Anniversary Ed.) — the pragmatist's philosophy
- **Clean Code** (Robert C. Martin) — the craftsman's discipline

## How to use this skill

Read this SKILL.md for core principles and cross-cutting themes. Then load the relevant reference file for deep-dive guidance:

- `references/code_complete.md` — Design, classes, routines, variables, naming conventions, testing, debugging, refactoring, layout, comments, personal character, managing construction
- `references/pragmatic_programmer.md` — Philosophy, DRY, orthogonality, ETC principle, tools, contracts, decoupling, concurrency, requirements, team practices
- `references/clean_code.md` — Names, functions, comments, formatting, objects, error handling, unit tests, classes, systems, code smells, heuristics

**Always load at least one reference file** before answering questions about specific topics.

---

## The Meta-Principle: Everything Serves Change

The three books converge on a single truth, expressed differently:

- McConnell: **Managing Complexity** is software's primary technical imperative
- Thomas & Hunt: **ETC** — Easier to Change — is the root of all good design
- Martin: Code must be **read** far more than written; write for the reader

Every recommendation in these books flows from these truths. When advising, always connect guidance back to why it reduces complexity, makes change easier, or improves readability.

---

## The Hierarchy of Quality Concerns

Apply these concerns in this order of importance:

1. **Correctness** — does it work and handle edge cases?
2. **Readability** — can others (and future-you) understand it?
3. **Maintainability** — can it be changed safely without breaking things?
4. **Extensibility** — can it accommodate growth without violence to its structure?
5. **Performance** — measure first, optimize only proven bottlenecks

> "Make it work, make it right, make it fast — in that order." Premature optimization is a cardinal sin. McConnell shows the Pareto Principle applies: ~5% of code accounts for ~50% of execution time. Profile before tuning.

---

## The Seven Design Imperatives (synthesized from all three books)

### 1. Conquer Complexity Through Abstraction
Break programs into parts that can be understood independently. A class should have a single, coherent purpose (SRP). A routine should do one thing. A variable should have one purpose. The human mind holds ~7 chunks in working memory simultaneously (Miller's Law) — respect that limit in every design decision.

### 2. Don't Repeat Yourself (DRY)
Every piece of knowledge must have **a single, unambiguous, authoritative representation** in a system. Duplication is a maintenance nightmare: when requirements change, you must find and update every copy — and you will forget one. DRY applies to code, documentation, build systems, data schemas, and tests.

### 3. Keep Coupling Loose
Coupling is the enemy of change. Minimize the number of connections between parts. Use the Law of Demeter: don't reach through objects to talk to strangers. Prefer composition over inheritance. If A changes and it breaks B, that's coupling. Good design lets you change B without A even knowing.

### 4. Maximize Cohesion
A class or routine should have a single, well-focused responsibility. Code that supports a central purpose is easier to understand, test, and change. When a class does too many things, extract classes. When a routine does too many things, extract routines.

### 5. Hide Information
Each module should hide implementation details behind a well-defined interface. Program to abstractions, not implementations. The interface represents the decision about what to expose; everything else is an implementation detail that can change freely.

### 6. Program Defensively
Assume inputs can be wrong, systems can fail, and your own code has bugs. Validate inputs at system boundaries. Use assertions to document and verify assumptions. Design barricades between trusted and untrusted code. Crash early rather than corrupting data silently.

### 7. Iterate and Improve Continuously
Software is gardening, not construction. Leave code cleaner than you found it (Boy Scout Rule). Refactor fearlessly when you have tests. Technical debt accrues interest — pay it down incrementally. Broken windows breed more broken windows; fix them immediately.

---

## The Most Critical Naming Rules

Good names are the single most impactful thing for readability. Synthesized from all three books:

**From Clean Code:**
- Names should reveal intent (why it exists, what it does, how it's used)
- If a name needs a comment, it's not a good name
- Avoid disinformation (`accountList` when it's not a List)
- Make meaningful distinctions (`ProductInfo` vs `ProductData` — pick one meaning)
- Use pronounceable, searchable names
- Avoid encodings (no Hungarian notation, no member prefixes)
- Classes: nouns (`Customer`, `WikiPage`). Methods: verbs (`postPayment`, `deletePage`)
- Pick one word per concept; don't pun
- Use domain terminology (solution domain names for technical constructs, problem domain names for business concepts)

**From Code Complete:**
- The most important naming consideration: fully describe what the variable/routine represents
- Optimal variable name length: 9–15 characters (studies show; short names for small scope, longer for larger scope)
- Naming conventions: define them project-wide and follow them religiously
- Boolean variables: phrase as yes/no questions (`isComplete`, `wasFound`, `hasErrors`)
- Constants: name for what they represent, not their values (`MAXIMUM_EMPLOYEES`, not `100`)
- Loop indexes: use descriptive names for nested loops or long loops; `i/j/k` only for trivially obvious short loops

**From The Pragmatic Programmer:**
- Names reflect the role a thing plays, not its implementation
- Name things according to what they mean in the problem domain — the Stroop effect shows the brain processes words as reality
- Maintain a project glossary; don't use different words for the same concept

---

## The Most Critical Function/Routine Rules

**From Clean Code:**
- Functions should be **small** (rarely > 20 lines, ideally 4–10)
- Do **one thing** at one level of abstraction
- The Stepdown Rule: code reads top-to-bottom, each function leading naturally to the next
- Ideal arguments: 0 (niladic), then 1 (monadic), then 2 (dyadic). Avoid 3+
- Avoid flag arguments — they announce the function does two things
- No side effects (if a function computes something, it shouldn't also modify state)
- Command-Query Separation: functions either **do** something OR **answer** something, never both
- Prefer exceptions to returning error codes; extract try/catch blocks into their own functions
- Don't Repeat Yourself: if you see code appearing twice, extract it

**From Code Complete:**
- Every routine needs a single, clear purpose expressible in one sentence
- Routine parameters: max 7; order input → modify → output; don't use parameters as working variables
- Name routines with a verb + noun describing what is accomplished (`PrintDocument`, `GetCustomerData`)
- Routine length: let complexity dictate length, not arbitrary limits; most routines should be 1–200 lines; nothing > 200 should exist without good reason
- Use the Pseudocode Programming Process (PPP): write intent in plain English before coding

**From The Pragmatic Programmer:**
- Design by Contract: define preconditions, postconditions, and invariants
- Functions that allocate resources should deallocate them (Finish What You Start)
- Take small steps — don't outrun your headlights; each change should be validated before proceeding

---

## The Most Critical Testing Rules

**From Code Complete:**
- Use structured basis testing: test each path through the code (minimum test cases = 1 + number of decision points)
- Use equivalence partitioning: identify classes of data that should behave identically
- Test boundary conditions: off-by-one errors are the most common; test exactly at, just below, and just above boundaries
- Test bad data: null, empty, minimum, maximum, invalid types
- 80% of errors concentrate in 20% of the code — find your hotspots
- Formal code inspections detect 45–70% of defects; unit testing detects only 30–35%

**From Clean Code:**
- TDD: Write failing test → write minimum code to pass → refactor
- Tests must be as clean as production code — dirty tests are worse than no tests
- One concept per test
- FIRST: Fast, Independent, Repeatable, Self-Validating, Timely
- Tests are the enabler of fearless refactoring; without tests, every change is a risk

**From The Pragmatic Programmer:**
- "Testing is not about finding bugs — it's about getting feedback on your code"
- Think about tests before writing code; testability drives better design
- Use property-based testing to discover invariants you didn't know about
- Build a full regression test suite; automate it; run it on every commit

---

## Error Handling Philosophy

**The defensive triad (synthesized):**

1. **Validate at boundaries** (McConnell's barricade pattern): designate a clean/dirty boundary; validate everything entering from outside; trust everything inside
2. **Assert your assumptions** (all three books): assertions document what must be true; use them liberally in development; they catch bugs closest to their source
3. **Crash early rather than propagate corruption** (Pragmatic Programmer's "Dead Programs Tell No Lies"): an incorrect program that crashes is better than one that silently computes wrong results

**Error handling style (Clean Code):**
- Prefer exceptions to error codes — error codes clutter calling code and get ignored
- Define your exception hierarchy with care
- Don't return `null` — return empty collections, Optional, or throw; null causes null pointer chains
- Don't pass `null` — defend against it at boundaries

---

## Refactoring: When and How

**Refactor when (Code Complete):** duplication exists; a routine does more than its name suggests; a class has low cohesion; a method is too long; there's deep nesting (> 3 levels); a variable has multiple uses; code smells (see `references/clean_code.md` for the full smell catalog)

**Refactor safely (Code Complete):** save the code before starting; take small steps; test after each step; keep a list of what to refactor (don't do it all at once); never refactor and add features simultaneously

**The Pragmatic Programmer on refactoring:** software is like a garden — it needs constant tending. Refactoring is not an optional cleanup activity; it is continuous gardening. Every time you touch code, leave it better than you found it.

---

## Personal Character and Professional Attitude

**From Code Complete (Chapter 33-34):**
- Intelligence and humility: the best programmers know the limits of their minds and compensate with design discipline
- Intellectual honesty: acknowledge errors; don't defend broken code for ego reasons
- Curiosity: read widely; experiment; learn from every project
- Habits matter more than motivation: build good habits so quality becomes automatic
- "Write programs for people first, computers second"
- "Program into your language, not in it" — don't let language limitations constrain your thinking

**From The Pragmatic Programmer:**
- You have agency: it's your career, your code, your responsibility
- Take responsibility for outcomes; don't blame tools, requirements, or colleagues
- Care About Your Craft — there is no point in developing software unless you care about doing it well
- Think! About Your Work — never run on auto-pilot
- Sign your work: take pride in it; your name should be a mark of quality
- Invest in your knowledge portfolio regularly; diversify; manage risk; rebalance

**From Clean Code:**
- We are authors: the ratio of reading to writing code is 10:1; write for your future readers
- Boy Scout Rule: leave the campground cleaner than you found it
- Craftsmanship requires both knowledge and practice; you cannot learn it from reading alone

---

## Quick Diagnostic Checklist

When reviewing any piece of code, ask:

**Naming:** Could I understand this without reading the implementation?  
**Functions:** Does this routine do exactly one thing? Is it named for what it accomplishes?  
**Complexity:** If I remove a piece, does the rest still make sense independently?  
**DRY:** Have I seen this logic elsewhere? Could a future change require updating two places?  
**Coupling:** If X changes, what else breaks? Is that list too long?  
**Defensiveness:** What happens with null input? Empty input? Extreme values? Concurrent access?  
**Testability:** Can I test this in isolation? Would I need complex setup to test it?  
**Comments:** Am I explaining *what* (restate what code says) or *why* (document intent and rationale)?

---

## Loading Reference Files

For deep guidance on specific topics, load:

**`references/code_complete.md`** when asked about:
- Design heuristics (abstraction, encapsulation, information hiding, coupling, cohesion)
- Class design (ADTs, interfaces, inheritance vs containment)
- Variable handling (scope, initialization, naming conventions)
- Control structures (loops, conditionals, nested logic)
- Code quality measurement (cyclomatic complexity, defect rates)
- Collaborative construction (inspections, pair programming)
- Layout and formatting philosophy
- Managing construction (estimates, team, configuration management)

**`references/pragmatic_programmer.md`** when asked about:
- Career and philosophy (it's your life, responsibility, broken windows)
- DRY, orthogonality, and reversibility in depth
- Tracer bullets vs prototypes
- Design by Contract details
- Tools (shell, editors, version control, plain text)
- Concurrency and temporal coupling
- Requirements and agility
- Team dynamics and pragmatic projects

**`references/clean_code.md`** when asked about:
- Specific naming rules and anti-patterns
- Function design rules with examples
- Comment philosophy (when to comment, when not to)
- Formatting and formatting conventions
- Object vs data structure distinctions
- Error handling with exceptions and null
- Unit test structure (TDD, FIRST, clean tests)
- Class design (SRP, OCP, cohesion)
- The complete catalog of code smells and heuristics

---

## Advanced Synthesis: Topics Where the Three Books Converge Powerfully

### On Debugging

All three books treat debugging as a symptom of deeper problems:

**McConnell (Code Complete):** Debugging occupies up to 50% of development time on some projects. The scientific method applies: stabilize → locate → hypothesize → prove → fix → test → search for similar errors. "Psychological set" — seeing what you expect to see — is the debugger's worst enemy. Good naming and formatting help errors stand out as variations in the expected background pattern.

**Thomas & Hunt (Pragmatic):** "Fix the Problem, Not the Blame." Approach debugging as puzzle-solving. Use the rubber duck: explaining the problem out loud to a duck (or a colleague) causes you to examine assumptions you didn't know you were making. Don't panic; "it can't happen" thinking is always wrong.

**Martin (Clean Code):** Clean code has fewer bugs by definition. Self-documenting code makes bugs visible immediately. Tests make bugs easy to reproduce and localize.

**The synthesis:** Debugging is largely avoidable. Good code, good tests, good assertions, and good error handling prevent most bugs from surviving long enough to reach production. When debugging is necessary, the scientific method is the only reliable approach.

### On Technical Debt

**McConnell:** The General Principle of Software Quality — building quality in from the start is faster than testing it in at the end. Every defect avoided saves the cost of finding, fixing, and re-testing.

**Thomas & Hunt:** Broken Windows theory — one compromised area signals abandonment and invites further compromise. Technical debt accrues interest. Pay it down incrementally.

**Martin:** "Wading through bad code" — developers spend more time reading and navigating old code than writing new code. Messy code compounds — each addition requires understanding and working around the existing mess, making future additions harder.

**The synthesis:** Technical debt is real debt with real interest. Paying it down requires discipline and organizational support, but it's almost always worth it. The Boy Scout Rule (leave it better than you found it) is the most practical debt reduction strategy for working codebases.

### On the Role of Tests

**McConnell:** No single defect-detection technique finds more than 70-75% of defects. The combination of multiple techniques (inspections + unit testing + integration testing + system testing) achieves 95%+ removal rates in leading organizations. Tests enable refactoring.

**Thomas & Hunt:** "Testing is not about finding bugs — it's about getting feedback on your code." Writing tests forces you to think about the interface before the implementation. Property-based testing discovers invariants you didn't know about.

**Martin:** The Three Laws of TDD. Tests must be as clean as production code. "The test suite eliminates the fear of cleaning up." Without tests, every change is a potential regression.

**The synthesis:** Tests are not a quality check performed after the fact; they are a design activity, a documentation activity, and a change-enablement activity. The investment in a comprehensive test suite pays compounding returns throughout a codebase's lifetime.

### On Naming

**McConnell:** The most important naming consideration: fully describe what the variable/routine represents. Optimal name length: 9-15 characters for variables. Conventions must be project-wide and enforced.

**Thomas & Hunt:** Names reveal your intent and your understanding. If you can't name something clearly, you may not understand it clearly. The Stroop effect: the brain treats written words as reality — misleading names introduce real cognitive conflict.

**Martin:** Names should reveal intent (why, what, how). If a name needs a comment, it doesn't reveal its intent. 90% of code readability comes from names. Take time with names; change them when you find better ones.

**The synthesis:** Naming is the single highest-leverage activity for code quality. A well-named codebase is almost self-documenting; a poorly-named one requires constant mental translation. Every naming decision is worth deliberate thought.

---

## Integration with Modern Development Practice

These three books predate (or are contemporaneous with) some modern practices, but their principles apply directly:

**Git/Version Control:** McConnell's configuration management. Pragmatic's "keep everything under version control." Commit messages should explain *why*, not *what* (the diff shows what).

**CI/CD:** McConnell's daily build and smoke test → modern continuous integration. Pragmatic's "build requires one step, tests require one step" → automated pipelines.

**Microservices:** Each service should have a single, well-defined responsibility (SRP). Services should be orthogonal. DRY applies across service boundaries via shared libraries or schema definitions, not code copying.

**Agile/Scrum:** Thomas & Hunt helped write the Agile Manifesto. The essence of agility is continuous feedback, not specific ceremonies. Requirements are discovered, not specified upfront.

**TDD:** Martin's Three Laws of TDD. Test-first design produces better interfaces than implementation-first design.

**Code Reviews:** McConnell's formal inspections → modern pull requests. The goal is defect detection, not blame assignment. Psychological distance: fresh eyes see what authors' psychological set obscures.

**Refactoring Tools:** McConnell's refactoring catalog. Modern IDEs make many refactorings safe and automatic (rename, extract method, move class). Use them constantly, not just during cleanup phases.
