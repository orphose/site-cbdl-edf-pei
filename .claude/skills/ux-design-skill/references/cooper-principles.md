# Cooper / About Face Reference
## Source: About Face: The Essentials of Interaction Design, 4th Ed. (Cooper, Reimann, Cronin, Noessel, 2014)

---

## The Core Premise

If you design digital products so that the people who use them can easily achieve their goals,
they will be satisfied, effective, and happy. They will pay for your products and recommend
them to others. The absence of design as a fundamental part of product development is why
so many digital products are frustrating.

**Design** (Cooper's definition): Understanding the desires, needs, motivations, and contexts
of people using products — then using that knowledge to create products whose form, content,
and behavior are useful, usable, and desirable.

**Interaction design** focuses specifically on the design of *behavior* — how complex digital
products behave over time, across states, in response to user actions. This is categorically
different from traditional graphic design, which focuses on form and communication.

---

## Goal-Directed Design (GDD) — Full Process

### Phase 1: Research

Understanding users requires *qualitative* research — not surveys, not focus groups, not
analytics alone. Numbers describe aggregate behavior; they cannot explain *why* users behave
as they do.

**Contextual inquiry**: Observe users in their actual environment doing actual work.
Note what they do, not just what they say. The divergence between stated behavior and
observed behavior is the primary source of design insight.

**Research objectives**:
- What tasks do users actually try to accomplish?
- What steps do they go through? Where do they deviate from expected paths?
- Where do they struggle? What workarounds have they invented?
- What mental models do they hold? How accurate are those models?
- What terminology do they use? (Vocabulary mismatch is a major source of navigation failure.)

**Qualitative ≠ anecdotal**: 5-8 well-selected user observations reveal the majority
of significant behavioral patterns. You don't need a 6-month study; you need rigorous
observation of real people in real contexts.

**Research outcomes feed personas**: Raw observation data must be synthesized into models
before it can drive design decisions.

### Phase 2: Modeling — Personas and Goals

**Why model users?** Research produces hundreds of pages of notes, and individual users
differ from each other. Without a model, "designing for users" becomes "designing for
whoever I imagined in my head while in the meeting." Models make design discussions precise.

#### Personas

**What a persona is**: A composite user archetype constructed from research patterns.
Not a real person. Not a demographic segment. Not an average. A specific named individual
who represents a behavioral pattern observed across multiple research subjects.

**Why personas work**:
- Provides a precise, named design target ("Would Maria use this?" is a better question
  than "Would most users like this?")
- Externalizes user knowledge so it can be referenced, critiqued, and updated
- Prevents designing for the mythical "average user" who statistically represents no one
- Creates empathy — named, specific people are easier to design for than statistical abstractions
- Creates shared vocabulary across the team: "That workflow works for Maria but not for Ben"

**Personas are not**:
- Marketing personas (not demographics — a 55-year-old executive and a 25-year-old engineer
  may have identical behavioral patterns; what matters is behavior, not demographics)
- User roles ("administrator" vs "end user" — roles describe access, not goals or behavior)
- A single interviewee
- A list of features they want

#### The Three Types of Goals

Every persona has goals at three levels. All three must be served — products that serve
only end goals are technically functional but emotionally unsatisfying.

**1. Experience Goals**: How the user wants to *feel* while using the product.

Experience goals are rarely articulated by users but are deeply felt. They are violated or
honored by every micro-interaction, every piece of copy, every error message.

Examples:
- "Feel competent and in control, not like an idiot"
- "Feel creative, not constrained by the tool"
- "Feel confident that nothing important is being lost"
- "Feel calm and organized, not overwhelmed"
- "Feel like a professional, not a beginner"

When products fail experience goals, users may complete tasks but feel bad about themselves.
When products honor experience goals, users feel the product understands them.

**2. End Goals**: What the user wants to *accomplish* with the product.

These are the observable, task-level goals users can describe. The direct purpose of using
the product.

Examples:
- "Track my expenses without spending more than 5 minutes on it daily"
- "Find the right part number for my repair"
- "Ship this package before 5pm"
- "Get an appointment this week"

End goals drive feature requirements. But end goals alone are insufficient — a product that
serves end goals but ignores experience goals produces competent tools that nobody wants to use.

**3. Life Goals**: Who the user wants to *be*.

Identity-level goals. Products either support or undermine users' self-image and the life
they're trying to construct.

Examples:
- "Be seen as a capable professional who doesn't need to ask for help"
- "Be a parent who is present and not constantly on their phone"
- "Be the kind of person who gets things done efficiently"
- "Be someone who doesn't make technical mistakes"

These goals are almost never articulated in user research but profoundly affect adoption,
churn, and recommendation behavior. A product that makes a user feel like they've
compromised their life goal will be abandoned even if it's functionally excellent.

#### Constructing Personas

1. **Group by behavioral pattern, not demographics**: Identify users who approach the task
   similarly. The relevant dimensions are behaviors, goals, and mental models — not age,
   gender, or job title.

2. **Identify behavioral variables**: The 3-5 key dimensions that most significantly differentiate
   users (e.g., frequency of use, domain expertise, technical sophistication, task complexity).

3. **Synthesize composite characters**: Each cluster of similar behavior patterns becomes
   one persona. Give each a name, a photo, a narrative.

4. **Assign goals**: For each persona, define all three goal types. The goals are the
   design target — not the persona's biography.

5. **Define primary and secondary personas**:
   - *Primary persona*: The one the design must not fail. One interface cannot be optimal
     for multiple primary personas simultaneously — choose one.
   - *Secondary personas*: Can be served by the primary persona's design without compromising it.
   - *Anti-persona*: Explicitly not the design target. Defining who you're not designing for
     is as important as defining who you are.

**The primary persona rule**: Every significant design decision must be optimal for the primary
persona. Secondary personas can be accommodated if it doesn't compromise the primary experience.
Designing for "everyone" produces a product that works adequately for no one.

**Persona skeleton structure**:
```
Name: [First name — feels like a real person]
Role/Context: [Job or life situation]
Quote: [One sentence capturing their attitude toward this problem domain]
Goals:
  Experience: [How they want to feel]
  End: [Top 2-3 tasks they need to accomplish]
  Life: [Identity-level aspiration this product touches]
Current frustrations: [Pain points the current solution creates]
Technical context: [Devices, ability level, connectivity]
Usage context: [When, where, how they use this type of product]
```

### Phase 3: Scenarios

**Scenarios** are narrative descriptions of personas using the product to accomplish goals.
They translate research insight into design direction through the power of story.

**Why narrative?**: Stories engage the whole team. They're easier to critique, easier to
share, easier to update than wireframes or feature lists. Scenarios prevent premature
convergence on implementation details.

**Three types**:

1. *Context scenarios* (pre-design): Describe ideal product behavior from the persona's
   point of view, without implementation constraints. "Imagine Maria has the ideal version
   of this product..." Used to define *what* the product should do before deciding *how*.

2. *Key path scenarios*: Describe step-by-step interaction with the designed product for
   the most critical flows. Used to validate the design framework.

3. *Validation scenarios*: Edge cases, error conditions, secondary paths. Stress-testing
   the design against non-ideal situations.

### Phase 4: Requirements

**Requirements flow from scenarios** — not from stakeholder feature requests or competitive
feature matrices. This is a fundamental departure from typical product development.

Format: "The product must [do X] in order for [Persona] to [accomplish Goal Y]."

This format makes it impossible to add features that don't serve user goals — every
requirement must be traceable back to a persona and a goal.

Types:
- *Functional requirements*: Things the product must do
- *Data requirements*: Things the product must know, display, or store
- *Contextual requirements*: Constraints from environment, platform, usage context

**Distinguish requirements from solutions**: "The product must allow Maria to find her
previous orders" is a requirement. "The product must have an order history page in the
left sidebar" is a premature solution masquerading as a requirement.

### Phase 5: Design Framework

The framework defines the overall structure of the experience. At this stage: think about
rooms in a house, not doorknobs and faucets.

**Interaction framework**: How users navigate and interact; overall screen structure;
primary interaction patterns; high-level workflow structure.

**Visual design framework**: Visual language, grid system, typography system, color system,
iconography approach. Expressed as a detailed rendering of a single screen archetype — not
a full set of screens.

**The most important principle**: *Form and behavior must be designed in concert.* Interaction
design without visual design produces gray-box wireframes that can't be tested for real
user experience. Visual design without interaction design produces beautiful mockups
that don't work.

### Phase 6: Design Refinement

Detail-level design: specific interactions, component behaviors, error states, loading states,
empty states, edge cases, content hierarchies. Validated with usability testing.

---

## Perpetual Intermediates — Designing for the Majority

Users spend almost no time as true beginners (days to weeks) and almost no time as true
experts (rare). The vast majority of their time is spent as *perpetual intermediates* —
people who know enough to be productive but not enough to use advanced features.

**The distribution is a bell curve with fast tails**: Beginners don't stay beginners long
(they either learn or abandon). Experts emerge slowly and rarely. The center bulge of
intermediates is persistent.

**Why both extremes are design traps**:
- *Developer default* (expert design): All features exposed equally, no hierarchy of importance,
  terminology from implementation model. Experts love it; everyone else is lost.
- *Marketing default* (beginner design): Wizards, training wheels, heavy guidance, limited
  functionality. Beginners can enter; nobody can grow. "Don't weld on training wheels."

**Designing for the intermediate**:
- The default path should be optimized for efficient task completion by someone who knows
  what they're doing
- Beginner assistance should be *discoverable*, not mandatory
- Expert shortcuts should be *accessible*, not visible
- The interface should *inflect for typical navigation* — the most common path should be
  the most obvious path

**"Don't stop the proceedings with idiocy"**: If a user in the middle of a complex task
performs an action that could have unintended consequences but is recoverable, *let them
proceed*. Don't interrupt with confirmations for low-stakes, reversible actions.
The question to ask: "Would a competent user ever regret not being warned here?"
If the answer is rarely, don't warn.

---

## Flow, Transparency, and Orchestration

**Flow** (Csikszentmihalyi): A state of deep, uninterrupted concentration in which users
are highly productive and lose track of time. Flow requires: clear goals, immediate feedback,
challenge matching skill, and freedom from interruptions.

**The design imperative**: Do not interrupt users unnecessarily. Every unnecessary dialog,
confirmation, alert, permission request, or mode shift is a flow-breaker.

**"No matter how cool your interface is, less of it would be better"**: The ultimate interface
is often no interface — a product that handles the work transparently, leaving the user
face-to-face with their objectives rather than with the tool.

**Transparency**: When a product interacts well with a person, interaction mechanics disappear.
The user thinks about their task; not about the software. Visible interfaces signal poor design.

**Orchestration**: All elements of an interface must work together coherently toward a single
goal. Like music: no single rule defines harmony, but a sour note is immediately apparent.
Conflicting visual styles, inconsistent behaviors, jarring transitions — these are sour notes
in software orchestration.

**Strategies for harmonious interaction**:
- Follow users' mental models (don't make them learn yours)
- Less is more (every element not contributing is detracting)
- Let users direct rather than discuss (allow direct manipulation; minimize mode switching)
- Provide context-sensitive help (not modes or manuals)
- Use position memory (remember where things were; restore contexts)
- Support side trips without penalty (let users explore and return)

