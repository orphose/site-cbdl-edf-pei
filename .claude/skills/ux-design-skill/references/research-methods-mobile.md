# UX Research Methods & Mobile Patterns Reference
## Sources: Cooper (About Face Ch.2, 19), Norman (DOET), Krug (DMMT)

---

# Part 1: UX Research Methods

## The Research Method Stack

Different methods answer different questions. No single method answers all questions.

| Method | Question answered | When to use |
|---|---|---|
| Contextual inquiry | What do users actually do? Why? | Early discovery, before design |
| Stakeholder interviews | What are the business constraints? | Project kickoff |
| Usability testing | Can users accomplish tasks with this design? | Throughout design |
| Card sorting | How do users mentally group content? | IA / navigation design |
| Tree testing | Can users navigate the proposed structure? | IA validation |
| A/B testing | Which of two versions performs better? | Post-launch optimization |
| Analytics | What are users actually doing at scale? | Ongoing, post-launch |
| Diary studies | How does use evolve over time? | Long-term behavior change |
| Surveys | What do users think / what attributes do they have? | Quantifying findings from qual research |
| Expert review | What usability heuristics does this violate? | Quick audit, any stage |

---

## Qualitative vs Quantitative Research

**Qualitative research** (interviews, observation, usability tests): Answers *what*, *how*, and *why*
in rich contextual detail. Small samples (5-15). Cannot be generalized statistically but reveals
*mechanisms* of behavior. 

**Quantitative research** (analytics, surveys, A/B tests): Answers *how much* and *how many*.
Large samples. Statistically generalizable. Tells you *what* users do in aggregate, but not *why*.

**Cooper's synthesis**: Quantitative data is essential for identifying *where* problems exist
(high abandonment, low conversion, error clusters). Qualitative research is essential for
understanding *why* those problems exist and what solutions would address them.

**The analytics-alone trap**: Analytics show that users abandon at step 3 of checkout.
They don't show whether it's because the form is confusing, the shipping cost is too high,
or the user just got distracted. Only qualitative research answers this.

---

## Contextual Inquiry

**What it is**: A structured field research technique combining observation and interview in
the user's natural environment. Based on Beyer & Holtzblatt's work.

**The master-apprentice model**: The researcher observes and questions as if the user is
a master craftsperson and the researcher is a new apprentice learning the craft. This model:
- Establishes the user as the expert (counteracts social desirability bias)
- Creates permission to ask "why" about things that seem obvious
- Produces rich, contextually grounded data

**Four principles** (Beyer & Holtzblatt):
1. *Context*: Conduct research in the actual environment, not a lab or conference room.
   The environment and its artifacts reveal behaviors and constraints that self-report misses.
2. *Partnership*: Collaborative exploration — observation and discussion alternating,
   not interrogation. The interviewer and user co-investigate together.
3. *Interpretation*: Reading between the lines. Users express problems through proposed solutions;
   the researcher's job is to identify the underlying problem.
4. *Focus*: Direct the interview without over-constraining it. Have design hypotheses to test,
   but stay open to what you don't know you don't know.

**Cooper's improvements on classical contextual inquiry**:
- Shorten sessions to 1 hour (not full-day). More diverse samples become feasible.
- Use small teams (2-3) who attend all interviews together. Better synthesis; no debrief
  bottleneck.
- Identify user *goals* first, then the tasks that serve those goals (not task-first)
- Applicable to consumer contexts, not just enterprise software

**Practical tips**:
- Interview in pairs: one leads, one takes notes/observes
- Ask "show me" not "tell me": "Can you show me how you normally do that?" beats
  "How do you normally do that?" — people demonstrate behaviors they can't accurately report
- Follow artifacts: When a user uses a sticky note, a spreadsheet, or a paper form as a
  workaround, that artifact reveals a product gap
- The unexpected is the goal: If the user does something you didn't anticipate, you've found
  the most valuable data of the session

---

## Stakeholder Interviews

Before user research, interview the people with authority and responsibility for the product.

