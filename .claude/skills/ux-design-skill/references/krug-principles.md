# Krug Principles Reference
## Source: Don't Make Me Think, Revisited (Steve Krug, 2013)

---

## The Three Laws

**First Law — Don't Make Me Think**
The overriding principle and ultimate tie-breaker. Every page should be self-evident —
obvious and self-explanatory without any mental effort. When you look at a page, thought
balloons should say "OK, there's the ___." Never question marks.

If self-evident is impossible, aim for self-explanatory (takes a little thought — but only
a little). The appearance of things (size, color, layout), well-chosen names, and small
amounts of carefully crafted text should work together to create nearly effortless understanding.

**Second Law — Mindless Choices**
It doesn't matter how many clicks it takes, as long as each click is mindless and
unambiguous. What matters is not click *count* but click *difficulty* — the amount of thought
required and uncertainty involved. Three mindless clicks ≈ one click that requires thought.

Links that clearly identify their target give off a strong "scent of information" — users
stay confident they're heading toward their goal. Ambiguous links break the scent.

**Third Law — Omit Needless Words**
Get rid of half the words on each page, then get rid of half of what's left. The goal is
not brevity for its own sake, but the elimination of words that add noise without adding value.

Benefits of omitting: reduces noise, makes useful content more prominent, makes pages shorter
so users see more at once.

---

## How Users Actually Use the Web

### Fact 1: Users Don't Read — They Scan

Users spend very little time reading most Web pages. Instead they scan, looking for words
or phrases that match their interests or task. The exceptions are news articles and product
descriptions — but even there, users alternate reading and scanning.

Why do they scan?
- **Mission-driven**: Most Web use involves getting something done, usually quickly.
  Users are sharks — they have to keep moving.
- **Selective attention**: They're interested only in the bits that match their task.
  They know scanning is how to find the relevant bits.
- **Habitual**: They've been scanning newspapers, magazines, and screens their whole lives.

The net effect: what we see depends on what we have in mind. Users focus on words/phrases
that match (a) the task at hand, (b) ongoing personal interests, (c) hardwired trigger
words: "Free," "Sale," "Error," and their own name.