---

## Digital Etiquette — Designing Considerate Products

Humans instinctively treat interactive systems as social entities (Nass & Reeves, 1996,
*The Media Equation*). We respond to software as if it were a person — unconsciously and
unavoidably. This is not irrational; it's neurological. Software that behaves rudely
triggers social defensiveness in users, even when they know intellectually it's software.

**The ideal division of labor**: The computer does the work; the person does the thinking.
We don't need AI to think for us — humans are extraordinarily good at creative problem-solving
and pattern recognition. We need machines to handle the work of information management
(accessing, organizing, visualizing, processing data). Automation of thinking is not the goal;
automation of drudgery is.

**Characteristics of considerate products** (parallel to human considerateness):
- **Take an interest**: Remember user preferences, previous actions, context. Don't make
  users re-enter information they've already provided.
- **Are forthcoming**: Proactively provide information users will want before they have to ask.
  Don't make users hunt for what they need.
- **Use discretion**: Don't expose irrelevant data or internal state. Don't overwhelm with
  information. Know what's worth surfacing.
- **Anticipate needs**: Predict likely next actions based on context. Offer before being asked.
- **Are conscientious**: Complete tasks thoroughly; handle edge cases; don't leave users in
  inconsistent states.
- **Don't burden users with internal problems**: Error messages that expose implementation
  details are inconsiderate. Handle internal failures internally; show users only what they
  need to know to proceed.
