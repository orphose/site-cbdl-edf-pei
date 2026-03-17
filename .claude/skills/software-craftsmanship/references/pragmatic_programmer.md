# The Pragmatic Programmer Reference — Thomas & Hunt

## Core Philosophy

Pragmatic Programmers are characterized by:
- **Early adopter/fast adapter**: instinct for new technology, confident integration
- **Inquisitive**: constantly asking why, how, what else
- **Critical thinker**: never take things as given without facts
- **Realistic**: understand the nature of each problem; know how hard things truly are
- **Jack of all trades**: broad background, always able to move to new challenges

Two fundamental tips that govern everything else:

> **Tip 1 — Care About Your Craft**: There is no point in developing software unless you care about doing it well.

> **Tip 2 — Think! About Your Work**: Never run on auto-pilot. Constantly critique your work in real time.

---

## Chapter 1: A Pragmatic Philosophy

### Topic 1 — It's Your Life
You own your career. Software development is one of the most controllable careers in existence. If your environment is toxic, change it or leave. If your skills are stale, invest in them — on your own time. You have agency.

> **Tip 3 — You Have Agency**

### Topic 2 — The Cat Ate My Source Code (Responsibility)
Take responsibility for everything you do. Your team must be able to trust and rely on you. When you make a mistake:
- Admit it honestly
- Offer options, not excuses
- Don't blame tools, language, management, or coworkers
- If there was a risk you should have seen, own that you should have had a contingency plan

Think through the "rubber duck" exercise: before going to someone with a problem, explain it completely to a rubber duck first. You often find the answer before finishing.

### Topic 3 — Software Entropy (Broken Windows)
Research on urban decay shows that **one broken window**, left unrepaired, instills a sense of abandonment and triggers rapid deterioration. The same applies to software.

> **Tip 5 — Don't Live with Broken Windows**

Bad designs, wrong decisions, and poor code left unrepaired signal that nobody cares. Other people lose the will to maintain standards. Fix broken windows immediately. If there's no time, board them up: comment out offending code, add a "Not Implemented" stub, flag with a TODO. Take *some* action.

Conversely: if you're working in a pristine codebase, you feel the obligation to keep it clean. Don't be the first to break a window.

### Topic 4 — Stone Soup and Boiled Frogs
**Stone Soup (Be a Catalyst for Change)**: Sometimes you know exactly what needs doing but can't get approval. Work out what you *can* reasonably ask for. Build it. Show people. Then add "of course, it would be better if we added..." Let them ask to expand it. People find it easier to join an ongoing success.

> **Tip 6 — Be a Catalyst for Change**

**Boiled Frogs (Notice Gradual Decay)**: The frog doesn't notice the water heating slowly. Notice when projects slowly drift — scope creep, schedule slippage, growing technical debt. Check the bigger picture regularly, not just the task in front of you.

> **Tip 7 — Remember the Big Picture**

### Topic 5 — Good-Enough Software
"Good enough" does not mean sloppy. It means: involve users in deciding how good the software needs to be. Sometimes rough edges today are better than a perfect product in a year. Know when to stop.

> **Tip 8 — Make Quality a Requirements Issue**

The scope and quality of the system you produce *should be discussed as part of that system's requirements*.

### Topic 6 — Your Knowledge Portfolio
Your knowledge is your most important professional asset — and an expiring one. Treat it like a financial portfolio:

- **Invest regularly** — even small amounts; the habit matters
- **Diversify** — know multiple languages, domains, and technologies
- **Manage risk** — balance conservative (known) and high-risk (emerging) technologies
- **Buy low, sell high** — learn emerging technologies before they become mainstream
- **Review and rebalance** — what was hot changes; adapt

**Building the portfolio:**
- Learn at least one new language every year
- Read a technical book each month; then a non-technical one
- Take classes; attend meetups, conferences, user groups
- Experiment with different environments (Linux if you use Windows; emacs if you use vim)
- Stay current: subscribe to blogs, newsletters, podcasts in adjacent domains

> **Tip 9 — Invest Regularly in Your Knowledge Portfolio**

The goal isn't just knowledge accumulation — it's thinking: expose your brain to new ideas, new ways of thinking. You'll carry those into every problem.

### Topic 7 — Communicate!
The best ideas are worthless without effective communication. Treat natural language as another programming language — honor DRY, be precise, automate.

**WISDOM acronym for communication:**
- **W**hat do you want them to learn?
- What is their **I**nterest level?
- How **S**ophisticated are they?
- How much **D**etail do they want?
- Who do you want to **O**wn the information?
- How can you **M**otivate them to listen?

