# Design Ethics Reference
## Sources: Yablonski's Laws of UX (Ch.12), Cooper's About Face (Ch.7, Values), Norman's DOET, Krug's DMMT

---

## The Ethical Imperative

Design is powerful. The same psychological principles that make products easy to use can
also be weaponized against users. Psychology in design is neutral; intent and outcome
determine whether it's service or exploitation.

When did "daily active users" or "time on site" become more meaningful than whether a
product is actually helping people achieve their goals? The commercial imperatives of
technology companies (maximize engagement, extract data, increase monetization) are
structurally misaligned with human objectives (accomplish a task, stay connected, feel well).

Designers occupy the space between these interests. That makes ethics a professional
obligation, not an optional add-on.

---

## Cooper's Design Values Framework

The foundational values that govern ethical interaction design practice (developed by
Reimann, Dubberly, Goodwin, Fore, and Korman):

**Ethical** (considerate, helpful):
- Do no harm — products should not cause interpersonal, psychological, physical, economic,
  social, or environmental harm
- Improve human situations — design should leave users better off

**Purposeful** (useful, usable):
- Help users achieve their goals and aspirations
- Accommodate user contexts and capacities (including disability, age, literacy, access)

**Pragmatic** (viable, feasible):
- Help the commissioning organization achieve its goals
- Accommodate business and technical requirements

**Elegant** (efficient, artful, affective):
- Represent the simplest complete solution
- Possess internal coherence — the design makes sense on its own terms
- Appropriately accommodate and stimulate both cognition and emotion

**The tension**: Ethical and purposeful values sometimes conflict with pragmatic ones.
When they do, designers must advocate for users — while understanding the legitimate
business constraints they work within.

---

## Types of Design Harm

Products that create harm may not have intended to. Unintended harm at scale is still harm.

**Interpersonal harm**: Designs that enable harassment, facilitate abuse, or undermine dignity.
Examples: Platforms without effective abuse-reporting mechanisms; facial recognition tools
that enable stalking; designs that make blocking/reporting difficult.

**Psychological harm**: Designs that create anxiety, addiction, depression, or distorted self-image.
Examples: Social media features exploiting comparison and social validation; filters that
drive body image distortion; notification systems engineered to create compulsive checking.

**Physical harm**: Designs that cause pain, injury, or death.
Examples: Overly complex in-car navigation systems (cognitive load while driving);
insufficient contrast causing eye strain; small touch targets causing repetitive stress.

**Economic harm**: Designs that cause financial loss through manipulation or confusion.
Examples: Dark patterns in purchasing flows; subscription designs that make cancellation
nearly impossible; pricing revealed only after user investment (endowment effect exploitation).

**Social and societal harm**: Designs that perpetuate injustice, create filter bubbles,
or undermine democratic processes.
Examples: Algorithmic recommendation systems that amplify extremism; defaults that expose
user data beyond user expectations; designs that exclude accessible access for minority populations.

---

## How Technology Shapes Behavior (Behavioral Mechanisms)

### Operant Conditioning

B.F. Skinner demonstrated that behavior can be shaped through reinforcement patterns:
- *Continuous reinforcement* (reward every time): Strong habit formation; behavior stops
  quickly when reward stops
- *Fixed interval reinforcement* (reward at predictable intervals): Moderate habit; behavior
  decreases between rewards
- *Variable ratio reinforcement* (random reward timing): The strongest and most persistent
  habit formation; behavior continues long after rewards stop

Variable ratio reinforcement is the mechanism behind slot machines — and behind most
addictive digital product features.

### Digital Mechanisms That Exploit Conditioning

**Intermittent variable rewards**:
- Pull-to-refresh mimics slot machine action: unpredictable reward (new content, no content)
- Social media notifications: variable timing, variable social reward
- Email checking: sometimes important, usually not — the unpredictability drives compulsion
- Average person interacts with smartphone 2,500+ times daily; some users 5,400 times

**Infinite loops**:
- Autoplay video removes the "should I watch another?" decision point
- Infinite scroll removes the "should I load more?" decision point
- Both eliminate natural stopping-point friction — the same friction that allows conscious
  moderation of consumption

**Social affirmation**:
- "Likes," follower counts, comment validation deliver dopamine hits
- Social affirmation satisfies the drive for belonging and approval
- The platform benefits from return visits; the user may not

**Personalization feedback loops**:
- Interaction data improves recommendations → more relevance → more engagement →
  more data → more improvement
- Optimization target (engagement) diverges from user goal (stay informed, stay connected)
- Can produce filter bubbles, radicalization pathways, and excessive time investment

**Default exploitation**:
- Most users never change default settings
- Pre-checked consent checkboxes exploit defaults to capture consent users might not give
  if presented with a neutral choice
