# Norman Principles Reference
## Source: The Design of Everyday Things, Revised Edition (Don Norman, 2013)

---

## The Central Insight

When people can't use something, they blame themselves. This is almost always wrong.
Poor design is the fault of the designer, never the user.

Physical limitations are well-understood by designers; mental limitations are systematically
misunderstood and underestimated. We design equipment that requires sustained alertness for
hours, demands recall of complex procedures, or subjects people to high cognitive load —
then we blame them for failing.

**The paradox of expertise**: The people who design products are often experts who have lost
their ability to see the products from a novice's perspective. They can't imagine not knowing
what they know. This is the fundamental problem of design: the designer knows too much.

---

## Fundamental Concepts

### Affordances

An **affordance** is a relationship between a physical object and a person — the actions
that are possible given the properties of the object and the capabilities of the actor.

Critical properties:
- Affordances are **relational**, not inherent in the object alone
- A chair affords sitting for a person, but not for a mouse
- A glass affords holding liquid, throwing, cutting (if broken), magnifying
- Affordances exist regardless of whether they are perceived or communicated

**Perceived affordances** are what users *believe* to be possible — and are far more
important to design than actual affordances. If a door affords pushing but appears to
afford pulling, it will be pulled.

### Signifiers

A **signifier** is a perceptible signal that communicates appropriate behavior — it makes
affordances discoverable.

- A raised 3D button appearance *signifies* pressability
- An underline + blue color *signifies* a hyperlink
- A horizontal grip bar across a door *signifies* the pushing location
- Placeholder text in a form field *signifies* that text entry is expected there

**Why signifiers matter more to designers than affordances**:
Users act on what they perceive. Designing affordances that aren't signified is functionally
equivalent to not designing them. Every interaction a user doesn't attempt because they
didn't know it existed is a design failure.

**The Norman Door Problem**: "Norman doors" are doors that need "Push" or "Pull" signs
to compensate for misleading or absent signifiers. A plate signifies pushing (nothing to
grip). A bar handle signifies pulling (something to grip). When a door needs an instruction
label, the door has failed — the designer should apologize, not the user.

Applied broadly: any interface element that requires an instruction label where design
could communicate the function has failed the signifier test.

**The confused design world**: The first edition of DOET popularized "affordance" and the
design world adopted it to mean "signifier" (a visible cue suggesting use). Norman corrected
this in the revised edition — the term for the visible clue is "signifier." He chose to
accept the misusage in most contexts because the word "affordance" had become embedded in
design vocabulary, but distinguishes carefully when precision matters.

### Conceptual Models

A **conceptual model** is the mental representation a user holds of how a system works.

**Three model types**:
1. **Designer's model**: How the designer understands the actual mechanism
2. **System image**: What the product communicates about how it works (via appearance,
   labels, behavior, documentation)
3. **User's model**: What the user believes about how the product works

**The failure mode**: Designers communicate only through the system image. If the system
image is incomplete, misleading, or absent, users construct models from inference —
and those inferred models are often wrong. Wrong models produce predictable, systematic errors.

**The thermostat misconception**: Most people believe a thermostat is a throttle — that
setting it higher makes heat come faster. They consistently overshoot temperature. This is
a wrong model that bad system imagery perpetuates. The thermostat is actually an on/off
switch that stays on until the target is reached. But nothing in most thermostat designs
communicates this.

**Design goal**: Make the system image accurately reflect the designer's model, so users
construct correct conceptual models and make correct predictions about system behavior.

---

## The Seven Stages of Action

Every human action follows these stages. Design must support all seven, and especially
the feedback loop from action back to evaluation.

### Action stages (Execution side):
1. **Goal formation**: What do I want to achieve?
2. **Planning**: What sequence of actions will get me there?
3. **Specification**: Which specific action do I perform first?
4. **Performance**: Execute the action

### Evaluation stages (Evaluation side):
5. **Perception**: What happened? What state is the system in now?
6. **Interpretation**: What does the perceived state mean?
7. **Comparison**: Does the new state match my goal?

### The Two Gulfs

**Gulf of Execution** (stages 1-4): "What can I do? How do I do it?"
Bridges via: discoverability, clear signifiers, good mapping, constraints

**Gulf of Evaluation** (stages 5-7): "What happened? Did it work?"
Bridges via: feedback, visible system state, perceptible outcomes

### Design principles for each stage:

*Goal*: Make the system image suggest achievable goals. What can users *want* to accomplish
here? If the purpose of the product isn't clear, users can't form valid goals.

