# Progressive Disclosure & Onboarding UX Reference
## Sources: Cooper (About Face), Norman (DOET), Krug (DMMT), Yablonski (Laws of UX)

---

## Progressive Disclosure

Progressive disclosure is the design practice of revealing information and functionality
incrementally — showing only what is necessary at each stage of an interaction, and making
additional depth available when and where users need it.

It is one of the most fundamental techniques in interaction design because it directly
addresses the core tension between completeness (showing everything) and simplicity
(overwhelming no one).

### The Core Principle

**At any moment, show only what the user needs for the task at hand. Make additional depth
available, but don't require users to encounter it.**

This is distinct from hiding features — progressive disclosure means *staging* the
encounter with features in time or space based on user need, not permanently concealing them.

---

## Three Forms of Progressive Disclosure

### 1. Spatial Progressive Disclosure

Reveal additional content or controls in the same space, triggered by user action.

**Examples**:
- Accordion panels (click to expand)
- "See more" / "Show less" toggles
- Inline detail expansion in a list
- Tooltip or popover with additional context
- Expanding form sections

**When to use**: When additional information is supplementary — useful to some users at
some times but not to all users always. When showing everything at once would create
cognitive overload or visual noise.

**Design rules**:
- Collapsed content must be clearly signaled (chevron, +, "read more" — but never mystery
  about whether more exists)
- Expanded content must visually relate to the trigger (spatial proximity, animation direction)
- Collapsing should return to the exact prior state (accordion panels that forget state on
  navigation are disorienting)
- Default states should reflect the most common user need (if 80% of users need detail,
  default to expanded)

### 2. Sequential Progressive Disclosure

Reveal additional steps or information in a sequence — show step 2 only after step 1 is
complete. Multi-step forms, wizards, guided setup flows.

**Examples**:
- Multi-step checkout flows
- Account setup wizards
- Complex form sequences
- Tutorial-based onboarding
- Progressive data entry (enter address → verify → confirm)

**When to use**: When decisions in step 1 determine the content of step 2 (can't show
payment options before knowing shipping country); when showing all steps simultaneously
is overwhelming; when the user needs to complete a task but doesn't know the full scope upfront.