> **Tip 11 — English is Just Another Programming Language**

Other communication tips:
- Listen as well as you speak — turn listening into a skill
- Get back to people — acknowledge even if you can't immediately answer
- Keep documentation close to code (in the same repository); treat it as DRY

---

## Chapter 2: A Pragmatic Approach

### Topic 8 — The Essence of Good Design (ETC)
Every design principle in existence is a special case of one rule:

> **Tip 14 — Good Design Is Easier to Change Than Bad Design**

**ETC: Easier To Change**

- Why is decoupling good? Isolating concerns makes each easier to change. *ETC.*
- Why is SRP useful? A change in requirements maps to a change in one module. *ETC.*
- Why is naming important? Good names make code easier to read; you have to read it to change it. *ETC!*

ETC is a *value*, not a rule. It should float just behind your conscious thought, nudging you toward decisions that keep the code flexible. When uncertain, ask: "Did what I just did make the system easier or harder to change?"

### Topic 9 — DRY: The Evils of Duplication
> **Tip 15 — DRY — Don't Repeat Yourself**

**Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.**

DRY is more than code duplication. It includes:

**Code duplication** — most obvious; same algorithm in two places.

**Documentation duplication** — a comment that says exactly what the code says. If code changes, the comment may not. The code is the truth; the comment is a copy that will diverge.

**Data duplication** — if you have `start`, `end`, and `length`, one is derived from the other two. Which is authoritative? Express the derived value as a function.

**Representational duplication** — your code and an external API must agree on the same data format. Use code generation from a single source (schemas, API specs).

**Developer duplication** — two developers solve the same problem independently. Requires communication, code reviews, shared libraries.

**DRY is NOT about source files** — it's about knowledge. Two pieces of code can have similar-looking structures if they represent genuinely different knowledge. Coincidental duplication (code that looks the same now but for different reasons) should NOT be merged.

### Topic 10 — Orthogonality
> **Tip 17 — Eliminate Effects Between Unrelated Things**

Two things are orthogonal if changing one does not affect the other. A helicopter's controls are *not* orthogonal — changing one affects all others. A well-designed system has orthogonal components.

**Benefits:**
- Changes are localized — modifying one component doesn't break others
- Testing is easier — each component can be tested independently
- Reuse is higher — components usable in different combinations
- Risk is reduced — bad components can be isolated and replaced

**How to apply orthogonality:**
- Keep each module with a single, well-defined purpose
- Avoid global data (it creates invisible coupling)
- Avoid similar functions (they indicate missing abstraction)
- Design shy code: modules that don't expose themselves and don't rely on others' internals
- Ask: "How many modules would I need to change if I changed this requirement?" If > 1, not orthogonal enough

### Topic 11 — Reversibility
Nothing is permanent. Technologies change. Requirements change. Vendors get acquired. The code you commit to today may need to be swapped out tomorrow.

> **Tip 18 — There Are No Final Decisions**

Design to defer commitments as long as possible. Wrap third-party libraries, databases, and frameworks behind abstraction layers. Use external configuration for things that will change. When you *must* make an irreversible decision, make it as late as possible when you have the most information.

The Forklift Upgrade: if switching your database requires rewriting 70% of your code, you've coupled too tightly. A thin abstraction layer lets you swap the underlying technology.

### Topic 12 — Tracer Bullets
Traditional big-bang development: specify everything, implement everything, integrate — then discover the problems. Pragmatic approach: **tracer bullets**.

> **Tip 20 — Use Tracer Bullets to Find the Target**

Tracer bullets are lean, functional implementations that connect a requirement to some aspect of the final system — end-to-end, from UI to database. They're not throwaway prototypes; they're real code, production quality, just incomplete. They:
- Give immediate feedback ("are we hitting the target?")
- Demonstrate to users that progress is being made
- Serve as an integration platform — other developers fill in around them
- Are kept; prototypes are discarded

**Tracer bullets vs. Prototypes:** Tracer bullets are real, kept code that lacks functionality. Prototypes are throwaway explorations of a specific risk or question.

### Topic 13 — Prototypes and Post-it Notes
> **Tip 21 — Prototype to Learn**

Prototype to explore: architecture, new functionality, external data structures, third-party tools, performance, UI design. The value of a prototype is the *lessons learned*, not the code produced.