- Privacy defaults that expose more than users expect: Facebook defaults matched user
  expectations only 37% of the time

**Reciprocity exploitation**:
- LinkedIn connection requests create obligation: someone chose to connect with me;
  I should reciprocate (even when the platform suggested the connection, not the user)
- The impulse to reciprocate social gestures is deep and automatic

---

## Dark Patterns Taxonomy

Dark patterns are design techniques that make users perform actions they didn't intend,
for the benefit of the company at the user's expense.

**2019 Princeton/Chicago study**: 11,000 shopping sites analyzed; 1,818 dark pattern instances
found. More popular sites were *more* likely to use dark patterns — not less.

### Deception Patterns

**Confirmshaming**: Framing the "No" option to make users feel bad about declining.
- "No thanks, I don't want to save money"
- "I prefer to pay full price"
- The user isn't declining; they're being shamed into reluctant consent

**Misdirection**: Drawing attention to one thing to distract from another.
- A prominent "Free Trial!" banner that visually obscures the "billing starts on day 30" text
- Animation on an upsell while the base purchase button is subdued

**Hidden information**: Concealing important details until the user is invested.
- Shipping costs revealed only at checkout (the endowment effect makes abandonment harder)
- Subscription pricing revealed only after account creation
- Privacy policy data-sharing scope buried in 47 pages of legal text

**Bait and switch**: Advertising one thing; providing another.
- "Get Premium for free!" (requires payment after a 7-day trial)
- Feature advertised prominently available only in higher pricing tier

### Consent Manipulation

**Trick questions**: Confusingly worded options that produce the opposite of intended consent.
- Double-negatives in opt-out checkboxes: "Uncheck this box to not receive marketing emails"
- Phrasing that reverses expected checkbox semantics

**Pre-checked consent**: Defaulting to "opted in" for marketing, data sharing, or newsletter
subscriptions, relying on inattention.

**Forced action**: Requiring users to take an unintended action to access a feature.
- "Connect your contacts to find friends" required to proceed (Instagram example)
- No option to skip; no explanation of what will be done with the data

**Roach motel**: Easy to enter; nearly impossible to leave.
- Subscribe in 2 clicks; cancel requires phone call during business hours
- "Delete account" option hidden or non-functional
- Free tier that requires credit card "for identity verification"

### Urgency and Scarcity Manipulation

**False urgency**: Creating artificial time pressure to prevent deliberate decision-making.
- "Only 3 left!" (when stock is replenished immediately)
- "This offer expires in [always-resetting countdown timer]"

**False social proof**: Fabricating or misleading engagement statistics.
- "27 people are looking at this right now" (not verified or easily fabricated)
- "Best seller" applied to products the company wants to sell

### Subscription Traps

**Difficult cancellation**: Making cancellation disproportionately hard compared to subscription.
- Phone call required to cancel online subscription
- Cancellation option hidden in settings submenu
- "Are you sure? Let us offer you a discount" — legitimate; "Please talk to a human on the phone to cancel online service" — not

**Drip pricing**: Revealing true cost incrementally through the purchase process.
- Base price → add fees → add taxes → add "mandatory" service → checkout

---

## The Ethics of Persuasion vs. Manipulation

**Legitimate persuasion**: Helping users make decisions that align with their goals.
- Highlighting the option that best serves their stated needs ("Recommended for you")
- Progress indicators that motivate completion ("75% complete!")
- Social proof that helps users make good decisions ("Most popular plan")
- Framing choices clearly (default = best option for most users)

**Manipulation**: Using psychological mechanisms to override user judgment for company benefit.
- Creating artificial urgency to prevent deliberate decision-making
- Exploiting sunk cost psychology to trap users (Concorde effect)
- Engineering confirmation shaming that makes users feel bad about not converting
- Removing opt-out options while making opt-in frictionless

**The test**: Does this design technique help users achieve *their* goals, or does it circumvent
their judgment to achieve *the company's* goals? The distinction is intent and alignment,
not the psychological mechanism.

**Krug on dark patterns**: "Sometimes you'll choose to have your site do some of these user-unfriendly
things deliberately. Sometimes it makes business sense not to do exactly what the customer wants.
Just be sure you do it in an informed way, rather than inadvertently."

---

## Ethical Design Process

### Think Beyond the Happy Path

Standard design focuses on the idealized user performing the idealized task — the "happy path."
Ethical design explicitly asks:
- Who is harmed when this fails or is misused?
- Who can't access this? What are we assuming about our users that may not be true?
- How could this be weaponized against vulnerable users?
- What are the second-order effects at scale?

Design the minimum viable product around *non-ideal scenarios first*, not ideal ones.
Edge cases become at-risk users; designing edge cases first protects the most vulnerable.

### Diversify Teams and Thinking

Homogeneous teams have systematic blind spots corresponding to their shared experiences.

