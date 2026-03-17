# Usability Testing Reference
## Source: Krug (Don't Make Me Think, Rocket Surgery Made Easy), Cooper, Norman

---

## The Core Principles

**Testing one user is 100% better than testing none.**
**Testing one user early is better than testing 50 near launch.**
**You can find more problems in half a day than you can fix in a month.**

Usability testing is *qualitative*, not *quantitative*. Its purpose is not to prove that
a design works — it is to *improve* the design by finding what doesn't work. Small samples
(3 users) reveal the most critical problems. Statistical significance is not the goal.

**The designer's blind spot**: After working on a site for even a few weeks, you can no
longer see it freshly. You know too much. You can't perceive the gap between what you
intend and what users experience. Testing is the only cure for this blindness.

---

## Focus Groups vs. Usability Tests — Critical Distinction

| | Focus Groups | Usability Tests |
|---|---|---|
| **Format** | 5-10 people discussing products | 1 person at a time using a product |
| **Data type** | Stated opinions and attitudes | Observed behavior |
| **What it reveals** | What people *say* they want | What people *actually do* |
| **Question answered** | "Is this the right product to build?" | "Does this product actually work?" |
| **When to use** | Planning phase, before design starts | Throughout development |
| **Why it fails for UX** | People can't accurately report their own behavior | — |

**The critical failure mode of focus groups**: People's stated behavior and actual behavior
diverge constantly. In focus groups, people describe how they *think* they would use
something, in a social context that encourages reasonable-sounding answers. This produces
data that feels valid but consistently misleads design decisions.

**Focus groups are best for**:
- Testing whether the basic concept makes sense
- Understanding the vocabulary users use for the problem domain
- Identifying what users currently do to solve the problem
- Gauging reactions to broad positioning and value propositions

**Usability tests are best for**:
- Finding where users get confused, stuck, or make errors
- Understanding what users actually try to do (vs. what you designed for)
- Determining if specific UI elements communicate their purpose
- Validating that a redesign improved the experience

---

## When and How Often to Test

### Krug's Recommended Cadence

**One morning per month, three participants per session.**

This schedule is deliberately minimal. The point is that it's simple enough to actually
sustain. Testing that requires too much effort will be skipped when projects get busy —
which is when testing is most needed.

**Fixed day scheduling**: Choose a fixed day each month ("third Thursday") rather than
tying testing to milestones. Milestones slip; a fixed monthly appointment doesn't.
There will always be something worth testing.

**The morning structure**:
- 3 sessions back-to-back in the morning
- Brief lunch debriefing with the full team
- Commit to specific fixes before leaving
- Done for the month

### Testing at Different Stages

**Pre-design (competitive testing)**: Test 2-3 competitive or comparable products with
3 participants. Learn what works and what doesn't before building anything. The cheapest
testing there is.

**Concept/sketch testing**: Show rough sketches or clickable mockups. Ask: "What do you
think this is?" and "What would you try to do here?" No working functionality required.

**Prototype testing**: Test the interaction structure before visual design is locked.
Problems found in wireframes cost a fraction of problems found after development.

**Pre-launch testing**: The standard "last minute" testing. Valuable, but by this point
many problems are expensive to fix. Only useful if you have time to actually act on findings.

**Ongoing/post-launch testing**: Test the live product with new users and returning users.
Track whether fixes improved things. Identify new problems emerging from real usage.

**The core principle**: Start testing as early as possible. Every iteration of testing
that happens before a decision is locked in saves exponentially more time than testing
that happens after.

---

## Participant Selection

### Recruit Loosely, Grade on a Curve

You don't need exact-match users for most issues. Bad usability affects almost anyone.
Loosen participant requirements; when you observe a problem, ask: "Would our real users
have this problem, or was it specific to this participant's knowledge gap?"

**The domain knowledge exception**: If your product requires specific domain knowledge
(e.g., financial software for CPAs), include participants with that knowledge — but
not all participants need to be experts. Many fundamental usability problems affect
anyone.

**Why non-target users are valuable**:
- They reveal problems with baseline clarity that domain experts overlook
- They find confusing vocabulary that experts have simply learned to decode
- Experts are rarely insulted by designs that are also clear to beginners