**The key insight** (Hick's Law): Sequential disclosure reduces decision load at each
step. Choosing one thing, then choosing a second thing given the first choice, is
cognitively easier than simultaneously evaluating all combinations.

**Design rules**:
- Always show progress: "Step 2 of 4" or a visual progress indicator
- Allow going back without losing data already entered
- Don't split logically related information across steps arbitrarily
- The number of steps must be warranted — each additional step adds abandonment risk
- On the final step, summarize key choices made (especially for reversible commitments)

**The "one thing per screen" mobile pattern**: On mobile, even a single decision or input
group per screen can be appropriate — Fitts's Law + small screen = high value of focus.

### 3. Conditional Progressive Disclosure

Show additional fields, options, or information only when specific conditions are met by
earlier choices.

**Examples**:
- Shipping form: show "apartment number" only when address type = apartment
- Settings panel: show advanced options only when "advanced mode" is toggled
- Form validation: show helpful guidance only when user's input is ambiguous
- Contextual help: show tooltip only when a field receives focus

**When to use**: When content is only relevant for a subset of users, roles, or conditions.
When revealing it unconditionally would confuse users for whom it doesn't apply.

**Design rules**:
- Conditional content must appear adjacent to the trigger (not in a different section)
- The transition must be clear — appearing content should be visually distinct from static content
- Never conditionally hide required fields (users must be able to anticipate what's needed)
- Test with users whether they understand why new content appears

---

## Progressive Disclosure and Cooper's Perpetual Intermediates

Cooper's "perpetual intermediates" principle directly supports progressive disclosure:
- **Beginners** need guidance, labels, and explanations surfaced by default
- **Experts** need power, shortcuts, and control accessed progressively
- **Intermediates** (the vast majority) need efficient access to common functions with
  complexity available but not forced

**The training wheels problem**: Permanently surfacing all beginner guidance ("don't weld
on training wheels") makes intermediates wade through it forever. Progressive disclosure
solves this: surface guidance initially, allow users to dismiss or collapse it, and trust
that once-familiar patterns don't need re-explanation.

**Cooper's command modalities** are a temporal form of progressive disclosure:
- Menus (pedagogic modality): always visible, verbose, teaches through inspection
- Toolbar buttons (immediate modality): visible, brief, requires recognition
- Keyboard shortcuts (invisible modality): not visible, requires memory

The progression from menus → toolbar → shortcuts is progressive disclosure across time
and expertise level. Good products support all three paths.

---

## Progressive Disclosure and Norman's Knowledge Framework

Norman's knowledge-in-world vs. knowledge-in-head distinction maps directly to progressive disclosure:

- Information in the world (always visible) → reduces knowledge-in-head requirements → good for beginners
- Information revealed on demand (progressive disclosure) → users access when needed → good for intermediates
- Information invisible / memorized (keyboard shortcuts, advanced settings) → pure knowledge-in-head → good for experts

The skill in progressive disclosure design: calibrate which information belongs at each
level of visibility for each user type.

---

## Onboarding UX

Onboarding is the designed experience of a user's first encounter with a product. It is
the highest-stakes UX moment for two reasons:

1. **Peak-End Rule** (Yablonski): First use is often the emotional peak. The memory of the
   first experience disproportionately shapes the user's ongoing relationship with the product.

2. **Abandonment risk**: Users who don't find value or can't figure out a product in their
   first session rarely return. The window to demonstrate value is narrow.

---

## Onboarding Goals

Good onboarding must accomplish three things simultaneously:

1. **Get users to first value as fast as possible**: The moment a user first achieves their
   goal with the product (sent first message, created first document, made first purchase)
   is the foundation of retention. Everything in onboarding should serve this goal.

2. **Build correct mental models**: Users must understand *how* the product works
   well enough to use it confidently. Wrong mental models at this stage compound over time
   (Norman: mistakes from wrong models compound, unlike slips).

3. **Create a positive narrative** (Norman's reflective level): Users should finish
   onboarding feeling competent and in control, not overwhelmed or confused.

---

## Onboarding Patterns

### 1. Blank Slate / Empty State

The first screen a new user sees when they've created an account but haven't yet created
any content. This is a critical peak moment (Peak-End Rule) that most products handle poorly.

**Wrong approach**: Show an empty grid with a generic message ("No items found" or "Get started").
This communicates emptiness and absence — nothing to motivate action.

**Right approach**: The blank slate should show potential, not absence:
- Illustrate what the screen will look like when populated
- Surface the primary action clearly ("Create your first project")
- Give a concrete, motivating example of what the product can do
- Make the path from "nothing" to "first value" require only one or two steps

**Empty state copy principles**: Avoid negative language ("no results"). Use active,
forward-looking framing ("Create your first [X]", "You're ready to [goal]"). If relevant,
show what successful users do here (social proof at zero state).

### 2. Product Tours and Guided Onboarding

**When appropriate**: Complex products where a novice genuinely can't figure out key features
without guidance. B2B tools where the wrong first impression has high cost. Products where
a specific flow must be completed before value is delivered (account setup, profile completion).

**When NOT appropriate**: Simple consumer products where exploration is the natural path.
Products where tours interrupt a user who arrived with a specific task already in mind.

**The forced tour problem** (Krug, Cooper): Tours that prevent users from proceeding until
completed create resentment. Users click through as fast as possible without absorbing the content.
A tour that can be dismissed is more engaging than one that cannot — paradoxically.

**Better alternatives to tours**:
- *Contextual tooltips*: Appear when a user first encounters a feature, not at product launch
- *Progressive onboarding checklists*: "Complete your profile → Do your first X → Connect your Y"
  — gives users agency and a satisfying completion mechanic
- *Empty state guidance*: Built directly into the zero-data experience (see above)
- *Feature discovery*: Reveal capabilities as users demonstrate readiness through behavior

### 3. Progressive Onboarding Checklists

A persistent checklist (often in a sidebar or dashboard) showing key setup tasks. Each task
completed unlocks something or moves the user toward first value.

**Why it works**:
- Zeigarnik effect: unfinished tasks persist in memory; completed items provide closure
- Users can self-pace — do one task now, another tomorrow
- Provides orientation about what capabilities the product has
- Creates a positive completeness narrative ("I've done 4 of 6")

**Design rules**:
- Maximum 6-8 items (Miller's Law — don't overwhelm)
- Each item should take <5 minutes
- Mark completed items visually with checkmarks (not just greyed-out — celebrate completion)
- Provide a way to dismiss the checklist once it's no longer needed
- First 2 items should be achievable in under 2 minutes (early wins build momentum)

### 4. Contextual Onboarding ("First Use")

Show guidance only when a user first encounters a specific feature, at the moment they're
about to need it.

**Advantages over tours**:
- Information is shown in the right context (knowledge in the world, not upfront lecture)
- Respects users who arrive knowing what they want
- Scales to complex products — each feature teaches itself when first encountered

**Implementation patterns**:
- Spotlight / coach marks: visual overlay highlighting a specific element with explanation
- Inline empty states with guidance baked in
- Tooltip that appears on first focus of a complex field
- "First time in this section" banner that dismisses after reading

**The dismissal rule**: Every contextual guidance element must be dismissable. Users who
already know should be able to clear it immediately. Users who want to keep it should
be able to revisit it (Help or "reset tips" option).

### 5. Progressive Feature Revelation

Rather than showing all features at once, reveal features as users demonstrate readiness.

**Examples**:
- Email client: show basic send/receive first → reveal folders/labels after first 10 emails
- Design tool: show basic shapes first → reveal advanced export options after first file save
- Analytics platform: show basic dashboard first → unlock custom reports after first 7-day use

**The engagement signal**: User activity indicates readiness. A user who has sent 10 emails
is ready to learn about filters. A user who has created 5 projects is ready to learn about
templates.

**Warning**: Progressive revelation can frustrate users who arrived with a specific advanced
use case in mind. Always provide a way to access "all features" or "advanced options" for
users who already know what they need.

---

## Onboarding Copy Principles (Microcopy)

**Voice**: First onboarding experience should be warm, conversational, and encouraging.
Not corporate ("Congratulations on your new account"). Not clinical ("Account created").

**Length**: Short. Users skim during onboarding even more than during regular use. One
sentence per tooltip. Two sentences max for empty state guidance. Four sentences max for
a feature description.

**Focus on outcomes, not features**: "See who's reading your messages" not "Read receipts
are now enabled." "Find your documents faster" not "Advanced search is available."

**Norman's positive feedback principle**: Onboarding is the highest-leverage opportunity
to provide positive feedback. When users complete steps, celebrate the action clearly.
"Great — your profile is complete!" is more effective than "Step completed."

**Error prevention over error correction**: During onboarding, design so users can't fail.
Use progressive disclosure to prevent showing fields the user doesn't need yet. Use defaults
that are correct for most users. Save error handling for the post-onboarding experience.

---

## Onboarding Anti-Patterns

**The registration wall**: Requiring full account creation before showing product value.
Let users explore the product before asking for commitment. If registration is required,
make it the minimum possible (email + password, or OAuth).

**The 12-step wizard**: Breaking onboarding into so many steps that users abandon before
completing. Each step has an abandonment rate. Keep the critical path to value under 3 steps.

**The "watch this video" approach**: Embedding a 3-minute product tour video as primary onboarding.
Few users watch videos to completion. Those who do don't remember by the time they need to act.

**Hiding the product**: Making users complete all setup before seeing the actual product.
Show the product as early as possible, even if partially populated with sample data.

**Over-explaining basics**: Tutorials that explain things users already know (how to click,
what a dropdown is). Wastes time and patronizes users. Explain only what's genuinely novel
about *this* product's interaction model.

**Asking for data before giving value**: "Tell us about your company before getting started."
If data collection is genuinely necessary, time it as a second step after first value delivery.

---

## Measuring Onboarding

Key metrics (in order of causation):

1. **Time to first value (TTFV)**: How long from account creation to first successful use
   of the primary feature? Shorter TTFV correlates strongly with retention.

2. **Activation rate**: What % of new users reach "first value"? Users who don't activate
   typically churn within days.

3. **Onboarding completion rate**: If using a guided flow, what % complete it?
   Below 60% suggests the flow has friction or isn't valuable enough to complete.

4. **Day 7 / Day 30 retention**: Did users who completed onboarding return? This measures
   whether onboarding created genuine product habit, not just initial use.

5. **Support contacts during onboarding**: Users who contact support during onboarding
   are failing at a specific step. Volume and topic reveal the highest-priority fixes.