**Why first**: Stakeholders establish the business context, constraints, and organizational
hypotheses that shape user research planning. Discovering after user research that a feature
the users want is technically impossible or organizationally prohibited wastes both.

**What to learn from stakeholders**:
- Their vision of what the product is and who it serves
- Budget and schedule constraints (what's actually buildable)
- Technical constraints and opportunities
- Business drivers (what the product needs to achieve to be considered successful)
- Their perceptions of users (often revealing and often wrong — important to capture early
  so you can test these assumptions with actual users)

**Interview each stakeholder separately**: One-on-one settings promote candor and reveal
the extent of shared vs. conflicting vision within the organization. Conflicting vision
among stakeholders is a yellow flag requiring resolution before design can proceed.

**Reading between the lines**: Stakeholders often propose solutions when they mean to
describe problems ("We need a dashboard" might mean "we don't have visibility into X").
Extract the underlying problem.

---

## A/B Testing

**What it is**: Splitting user traffic between two versions (A and B) of a design element
and measuring which version produces better outcomes on a defined metric.

**When A/B testing is valuable**:
- Post-launch optimization of high-traffic, measurable interactions
- Testing hypotheses generated by qualitative research
- Validating that a change improves performance before full rollout
- When sample sizes are large enough for statistical significance

**When A/B testing is misleading**:
- Early design stages (before a baseline is established)
- When you don't know *why* A beats B (can't iterate without understanding)
- When the tested metric is wrong (optimizing for clicks, not for user goals)
- When changes are too small to detect with available traffic

**The metric trap**: A/B tests optimize for the metric you define. If you optimize for
click-through rate on a CTA, you may find a design that gets more clicks but achieves
fewer completed goals. Define success metrics that align with user goals, not just engagement.

**Statistical significance is not practical significance**: A statistically significant
7% improvement in conversion on a 50-visitor/day product may not be worth implementing.
Significance tells you the effect is real; it doesn't tell you it's worth acting on.

**The winner problem**: A/B tests typically show one version "wins." But the test can only
compare the two options you created. Neither may be the best design. A/B testing finds the
better of two options, not the best possible option.

---

## Analytics as UX Research

Analytics answer "what are users doing?" at scale. They reveal behavioral patterns invisible
in small-sample qualitative research.

**What analytics reveal**:
- Where in flows users abandon (funnel analysis)
- Which pages receive traffic and which are ignored
- How long users spend on each page
- Which navigation paths users take
- Device, browser, and geography breakdowns
- Search queries (reveal vocabulary and intent)
- Error rates and error types

**What analytics don't reveal**:
- *Why* users behave this way
- Whether users are satisfied or frustrated
- What users were trying to accomplish
- What would have happened if the design had been different

**Analytics as diagnostic, not prescriptive**: High exit rate on a page tells you there's
a problem; it doesn't tell you what the problem is. Use analytics to identify where to
focus qualitative research, not to replace it.

**The search query goldmine**: Site search queries are rich UX data. They reveal:
- What users are looking for but can't find through navigation (IA failure)
- The vocabulary users use (labeling mismatches)
- Unanticipated use cases
- High-demand content not prominently featured

---

## Heuristic (Expert) Review

A structured evaluation of a design against established usability principles, conducted by
an expert without user participation.

**When valuable**: Quick early assessment before user testing; audit of existing product;
identifying obvious violations before investing in user research; budget-constrained projects.

**Nielsen's 10 Heuristics** (1994, still standard):
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

**Limitations**: Expert reviews find violations of principles but miss:
- User-specific mental model mismatches
- Vocabulary problems (the label may be grammatically clear but wrong for the audience)
- Task completion failures (can the *specific task* be completed in this context?)
- Context-specific problems (works fine on desktop, fails on mobile)

**Best use**: Heuristic review + usability testing = strong combined approach. Review first
to eliminate obvious problems before wasting participants' time on them.

---

# Part 2: Mobile Design Patterns (Cooper About Face Ch.19)

## Mobile Posture