**Recruiting sources**:
- Craigslist or TaskRabbit-style platforms
- User forums related to your product category
- Customer lists (with appropriate permissions)
- Professional communities for target demographics
- Hall testing (intercepting people in a relevant physical location)
- Pop-up invitations on the actual product
- Friends of friends (not friends — they're too accommodating)

**Incentives**: $50-$100 for typical users; $100-$300 for hard-to-recruit professionals
(doctors, lawyers, executives). Pay more than the going rate — it signals that you value
their time and reduces no-shows. Remember they travel to your location — budget for their
time, not just session time.

### How Many Participants

**Per round**: 3 participants (Krug's recommendation for ongoing do-it-yourself testing)

Why 3 is enough:
- The goal is to improve, not prove — qualitative method, not statistical
- 3 participants will encounter most of the critical usability problems for the tested tasks
- You'll always find more problems than you can fix in a month
- You're doing another round next month — better to test 3 often than 10 rarely

**For specific research goals** (not ongoing testing):
- Comparative studies (A/B): 5+ per variant
- Accessibility testing: recruit specifically for disability type; 3-5 per impairment
- Quantitative performance benchmarks: 10-20 participants, rigorous protocol

---

## Setup and Logistics

### Minimum Requirements

- Quiet room, no interruptions
- Computer or device with product loaded
- Screen recording software (Camtasia, OBS, QuickTime)
- Screen sharing software for remote observation (Zoom, Meet)
- Observation space with large screen where team watches live

**The observation imperative**: Getting your team, stakeholders, managers, and executives
to watch usability tests is one of the highest-value things you can do. The experience
of watching a real user struggle with something you designed is transformative in a way
that no presentation of findings ever is.

Bring good food to the observation room. Seriously. It's one of the most effective ways
to increase attendance.

### Remote Testing Setup

**Moderated remote testing**: Participant at home/office; facilitator remote; screen sharing.
- Dramatically expands recruiting geography
- Eliminates travel burden for participants
- Slight loss of nonverbal observation (compensated by participant comfort)
- Works well for most consumer and professional products

**Unmoderated remote testing** (UserTesting.com, Maze, etc.):
- Participants self-facilitate; no real-time interaction
- Results within hours; inexpensive at scale
- Good for: initial validation, specific feature tests, obvious problem scanning
- Not good for: nuanced investigation, complex multi-step tasks, asking "why"

### Mobile Testing Logistics

Special challenge: standard screen sharing doesn't show touch gestures.

**Best approach**: Mount a lightweight camera to the device, pointed at the screen.
This captures both screen content and the user's finger position/gestures.

The participant can hold the device naturally. The camera travels with the device.
Much more informative than mirroring, which shows the screen but hides the gestures.

**Document cameras**: Overhead cameras pointed at a table work but restrict natural device
holding. Trade-off between naturalness and image stability.

---

## Running the Session

### Session Structure (1 hour)

**Welcome and orientation (4 minutes)**

Read the introduction to ensure consistency across sessions. Key messages to deliver:
- "We're testing the site, not testing you — you cannot do anything wrong here"
- "We want to hear exactly what you think — it won't hurt our feelings"
- "I'll ask you to think out loud — tell me everything going through your mind"
- "I may not answer your questions during the test, but I will at the end"
- Request permission to record; explain who will see the recording

**Background questions (2 minutes)**

Put the participant at ease. Understand their context:
- What do they do? What's their daily work environment?
- How often do they use [relevant type of product]?
- Can they walk you through a recent time they [did the relevant task]?

These answers help you interpret what you'll observe. They also give you a baseline for
"would our actual users have this knowledge?"

**Home page / landing screen tour (3 minutes)**

"I'm going to ask you to look at this page and tell me what you make of it — what strikes you,
what you think this site is, what you could do here. Just look around and narrate. You can
scroll but please don't click on anything yet."

Watch what they notice and what they ignore. Note anything they misunderstand or misinterpret.
The gap between what you think the page communicates and what they receive is your first finding.

**Tasks (35 minutes)**

The heart of the session. Give realistic tasks with realistic context.

**Writing good tasks**:
- Use realistic context that could actually happen ("You just moved to Seattle and need a dentist")
- Allow participants to use their own content where possible ("Find something you'd actually buy")
- Never use words from the interface in the task description (you'd be cuing them)
- Word for ambiguity: "Would you use this site to find..." not "Use the Search feature to find..."
- Include exactly the information they'd have (login credentials if needed; relevant IDs)

**Poor task**: "Search for a dentist using the Provider Search feature."
**Good task**: "You just moved to Seattle and need a dentist who accepts your insurance.
Use this site to find some options."

**Facilitator behavior during tasks**:
- Be silent as much as possible
- When they stop speaking: "What are you thinking right now?"
- When they ask for help: "What would you do if I wasn't here?"
- When they succeed: Neutral acknowledgment only. Never "Good job!" — they'll wonder if wrong answers get "Bad job"
- When they do something unexpected: Let them continue. Don't redirect.
- When they're obviously wrong: Still don't correct. Your job is to observe, not instruct.
- When they're genuinely stuck: Let them struggle longer than feels comfortable to you.
  The struggle is the data.

**Think-aloud protocol**: Encourage continuous narration:
"Tell me everything that's going through your mind. What you're looking at, what you're thinking,
what you're confused by, what you're expecting to happen."

**Probing questions (5 minutes)**

After tasks, ask about anything that puzzled you:
- "I noticed you hesitated at [X]. What were you thinking?"
- "Earlier you clicked on [Y]. What were you expecting to happen?"
- "Is there anything you were looking for that you didn't find?"
- For observers' questions: "The team in the other room asked me to ask you..."

**Wrap-up (5 minutes)**

Open-ended overall impressions. Thank them and pay them.
Now they can ask questions, and now you can answer them.

---

## The Think-Aloud Protocol — Full Detail

Think-aloud is the primary mechanism for understanding not just *what* users do but *why*.
Without narration, you see behavior without interpretation. With narration, you understand
the mental model behind the behavior.

**Coaching think-aloud**: "As you work through this, I want you to narrate everything.
Tell me what you're looking at, what you're thinking about, what you're trying to do,
what's confusing you. There are no right or wrong observations — I just want to hear
your thought process."

**When they go silent**: Simply ask "What are you thinking?" (not leading; not pressuring)
**When they explain themselves**: "I understand. Just keep going — tell me what you're doing."
**When they make a mistake**: Don't react. Don't wince. Don't sigh. Neutral face at all times.
**When they ask "Is this right?"**: "What do you think?" or "What would you expect?"

**The most revealing moments**: Long pauses, re-reads, backtracking, clicking Back, and
expressions of uncertainty ("I'm not sure if...") are all gold. These are the exact points
where the design has failed to communicate what you designed.

---

## Debriefing — Deciding What to Fix

**Immediately after the last session**, while everything is fresh. Order good food.

### Step 1: Individual capture (before discussion)

Each observer writes their 3 most serious problems observed. This must happen *before*
group discussion to prevent anchor bias (the first person who speaks heavily influences
what others "remember").

### Step 2: Collective list

Go around the room. Each person names one problem. Facilitator records on whiteboard.
Continue until all problems are represented. Track duplicates with checkmarks.

**Critical rule**: Only observed problems count. Not "I think users would probably..."
or "I've always thought we should..." — only things that *actually happened* during
the sessions.

### Step 3: Prioritize ruthlessly

**FOCUS RUTHLESSLY ON FIXING THE MOST SERIOUS PROBLEMS FIRST.**

Rate each problem:
- **Critical**: Blocks task completion, causes wrong outcomes, destroys trust
- **Serious**: Significant confusion, errors, or extra time
- **Minor**: Slight confusion, small friction

The temptation is to fix many minor problems instead of one critical one.
Resist this. A single critical fix is worth more than ten minor improvements.

### Step 4: Commit to specific fixes

Before leaving: for each critical/serious problem, agree on:
- Exactly what change will be made
- Who owns it
- What "done" looks like

"We'll think about it" is not a fix. "Marcus will redesign the checkout flow to remove
the account creation step before the purchase completes" is a fix.

**The low-hanging fruit list**: Keep a separate list of problems that are both minor AND
fast to fix (one person, under an hour, no sign-off needed). Fix these as background
work, not as the primary outcome of the session.

### When to Stop Fixing

When you've allocated all the time and resources available before the next testing session.
More problems will emerge in the next round — you're not trying to achieve perfect; you're
trying to achieve better.

---

## Common Problems — Taxonomy and Fixes

### Category 1: Users Are Unclear on the Concept

**Symptoms**: Users can't answer "what is this site/app for?" They form wrong mental models
from the landing page and persist with those models. They try to do the wrong thing entirely.

**Root cause**: The system image fails to project an accurate conceptual model. Value
proposition isn't clear. Vocabulary doesn't match users' mental model.

**Fixes**:
- Improve tagline and welcome blurb on the landing page
- Clarify the primary value proposition in the first viewport
- Test your home page specifically: "What do you think this site is for?"
- Simplify the primary navigation vocabulary to match user language

### Category 2: The Words They're Looking For Aren't There

**Symptoms**: Users scan the page, don't see what they want, conclude it doesn't exist —
even when it's present under a different name. They search for terms that don't appear
anywhere in the interface.

**Root cause**: Vocabulary mismatch. The design uses internal/organizational/technical
terminology; users use their own vocabulary for the same concepts.

**Fixes**:
- Conduct vocabulary research: what words do users use for this concept?
- Add alternative vocabulary as secondary labels or search synonyms
- Update primary navigation labels to match user vocabulary
- Test specific vocabulary choices: "When you want to [task], what would you look for?"

### Category 3: There's Too Much Going On

**Symptoms**: The element they need is present on the page, but they don't see it. They
scroll past the correct link. They notice things you didn't intend them to notice first.

**Root cause**: Poor visual hierarchy. Insufficient signal-to-noise ratio. The important
elements don't stand out from the surrounding clutter.

**Fixes**:
- Reduce visual noise overall (remove elements not earning their space)
- Increase visual prominence of critical elements (size, contrast, white space)
- Improve visual hierarchy so important = prominent
- Apply Von Restorff: make important elements distinctively different

### Category 4: The Path Is Unclear

**Symptoms**: Users hesitate at decision points. They choose the wrong option and don't
realize it until several steps later. They use the Back button repeatedly. They ask
"what's the difference between these?"

**Root cause**: Ambiguous options, insufficient scent of information, unclear affordances.

**Fixes**:
- Clarify the vocabulary and scope of each option
- Improve the scent of information (do the link labels match what's on the destination page?)
- Reduce the number of options (Hick's Law)
- Add brief descriptions to help users distinguish similar options

### Category 5: Something Easy Seems Hard

**Symptoms**: Users struggle with a task that seems simple to the design team. They
complete it through a longer path than expected. They express frustration.

**Root cause**: Mismatch between user mental model and design model. What feels "obvious"
to the team was only obvious because they built it.

**Fixes**:
- Redesign to match the user's mental model, not the implementation model
- Or: communicate the conceptual model more effectively through signifiers and feedback
- The fix is in the design, not in better documentation

---

## Testing Anti-Patterns to Avoid

**Testing too late**: After the build is locked in, critical fixes are expensive and
politically difficult. "We'll test when the beta is ready" = testing when it's too late
to matter.

**Testing to validate rather than improve**: If you approach testing looking for evidence
that your design works, you'll interpret ambiguous observations as validation. Approach
testing as learning, not confirmation.

**Fixing symptoms**: "Let's add instructions" is almost never the right fix for confusion.
Instructions won't be read. Redesign to eliminate the confusion.

**Testing everything at once**: With 35 minutes of tasks, you can cover 3-5 scenarios.
Choose the highest-risk areas — the new features, the complex flows, the things the team
disagrees about. Don't try to test the entire product.

**Treating participant feature requests as requirements**: Participants say "I wish it
could do X" when they mean "I struggled with X." Ask them to describe how X would work
— it almost always leads to "actually, I probably wouldn't use that." Design problems
generate feature requests that don't solve the real problem.

**Ignoring "kayak" problems**: Sometimes users go briefly astray but self-correct quickly
without frustration. These are not serious problems. An interface where users' second
guess is always right is good enough. Fix problems that leave users stuck or frustrated —
not every momentary confusion.

**Inviting defensive stakeholders**: If a senior stakeholder will dismiss every finding
that threatens their work, don't invite them until the team has established a testing
culture. Start with safety — invite people who are ready to learn.

---

## Writing a Usability Test Plan

For formal testing documentation, a test plan should cover:

**1. Test objectives**: What specific questions are you trying to answer?
"Does the new checkout flow reduce errors compared to the old one?"
"Can users find X without using search?"

**2. Participant criteria**: Who you'll test with and why.
Include recruiting screener questions if needed.

**3. Tasks to test**: The exact wording of each task scenario.
Include the logic for why each task was chosen (what risk or question it addresses).

**4. Success criteria**: How you'll know if a task succeeded.
"User reaches order confirmation page without encountering an error" vs. subjective judgment.

**5. Protocol notes**: Any special facilitator instructions.
"Do not help users with the login step even if they ask."

**6. Observer roles**: Who attends; what each observer is noting.

**7. Analysis plan**: How findings will be synthesized and presented.
Typically: a ranked list of problems with severity ratings and recommended fixes.

---

## A Note on Accessibility Testing

Standard usability testing reveals problems for the majority of users. Accessibility
testing is a separate but complementary practice.

**Screen reader testing**: Find 1-2 blind users who use screen readers daily. Observe
them navigating your product. The most valuable resource: Theofanos & Redish's
"Guidelines for Accessible and Usable Web Sites: Observing Users Who Work with Screen
Readers" — 20 minutes of reading that produces more accessibility insight than any
guidelines checklist.

**Key insight**: Screen reader users scan with their ears exactly as sighted users scan
with their eyes. They don't listen to every word — they jump to headings, skim link text,
skip regions. This means: link text must be meaningful in isolation; headings must
accurately describe their section; skip navigation links are essential.

**Motor impairment testing**: Test with keyboard-only navigation. Test with switch access
for severe motor impairments. Any product that requires precise mouse targeting is
inaccessible to many users.

**Cognitive accessibility**: The simplest accessibility improvement is clarity. A page
that confuses users without disabilities will be catastrophic for users with cognitive
disabilities, reading difficulties, or limited domain knowledge.
