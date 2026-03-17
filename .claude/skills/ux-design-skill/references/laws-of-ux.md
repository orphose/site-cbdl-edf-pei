# Laws of UX Reference
## Source: Laws of UX, 2nd Edition (Jon Yablonski, 2020)

---

## Foundational Premise

The laws of UX are not laws in the legislative sense — they are reliable patterns of human
behavior observed consistently across many studies. They don't replace user research but
provide a foundation for interpreting why people behave in certain ways. They represent
the intersection of cognitive psychology and interaction design.

Every designer should learn the fundamentals of psychology, because humans have an
underlying "blueprint" for how we perceive and process the world. Understanding this
blueprint allows us to design *for* how people actually are, rather than forcing them
to adapt to design.

---

## Law 1: Jakob's Law

**Statement**: Users spend most of their time on other sites. They prefer your site to work
the same way as all the other sites they already know.

**Psychology**: Mental models are cognitive frameworks built from accumulated experience.
When users encounter a new product, they immediately apply patterns from familiar products.
When the new product violates these expectations, they experience friction and confusion —
and often blame themselves for the confusion rather than the design.

**Origins**: Jakob Nielsen, 2000. Also called "Jakob's Law of the Internet User Experience."
Extends the principle that mental effort invested in learning one product creates expectations
for all similar products.

**Applications**:
- Follow established conventions for navigation placement, form structure, icon meanings
- Recognize familiar interaction patterns (hamburger menu, shopping cart, back arrow)
- When redesigning a product with existing users, provide a transition period with the
  option to use the familiar version — forcing immediate change generates resistance
- Reserve innovation for areas where it creates genuine measurable value
- If you must deviate from convention, ensure the deviation is immediately obvious and
  provides clear benefit

**The tradeoff with aesthetics**: The Aesthetic-Usability Effect (Law 7) can temporarily
mask Jakob's Law violations. Users may rate a beautiful unfamiliar interface as easy to
use in initial testing — but over extended use, the violations compound.

**Practical test**: Could your primary user navigate core tasks on day one without
any instruction? If not, which conventions are you violating, and is the benefit worth it?

---

## Law 2: Fitts's Law

**Statement**: The time to acquire a target is a function of the distance to and size of
the target: `MT = a + b × log₂(2D/W)` where D = distance, W = target width.

**Psychology**: American psychologist Paul Fitts (1954) developed this model studying
aircraft cockpit design after the US Air Force documented 457 crashes in 22 months
that were attributed to "pilot error." Fitts realized the errors were not random —
specific control designs predicted specific errors. The mathematical model proved that
small, distant targets demanded more motor time and produced more errors.

**Key insight about edges and corners**: Screen borders effectively have infinite width
(you can move past them without missing). This makes corners and edges the fastest
targets possible — zero acquisition time beyond the threshold. This is why macOS puts
the menu bar at the top of the screen (not at the top of the application window).

**Applications**:
- **Primary CTAs must be large and close to user's likely cursor position**
  — a small sign-up button in the corner of a page is Fitts's Law failure
- **Touch targets on mobile**: Minimum 44×44px (iOS HIG) or 48×48dp (Material Design)
  — but larger is always better; invisible tap areas can extend beyond visual bounds
- **Spacing between targets**: Insufficient spacing causes mis-taps; adjacent destructive
  actions (delete/confirm) need clear separation
- **Destructive actions should be distant from common actions**: Not because of Fitts's Law
  directly, but because the motor pattern for the dangerous action should differ from
  the safe one
- **Use screen edges for frequently accessed persistent controls**: macOS menu bar,
  Windows Start button, mobile status bars all exploit this

**Specific violations to watch for**:
- Tiny close/dismiss buttons, especially on mobile overlays
- Confirmation and cancellation buttons placed adjacently with the same size
- Important CTAs placed below the fold or at bottom of long pages
- Navigation elements that require precision targeting

---

## Law 3: Miller's Law

**Statement**: The average person can keep only 7 (±2) items in their working memory.

**Psychology**: Cognitive psychologist George Miller (1956) identified this limit in his
paper "The Magical Number Seven, Plus or Minus Two." His key insight was that the
constraint applies to the *number of chunks*, not the amount of information per chunk —
an expert's chunks are denser than a novice's.