*Plan*: Make available actions obvious. Users shouldn't have to explore to discover what
they can do. Available actions should be visible at a glance.

*Specify*: Make control-to-action mapping unambiguous. Which element triggers which effect?
Good mapping = spatial logic. Bad mapping = arbitrary association.

*Perform*: Make actions physically easy to execute. Not just visible — physically achievable
by the full range of users (including those with motor impairments).

*Perceive*: Make system state perceptible. After an action, the system's new state must be
visible or audible — clearly, promptly, and unmistakably.

*Interpret*: Make feedback meaningful. Raw state isn't enough — users must be able to
interpret what the state means for their goal.

*Compare*: Make success/failure evaluation effortless. The difference between "I achieved
my goal" and "I didn't" must be clear without analysis.

---

## Knowledge in the World vs. Knowledge in the Head

**Knowledge in the head**: Information the user must remember and recall.
- Requires learning; degrades without practice; fails under stress or distraction
- Examples: passwords, commands, form format requirements, workflow sequences

**Knowledge in the world**: Information embedded in the environment, available to perceive.
- Requires no prior learning; can be interpreted on first encounter
- Examples: labeled buttons, visual affordances, physical constraints, status displays

**Design principle**: Maximize knowledge in the world. Minimize knowledge-in-the-head requirements.