- **Keep users informed**: Constant, appropriate feedback about status. Progress. Completion.
- **Fail gracefully**: When things go wrong, handle it with dignity. Apologize appropriately.
  Offer the path forward. Never blame the user.
- **Help users avoid awkward mistakes**: Prevent errors before they happen; where prevention
  is impossible, make recovery trivially easy.

**"If it's worth it to the user to do it, it's worth it to the application to remember it"**:
Applications should remember user preferences, configurations, last positions, recent items —
not require users to re-establish state every session.

---

## Reducing Work and Eliminating Excise

**Excise** = work the user must do that serves the *system's* needs, not the user's goals.
Every instance of excise is a failure of design advocacy.

**Four types of user work** (minimize all four):
1. **Cognitive work**: Comprehending UI behavior, text, organizational structures.
   Sources: unclear affordances, complex vocabulary, misleading groupings.
2. **Memory work**: Recalling passwords, commands, file locations, sequences.
   Sources: knowledge-in-head requirements, modes, complex navigation.
3. **Visual work**: Locating targets, parsing layouts, distinguishing similar elements.
   Sources: visual noise, poor hierarchy, overloaded screens.
4. **Physical work**: Keystrokes, mouse movements, mode switches, clicks.
   Sources: deeply nested navigation, excessive confirmation dialogs, multi-step simple tasks.