**Critical misapplication**: "Navigation must have 7 items" or "forms must have fewer than
7 fields." Miller himself was surprised by these distortions. The law describes working
memory capacity, not an optimal number of interface elements. The number of nav items is
an Information Architecture question, not a memory question.

**Cognitive Load Theory** (built from Miller's foundation):
- *Intrinsic load*: Complexity inherent to the task itself (cannot be eliminated, only managed)
- *Extraneous load*: Complexity added by poor design (always avoidable; always eliminate it)
- *Germane load*: Cognitive effort that builds genuine understanding (can be valuable if controlled)

Every design element that requires mental processing consumes working memory capacity.
When capacity is overwhelmed, comprehension breaks down and errors increase.

**Applications**:
- **Group and chunk related information**: Cards, sections, visual clusters reduce apparent
  complexity by treating related elements as single cognitive units
- **Progressive disclosure**: Show only what's needed now; reveal more on demand. The rest
  doesn't consume working memory if it's not visible.
- **Sequential steps in complex processes**: Break multi-step flows into clearly bounded
  stages with progress indicators. Don't display steps 4-8 before step 1 is complete.
- **Grouping form fields**: Billing address as one section, shipping address as another —
  each section is one chunk, not multiple isolated fields

**What this law does NOT justify**:
- Limiting nav to 7 items (IA structure matters, not working memory capacity)
- Removing features users need to reduce "complexity"
- Making every page feel the same to reduce cognitive load

---

## Law 4: Hick's Law

**Statement**: The time it takes to make a decision increases logarithmically with the
number and complexity of choices available: `RT = a + b × log₂(n)`.

**Psychology**: Psychologists William Edmund Hick and Ray Hyman (1952) studied the
relationship between the number of available stimuli and reaction time. The logarithmic
relationship means each additional option adds less incremental time than the previous one —
but the cumulative effect of many options is substantial.

**Applications**:
- **Primary navigation**: Fewer categories with clear scope > many vague categories
- **CTAs**: A single clear primary action > three equally weighted options on one page
- **Onboarding**: Reduce choices presented to new users; expand available features as users
  become proficient (progressive disclosure through time, not just UI depth)
- **Forms**: Smart defaults covering the most likely choice reduce decision load
- **Settings**: Most users use default settings forever — make defaults optimal for the
  most common use case
- **Pricing tiers**: Highlighting "Most Popular" or "Recommended" reduces decision time
  dramatically and steers most users toward the intended choice

**Simplification has limits (balance with Tesler's Law)**:
- Don't hide choices users genuinely need
- "Simplifying" by removing necessary options creates frustration of a different kind
- The goal is to minimize *extraneous* decisions, not eliminate all choice

**Common mistake**: Interpreting feature completeness as good design ("we show everything
the user might ever want"). Users experience this as overwhelming, not helpful.

---

## Law 5: Postel's Law (Robustness Principle)

**Statement**: Be conservative in what you do; be liberal in what you accept from others.

**Origins**: Jon Postel articulated this for TCP/IP design in RFC 793 (1981). The principle
was about creating reliable internet protocols: implementations should strictly follow
specs in their output, but be tolerant of variations in input. Applied to UX: the interface
should be reliable and accessible in its output, while being maximally forgiving and
adaptable in what it accepts from users.

**The deep principle**: Users are human. They're inconsistent, distracted, error-prone, and
operating across wildly different contexts, devices, abilities, and expectations. The system
exists to serve them — not the reverse. Every time you reject valid input because it's in
the "wrong" format, you are penalizing users to make your implementation more convenient.

**Be conservative in output (reliability)**:
- Consistent, accessible interfaces across all devices and contexts
- Test across screen sizes, input methods, network conditions, assistive technologies
- Output degrades gracefully under resource constraints — no broken layouts on small screens
- Never show implementation internals (error codes, stack traces, database terms)

**Be liberal in input (tolerance)**:
- Phone numbers: accept with or without spaces, dashes, parentheses
- Dates: accept multiple formats; parse intelligently; use a date picker as the safe alternative
- Names: don't assume format (not everyone has first + last; some have single names)
- Email addresses: accept and normalize rather than reject
- Credit card numbers: accept with or without spaces — they're easier to type with spaces
- Trim leading/trailing whitespace automatically
- Never require specific capitalization for usernames, emails, or codes
- Search queries: be fuzzy; suggest corrections; handle misspellings
- Forms: autocomplete and autofill wherever valid

**The design philosophy**: The more we can anticipate and plan for variation in user input,
the more resilient the design becomes. Resilient design serves more users, including those
with non-standard inputs, atypical devices, or reduced abilities.

---

## Law 6: Peak-End Rule

**Statement**: People judge an experience largely based on how they felt at its peak and
at its end, rather than the total sum or average of every moment.

**Psychology**: Daniel Kahneman et al. (1993). In cold water immersion experiments,
participants preferred a longer cold-water immersion that ended slightly warmer to a
shorter one that ended at the coldest temperature — despite the longer immersion being
objectively worse by total discomfort. The subjective memory was dominated by the final
moments. *Duration neglect* corollary: the length of an experience barely affects how
it is evaluated retrospectively.

**Key findings extended**:
- Kahneman & Redelmeier (1996): colonoscopy patients evaluated their experience based on
  the worst moment and the final moment — not the duration or average discomfort
- Negative peaks are remembered more vividly than positive peaks (negativity bias)
- The "end" effect is real: the final state disproportionately shapes the overall memory

**Applications**:
- **Identify and design the emotional peak**: What is the most significant moment in this
  flow? First-time success? Purchase confirmation? Receiving a result? Design it to delight.
  Invest disproportionately in this moment.
- **Design the ending with intention**: The final screen, the confirmation email, the
  "all done" state — these have outsized impact on how users remember the experience.
  A warm, celebratory, human confirmation >> a cold technical success message.
- **Onboarding peaks**: The first time a user successfully completes their primary task
  is the peak of onboarding. Engineer it to be satisfying and confidence-building.
- **Error peaks**: Errors are often the emotional peak — and a negative one. Excellent
  error messages, clear recovery flows, and genuine acknowledgment that the system failed
  (not the user) can transform a negative peak into a positive one.
- **Loading/waiting peaks**: Unavoidable waits feel better with progress indication, humor,
  or relevant content. The wait is part of the experience. Design it.
- **Empty states**: The zero-data state (new account, empty inbox, first launch) is a peak.
  Use it to show potential and possibilities, not absence.
- **Ending vs. end state**: The "end" is not necessarily the last interaction; it's often
  the return to a resting state. An inbox at zero, an order confirmed, a file saved —
  these rest states are what users carry away.

---

## Law 7: Aesthetic-Usability Effect

**Statement**: Users often perceive aesthetically pleasing design as design that's more
usable, even when functional performance is identical.

**Psychology**: Kurosu and Kashimura (1995) from Hitachi Design Center — first exploration
of aesthetics and digital usability. They tested 26 ATM interface layouts with 252 participants,
asking them to rate both functionality and aesthetics. Results: perception of usability was
strongly correlated with perception of attractiveness — independent of actual functional ease of use.

Tractinsky (2000): "What Is Beautiful Is Usable" — corroborated and extended globally.
Beautiful design creates a positive emotional state which activates more creative, flexible
thinking — increasing actual problem-solving capability and tolerance for friction.

**What it means**:
- Attractive design triggers positive emotions → more creative/forgiving cognitive approach
- Users encountering a beautiful interface expect it to work well — and this expectation
  itself makes them more patient with minor friction
- Ugly interfaces signal carelessness → users expect problems → interpret ambiguous situations
  negatively → lower tolerance for any friction

**Applications**:
- Invest in visual quality: consistent typography, coherent color system, careful spacing,
  quality iconography. These are not cosmetic — they directly affect perceived and actual usability.
- Use aesthetics to signal care, craft, and competence. The implicit message of beautiful
  design is "we paid attention."
- Beautiful design extends the goodwill reservoir before users even interact.

**Critical warning — the testing trap**: The aesthetic-usability effect can *mask usability
problems in testing*. Participants rate beautiful prototypes as easier to use — then fail
the exact tasks they'd complete in plainer interfaces. Ensure usability testing methodology
captures performance metrics (task completion, error rate, time) and not just satisfaction
ratings. A beautiful product that users can't use is still a product that users can't use.

---

## Law 8: Von Restorff Effect (Isolation Effect)

**Statement**: When multiple similar objects are present, the one that differs from the rest
is most likely to be remembered and noticed first.

**Psychology**: German psychiatrist Hedwig von Restorff (1933) found that items that stood
out in a categorically similar list were far better remembered than items that fit the pattern.
Extended by Taylor & Fiske (1978): people are drawn to salient, novel, surprising, or
distinctive stimuli. This is evolutionarily adaptive — in an environment of similar objects,
the different one is worth attending to.

**Selective attention mechanism**: At any moment, we can only attend to a small fraction of
available information. The brain prioritizes distinctive stimuli as worthy of attention.
This is the cognitive basis for visual emphasis in design.

**Applications**:
- **Primary CTAs**: The primary action button must be visually distinct from secondary actions.
  Color + size + weight differentials signal priority.
- **Critical information**: Pricing, warnings, deadlines, errors — mark these distinctively.
- **Onboarding highlights**: New features or important status changes can use distinctiveness
  to draw attention.

**Use restraint — the law only works when applied sparingly**:
- If 5 elements are bold, nothing is bold
- If 3 different accent colors are used, none of them accent
- If every section has a badge, no badge means anything
- Visual emphasis in competition with itself produces visual noise, not hierarchy

**Accessibility warnings**:
- Never rely *only* on color to create distinction — color vision deficiency affects ~8% of
  men. Use color PLUS shape, size, weight, or position.
- Motion is a powerful attention capture tool — but users with vestibular disorders can be
  harmed by animation. Always respect `prefers-reduced-motion` media query.

---

## Law 9: Tesler's Law (Law of Conservation of Complexity)

**Statement**: For any system there is a certain amount of complexity that cannot be reduced.
It must be assumed by either the system or the user.

**Origins**: Larry Tesler, Xerox PARC (mid-1980s). Tesler was developing interaction standards
for desktop software. His key insight: "If a million users each waste a minute a day dealing
with complexity that an engineer could have eliminated in a week by making the software a
little more complex, you are penalizing the user to make the engineer's job easier."

Tesler later defined the "law of conservation of complexity" formally while working on Mac
application frameworks at Apple, with the express purpose of reducing complexity for customers.

**The transfer question**: Every time you simplify an interface, ask: *where did the
complexity go?* If it went to the user (they now must remember, decide, or do something
that used to be automatic), you didn't simplify — you transferred the burden.

**Applications**:
- **Data format flexibility**: Accepting any date format is complex to implement but moves
  the burden from millions of users onto one engineering decision
- **Auto-save vs. manual save**: The complexity of "when is my work safe?" moves from user
  (must remember to save) to system (must implement reliable auto-save)
- **Form validation**: Normalizing phone numbers is complex to implement; requiring a specific
  format is simple to implement but punishes every user
- **Search tolerance**: Fuzzy search, typo correction, synonym matching — all complex to
  build, all dramatically reduce user burden
- **Navigation defaults**: "Smart defaults" represent developers absorbing the complexity
  of decision-making on behalf of users
- **Progressive onboarding**: Building a tutorial is complex; requiring users to figure
  things out on their own is simpler to build but harder for every user

**Balance with Hick's Law**: Don't oversimplify to the point of removing necessary control.
When users genuinely need to configure or control something, hiding that complexity causes
different frustrations. The principle is: move *extraneous* complexity to the system; expose
necessary complexity clearly.

**The engineering imperative**: Engineers are hired to manage complexity. Users are not.
When the question is "should we implement this on the backend or tell users to do it," the
answer is almost always: implement it.

---

## Law 10: Doherty Threshold

**Statement**: Productivity soars when a computer and its users interact at a pace (<400ms)
that ensures neither has to wait on the other.

**Psychology**: Doherty and Thadani (1982 IBM Systems Journal) documented the relationship
between response time and productivity/satisfaction. Sub-400ms response times dramatically
increased productivity and user engagement.

**The attention timeline**:
- <100ms: Feels instantaneous; users perceive immediate cause-and-effect
- 100-300ms: Slightly perceptible; still feels responsive
- 300-1000ms: User notices; may wonder if their action registered; mental model disrupted
- >1000ms: User's attention wanders; information relevant to task begins to fade
- >10000ms: User considers abandoning; refocuses mentally

**True performance improvements**:
- Optimize above-the-fold / critical path rendering
- CDN, caching, lazy loading for non-critical resources
- Server response time <200ms where possible
- Minimize render-blocking scripts
- Avoid excessive page weight (global average 2+MB in 2023 — often unnecessary)

**Perceived performance (when real speed isn't achievable)**:
- **Optimistic UI**: Show the expected result immediately; reconcile with server asynchronously.
  (Message appears sent immediately; if it fails, show the failure state.) Users feel immediate.
- **Skeleton screens**: Structural layout with placeholder content while data loads.
  Better than spinners — users see what's coming and feel progress.
- **Progress bars**: Even inaccurate progress bars significantly reduce abandonment.
  The bar communicates "something is happening; you will not wait forever."
- **Purposeful delay**: For operations that actually take zero time, adding a small artificial
  delay ("analyzing your profile...") can increase perceived quality and trust.
  Users associate instant results with insufficient effort.
- **Background loading**: Start loading likely next content before user requests it.

**Feedback design**:
- Every user action must produce visible feedback within 400ms
- If an action will take >400ms, acknowledge it immediately AND show progress
- Background processes complete silently; notify only on completion or error
- Avoid progress spinners on operations that should be fast — they signal slowness

---

## Law 11: Applying Laws Together

Laws interact and occasionally create tensions that require judgment:

**Common combinations**:
- *Form design*: Hick's (reduce fields) + Miller's (group fields) + Fitts's (large submit)
  + Postel's (accept any format) + Peak-End (celebrate completion)
- *Navigation*: Jakob's (familiar patterns) + Miller's (group sections) + Fitts's (accessible targets) + Hick's (clear vocabulary)
- *Error design*: Peak-End (errors are negative peaks) + Postel's (tolerate user input variance)
  + Norman's error framework + Doherty (fast error feedback <400ms)

**When laws conflict**:
- Hick's says reduce choices; Tesler's says don't hide necessary complexity
  → Resolution: reduce *extraneous* choices; expose necessary control clearly
- Jakob's says follow conventions; but conventions change
  → Resolution: follow current conventions while conventions are stable; update when
  a new convention has become dominant (>60-70% of similar products)
- Fitts's says larger targets; Von Restorff says use visual hierarchy
  → Resolution: size targets for acquisition, use color/contrast for hierarchy — they
  serve different functions

---

## Chapter 11: Applying Laws Operationally in Teams

**Building awareness**: The first step is making psychological principles visible in the
working environment. Teams that regularly discuss these principles develop shared vocabulary
and consistent decision-making standards.

**Design principles derived from laws**: Rather than applying laws in isolation, teams can
derive product-specific design principles from them. Format: "[principle statement] because
[psychological basis]." These become decision frameworks for the team.

Example: "We always show a progress indicator for operations taking >400ms [Doherty Threshold]
because users interpret silence as failure."

**Show-and-tell culture**: Regular knowledge-sharing sessions where team members present
examples of laws in action (or violation) from products they use. Creates collective learning
without top-down mandates. Low cost, high retention.

**Design reviews grounded in laws**: Instead of "I think the button should be bigger," say
"This button's target size is 30×30px, which violates Fitts's Law minimums for touch targets
— users with larger fingers or reduced dexterity will mis-tap consistently."

---

## Chapter 12: Ethics — With Power Comes Responsibility

### How Technology Shapes Behavior

**Operant conditioning** (B.F. Skinner): Behavior can be shaped through reinforcement.
Continuous reinforcement (reward every time) → behavior stops when reward stops.
Too-infrequent reinforcement → behavior extinguishes. *Variable interval reinforcement*
(random reward timing) → the most persistent, compulsive behavior. Slot machines are
the deliberately optimized application of this.

**Digital mechanisms that leverage operant conditioning**:

*Intermittent variable rewards*: Pull-to-refresh, social media notification checks,
infinite scrolling feeds — all function as slot machines. The variable "reward" (new
content, social validation, interesting post) keeps users returning compulsively.

*Infinite loops*: Autoplay videos, infinite scroll, continuous feeds remove the natural
stopping points that allow users to make deliberate decisions about continued use.
Their purpose is to maximize time-on-site by eliminating the friction of choices.

*Social affirmation*: "Likes," comments, follower counts deliver dopamine hits of social
validation. The social affirmation delivers a reward that motivates continued posting
and checking — building habits that serve platform engagement metrics, not user wellbeing.

*Personalization loops*: Machine learning algorithms collect interaction data → improve
recommendations → increase relevance → increase time on platform → collect more data.
The optimization target (engagement) is not aligned with user wellbeing.

*Default settings as choice architecture*: Default options have extraordinary power —
most users never change them. Research found Facebook's default privacy settings matched
user expectations only 37% of the time. Defaults can exert powerful influence without
users being aware of what's being decided for them.

*Reciprocity exploitation*: LinkedIn connection requests exploit the human impulse to
reciprocate social gestures — creating a social obligation loop that serves platform
engagement metrics.

*Dark patterns* (2019 Princeton/Chicago study of 11,000 shopping sites):
Found 1,818 instances of dark patterns; more popular sites were MORE likely to use them.
- Confirmshaming: "No thanks, I don't want to save money"
- Hidden unsubscribe flows (deliberately obstructed)
- Pre-checked consent checkboxes
- Misdirection: calling ads "recommendations"
- Bait-and-switch pricing (reveal true cost at checkout)
- Forced continuity (free trial → paid without clear notice)
- Roach motel (easy to subscribe, nearly impossible to cancel)
- Trick questions (confusing double-negative opt-outs)

### Why Ethics Matter

**Good intentions, unintended consequences**: Facebook's "like" button (2009) was not
designed to be addictive, to shape body image, or to drive adolescent depression.
Instagram's filters were not designed to drive cosmetic surgery decisions. The harms
were not intended — but they are real, documented, and the responsibility of those who
built the products.

**The ethical imperative**: When did "daily active users" become more meaningful than
"did this product help users achieve their goals?" The commercial imperatives of
technology companies (maximize engagement, extract data, increase monetization) are
structurally misaligned with human objectives (accomplish a task, stay connected, feel
well). Designers are positioned as a conduit between these misaligned interests. That
makes ethics a professional obligation, not an option.

**The designer's accountability**: Psychology in design is powerful. Using it to serve
users is design. Using it to exploit users is manipulation. The difference is intent
and outcome: does the design serve the user's goals, or does it circumvent the user's
interests in service of the company's metrics?

### Ethical Design Framework

**Think beyond the happy path**: Most design focuses on the idealized user doing the
idealized task. Edge cases — the vulnerable user, the coerced user, the confused user,
the user in crisis — must be considered from the beginning. Failures to do so are not
just design oversights; they become product harms at scale.

**Diversify teams and thinking**: Homogeneous teams have systematic blind spots outside
their shared experience. Teams with different genders, races, ages, and backgrounds catch
more problems before deployment. Design for the broadest range of users, not just the
"average user" who actually represents no one.

**Look beyond engagement data**: Quantitative data tells you *what* users do, not *why*,
and not *how the product is affecting their lives*. Talk to users. Qualitative research
tells you things engagement dashboards never will.

**Embrace friction intentionally**: The elimination of all friction is not good design.
Friction can prevent abuse, protect privacy, steer users toward healthier habits, encourage
consideration of consequences. "Should I post this?" is a useful friction point.
"Are you sure you want to delete your account?" is a useful friction point.
"Are you sure you want to submit this form?" is not.

**Slow down**: "Move fast and break things" is no longer acceptable in an era when
technology affects billions of lives at scale. Slow, intentional design that considers
consequences is the ethical standard.