**Practical implications**:
- Diverse gender, race, age, and background on design teams catches problems invisible
  to homogeneous teams
- User research must include users outside the "ideal user" segment — include users
  who are older, less technically sophisticated, in lower-bandwidth environments,
  using assistive technologies
- Personas should include non-majority users, not just the primary economic target

### Look Beyond Engagement Data

Engagement metrics tell you *what* users do; they cannot tell you *how the product is
affecting their lives*. High engagement can coexist with harm — compulsive usage is
high engagement; addiction is high engagement.

**Metrics that complement engagement**:
- Task completion rates (did users accomplish what they came to do?)
- Abandonment and return patterns (did they achieve satisfaction?)
- Qualitative feedback (how do users describe the product's role in their lives?)
- Wellbeing indicators (are users spending time in ways they value?)

### Embrace Friction Intentionally

Not all friction is bad. The elimination of all friction — "frictionless" as a universal goal —
is an ethical failure posing as a design principle.

**Valuable friction**:
- Confirmation steps for irreversible, high-consequence actions
- Privacy prompts that force users to make active choices about data sharing
- "Speed bumps" before sharing or publishing content that could harm others
- Deliberate pauses that allow reconsideration of significant purchases
- Difficulty in certain cancellation flows for services where accidental cancellation
  would cause significant user harm (but not for normal subscription cancellation)

**Misused friction** (friction that harms users):
- Difficult cancellation flows for normal subscriptions
- Multi-step verification for features that don't warrant it
- Confirmation dialogs for routine, easily-reversed actions
- Opacity in pricing or subscription terms

---

## Norman on Human Error and Design Responsibility

**The attribution error at scale**: When Norman argues that human error is a design failure,
he is describing both individual product interactions AND systemic organizational responsibility.

When an accident occurs:
- Common response: identify the person who made the error; blame and/or train them
- Norman's prescription: determine what in the *system design* made the error likely;
  redesign to prevent recurrence

This principle applies directly to ethical product design:
- When a user is manipulated by a dark pattern: don't attribute this to user naivety;
  examine why the design worked against the user's interests
- When users engage compulsively with a product in ways that harm them: don't attribute
  this to a user's lack of self-control; examine what the design is optimized for

**Design responsibility scales with power**: A single product interaction affecting one user
is a design problem. The same design choice deployed to a billion users creates social phenomena.
The ethical stakes of design decisions scale with the size of the user base.

---

## Krug on Goodwill and Trust

**The goodwill reservoir** has ethical dimensions beyond UX:
- Sites that hide information users need (pricing, policies, support contacts) are not just
  bad UX — they are engaging in a form of manipulation that depends on information asymmetry
- Sites that punish users for formatting choices they didn't know to make are not just frustrating —
  they are transferring system problems to users
- Sites that ask for information they don't need are not just annoying — they are extracting
  value from users without providing equivalent value

**Trust is a design material**: It accumulates slowly through consistent, honest interaction.
It is destroyed instantly by a single significant betrayal. Dark patterns spend the trust that
good design builds — and the cost is borne by the entire industry, not just the company
that deployed the dark pattern.

**The mensch standard**: Krug's question is whether a website is a mensch — a person of
integrity and honor. This ethical framing is not just rhetorical. A product that systematically
acts against users' interests is not a mensch, regardless of how technically polished it is.

---

## Checklist: Ethical Design Review

Before releasing a feature or product, ask:

**On user goals**:
- [ ] Does this feature serve the user's goals, or does it circumvent them?
- [ ] Who benefits from this design — users, company, or both?
- [ ] Are there user groups for whom this design causes harm?

**On defaults**:
- [ ] Do default settings reflect what users would choose if actively deciding?
- [ ] Are opt-in/opt-out choices presented neutrally?
- [ ] Have we tested whether users understand what they're consenting to?

**On urgency/scarcity**:
- [ ] Is any urgency or scarcity communication accurate?
- [ ] Does urgency framing prevent deliberate decision-making in ways that harm users?

**On transparency**:
- [ ] Is pricing fully visible at the beginning of the purchase flow?
- [ ] Are subscription terms clearly communicated upfront?
- [ ] Is cancellation as easy to access as subscription?

**On manipulation**:
- [ ] Have we used any of the dark patterns listed above?
- [ ] Is any confirmation language shaming users for not converting?
- [ ] Is there any use of artificial social proof?

**On access**:
- [ ] Can users with color vision deficiency use this feature?
- [ ] Can users with motor impairments access all critical functions?
- [ ] Does this feature work for users on slower connections or older devices?

**On scale effects**:
- [ ] At 100 million users, what are the social effects of this design decision?
- [ ] Does this design optimize for engagement in ways that could cause harm at scale?
- [ ] What happens if this feature is misused, and have we designed against misuse?