**Types of excise**:
- *Navigational excise*: Navigation through product functions is largely excise (except in
  search-like products where navigation is the product). Every click to reach a daily-use
  feature that isn't accessible from the surface is navigational excise.
- *Formatting excise*: Requiring phone numbers with dashes, dates in specific format, credit
  card numbers without spaces — excise that serves the database, not the user.
- *Mode excise*: Switching modes to perform related tasks (edit mode / view mode / config mode).
- *Confirmation excise*: "Are you sure?" dialogs for routine reversible actions.

**"Ask forgiveness, not permission"**: Don't ask users to confirm routine actions. Let them
proceed; provide undo. Confirmation dialogs should be reserved for irreversible, high-stakes
operations — not for "are you sure you want to close this dialog?"

---

## Platform and Posture

**Platform**: The hardware/software combination (desktop, mobile, tablet, kiosk, in-vehicle,
embedded device, etc.). Platform determines input methods, screen size, connectivity, and usage context.

**Posture**: The product's behavioral stance — how much attention it demands and how it
responds to the attention it receives.

**Three primary postures**:

*Sovereign applications* (daily, full attention):
- Used for extended periods; user devotes nearly full attention
- Examples: word processors, design tools, coding environments, complex data analysis
- Design principles: maximize document/data views, rich input support, conservative visual style
  (don't compete with the user's work for attention), full-feature exposure, keyboard-optimized

