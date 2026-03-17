# Information Architecture Reference
## Sources: Cooper (About Face Ch.2, 5), Rosenfeld & Morville (cited), Krug (DMMT Ch.6)

---

## What Information Architecture Is

Information Architecture (IA) is the structural design of shared information environments —
the decisions about how content is organized, labeled, and connected so that users can find
what they need and understand where they are.

IA is not navigation design (though navigation expresses IA). It is not content strategy
(though IA depends on content inventory). It is the *structure* underlying both.

**Three components of IA** (Rosenfeld & Morville):
1. **Organization systems**: How content is categorized and structured
2. **Labeling systems**: What vocabulary is used to name categories and items
3. **Navigation systems**: How users move through the structure
4. **Search systems**: How users search within the structure

---

## The Fundamental IA Failure: Org Chart as Navigation

**Cooper's most important IA principle**: Never let your organizational structure,
departmental boundaries, or database schema appear as the information architecture.

Most corporate websites fail this immediately. The navigation reflects who owns what content
inside the organization, not how users think about their needs.

**The test**: Show the site navigation to someone from outside the organization. Ask them to
point to where they'd look for [specific user goal]. If they can't, your IA reflects your
org chart, not your users' mental model.

**Why it happens**: The people commissioning the design have authority in the organization
and naturally structure things to match their organizational reality. Nobody advocates for
the user's mental model. This is the designer's primary structural challenge.

**The solution process**:
1. Research how users *think* about the content domain (vocabulary, categories, relationships)
2. Design the IA to match *user* mental models
3. Map organizational content ownership onto the user-facing structure *after* defining it
4. The result: users find things; the organization still owns and maintains its content areas

---

## Mental Models for Information Organization

Users arrive with mental models of how content *should* be organized. These models come from:
- Prior experience with similar products/websites
- The vocabulary of the domain
- Common sense about conceptual relationships
- Physical-world analogies

**Vocabulary as mental model indicator**: If users call something "shipping" and your site
calls it "fulfillment," they won't find it. The labels in your navigation must match the
words users would use when looking for something.

**Eliciting mental models**: You can't ask users directly ("how would you organize this?")
because they often don't know until they see options. Instead:
- Observe users searching for things on the current site/competitor sites
- Listen to the vocabulary they use when describing their goals
- Note when they express surprise at finding something where it was

---

## Card Sorting

Card sorting is a user research method to understand how users mentally group and categorize
content. It reveals the categories and relationships that make intuitive sense to users.

### Open Card Sort

Give participants cards (each with one piece of content) and ask them to group them in any
way that makes sense, then name each group.

**What it reveals**: The mental categories users naturally form; the vocabulary they apply
to those categories; unexpected groupings that reveal conceptual relationships you hadn't considered.

**Limitation** (Cooper): Card sorting assumes subjects have refined organizational skills
and that abstract topic-sorting correlates with how they'd actually use the product. This
is "not always the case." Complement with observation and interview.

**Better alternative**: Ask users to *sequence* cards based on completing a specific task
rather than organizing topics abstractly. This reveals task-based navigation priorities.

**Post-sort debrief**: Always ask users to explain their grouping principles. The explanation
reveals the underlying mental model more clearly than the sort itself.

### Closed Card Sort

Give participants pre-defined category labels and ask them to place each card under the
category where they'd look for it.

**What it reveals**: How well existing categories match user mental models; which items are
consistently misplaced (indicating either a labeling problem or a structural one); which
categories are overcrowded or underpopulated.

**When to use**: When testing an existing navigation structure to find where users fail.

### Tree Testing

Also called "reverse card sorting" or "card-based classification." Give users the proposed
navigation structure (without visual design — just the hierarchy) and ask them to find
specific items using tasks.

**What it reveals**: Whether users can navigate to specific content using the proposed
structure. Unlike usability testing, it isolates navigation structure from visual design and
page-level factors.

**Advantage**: Can be run unmoderated at scale (tools: Optimal Workshop TreeJack, UserZoom).
Large samples (30-50+) provide statistical reliability.

**The metric**: *Directness* (did the user go straight to the answer?) and *Success rate*
(did they find it at all?). Indirect success (found it after backtracking) indicates structure
problems. Failure indicates the structure doesn't match mental models at all.

### Analysis

For open card sorts, look for:
- **Agreement rate**: When >70% of participants put an item in the same category, that's
  a strong signal for your IA
- **Consistently split items**: Items that participants equally divide between two groups
  need either better categorization or inclusion in both
- **Outlier groupings**: Occasional novel groupings from a few participants sometimes reveal
  a better structure than the majority approach

For tree tests, look for:
- **Entry point failures**: Users consistently starting in the wrong branch (labeling problem)
- **Backtracking clusters**: Users going to the right area but then failing to find the item
  (item placement or local labeling problem)
- **Complete misfires**: Users never approaching the right branch (fundamental model mismatch)

---

## IA Principles

### 1. Organize for Finding, Not for Storing

The IA should match how users *retrieve* information, not how the organization *stores* it.
These are often different. Filing systems for organizations and retrieval systems for users
solve different problems.

### 2. Mutually Exclusive, Collectively Exhaustive (MECE)