What can you ignore in a prototype? Correctness (dummy data is fine), completeness (only what you're exploring), robustness (no error handling needed), style (it will be discarded).

**Warning**: If you're in an environment where you cannot give up details, you're not prototyping — you need tracer bullets instead.

### Topic 15 — Estimating
> **Tip 23 — Estimate to Avoid Surprises**

Choose units that reflect your accuracy:
- 1–15 days → quote in days
- 3–6 weeks → quote in weeks  
- 8–20 weeks → quote in months
- 20+ weeks → think hard before quoting

**How to estimate:** Build a model of the problem. Decompose it. Estimate the components. Add contingency. Iterate — revise estimates as you learn more.

**The single right answer when asked for an estimate you're not ready to give:** "I'll get back to you." Take time to think it through properly.

After a project, track actual vs. estimated. This is how you improve estimation ability.

---

## Chapter 3: The Basic Tools

### Topic 16 — The Power of Plain Text
> **Tip 25 — Keep Knowledge in Plain Text**

Binary formats separate data from context — you need the application to read your own data. Plain text is self-describing, survives tool changes, works with every existing tool, and enables version control.

Plain text doesn't mean unstructured. HTML, JSON, YAML, Markdown are all plain text. Use the simplest format adequate to the task.

### Topic 17 — Shell Games
> **Tip 26 — Use the Power of Command Shells**

GUIs are WYSIWYG. Shells are WYSIWYW — what you see is what you *want*. Shells let you combine tools in ways their designers never imagined. Invest time in shell fluency: scripting, pipes, grep, sed, awk, find. A programmer who can't shell is like a carpenter who can only use power tools — helpless when the battery dies.

### Topic 18 — Power Editing
> **Tip 27 — Achieve Editor Fluency**

Fluency means the distance between thought and text approaches zero. Learn your editor deeply: movement by word/line/paragraph, text manipulation commands, multi-cursor editing, macros. If you find yourself doing something repetitive, stop and find the command that automates it.

### Topic 19 — Version Control
Version control is a time machine, a collaboration tool, a safety net, and a deployment pipeline. Use it for everything: source code, configuration, documentation, scripts, dotfiles.

Keep the main branch always releasable. Use feature branches. Never commit directly to main.

### Topic 20 — Debugging
> **Tip 30 — Don't Panic**

Debugging is problem-solving, not blame assignment. Approach it calmly and scientifically:

1. **Reproduce the bug** — if you can't reproduce it, you can't fix it
2. **Read the error messages** (many people don't) — they often tell you exactly what's wrong
3. **Isolate** — binary search the problem space; divide and conquer
4. **Change one thing at a time** — multiple simultaneous changes muddy causality
5. **Explain it to a rubber duck** — the act of explaining forces you to examine assumptions
6. **Look beyond the symptoms** — the bug you see may not be the actual bug

> **Tip 29 — Fix the Problem, Not the Blame**

**Heisenbug warning:** The act of watching can change behavior. If a bug disappears when you add logging, the logging changed something (timing, memory layout). Be suspicious of "it disappeared when I..."

---

## Chapter 4: Pragmatic Paranoia

> **Tip 36 — You Can't Write Perfect Software**

Accept this. Build defenses against your own bugs as well as others'.

### Topic 23 — Design by Contract (DBC)
Bertrand Meyer's DBC is a technique for software correctness. Every function has:
- **Preconditions**: what must be true before calling (caller's responsibility)
- **Postconditions**: what the routine guarantees when done (routine's responsibility)
- **Class invariants**: what is always true from the caller's perspective

The contract: "If all preconditions are met by the caller, the routine guarantees all postconditions and invariants."

Benefits:
- Documents assumptions explicitly
- Catches design errors early
- Serves as authoritative specification
- Enables automated verification

> **Tip 37 — Design with Contracts**

### Topic 24 — Dead Programs Tell No Lies
Every error message contains information. Programs that ignore errors and continue may corrupt data silently. A crash with a meaningful error is better than silent corruption.

> **Tip 38 — Crash Early**

Don't catch exceptions just to log and re-raise them — that's noise. Let exceptions propagate to where they can be handled meaningfully. Avoid "catch and release" patterns that obscure what's happening.

### Topic 25 — Assertive Programming
> **Tip 39 — Use Assertions to Prevent the Impossible**

Whenever you think "this can never happen," add code to check it. Assertions are not error handling — they're documentation of impossibility. Use them for:
- Checking function outputs ("this should always be sorted")
- Verifying algorithm assumptions ("array length must be > 0 here")
- Documenting invariants

Don't disable assertions in production for performance — if they're expensive, the assumption was wrong. Leave them in.

**Heisenbug trap**: Never put code with side effects in assertions (`assert(iter.nextElement() != null)` advances the iterator as a side effect).

### Topic 26 — How to Balance Resources
> **Tip 40 — Finish What You Start**

The function/object that allocates a resource should be responsible for deallocating it. Don't open a file in one function and close it in another — that's a resource leak waiting to happen. Use RAII (Resource Acquisition Is Initialization) patterns, `using` blocks, or `finally` clauses to ensure resources are always released.

When multiple resources must be deallocated: deallocate in reverse order of allocation. If sets of resources are allocated in different places in code, always allocate in the same order everywhere (prevents deadlock).

### Topic 27 — Don't Outrun Your Headlights
> **Tip 42 — Take Small Steps — Always**

Always take small, deliberate steps, checking for feedback and adjusting before proceeding. The rate of feedback is your speed limit. Don't take on a step that's "too big" — you can't see beyond your headlights.

---

## Chapter 5: Bend, or Break

### Topic 28 — Decoupling
> **Tip 44 — Decoupled Code Is Easier to Change**

Coupling is the enemy of change. When A is coupled to B, a change in B forces a change in A. Coupling is also transitive: if A→B and B→C, then A is effectively coupled to C.

**Train wrecks (method chaining)**: `customer.orders().last().totals().grandTotal()` — you've coupled to the structure of the entire chain. One change anywhere in the chain breaks your code. The Law of Demeter says: only call methods on your direct collaborators, never on strangers returned by collaborators.

**The Law of Demeter**: A method can call methods only on:
- `this` (itself)
- Its parameters
- Objects it creates
- Its direct component objects (instance variables)

**Global state is coupling**: any code that uses global state is coupled to every other piece of code that uses it. Mutable global state is the worst. Prefer passing dependencies explicitly.

**Inheritance is coupling**: subclasses are coupled to their parents. Changes in a parent break subclasses. Prefer composition and delegation over inheritance.

### Topic 29 — Juggling the Real World (Events)
Modern software must respond to events — user actions, network responses, timer ticks. Four strategies:

1. **Finite State Machines**: explicit states and transitions; great for event-driven code
2. **Observer Pattern**: objects register to receive notifications; publisher doesn't know about subscribers
3. **Publish/Subscribe**: decoupled observer via a message bus; publisher and subscriber never meet
4. **Reactive Programming / Streams**: model everything as streams of events; compose transformations

### Topic 30 — Transforming Programming
Programs transform data. A Unix pipeline is the clearest expression of this: `find . -type f | xargs wc -l | sort -n | tail -5`.

Think of your program as a series of transformations from input to output. Each step is a pure function: given input, produces output, no side effects. This makes code easier to reason about, test, and compose.

**Pipelines in code**: if your language supports it, use function composition, method chaining on immutable objects, or streaming APIs. If it doesn't, simulate it with clearly named intermediate variables.

### Topic 31 — Inheritance Tax
> "You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." — Joe Armstrong

Inheritance creates tight coupling between parent and child classes. It's a poor way to share code. Better alternatives:

- **Interfaces/Protocols**: define what something can do without specifying what it is
- **Delegation/Composition**: HAS-A is clearer and more flexible than IS-A
- **Mixins**: composable chunks of behavior

Use inheritance only when you genuinely have an IS-A relationship and you *want* the coupled behavior.

### Topic 32 — Configuration
> **Tip 55 — Parameterize Your App Using External Configuration**

Anything that might need to change after deployment should be in configuration, not code:
- Credentials and connection strings
- Port numbers and IP addresses
- Logging levels
- Feature flags
- Tax rates, business rules
- Environment-specific validation parameters

Keep configuration close to your code (same repository) but outside your binary. Consider a configuration service for large systems (one source of truth, accessible at runtime).

---

## Chapter 6: Concurrency

**Concurrency** = two pieces of code act as if they run at the same time.  
**Parallelism** = they actually do run at the same time (hardware requirement).

### Topic 33 — Breaking Temporal Coupling
Temporal coupling = A must happen before B, where that ordering isn't required by the problem. It's invisible coupling: you can't see it in the code structure, only in the execution model.

> **Tip 56 — Analyze Workflow to Improve Concurrency**

Use activity diagrams to find what *must* be sequential vs. what can be concurrent. Things that don't depend on each other can often run in parallel, reducing total time.

### Topic 34 — Shared State Is Incorrect State
> **Tip 57 — Shared State Is Incorrect State**

Shared mutable state requires synchronization. Synchronization is hard to get right. The safest concurrency is **no shared state**:

- Prefer immutable data
- Use actors, message passing, or channels instead of shared memory
- When you must share state, use the smallest possible scope and proper synchronization

**Non-atomic updates** are the root of most race conditions. Even `i++` is not atomic in most languages — it's a read, increment, and write, and any thread can interrupt between them.

---

## Chapter 7: While You Are Coding

### Topic 37 — Listen to Your Lizard Brain
Instincts are patterns compressed into your nonconscious brain by experience. When you feel uneasy about a design, or code that "just doesn't feel right," that's experience speaking without words. 

When your lizard brain is uncomfortable:
- Stop and ask why — what specifically feels wrong?
- Try explaining it to someone (rubber duck); often the explanation reveals the issue
- Prototype the alternative approach to test your instinct
- Don't push through just because you can't articulate the problem

### Topic 38 — Programming by Coincidence
> **Tip 62 — Don't Program by Coincidence**

Code that seems to work for reasons you don't understand is dangerous:
- It may not work in slightly different conditions
- The bug that finally surfaces may be unrelated to where you're looking
- Changes anywhere may break things mysteriously

**Program deliberately:**
- Know why the code works, not just that it does
- Rely only on things documented and controlled
- Document your assumptions
- Don't guess — prove it with tests
- Be aware of what you can't explain

### Topic 39 — Algorithm Speed (Big-O)
Whenever you write loops or recursive calls, check the runtime implications. Learn to recognize common complexities:
- O(1): constant — array access, hash lookup
- O(log n): binary search
- O(n): single loop
- O(n log n): good sort algorithms
- O(n²): nested loops — warning sign for large n
- O(2^n): exponential — avoid for any significant input size

Profile before optimizing — the Pareto Principle applies to performance.

### Topic 40 — Refactoring
Software is more like gardening than construction. You plant things according to a plan, but then you move plants, prune overgrowth, pull weeds. Code needs constant tending.

> **Tip 65 — Refactor Early, Refactor Often**

Refactor when you see: duplication, non-orthogonal design, outdated knowledge, performance bottlenecks. 

**How to refactor safely:**
1. Don't add features while refactoring
2. Have good tests before you start
3. Take small deliberate steps
4. Run tests after each step
5. If a step doesn't work, undo it

### Topic 41 — Test to Code
> **Tip 66 — Testing Is Not About Finding Bugs**

The major benefit of testing happens when you *think about* and *write* the tests, not when you run them. Writing tests first forces you to:
- Think about the interface before the implementation
- Consider the usage contract
- Design for testability (testable code is decoupled code)
- Discover design issues before they're locked in

**TDD benefits beyond finding bugs:**
- Tests give you examples of how the code is intended to be used
- Tests serve as executable documentation
- Tests give you confidence to refactor

### Topic 42 — Property-Based Testing
> **Tip 71 — Use Property-Based Tests to Validate Your Assumptions**

Unit tests verify specific examples. Property-based tests verify invariants across randomly generated inputs. You express a property ("sorting preserves element count") and the framework generates thousands of test cases to try to disprove it.

Property-based testing finds edge cases you'd never think to test manually.

### Topic 43 — Stay Safe Out There
Security must be designed in, not bolted on:
- Minimize attack surface area
- Principle of least privilege: code should have only the permissions it needs
- Validate all external inputs — never trust anything from outside your boundary
- Encrypt sensitive data in transit and at rest
- Apply security patches promptly
- Don't store secrets in version control
- Apply the OWASP guidelines for your domain

### Topic 44 — Naming Things
Names reveal your intent and your understanding. If you can't name something clearly, you may not understand it clearly.

> "The beginning of wisdom is to call things by their proper name." — Confucius

The Stroop effect: your brain processes written words as reality. If you name a variable `data` when it's actually a `CustomerOrder`, you've introduced a cognitive conflict that will mislead every future reader (including yourself).

When naming becomes difficult, it's often a signal that something is wrong with the design.

---

## Chapter 8: Before the Project

### Topic 45 — The Requirements Pit
> **Tip 75 — No One Knows Exactly What They Want**

Requirements are never fully known at the start. Users themselves don't know what they want until they see what they *don't* want. Your job is to help them understand what they need.

**Practices for good requirements work:**
- Work with users to understand the *problem* behind the stated requirement
- Distinguish "policy" (business rules, changeable) from "mechanism" (what the system must do)
- Document requirements as user stories; implement and show; iterate
- Create a project glossary — one canonical name for each concept
- Maintain a feedback loop throughout development, not just at the start

### Topic 46 — Solving Impossible Puzzles
When a problem seems impossible: list ALL constraints. Identify which are absolute and which are assumptions. Many "constraints" are merely tradition or unexamined assumptions. Question them.

The Gordian Knot: Alexander didn't cut it because he was clever — he questioned whether the constraint "must be untied" was real.

### Topic 47 — Working Together

**Conway's Law (Melvin Conway, 1967):**
> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."

If a company has 4 backend teams, the system will have 4 backend subsystems whether that's the right architecture or not. The org chart leaks into the code. This has profound implications:
- To get a certain architecture, structure your teams to match it ("Inverse Conway Maneuver")
- Team boundaries become API boundaries — make them clean
- Silos produce siloed software; cross-functional teams produce integrated software

**Pair programming and mob programming** are powerful not because they create redundancy, but because thinking together produces better outcomes than thinking separately:
- Direct communication while coding (not through documents or meetings)
- Problems are solved *during* coding, not in a review afterward
- A user/stakeholder always available for questions dramatically reduces requirement guessing
- Code reviewed by more than one person catches bugs and design issues at the cheapest possible moment

> **Tip 82 — Don't Go into the Code Alone** (paraphrase)

### Topic 48 — The Essence of Agility
> **Tip 83 — Agile Is Not a Noun; Agile Is How You Do Things**

Agility is an adjective, a quality of behavior. You can't install Agile; you can only be agile. The Agile Manifesto values:
- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

If your "Agile process" is adding overhead, ceremony, and bureaucracy, you've missed the point.

---

## Chapter 9: Pragmatic Projects

### Topic 49 — Pragmatic Teams
A pragmatic team is small (< 10-12), stable, and trusts each other deeply. Team-level application of pragmatic principles:

- **No Broken Windows**: quality is a team issue; one team member's sloppiness degrades everyone's standards
- **Boiled Frog**: teams must monitor the environment, not just the immediate task
- **Knowledge Portfolio**: schedule time for learning, exploration, and skill-building
- **Communicate**: develop a consistent "team voice" for documentation and external communications
- **Automate everything**: if the team does a task manually more than once, automate it

### Topic 50 — Coconuts Don't Cut It
Cargo cult development: imitating the form of a practice (daily standups, iterations, retrospectives) without understanding its content. It won't produce the results you're imitating. Context matters — evaluate each practice for your actual situation.

### Topic 51 — Pragmatic Starter Kit
The three legs every project must have:
1. **Version control**: everything — code, config, documentation, build scripts
2. **Regression testing**: automated, comprehensive, run on every commit
3. **Full automation**: no manual steps in build, test, or deployment

### Topic 52 — Delight Your Users
Ask: "How will you know we've been successful a month (or a year) after this project is done?" The answer reveals the actual success criteria, which is almost never "the software has these features."

Build toward business outcomes, not feature lists.

### Topic 53 — Pride and Prejudice
> **Tip 97 — Sign Your Work**

Take pride in what you produce. Your name on code should be a mark of quality — solid, tested, documented, well-structured. Communal code ownership doesn't mean anonymous code; it means everyone is proud of the whole codebase.

> **Tip 99 — Don't Enable Scumbags** (ethical obligation)

We build systems that affect people's lives. Ask of every piece of code: "Have I protected the user? Would I want to be a user of this software?"

---

## The 100 Tips Summary (Key Selection)

| # | Tip |
|---|-----|
| 1 | Care About Your Craft |
| 2 | Think! About Your Work |
| 3 | You Have Agency |
| 5 | Don't Live with Broken Windows |
| 6 | Be a Catalyst for Change |
| 7 | Remember the Big Picture |
| 8 | Make Quality a Requirements Issue |
| 9 | Invest Regularly in Your Knowledge Portfolio |
| 14 | Good Design Is Easier to Change Than Bad Design |
| 15 | DRY — Don't Repeat Yourself |
| 17 | Eliminate Effects Between Unrelated Things (Orthogonality) |
| 18 | There Are No Final Decisions |
| 20 | Use Tracer Bullets to Find the Target |
| 21 | Prototype to Learn |
| 23 | Estimate to Avoid Surprises |
| 25 | Keep Knowledge in Plain Text |
| 26 | Use the Power of Command Shells |
| 27 | Achieve Editor Fluency |
| 29 | Fix the Problem, Not the Blame |
| 30 | Don't Panic (debugging) |
| 36 | You Can't Write Perfect Software |
| 37 | Design with Contracts |
| 38 | Crash Early |
| 39 | Use Assertions to Prevent the Impossible |
| 40 | Finish What You Start (resources) |
| 42 | Take Small Steps — Always |
| 44 | Decoupled Code Is Easier to Change |
| 55 | Parameterize Your App Using External Configuration |
| 56 | Analyze Workflow to Improve Concurrency |
| 57 | Shared State Is Incorrect State |
| 62 | Don't Program by Coincidence |
| 65 | Refactor Early, Refactor Often |
| 66 | Testing Is Not About Finding Bugs |
| 71 | Use Property-Based Tests to Validate Your Assumptions |
| 75 | No One Knows Exactly What They Want |
| 83 | Agile Is Not a Noun |
| 97 | Sign Your Work |
| 98 | First, Do No Harm |
| 99 | Don't Enable Scumbags |
| 100 | It's Your Life. Share it. Celebrate it. Build it. |

---

## Supplemental: Key Tips in Extended Detail

### On DRY — The Subtle Forms That Are Often Missed

**Interdeveloper duplication** is the most insidious form. Two developers solving the same problem independently create two implementations that diverge over time. Prevention:
- Foster a culture of communication (stand-ups, shared reading, pair programming)
- Build a shared library actively — don't just read it, contribute to it
- Have a "go-to" person per knowledge domain who coordinates what gets built

**Documentation duplication:** A comment that says exactly what the code says. When the code changes, the comment doesn't. The comment becomes a lie. The only reliable documentation of code behavior *is* the code itself, plus its tests.

**Data/code duplication:** Derived data that could be computed from authoritative data. If you store `startDate`, `endDate`, and `duration`, you have two sources of truth. Remove `duration`, compute it: `duration = endDate - startDate`. One authoritative source.

### On Tracer Bullets — The Most Misunderstood Concept

The common mistake: confusing tracer bullets with prototypes. They look similar but serve fundamentally different purposes:

| | Tracer Bullets | Prototypes |
|--|----------------|------------|
| Purpose | Hit the real target | Explore specific risk |
| Code quality | Production quality | Throwaway |
| Kept? | Yes | No |
| Completeness | Incomplete but real | Complete but fake |
| Risk being explored | Overall structure | Specific question |

Use tracer bullets when you need to know if you're headed in the right direction. Use prototypes when you need to answer a specific question before committing.

### On Design by Contract — The Underused Discipline

The most valuable aspect of DBC is not the runtime checking — it's the **thinking discipline it enforces**. When you must state preconditions, postconditions, and invariants before writing code, you:
- Discover ambiguities in requirements early
- Force yourself to think about edge cases
- Create executable specifications that can be tested automatically
- Document the interface in a way that's precise enough to reason about

Even in languages without DBC support, stating these contracts in comments or assertions is worthwhile. The discipline of *thinking through the contract* is where the value lies.

### On Estimating — The Single Correct Answer

When asked for an estimate before you're ready: **"I'll get back to you."**

Never give an estimate on the spot unless you've thought it through. An estimate given without thinking is just a number with false precision. The number will be remembered; the uncertainty won't.

Building your estimation model:
1. Understand what is being asked
2. Identify the components or phases
3. Estimate each component separately
4. Add components, then add contingency
5. Check against analogous past projects
6. Present with appropriate units (days/weeks/months, not hours)

Track actuals against estimates. This is how intuition for estimation is built — through feedback loops, not through confidence.

### On Breaking Temporal Coupling — The Activity Diagram Technique

Draw an activity diagram of your workflow:
1. List all activities required
2. For each activity, identify what it depends on
3. Connect activities with arrows showing dependencies
4. Activities with no incoming arrows can start immediately
5. Activities with the same set of dependencies can run in parallel

This reveals opportunities for parallelism that sequential thinking hides. If reading from the database and calling an external API are both required and neither depends on the other, why run them sequentially? Parallel execution can halve the latency.

### On Security — The Minimal Footprint

Every piece of software should request only the permissions it actually needs. Don't run with administrator privileges unless required. Don't keep connections open longer than necessary. Don't cache secrets in memory longer than they're needed.

OWASP Top 10 is a minimum starting point, not a comprehensive security strategy. Treat security as a first-class requirement, not an afterthought.

### On the Knowledge Portfolio — Specific Investment Strategies

**Minimum investment** (everyone should do this):
- Read one technical book per month (12/year)
- Read one non-technical book per month (for breadth of thinking)
- Take at least one online course per year in a new area
- Participate in a local user group or meetup
- Experiment with at least one new language or tool per year

**The diversity principle:** Don't just learn more of what you already know. If you're a backend developer, learn some UI/UX. If you do imperative OO programming, learn a functional language. The cross-pollination of ideas is where the most creative problem-solving comes from.

**The obsolescence principle:** Your knowledge has a half-life. Technologies that were hot 5 years ago may be irrelevant today. Continuously evaluate your portfolio and rebalance. Invest in durable skills (fundamentals, design principles, communication) and carefully manage your exposure to rapidly changing skills.

### On Naming — The Neurological Basis

The Stroop effect demonstrates that the brain processes written words faster than almost any other stimulus. If you write `data` when you mean `CustomerOrder`, every subsequent reader's brain will process "data" first and only later resolve it as "customer order." This cognitive conflict is not trivial — it slows comprehension and introduces bugs.

When you name something `temp`, the brain processes "temporary" — even if the variable persists for the life of the application. The name lies, and the lie propagates.

**The naming test:** Cover the implementation of a function. Does the name tell you what the function does? Cover the function body including comments. Does the name alone give you enough information to use the function correctly? If not, rename.

---

## Topic 21 — Text Manipulation

> **Tip 35 — Learn a Text Manipulation Language**

Text manipulation languages (Python, Ruby, awk, sed, Perl) are to programming what routers are to woodworking — noisy, brute-force, but incredibly powerful and versatile in the right hands. They let you:

- Quickly hack utilities that would take 5–10× longer in a conventional language
- Prototype ideas cheaply (30 minutes vs. 5 hours)
- Automate build systems, code generation, documentation processing
- Perform one-off data transformations without writing full programs

Kernighan and Pike built the same program in five languages. The Perl version was 17 lines; the C version was 150. That ratio is the point.

**What to use today:**
- **Python** — most versatile, excellent libraries, readable syntax
- **Ruby** — elegant, expressive, strong for scripting
- **Shell + awk/sed** — still powerful for Unix pipelines on structured text

**The investment:** Time to master text manipulation pays back in automation, flexibility, and speed. If you find yourself doing a text transformation manually more than twice, script it.

---

## Topic 22 — Engineering Daybooks

An engineering daybook is a paper notebook in which you record:
- What you're working on
- Notes from meetings
- Variable values when debugging
- Sketches of ideas
- Things you've learned
- Reminders of where things are

Three key benefits:
1. **More reliable than memory** — when someone asks "what was the name of that API you tried last week?", you flip back a page
2. **Frees working memory** — write ideas that aren't immediately relevant so you can keep focusing; you know the idea is captured, not lost
3. **Acts as a rubber duck** — the act of writing forces you to articulate a thought; you often realize mid-sentence that what you were about to do is wrong

**Why paper?** There's something neurologically different about writing compared to typing. The physical act engages different cognitive processes. Paper also has no notifications, no distractions, no apps competing for attention.

**Practical use:** Write the date at the top of each entry. When a notebook fills, write the date range on the spine and keep it. Your shelf of daybooks becomes a personal knowledge archive.

---

## Topic 36 — Blackboards

A blackboard is a coordination mechanism for situations where:
- Multiple independent agents need to contribute to a solution
- Agents have different knowledge, different skills, and no direct awareness of each other
- The order in which contributions arrive is unpredictable
- The overall problem requires synthesizing disparate facts

**The detective analogy:** A murder investigation blackboard. Each detective adds facts, connections, and observations. No detective needs to know what the others are doing — they just watch the board for new information and add their findings. Gradually, the board leads to a conclusion.

**In software:** A blackboard system consists of:
- A shared knowledge base (the blackboard) where any component can read or write
- Independent specialist agents that watch for relevant information and contribute their analysis
- No coupling between agents — they coordinate through the data on the board, not through direct calls

**When it's appropriate:**
- Multi-stage workflows where different expertise applies at different stages
- AI/inference systems where facts must be gathered from multiple sources
- Systems where you don't know the order facts will arrive in advance
- Highly parallel processing where work units are opportunistic

**The key benefit:** The agents are completely decoupled. You can add new agents, remove old ones, or run them in any order without changing the others. The blackboard is the only shared contract.

**Modern applications:** Event streaming systems (Kafka), message buses, and reactive dataflow systems all implement blackboard-like patterns. The publish/subscribe model from Topic 29 is closely related.