**Why users succeed with imperfect knowledge**:
1. Information is in the world (don't have to remember what you can see)
2. Natural constraints guide correct action even without explicit knowledge
3. Knowledge is distributed across people and artifacts
4. Cultural conventions supply default interpretations

**The memory trade-off**: When designs require knowledge in the head, users pay a cost
every single time. When designs embed knowledge in the world, users pay a one-time
perceptual cost (notice and interpret). Scale makes this asymmetry enormous.

**Approximate models**: Humans manage complex environments with imprecise knowledge because
they only need to distinguish the correct action from available alternatives — not achieve
exact technical understanding. The penny recognition study: fewer than half of college
students could correctly identify a US penny from drawings, yet they use their money correctly
every day. The information they need (this is different from a quarter) is in the world.

---

## Constraints

**Constraints proactively guide correct behavior without requiring instruction or memory.**
Use them to make the right action obvious and wrong actions difficult.

### Physical Constraints
Physical limitations on possible actions.
- A USB plug only inserts one way (asymmetric physical design)
- A battery compartment that only accepts correct polarity
- LEGO blocks with visible connection points

**Norman's battery example**: Standard cylindrical batteries can be inserted backwards
and damage equipment. An elegantly designed battery exists that has identical ends —
making orientation irrelevant. This is a physical constraint that solves a problem rather
than creating a new one.

**Design principle**: Use physical constraints to make wrong actions difficult or impossible,
not to prevent them after the fact. A door that *stops* you from entering without inserting
your key is better than a door that opens to an empty hallway and leaves you confused.

### Cultural Constraints
Socially learned conventions that restrict behavior.
- Red = stop or danger in most Western contexts
- Left-to-right = chronological progress in LTR-language contexts
- Vertical = importance hierarchy (important things are higher)

**Important**: Cultural constraints vary across cultures. What is obvious in one cultural
context may be non-obvious or actively misleading in another. Cross-cultural design must
test cultural assumptions explicitly.

### Semantic Constraints
Meaning-based limitations that make only some configurations sensible.
- A headlight belongs at the front of a vehicle (semantic function)
- A seat faces forward (semantic orientation in vehicle context)
- "Submit" is semantically appropriate for form completion; "Buy" is more appropriate for purchase

Semantic constraints are often invisible until violated — the violation "just feels wrong"
in ways that are hard to articulate but immediately obvious when experienced.

### Logical Constraints
Spatial or structural reasoning that dictates remaining possibilities.
- If N screws belong in N holes and N-1 are placed, the last goes in the last hole
- If this is step 5 of 5, the next action is completion
- If only one button is highlighted, that button is the intended action

**Forcing functions** are the strongest logical constraints — conditions that make it
physically or logically impossible to proceed incorrectly:
- *Interlocks*: must complete A before B becomes available (car must be in Park to start)
- *Lock-ins*: prevent leaving until action complete
- *Lock-outs*: prevent entry until condition met

Use forcing functions for high-stakes, irreversible actions. Don't use them for routine
operations — they become friction.

---

## Human Error: A Design Framework

### Why Errors Happen

**Human error is not randomly distributed**: If a specific type of error occurs in 1-5%
of cases, we might accept that some small number of humans are at fault. When 75-95% of
industrial accidents are attributed to "human error," the only honest conclusion is that
something in the system design is causing the errors.

**The Swiss cheese model** (James Reason): Most accidents don't have a single cause —
they result from multiple independent failures that happen to align. Each safeguard has
holes like a slice of Swiss cheese; when holes in multiple slices align, disaster passes
through. This means: (1) accidents are over-determined, and (2) adding a single safeguard
rarely prevents all instances.

**Root cause analysis**: Find the root cause, then redesign so the error cannot recur —
or, if it does, minimize its impact. *Root cause analysis must not stop when a human is
found to have made an error.* It must continue: why did the human make that error?
What in the system design made the error likely?

**Social and institutional pressures**: Many errors occur because social pressure causes
people to proceed despite known risks. Aviation accidents have resulted from co-pilots
reluctant to challenge captains. Procedures that treat error-flagging as insubordination
are designed to produce errors.

### The Two Types of Errors

**Slips**: The person intends the right goal but executes incorrectly. The action is
automatic and overrides conscious control.

Types of slips:
- *Capture slips*: A stronger habitual sequence takes over ("I meant to save the file
  but habitually hit close")
- *Description-similarity slips*: Right description, wrong object (clicked the wrong
  button because it's the same shape and location as the usual button)
- *Mode errors*: Correct action for a different mode (typing while Caps Lock is on,
  pressing accelerator instead of brake in a panic)
- *Memory-lapse slips*: Forgetting a step mid-sequence (closed the app before saving)

**Design responses to slips**:
- Reduce modes wherever possible (modes are the primary cause of mode errors)
- Create physical and visual distinctiveness between easily confused controls
- Make destructive and constructive actions look and feel different
- Provide undo for all reversible actions
- Detect and suggest correction where possible (spell-check model)
- Make system state visible so users can detect forgotten steps

**Mistakes**: The person intends the wrong goal — they have an incorrect mental model
or insufficient information. Mistakes are more dangerous than slips because the person
believes they're doing the right thing.

Types of mistakes:
- *Rule-based mistakes*: The right rule applied to the wrong situation
  ("I always click the blue button" when this context is different)
- *Knowledge-based mistakes*: A faulty mental model produces an incorrect plan
  (thermostat throttle misconception → behavior based on wrong model)

**Design responses to mistakes**:
- Improve feedback that allows users to detect that their model is wrong
- Make system state legible (users should be able to infer what happened)
- Checkpoint complex or destructive actions ("You're about to delete 47 items")
- Explanatory help text that explains *why*, not just *what*
- Permit easy recovery — if the state change after a mistake is obvious and reversible,
  most mistakes are harmless learning opportunities

### The Error Prevention Hierarchy

From most to least preferred:
1. **Make the error impossible**: Constraints that prevent the wrong action physically
2. **Make the error difficult**: Separate dangerous actions from common ones spatially
   or visually
3. **Make the error easily reversible**: Undo, version history, soft-delete, grace periods
4. **Make the error immediately detectable**: Real-time feedback, inline validation
5. **Make recovery simple**: Clear error messages with actionable next steps
6. **Accept that errors will occur**: Design the error state to be graceful, never punitive

**The cardinal principle**: Never design an interface where a single wrong action causes
irreversible loss without a clear confirmation step. Never require confirmation for routine
actions. Match confirmation friction to consequence severity.

---

## Design Thinking: Solving the Correct Problem

**Norman's rule in consulting**: "Never solve the problem I am asked to solve." The
problem presented is almost always a symptom. The root problem is deeper.

**The double-diamond model**:
- Diamond 1: *Diverge* (explore the full problem space) → *Converge* (define the real problem)
- Diamond 2: *Diverge* (generate multiple solutions) → *Converge* (select and refine the best)

Most people skip Diamond 1 entirely. They jump from problem statement to solution, solving
the stated symptom efficiently — often making the real problem worse.

**Human-Centered Design (HCD) process**:
1. *Observation*: Watch actual users doing actual tasks. Not surveys. Not interviews about
   hypotheticals. Direct behavioral observation.
2. *Idea generation*: Diverge deliberately. Don't converge on the first idea.
3. *Prototyping*: Rapid, cheap representations of ideas for testing. The earlier the better.
4. *Testing*: Observe actual users with the prototype. Learn. Iterate.

**The Five Whys**: For any problem, ask "why?" five times. Each answer reveals a deeper
cause. The fifth answer is usually closer to the root cause than the first statement.
Example: "Why did the user click the wrong button?" → "Why were the buttons visually similar?"
→ "Why was visual hierarchy not prioritized?" → "Why did the design not include a hierarchy pass?"
→ "Why was there no design review process for this component?"

**Design ≠ art**: Art is self-expression; design is communication. Design is constrained
by function, user needs, and business requirements. The best design is often invisible.

---

## Human Cognition and Emotion

**Emotions are not separate from cognition**: They are fundamental to how humans process
and evaluate information. Positive emotional states expand creative thinking and problem-solving.
Negative emotional states contract it, reduce tolerance for ambiguity, and increase errors.

**Three levels of processing** (Norman's emotional design framework):
1. *Visceral*: Immediate, automatic responses to appearance. Before any thinking.
   ("This looks beautiful" or "This looks overwhelming")
2. *Behavioral*: The experience of use. Pleasure when things work smoothly;
   frustration when plans are thwarted.
3. *Reflective*: After-the-fact evaluation, narrative, and attribution.
   ("I feel clever for figuring this out" or "I feel stupid for not understanding this")

**Design implications of emotional processing**:
- Beautiful products activate positive visceral responses → increased tolerance → perceived
  usability (Aesthetic-Usability Effect)
- Smooth, successful task completion activates positive behavioral responses → flow → engagement
- Error messages that blame users activate negative reflective responses → diminished
  self-efficacy → avoidance behavior

**The attribution error in design**: When interactions fail, users attribute failure to
themselves — "I must be doing something wrong." This is almost always incorrect but is
psychologically automatic. Design can counteract this by making system states explicit
("The button was disabled because...") and by never using language that implies user fault.

---

## Norman's Seven Principles of Design

A synthesis of HCD into actionable principles:

1. **Discoverability**: All possible actions must be perceivable. Users must be able to
   determine what actions are available without guessing or exploration.

2. **Feedback**: Full and continuous information about system state and the results of actions.
   Users must always know what happened after they acted.

3. **Conceptual model**: The system image must project an accurate, useful conceptual model.
   Users must be able to develop correct mental models of how the system works.

4. **Affordances**: Appropriate affordances exist for all desired actions. The relationship
   between action and outcome must be physically or logically possible.

5. **Signifiers**: Effective signifiers ensure discoverability. The affordances must be
   perceptible — communicated clearly through the design's appearance.

6. **Mappings**: The relationship between controls and their effects follows spatial and
   logical principles. Users should be able to predict effects from control positions.

7. **Constraints**: Physical, logical, semantic, and cultural constraints limit possible
   incorrect actions and guide correct ones without instruction.

---

## Natural Mapping

**Mapping** is the relationship between controls and the elements they control.

**Natural mapping**: The spatial arrangement of controls mirrors the spatial arrangement
of what they control, and the direction of movement matches the direction of effect.

Examples of natural mapping:
- Stove knobs arranged in the same 2×2 pattern as the burners they control
- Vertical scrollbar position corresponds to vertical position in document
- Steering wheel direction corresponds to turning direction
- Brightness slider increases when moved in the "more" direction (right or up)

Examples of violated mapping:
- Four knobs in a row controlling a 2×2 burner arrangement (which knob = which burner?)
- Counterintuitive modal controls
- Audio volume that increases when moved "down" (visual-spatial conflict)

**Why mapping matters**: When mapping is natural, users know what to do without labels.
When mapping is arbitrary, labels become critical — and even with good labels, there
will be hesitation and errors.

**The stove example**: Norman's classic illustration is the four-burner stove with four
control knobs in a row. Users consistently activate the wrong burner because the spatial
mapping is ambiguous. The solution: arrange the knobs in the same 2×2 pattern as the
burners. Obvious. But almost no stove manufacturer does this. Why? Because it would
require a wider control panel.

**Automation paradox**: Automation removes human from the control loop. But systems fail,
and when they do, the human must take over — often suddenly, often without current mental
situational awareness. The more automation handles, the less practiced the human becomes
at manual control. This is a known and serious safety problem in aviation, nuclear power,
and increasingly in autonomous vehicles. Design for automation must include design for
graceful handoff when automation fails.

---

## Standardization

When natural design alone cannot resolve ambiguity, standardization provides the solution.

**When standardization is appropriate**: If there is truly no natural mapping, and no
cultural convention, then standardization creates a new convention. The QWERTY keyboard
is not a natural mapping — it's a historical artifact — but its standardization means
billions of people have the same knowledge-in-head, making the cost of learning once worth
the benefit of universal use.

**Standardization in product design**: USB-A was not designed for natural orientation
(it was inserted wrong roughly 50% of the time) — but its standardization made it
universally known. USB-C resolved this with physical constraints. Physical constraints are
always preferable to standardization when possible.

**The cost of non-standard behavior**: Every deviation from standard behavior requires
users to develop new knowledge-in-head. At scale, this is enormously expensive. When
systems must deviate from standards, the deviation must be unmistakable and the correct
behavior must be discoverable.

---

## Featuritis and Creeping Featurism (Norman Ch.7)

### The Disease

Every successful product carries a latent pathogen: **featuritis**, whose primary symptom
is creeping featurism. The pressures that drive it are structural and almost unavoidable:

- Existing satisfied customers want more capabilities
- Competitors add features, creating pressure to match them
- Saturated markets force new releases to justify upgrades
- Internal teams each want their feature "represented" in the product

**The Lego example**: Norman's original Lego motorcycle (15 pieces, no instructions needed,
fully self-explanatory through physical constraints). The 2013 version: 29 pieces, requires
an instruction booklet. Creeping featurism destroyed the elegant self-evidence of the original.

**The competition trap** (Harvard professor Youngme Moon, *Different*): When companies match
competitors feature-for-feature, all products converge to sameness — no differentiation,
no reason to choose. Competition-driven design produces mediocrity. The correct strategy:
ignore the irrelevant weaknesses; strengthen genuine strengths further.

**Norman's corollary** — Norman's Law: *The day a product development process starts, it is
already behind schedule and above budget.* Pressure therefore always favors shortcuts and
feature additions over careful subtraction.

### The Designer's Counter-Strategy

Good design requires organizational will to resist feature pressure. Jeff Bezos's "customer
obsession" — ignoring competitor feature lists, focusing on customer questions (what do
customers want, how can their needs be better served) — is the structural alternative.

This requires leadership. Once a company passes control from founders to MBA-driven management
focused on quarterly profit, feature discipline typically collapses.

**For individual designers**: When asked to add a feature, ask:
1. What user goal does this serve? (Goal-directed, not feature-driven)
2. What existing features does this complicate?
3. What can we remove to make room for this without net complexity increase?
4. Would a user be able to explain why this feature exists in one sentence?

---

## Checklists as Error-Prevention Tools (Norman Ch.5)

Checklists are among the most powerful proven tools for reducing slips and memory-lapse
errors, particularly in high-stakes sequential procedures.

**Why checklists work**:
- They compensate for the fallibility of prospective memory (remembering to do future actions)
- They reduce dependence on routine when routine breaks down (interruptions, stress)
- They create a shared record of completed steps in team environments
- They force explicit attention to steps that otherwise become automatic and unchecked

**The paradox of group checklists**: Adding more checkers doesn't automatically improve
reliability. Each checker who knows others have checked (or will check) may relax their
vigilance. **The collaborative checklist solves this**: two people work through the list
*together* — one reads the item, one executes and confirms. Separate checking (A does it,
B reviews) is significantly less effective.

**Aviation's model**: Collaboratively followed checklists between captain and first officer
are legally required in US commercial aviation. The cultural challenge: junior crew (first
officer) must be able to stop proceedings when the senior crew (captain) misses a checklist
item. Systems that inhibit this authority-inversion fail.

**Medical resistance**: Physicians have fiercely resisted checklists as an insult to
professional competence. Yet studies (Gawande's *The Checklist Manifesto*) show dramatic
error reduction in surgical settings after mandatory checklists were introduced.

**Application to digital product design**:
- Pre-release checklists (accessibility, security, performance, error states, empty states)
- Design review checklists (Trunk Test, heuristic review, cross-device testing)
- Content publication checklists (grammar, links, alt text, metadata)
- Deployment checklists (rollback plan, monitoring setup, incident response)

The key: checklists must be *short* (long checklists get skipped), *specific* (not vague),
and *followed collaboratively* (not solo rubber-stamping).

---

## Activity-Centered Design vs Human-Centered Design (Norman Ch.6)

**The tension**: HCD focuses intensely on specific individual users. But many products serve
global, heterogeneous populations. How do you design for billions of diverse people?

**Activity-centered design (ACD)**: Let the *activity* define the product and its conceptual
model — not the individual user. Design the product around the conceptual model of the activity
being performed.

**Why it works**: While individual people differ enormously, activities converge across
cultures. People everywhere drive cars, take photos, cook food, and communicate — and the
activities themselves have underlying structures that transcend individual differences.

**The automobile example**: Car controls are essentially identical worldwide, despite vast
cultural differences in drivers. The complexity of driving (foot pedals, steering, mirrors,
signals, instrument panel, maintaining spatial awareness in multiple directions) is accepted
because each complexity is *essential to the activity*. People don't question why the steering
wheel makes the car turn — it's integral to the concept of "driving."

This explains why people accept steep learning curves for activities they care about: they
perceive the complexity as inherent to mastery of the activity, not as arbitrary system
requirements.

**ACD vs HCD — which to use**:

| Situation | Preferred approach |
|---|---|
| Known, specific user population | Human-centered design |
| Global, heterogeneous population | Activity-centered design |
| Consumer hardware (cameras, cars) | Activity-centered design |
| Enterprise software for a specific role | Human-centered design |
| Mobile apps for broad markets | Mix: ACD for core flows, HCD for persona-specific features |

**The critical boundary**: ACD is not a license to ignore users. It's an approach to making
HCD scalable. The activity's conceptual model must still match users' mental models of the
activity — otherwise you get the opposite of simplicity (complex systems justified as "inherent
to the activity" when they're just poor design).

**Design implication**: Before asking "what does *this user* need?", ask "what is the *activity*
these users are all performing?" Define the conceptual model of the activity first. Then ensure
the product maps cleanly to that conceptual model. Then layer in user-specific adaptations.

---

## Norman's Three Levels of Emotional Processing (Emotional Design)

From Norman's follow-up book *Emotional Design* (2004), these three levels explain why
users respond emotionally to products — and why emotional response affects perceived usability.

### Level 1: Visceral

**What it is**: Automatic, pre-cognitive responses to appearance, sound, and tactile qualities.
Occurs in milliseconds before any conscious evaluation.

**Design implications**:
- First impressions are real and consequential (not superficial)
- Aesthetics are not vanity — they communicate care, quality, and trustworthiness
- Ugly products start with a deficit in user willingness to engage
- Beautiful products start with a credit (Aesthetic-Usability Effect)

**The visceral level is positive or negative, not neutral**: There is no "aesthetic zero."
Everything sends a signal. A default, unstyled interface signals indifference. A carefully
crafted visual system signals that someone thought about the user's experience.

### Level 2: Behavioral

**What it is**: The experience of using a product — moment-to-moment interaction. This is
where most of HCD lives. Pleasure comes from smooth, effective task completion; frustration
from obstruction, confusion, or failure.

**Key characteristic**: Users are largely unaware of behavioral processing when it works
well. Good behavioral design is invisible — users experience their task, not the interface.
Poor behavioral design intrudes: users become conscious of the interface, not their task.

**Connection to flow**: Csikszentmihalyi's flow state (Cooper) is the peak positive behavioral
experience. Cooper's principle "no matter how cool your interface is, less of it would be better"
is a behavioral level principle — remove anything that makes users aware of the interface.

### Level 3: Reflective

**What it is**: After-the-fact evaluation, narrative, and attribution. The story users tell
themselves about the experience. Includes: "I feel clever for figuring that out" vs. "I feel
stupid for not understanding."

**The attribution asymmetry**:
- When design succeeds → users attribute the success to *themselves* (feel competent, smart)
- When design fails → users attribute the failure to *themselves* (feel stupid, incompetent)

This is the psychological mechanism behind the "blame the user" dynamic Norman identifies
throughout DOET. Reflective processing automatically assigns causation, and absent contrary
signals from the design, users assign causation to themselves.

**Design implications**:
- Design for user mastery narratives: make users feel competent, not just successful
- Error messages that say "you entered X incorrectly" trigger negative reflective attribution;
  "this field needs format Y" shifts attribution to the system
- Onboarding that shows users their progress creates positive reflective attribution
- "You completed [goal]!" confirmation messages reinforce the narrative of competence

**The three levels interact**: Visceral creates the initial disposition; behavioral provides
the ongoing experience; reflective constructs the lasting memory and story. The Peak-End Rule
(Yablonski) primarily operates at the reflective level — memory is constructed retrospectively
from peaks and endings.