Navigation categories should be:
- **Mutually exclusive**: Each piece of content belongs unambiguously in one place
  (vs. multiple possible homes that create "which section should I look in?" paralysis)
- **Collectively exhaustive**: Every piece of content has a home in the structure

Pure MECE is an ideal, not always achievable. For ambiguous items: (a) place where
majority of users would look, and (b) add cross-links or search for users who look elsewhere.

### 3. Vocabulary Consistency

Use the same words in navigation as in content headings, search results, and body text.
If the nav says "Support" and the landing page says "Help Center," users experience discontinuity
that erodes confidence.

The social contract (Krug): the name of the page will match what I clicked. Extend this
to the entire taxonomy: every label must be consistent across the system.

### 4. Depth vs. Breadth Tradeoff

**Shallow and wide** (few levels, many items per level): Requires scanning many options;
easy to see the full scope of the site; harder to find specific items.

**Deep and narrow** (many levels, few items per level): Fewer choices at each level;
requires more clicks; users often don't know which branch to take.

**Evidence-based guidance** (Nielsen/Norman Group research):
- Most users prefer *slightly wider* over deeper
- Optimal: ~5-7 items at primary navigation with 2-3 levels deep
- The real issue isn't depth per se — it's whether each node decision is clear

**The key test**: At each node in the hierarchy, can users correctly predict which branch
leads to their goal? If yes, depth is acceptable. If not, restructure.

### 5. Navigation Labels as Promises

Every navigation label makes an implicit promise: "clicking this will take you somewhere
relevant to this concept." Violated promises — clicking "Products" to find a promotional
landing page rather than a product list — destroy trust and force users to develop distrust
of the navigation.

Labels should:
- Be specific enough to differentiate from adjacent options
- Be broad enough to honestly represent all content in the section
- Use the vocabulary of users, not of the organization
- Be consistent in grammatical form across the same navigation level (all nouns, or all
  verb phrases — not mixed)

### 6. Multiple Classification Systems

Users approach the same content from different angles. An e-commerce site might need to
support finding products by: category, brand, use case, price range, compatibility, and
"trending." A single hierarchical taxonomy can't serve all of these.

**Solutions**:
- Primary hierarchy (one) + filters/facets (many) for browsable/searchable content
- Cross-linking between related sections
- Robust search as a parallel path
- Multiple entry points to the same content via different navigation paths

### 7. Signposting and Wayfinding

Users need constant orientation cues (Krug's trunk test). The IA must support:
- Current location indicators ("you are here")
- Breadcrumbs showing the path back
- Contextual navigation showing peers and siblings in the hierarchy
- Page names that match what was clicked

Without these, even a well-structured IA becomes disorienting in use.

---

## Common IA Failures

### The Org Chart Problem
Already discussed above. Signs: navigation items named after departments, content buried
under the team that created it rather than the user need it serves.

### Overlapping Categories
Users can't decide which category to look in. Symptoms: users split fairly evenly when
asked where to look; multiple clicks required because users try one branch and have to
backtrack. Fix: restructure to be more MECE, or use faceted navigation.

### Jargon Labels
Navigation uses industry/internal terminology that users don't recognize. Symptom: users
can describe what they want but can't identify which navigation label leads there.
Fix: vocabulary research; replace jargon with users' own words.

### The Big Room of Everything
All content at one level, nothing organized by relationship or task. Users must scan
everything. Occurs especially in "resources" sections and document repositories. Fix:
meaningful grouping with clear labels.

### Ghost Architecture
Sections exist that contain nothing (or very little). Users click and find an empty page
or a single item. Signals that the IA was designed for aspirational content that never
existed. Fix: only include sections that have substance.

---

## IA for Different Product Types

**Marketing/Informational websites**: Organize primarily around user goals and questions
("how do I..."), not product features or company structure.

**E-commerce**: Primary hierarchy by product category; secondary navigation by brand, price,
use case, or attribute. Product detail pages need rich contextual navigation (related items,
"bought together," same-brand). Search is typically co-equal with browse.

**Enterprise software**: Often needs task-based navigation (organized around workflows, not
features), with role-based access determining what's visible.

**Documentation/Help**: Topic-based IA (not feature-based); organized around user problems
to solve, not product areas to understand. Search is critical; browsing should be possible
for exploration.

**Content/Media**: Multiple taxonomies (by topic, date, format, author, popularity). Faceted
search/filtering essential. Editorial curation provides a human layer over the taxonomy.

---

## IA and Search

IA and search are complementary, not alternatives. Users who can't navigate browse; users
who can't browse search; ideally both work.

**When search compensates for poor IA**: If users consistently search for things that could
reasonably be found through navigation, the navigation IA is probably failing. Investigate
which queries return navigation-accessible content.

**When navigation compensates for poor search**: If search results are too broad, users
resort to browsing to narrow down. They need a coherent IA to browse into.

**Search and IA alignment**: Search result pages should use the same vocabulary and category
labels as the navigation. Seeing a search result category that doesn't exist in the main
navigation confuses users about the structure of the site.

**The search box UX** (Krug): Simple formula — box, button, "Search" (word or magnifying
glass icon). Never "Quick Find," "Keyword Search," or other variants. Scope options (if any)
belong on the results page, not in the search box.