Almost all mobile apps have **transient posture**: brief, intermittent, focused use.
The full-screen nature doesn't change this — transience is a behavioral characteristic
of the interaction, not the screen size.

**Exceptions**: Media production apps (audio/video editing), complex data analysis apps,
games — these may justify sovereign-like design with rich controls and dense layouts.

---

## Form Factors and Their Constraints

**Handheld (phone)**: Tall, narrow (typically 16:9), 4-6" diagonal. Used primarily in
portrait. Single-handed thumb operation is the default assumption. Controls must be
reachable by the thumb — the bottom third of the screen is the "hot zone."

**Tablet (full)**: 9-10" diagonal. More desktop-like. Portrait and landscape both common.
Two-handed operation typical. Adjacent panes (master-detail layout) feasible.

**Mini-tablet (7-8")**: Hybrid challenges — phone patterns don't scale up, tablet patterns
don't fit. Adjacent panes only in landscape; in portrait, overlapping drawers are better.
Single-column lists look disproportionate; use grid or swimlane layouts.

---

## Layout Patterns

### Stacks

The primary layout for handheld apps. Vertical organization:
- **Content area**: Primary content (list, grid, cards, media)
- **Top bar**: Title, primary navigation actions, search
- **Bottom bar**: Tab navigation (preferred over top tabs on handheld — closer to thumb)

Content area scrolls; bars are fixed.

### Screen Carousels

Alternative for dashboard-like content with multiple instances (weather for different cities,
multiple accounts). Users swipe left/right between full-screen instances.

**Rules**: Always circular (wrapping from last to first). Include a page marker widget
(dots or pills showing position). No drill-down navigation within carousel items —
the carousel IS the primary navigation for these parallel instances.

### Content Carousels (within a screen)

A horizontal row of scrollable content items *within* a single screen. Different from
screen carousels — exists inside a stack, not as the top-level navigation pattern.

**The bleed signal**: Always size items so the rightmost visible item is partially cut off —
this signals that more content exists to the right (visual affordance for horizontal scroll).
Without bleed, users assume the row is complete.

### Index Panes (Tablet)

On tablets, a persistent side panel listing content items while the main pane shows
detail for the selected item (master-detail pattern).

**Portrait**: The index pane overlaps the main content as a sliding panel, launched by a
button. In landscape: permanent adjacent pane.

**The rotation rule**: When device rotates to landscape, an overlapping pane becomes
a permanent adjacent pane. When it rotates back to portrait, it returns to the overlapping
drawer pattern.

---

## Navigation Controls

### Tab Bars

The primary navigation pattern for handheld apps (iPhone's tab bar, Android's bottom navigation).

**Bottom position preference**: Thumb accessibility. iOS originally used bottom tab bars;
Android material design moved to bottom navigation. Studies show bottom navigation is faster
and more accurate on phones than top navigation.

**Limits**: 3-5 items maximum. More than 5 creates tabs too small to target accurately (Fitts's Law).

**Active state**: Always show which tab is currently active with a clear visual distinction.
The user should know at a glance where they are.

**The hamburger drawer trade-off**: Hamburger menus (☰) hide navigation. Studies
consistently show lower engagement with hidden navigation than visible tab bars. Reserve
hamburger/drawer navigation for:
- More than 5 navigation destinations (drawer accommodates more)
- Secondary navigation (the drawer is a tier below the primary tab bar)
- When navigation items are used infrequently (once per session, not multiple times)

For frequent navigation (multiple times per session), tab bars win over drawers.

### Browse Controls

**Lists**: The workhorse of mobile content display. Each row = one item. Tapping drills
down or launches a detail view. Works for almost any content type.

**Grids**: For visual content (photos, album art, app icons). Column count depends on
item size — show partial bottom row to signal scrollability.

**Cards**: Encapsulated chunks of related information. Suitable for diverse content feeds
(social media, news). Cards can contain mixed media (image, text, buttons).

**Swimlanes**: Multiple horizontal scrolling rows, each with a title. Common in streaming
media apps (Netflix). Each row has its own content category; swiping right within a row
reveals more. Provides more content density than a simple vertical list.

---

## Touch Input Considerations

### Gesture Vocabulary

Mobile has a learned gesture vocabulary. Standard gestures that users expect:

| Gesture | Expected action |
|---|---|
| Tap | Select, navigate, activate |
| Double-tap | Zoom in (on content), like (in social apps) |
| Long press | Reveal contextual menu, begin drag |
| Swipe left | Delete item (iOS), dismiss |
| Swipe right | Archive item, reveal action |
| Pull down | Refresh content list |
| Pinch open | Zoom in |
| Pinch close | Zoom out |
| Swipe from edge | Navigate back (iOS), open drawer |

**Don't invent gestures**: Users have learned this vocabulary across thousands of apps.
Inventing new gestures creates a learning curve and risks conflicting with system gestures.

**Discoverability problem**: All gestures are invisible until performed (pure knowledge-in-head).
Reveal them through:
- Onboarding instructions (first-time only)
- Empty state guidance
- Progressive hints after inactivity
- Action buttons as fallback for gesture actions (not instead of — in addition to)

### Hit Areas

**The critical rule** (Fitts's Law at mobile scale): Hit areas must be large enough for
reliable finger targeting, regardless of the visual element size.

- Minimum: 44×44px (iOS HIG) / 48×48dp (Material Design)
- Recommended: 56×56dp for primary actions
- Spacing between targets: minimum 8dp

**Invisible hit area expansion**: Visual element can be small (24×24px icon) while the
interactive area extends to the minimum hit area. This is the standard solution for small
icons in dense layouts.

**The fat finger problem**: Adjacent interactive elements need adequate spacing. When two
tap targets are within 8px of each other, mis-taps become statistically significant.

### Pop-up Control Panels (Tablet Only)

On tablets, pop-up panels can replace navigation to separate screens for tool configuration.

**The caret convention**: Pop-up panels should display a speech-bubble caret pointing to
the control that triggered them. This preserves context (users don't lose sight of where
they were in the main UI) and visually connects the panel to its origin.

**Sizing**: Pop-ups on tablets should not take up more than 60% of the screen — users
need to see the underlying content to understand what they're configuring.

---

## Desktop-Like Tablet Apps

For productivity/creative apps that replace desktop applications:
- Controls must be finger-scaled even if they look like desktop toolbars
- Support drag-and-drop but design for accidental drop forgiveness
- Choose one orientation (usually landscape) and optimize for it
- Pop-up panels for tool configuration (not modal dialogs)
- Gesture shortcuts for expert operations

---

## Orientation Management

**Portrait default**: For content browsing, reading, social, communication apps.

**Landscape support**: For video, photo editing, games, and authoring tools where the
content itself has a landscape natural form.

**The rotation decision**: Don't support both orientations "just in case." Each orientation
requires distinct layout decisions. Supporting both without designing for both produces
mediocre experiences in both. Choose the orientation that matches the primary use case.

**The rotation rule for adjacent panes**: When rotating a tablet app from portrait to
landscape, the navigation drawer that was overlapping in portrait should become a permanent
adjacent pane in landscape. This is the standard behavior users expect from native apps.

---

## Performance at Mobile Scale

**Download speed**: Mobile networks are variable. Design for the worst realistic connection
(3G or congested WiFi), not the best.

**Page weight**: Every KB matters. Uncompressed images, unminified scripts, blocking resources
— all create wait times that Doherty Threshold research shows directly reduce engagement.

**Perceived performance**: When real speed can't be improved, perceived performance can:
- Skeleton screens (show structure before content loads)
- Optimistic UI (show expected result immediately, reconcile with server)
- Progressive image loading (low-res first, then full resolution)
- Pre-fetch next likely content during idle time

**Touch response**: Taps must produce immediate visual feedback (<100ms) even if the
action takes longer to complete. A button that shows pressed state within 100ms feels
responsive even if the resulting navigation takes 300ms.