*Transient applications* (brief, focused tasks):
- Used for short interactions; user has partial attention; must be immediately useful
- Examples: notification apps, quick calculators, maps, weather, transit apps
- Design principles: single window and view, immediate access to primary function, minimum
  configuration, launch to previous state/position, dead-simple primary interaction

*Daemonic applications* (background, minimal interaction):
- Run in background; user interacts minimally and only occasionally
- Examples: sync services, backup tools, update managers, system utilities
- Design principles: visible only through status indicator, interact only to report errors
  or request required decisions, never interrupt without important cause

**Platform decisions inform design from the start**: A product designed for sovereign use
that gets deployed as a transient app will frustrate users. Platform and posture decisions
must be made in concert with interaction design — not handed down as technical constraints.

---

## Interface Paradigms

**Implementation-centric interfaces** (worst):
The interface exposes how the system is internally built. One button per function, one dialog
per module, commands that echo data structures. Easy for developers to build and debug.
Requires users to understand internal architecture to use it. Common in enterprise, medical,
and scientific software. Violates the principle that "most people would rather be successful
than knowledgeable."

**Metaphoric interfaces** (transitional, now largely obsolete):
The interface mimics real-world objects (desktops with paper, file cabinets, trash cans).
Provides intuitive entry but ties design unnecessarily to physical-world limitations. Metaphors
run out quickly, don't scale, and break cross-culturally. iOS 7 (2013) marked the formal
end of skeuomorphism as the dominant paradigm.

**Idiomatic interfaces** (modern standard):
The interface is learned through use, like words or any other idiom. Not self-explanatory
from first principles, but quickly and easily learned. Not bound by physical-world limitations.
Consistent within the system. Examples: pull-to-refresh, swipe to dismiss, hamburger menu.