**Implication**: Design pages for scanning. Use:
- Clear visual hierarchy (prominence signals importance)
- Prominent headings that float close to their section (not equidistant between sections)
- Short paragraphs (single-sentence paragraphs are fine; walls of words are daunting)
- Bulleted lists for anything that can be listed
- Bold key terms sparingly — too many eliminates the effect
- Conventional layouts (don't make users figure out where the nav is)

### Fact 2: Users Satisfice — They Don't Optimize

When designing pages, we assume users will scan all options and choose the best one. Reality:
users choose the *first reasonable option*, not the best one. They click the first link that
seems like it might lead toward their goal.

Why satisfice?
- They're in a hurry; optimizing takes time
- There's minimal penalty for guessing wrong (just the Back button)
- Weighing options often doesn't improve outcomes on poorly designed sites
- Guessing is faster and introduces the pleasant possibility of lucky discoveries

**Implication**: Make the right path the obvious path. Don't hide the correct action among
equally weighted alternatives. The most important thing you can do is make the primary
path irresistible, not merely available.

### Fact 3: Users Muddle Through — They Don't Figure Out How Things Work

Users routinely use products they don't understand, holding wrong mental models about how
things work. They forge ahead, make up plausible stories about why things work, and if
something sort of works, they stick with it even if it's wrong. Very few users read instructions.

Why muddle through?
- Most don't care how things work; they care whether things work
- Once they find something that works (even badly), they stop looking for better

**Critical implication**: Self-explanatory beats instructed. Every time you rely on
instructions being read before users act, you're relying on something that won't happen.
Design so that the right action is the obvious action.

---

## Billboard Design 101 — Six Tactics for Scanning

### 1. Take Advantage of Conventions

Conventions are interaction patterns users have absorbed across thousands of sites. They
represent accumulated design wisdom. Logo top-left, nav top or left, shopping cart
top-right, search bar with a box and a button.

The value of conventions: users don't have to figure out how your site works — they already
know. Every departure from convention imposes a *learning tax* on every user.

**Rule**: Innovate when you genuinely have something better. Use conventions when you don't.
Never reinvent convention just because it's more exciting. "Designing around a convention
just because you feel you've been hired to do something new and different" is one of the
most common and damaging design errors.

**The innovation test**: Does my innovation add enough value to offset the cost of learning
it? If not, use the convention.

**Sub-rule: CLARITY TRUMPS CONSISTENCY**. If you can make something significantly clearer
by being slightly inconsistent, choose clarity. Consistency within a site is valuable —
but it's not sacred. It serves clarity; it doesn't override it.

### 2. Create Effective Visual Hierarchies

A page's visual hierarchy tells users what's important, what's similar, and what's part
of what — before they read a word.

Three traits of good visual hierarchy:
- **More important = more prominent**: Larger, bolder, distinctive color, more white space,
  nearer the top. The most important elements must be unmistakably the most important.
- **Related things look related**: Grouped together, same visual style, in a defined area.
  Spatial proximity = logical relationship.
- **Nested things look nested**: Section names span their content. A heading that seems to
  float between two sections creates a parsing error that forces users to think.

Flawed visual hierarchy forces users to construct their own sense of organization —
expensive cognitive labor that should never be required.

### 3. Break Pages into Clearly Defined Areas

Users must be able to quickly identify which regions of a page to focus on and which to
safely ignore. Eye-tracking shows they decide this within the first glance and rarely revisit.

Banner blindness is the extreme version: users completely ignore regions they mentally
categorize as "ads," even when those regions contain useful content.

**Implication**: Make functional regions unambiguous. Navigation looks like navigation.
Content looks like content. Promotional regions must be clearly bounded from utility regions.

### 4. Make Clickability Obvious

Users should never spend a millisecond wondering whether something is clickable. Signals
of clickability: shape (button/tab form), location (nav bar, footer), formatting (blue
underline for links; raised/bordered appearance for buttons).

On mobile, hover states are gone. Affordances must be visible in the static state.
Many "flat design" interfaces fail this test badly — they remove all visual distinction
between clickable and non-clickable elements in pursuit of aesthetic minimalism.

**Never use the same color for links and non-clickable headings.**

### 5. Reduce Visual Noise

Three types of noise:
- **Shouting**: Everything clamoring for attention simultaneously. When everything demands
  attention, nothing gets attention. Result: cognitive overwhelm. Cause: failure to make
  hard decisions about what's actually most important.
- **Disorganization**: Random layout, no grid, no alignment. Signals incompetence.
- **Clutter**: Too much stuff. Low signal-to-noise ratio. Useful content buried.

**Default to removal**: When editing a page, assume everything is noise until proven
otherwise. The "presumed guilty until proven innocent" approach. In the face of limited
attention, anything not part of the solution is part of the problem.

### 6. Format Text to Support Scanning

- **Use plenty of headings**: More than you think you need. Well-written headings act as
  an informal table of contents. Make each higher level obviously, impossibly distinct from
  the lower levels.
- **Headings must float toward their content**: Closer to the section they introduce than
  to the section above. This is violated constantly and matters enormously.
- **Short paragraphs**: Even single-sentence paragraphs. Long paragraphs = "wall of words."
- **Bulleted lists**: Anything that CAN be a bulleted list probably SHOULD be.
- **Bold key terms sparingly**: Only the first appearance. Only true key terms. Too many
  bolds = the technique loses its effectiveness.

---

## Navigation Design — Full Framework

### Why Navigation Is the Website

The Web lacks the physicality of real spaces — no sense of scale, direction, or location.
Navigation compensates by *embodying* the site's hierarchy and creating a sense of "there."

Navigation isn't just a feature — it IS the website, the way shelves and aisles ARE a store.
Without it, there's no there there.

Purposes of navigation (beyond the obvious ones of "help find things" and "show where we are"):
- **Reveals the site's contents**: Navigation shows what's here — often more important than
  guiding or locating.
- **Teaches the site**: Good navigation implicitly tells users where to begin and what their
  options are. It should be all the instructions you need.
- **Builds confidence**: Every well-thought-out nav element says "these people know what
  they're doing." Clear navigation is one of the best opportunities to create a good impression.

### Persistent Navigation — The Four Elements

Every page (except focused task pages like checkout) should show:

1. **Site ID / Logo**: Top-left corner. Must look like a brand logo — distinctive typeface,
   recognizable at any size. Functions as the link to Home. Users expect to click it.

2. **Primary Sections (Sections)**: Top-level hierarchy of the site. In dropdown or sub-nav
   form. The clearest possible vocabulary — not cute, not clever, not marketing-speak.

3. **Utilities**: Features that help users use the site (Search, Sign In/Out, Cart, Help).
   These are not part of the content hierarchy. Max 5 in persistent nav; extras go to footer.

4. **Search**: A box, a button, and either the word "Search" or a magnifying glass icon.
   No fancy names ("Quick Find," "Keyword Search"), no instructions ("Type here"),
   no pre-limiting scope options in the box (offer scope filtering on results page instead).

### Page Names — The Street Signs of the Web

Every page needs a name. Page name rules:
- **Every page must have one** — highlighting it in the nav is not sufficient
- **Must be in the right place** — framing the content of this page specifically
- **Must be prominent** — typically the largest text on the page
- **Must match what the user clicked** — the implicit social contract.
  *The name of the page will match the words I clicked to get here.* Violating this
  forces users to wonder "why are these two things different?" — and erodes trust.

### "You Are Here" Indicators

Current location must be highlighted in navigation — and highlighted clearly, not subtly.

Designers love subtle. Subtlety is one of the traits of sophisticated design.
But subtlety is also one of the most common causes of failed "You Are Here" indicators.
If you think a visual cue is sticking out like a sore thumb, it probably needs to be
*twice as prominent*.

Apply more than one visual distinction: a different color AND bold text, for example.

### Breadcrumbs

Show the path from Home to current location. Make it easy to jump up hierarchy levels.

Best practices:
- Put them at the top of the page (marginalizes them appropriately — an accessory)
- Use `>` between levels (visually suggests forward motion)
- Bold the last item (current page; not a link)
- Most useful in large sites with deep hierarchies

### Tabs

One of the most self-evident navigation choices available. Nobody has ever seen tabs and
asked "I wonder what those do?" They're hard to miss, and they create clear distinction
between navigation and content.

For tabs to work properly: the active tab must connect visually to the content area below it
(creating the illusion that the tab is in front). If the active tab doesn't "pop" to the
front through contrast and connection, the tab metaphor collapses.

### The Trunk Test

The acid test for good navigation. Imagine you've been blindfolded, locked in a trunk,
and deposited on a page somewhere deep in a website. When your vision clears, can you
immediately answer (without close scrutiny):

1. What site is this? (Site ID)
2. What page am I on? (Page name)
3. What are the major sections? (Sections)
4. What are my options here? (Local navigation)
5. Where am I in the scheme of things? ("You are here" indicators)
6. How can I search?

The standard is not "could you figure it out with effort" — it's "do these things pop off
the page without any effort at all."

---

## Home Page Design

### What the Home Page Must Do

Simultaneously:
- Establish site identity and mission (what is this? why should I be here?)
- Show site hierarchy (what's here and what can I do?)
- Provide prominently placed search
- Surface timely content and features
- Establish credibility and trust
- Answer four critical questions instantly: What is this? What can I do here? Why should
  I be here? Where do I start?

### The Big Bang Theory of Web Design

The first few seconds on a page are critical. Users form snap judgments in milliseconds.
Research shows these initial impressions predict later assessments with high accuracy.

Users who misunderstand the big picture in the first seconds will try to force-fit that
wrong interpretation onto everything they encounter — and get progressively more lost.
Getting them right from the start is essential; recovering from a wrong first impression
is almost impossible.

### The Most Common Home Page Failure

**Failing to communicate what the site is.** Everyone inside the organization assumes
visitors already know. They almost certainly don't. The "main point" is the one thing
nobody inside the organization will notice is missing — because to them it's too obvious to mention.

### Three Places to Communicate the Big Picture

1. **Tagline**: Positioned right next to the Site ID. Users know this is meant to describe
   the whole site. Good taglines: clear and informative, 6-8 words, differentiating, not generic.
   Bad taglines sound like mission statements ("World-class solutions in the burgeoning field of...").
   A tagline is not a motto ("We bring good things to life") — mottoes express ideals;
   taglines convey value propositions.

2. **Welcome blurb**: Prominent at the top of the content space. Terse, clear, specific.
   Not a mission statement. Not marketing language. Just: what is this site, for whom, and why.

3. **"Learn more" video**: For innovative products that need explanation. Short (under 2 min).
   Users have become comfortable watching brief explanatory videos.

### Home Page Anti-Patterns

- **The golden goose problem**: Everything promoted on the Home page gets more traffic,
  so everyone fights for a spot. This is the tragedy of the commons — individual benefit
  vs. shared harm. The page gets progressively more cluttered until nothing works.
- **Stakeholder proliferation**: The Home page is the only page every executive has an
  opinion about. "Design by stakeholders" produces results no one chose.
- **Mission statement as welcome blurb**: Corporate-speak that nobody reads.

---

## Usability as Common Courtesy — The Goodwill Reservoir

Every user enters a site with a reservoir of goodwill. Problems drain it. Enough draining
and they leave — or they stay but think less of you, post negative reviews, or just never
come back. The reservoir is:
- **Idiosyncratic**: Some people have large reserves; some small; can't count on a large default
- **Situational**: Entering from a frustrating experience elsewhere means a depleted reserve
- **Refillable**: Doing things that serve users well actively restores goodwill
- **Fragile**: A single major failure can empty it instantly

**Things that drain goodwill**:
- Hiding information users want (phone numbers, prices, policies, return conditions)
- Punishing users for input they gave in the "wrong" format (credit card spaces, date formats)
  — the system should normalize, not reject
- Asking for information you don't need
- Faux sincerity ("Your call is very important to us")
- Promotional bloat standing between users and their goal
- Looking amateurish or uncared-for

**Things that refill goodwill**:
- Making common tasks obvious and easy (nothing should block a mortgage application CTA
  on a mortgage company's website)
- Being upfront about costs and constraints
- Saving steps (tracking links in email receipts vs. providing a tracking number)
- Putting genuine effort into content quality and organization
- Answering the questions users are likely to have before they have to ask
- Making error recovery graceful
- Apologizing honestly when you genuinely can't do better

---

## Mobile Design

The same principles apply on mobile — users scan even faster, read even less, have even
less patience. Some specific considerations:

**The core tradeoff**: Less screen space means harder decisions about what to include.
Mobile First (design mobile first, then expand) was a good idea, but was often misapplied
to mean "users on mobile only want to do simple things." Wrong. Mobile users want to do
everything. Prioritize ruthlessly, but include everything.

**Managing real estate must not cost usability**: The most important maxim for mobile.
Every shortcut taken to save space that makes the interface harder to use is wrong.

**Affordances become harder on mobile**:
- No cursor = no hover = no hover states to signal clickability
- Touch targets must be large enough (44×44px minimum; larger is better)
- Flat design removes visual cues that distinguish interactive from decorative elements

**Three minimum mobile improvements** (if you can't do a full responsive implementation):
1. Don't prevent zooming
2. Don't send mobile links to the mobile Home page — honor the specific URL
3. Always provide a link to the full site

**Responsive design** is now mandatory — "optional" ended when mobile became dominant.
But responsive design that optimizes file size for large screens while sending full assets
to mobile is actually worse than no responsive design.

---

## Accessibility

Making things accessible is the right thing to do — profoundly so. Blind users with a
screen reader can now read almost any newspaper on their own. How often do we get to
dramatically improve people's lives just by doing our job a little better?

**The Tang fallacy**: The common argument that "making sites accessible helps everyone" (like
closed captioning) is technically true but tactically weak. The real argument is simpler:
*it's the right thing to do.* Legal sticks are also coming — count on it.

**Four concrete actions** (highest impact, minimum complexity):
1. Add appropriate alt text to every image (empty `alt=""` for decorative images)
2. Use heading elements correctly (h1 for main title; h2 for major sections; h3 for subheadings;
   CSS controls the visual appearance — don't pick heading levels for their size)
3. Make forms work with screen readers (use `<label>` element to associate fields)
4. "Skip to Main Content" link at the beginning of every page (essential for keyboard users)
5. All content accessible by keyboard (not everyone can use a mouse)
6. Significant contrast between text and background (minimum 4.5:1 for body text)
7. Use accessible templates (e.g., accessible WordPress themes)

**Usability improvements benefit accessibility users most**: The most important thing you
can do for accessibility is fix the usability problems that confuse everyone — because users
with disabilities will have a harder time recovering from the same confusion.

**Screen reader users scan with their ears**: They don't listen to every word any more than
sighted users read every word. They listen to the first few words of a link and skip if
irrelevant. This means: link text must be meaningful in isolation ("Click here" is useless;
"View your order history" is useful).

---

## Focus Groups vs. Usability Tests

**Focus groups**: 5-10 people talking about products. Reveals opinions and stated preferences.
Good for: "Is this the right product to build?"

**Usability tests**: One person at a time actually using a product while observed.
Reveals behavior and genuine confusion. Good for: "Does this product actually work?"

People are unreliable reporters of their own behavior. What they say they'd do and what
they actually do are routinely different. This is why focus groups cannot substitute for
usability testing.

**Core truth**: Testing one user is 100% better than testing none. Testing one user early
is better than testing 50 users near launch. See `references/usability-testing.md` for
the full testing protocol.