**Idiomatic design principles**:
- Idioms are fine to use even when not literally self-explanatory — because users learn them quickly
- New idioms require clear initial communication (tooltip, animation, onboarding gesture)
- Consistency within the product is critical — the same idiom must always mean the same thing
- Good idioms eventually become conventions (Jakob's Law)

---

## Rich Visual Modeless Feedback (RVMF)

**The dialog problem**: Dialog boxes are the traditional mechanism for providing information
to users. But dialogs interrupt flow, require mode switches, and disappear once dismissed —
leaving no persistent record of what was communicated.

**RVMF**: Providing information *within the main interface* without requiring a mode shift.
Rich in depth, visual in communication, modeless in access.

Examples:
- iOS App Store download: app icon shows download progress directly on the Home screen
- Email client: colored availability indicator next to contact name (no need to open chat app)
- Healthcare room-status display: color coding, numerical occupancy, health-alert triangles —
  all in the main view, no dialogs required

**When to use RVMF**:
- Status that users need frequently or continuously
- Progress information for ongoing operations
- State changes that don't require user action
- Information that would require a dialog if not embedded

**The flow preservation principle**: Modeless feedback never stops the proceedings.
Users can read it when they want; ignore it when they don't. It doesn't demand attention
or require a decision. It simply exists — available, legible, unobtrusive.

---

## Command Modalities

Different ways users issue commands to a system. Good design provides multiple modalities
for critical functions, matching different user skill levels.

**Pedagogic modality**: Commands presented with descriptive text (menus, labeled buttons,
dialogs). Teach the user with inspection — you can read what the command will do before
triggering it. Best for beginners and infrequent use. Slowest for experts.

**Immediate modality**: Controls that have direct, real-time effect (sliders, drag handles,
pushbuttons, toggles). No intermediate step between action and result. Best for intermediates
who know what they want.

**Invisible modality**: Keyboard shortcuts, gestures, voice commands. No visual presence —
must be memorized. Fastest for experts who know the system well. Must be discoverable
(shown in menus, tooltips, or onboarding).

**The accessibility implication** (from Norman): Pedagogic modality = information in the
world (can be read). Invisible modality = information in the head (must be remembered).
Good interfaces provide both — beginners use menus; experts use shortcuts; both paths exist.

**Mobile-specific modality challenges**:
- Mobile has less capacity for multiple modalities (limited screen space)
- Invisible modalities (gestures) are particularly at risk of being undiscoverable
- Every gesture that has no visual affordance must be either explicitly taught or be a
  convention so well-established that it can be assumed known (e.g., swipe to scroll)

---

## Data Entry, Storage, and Retrieval

**Data integrity vs data immunity** (the core tension):
- *Data integrity* (developer default): Validate everything at the border; reject anything
  that doesn't match expected format. Keeps the database clean; creates hostile user experience.
- *Data immunity* (user-centered approach): Accept data in whatever form users provide;
  normalize and validate internally. Keeps the user experience smooth; requires more implementation work.

The choice of approach reveals whose interests the designer is serving — the database or the user.

**Data entry principles**:
- Accept reasonable variation in input formats; normalize internally
- If a form field has a specific format requirement, provide an example or mask
- Validate in real-time (inline validation) rather than at submit time
- Error messages appear adjacent to the field, not at the top of the form
- Never clear a form on submission failure — users have already done that work

**File saving and storage principles** (Norman's principle extended):
- Auto-save by default — don't burden users with "do you want to save?"
- Version history wherever feasible — make the cost of auto-save zero
- The "where did it go?" problem is a design failure — documents should be findable by
  what they contain and when they were created, not by filesystem location

**Search and retrieval principles**:
- Find by content and context, not by filename or location
- Recent items should be surfaced automatically
- Search should tolerate misspelling, partial words, and conceptual queries

---

## Design Principles — Cooper's Complete Appendix

These are the distilled design principles from About Face, chapter by chapter:

**From Chapter 1**:
- User interfaces should be based on user mental models, not implementation models
- Goal-directed interactions reflect user mental models
- Interaction design is not guesswork

**From Chapter 3**:
- Don't make the user feel stupid
- Focus the design for each interface on a single primary persona

**From Chapter 4**:
- Define *what* the product will do before you design *how* it will do it
- In early design stages, pretend the interface is magic

**From Chapter 5**:
- Never show a design approach you're unhappy with — stakeholders just might like it
- Form and behavior must be designed in concert

**From Chapter 8 (Digital Etiquette)**:
- The computer does the work; the person does the thinking
- Software should behave like a considerate human being
- If it's worth it to the user to do it, it's worth it to the application to remember it

**From Chapter 9 (Platform and Posture)**:
- Decisions about technical platform are best made in concert with interaction design efforts
- Optimize sovereign applications for full-screen use
- Transient applications must be simple, clear, and to the point
- Kiosks should be optimized for first-time use

**From Chapter 10 (Perpetual Intermediates)**:
- Don't weld on training wheels
- Nobody wants to remain a beginner
- Optimize for intermediates
- Inflect the interface for typical navigation
- Imagine users as very intelligent and very busy

**From Chapter 11 (Orchestration and Flow)**:
- No matter how cool your interface is, less of it would be better
- Don't use dialogs to report normalcy
- Ask forgiveness, not permission (on confirmations)

**From Chapter 12 (Eliminating Excise)**:
- Eliminate excise wherever possible
- Don't stop the proceedings with idiocy
- Don't make users ask for permission
- Allow input wherever you have output
- Significant change must be significantly better

**From Chapter 15 (Error Prevention)**:
- Rich modeless feedback prevents most errors and most dialogs
- Preview before commit wherever possible

**From Chapter 17 (Visual Design)**:
- Context, context, context — every visual guideline is subject to context
- Most people would rather be successful than knowledgeable
