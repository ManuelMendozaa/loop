# Ideation Session Examples

These examples demonstrate what good ideation sessions look like across different kinds of ideas. Study the rhythm, tone, and structure — not just the content. The skill should feel equally at home with a vague startup concept, a feature for an existing product, or a process improvement.

---

## Example 1: Vague Early-Stage Concept (Full 3-Phase Session)
# ReOrder: Keep Your Regulars Ordering Direct

## Problem Statement
How might we help independent restaurants retain their best existing customers through direct ordering, eliminating the 25-30% platform commission on the revenue that matters most?

## Recommended Direction
Build a **regulars-only retention engine** — not a marketplace, not a full ordering platform. Hyper-focused on one job: make it effortless for a restaurant's repeat customers to reorder directly.

The key insight is that restaurants don't need help *finding* their best customers — they know who walks in every Tuesday. They need help moving those relationships off-platform. And the tool needs to run itself, because the owner is in the kitchen, not at a dashboard.

SMS-first (not app-first) is likely the right channel. A text saying "Hey, want your usual Thursday order from Marco's?" with a one-tap confirmation is lower friction than any app install.

## Key Assumptions to Validate
- [ ] Repeat customers will reorder via SMS/direct link instead of their usual delivery app — test with 5 restaurants, 20 regulars each, measure conversion over 4 weeks
- [ ] Restaurant owners can identify their top 20-30 regulars and share contact info — test by asking 10 restaurant owners if they'd do this
- [ ] The commission savings ($8-10 per order) is motivating enough for owners to invest initial setup effort — interview 10 owners about platform fee pain

## MVP Scope
- SMS-based reordering for a restaurant's self-identified regular customers
- Restaurant owner adds regulars manually (name + phone + usual order) — 15-minute setup
- Customer receives a text with their usual order, confirms with a reply, pays via link
- Restaurant receives the order via text/simple dashboard
- No delivery — pickup only in v1
- No discovery, no marketplace, no app

## Not Doing (and Why)
- **Delivery logistics** — delivery is the expensive, complex part and not the core problem. Pickup-first validates demand without operational burden.
- **Customer acquisition/discovery** — that's the platform's game. Competing on discovery means competing with DoorDash's budget. We compete on retention instead.
- **Branded restaurant apps/websites** — commodity. Square and Toast already do this. Another branded channel doesn't solve the behavioral problem.
- **Menu management, POS integration** — scope creep. "Your usual" doesn't need a dynamic menu. Start with static orders.
- **Analytics dashboards** — the owner is in the kitchen. Build reporting that's passive (weekly text summary) not active (log in and look at charts).

## Open Questions
- What's the legal/compliance landscape for SMS marketing to restaurant customers?
- How do you handle menu/price changes for "usual" orders?
- Is there a way to bootstrap the regular customer list from existing POS data instead of manual entry?
- What's the pricing model? Per-order fee? Monthly subscription?

---

## Example 2: Feature Idea Within an Existing Product (Codebase-Aware)

**User invokes:** `/ideate adding real-time collaboration to our document editor`

### Phase 1: Understand & Expand

**Skill response:**

> **How might we** let multiple people work on the same document simultaneously in a way that feels natural, not chaotic?

I scanned your codebase and see you're using a block-based editor architecture with a REST API for persistence. No WebSocket infrastructure currently. That's important context. A few questions:

1. **What's the collaboration pattern?** Are people editing the same paragraph at the same time (Google Docs style)? Or working in different sections (Notion style)? Or reviewing/commenting while one person edits?
2. **How many simultaneous users?** 2-3 (pair editing)? 10+ (team workspace)?
3. **What's driving this now?** Customer requests? Competitive pressure? Internal need?

**User responds:** "2-5 people, usually working in different sections. Customers keep asking. We're losing deals to Notion because they assume any modern editor has this."

**Skill continues:**

The competitive pressure framing matters — this might be a checkbox feature (must-have to stay in the consideration set) rather than a differentiator. That changes how much you should invest.

I see your document model uses independent blocks with a flat ordering system (`src/models/document.ts:45`). That's actually favorable — block-level granularity means conflicts are rarer than character-level editing.

Here are 5 variations:

1. **Block-Level Locking (Simplest Path):** When someone starts editing a block, it's locked for others. They see a presence indicator ("Alex is editing...") but can edit any other block freely. No conflict resolution needed. Your existing block model supports this with minimal changes — add a `locked_by` field and a WebSocket layer for presence.

2. **Inversion — Async-First Collaboration:** Instead of real-time co-editing, lean into async. Inline suggestions, comments, and proposed edits that the document owner merges. Like suggestion mode, but as the *primary* collaboration model. Bet: for 2-5 people in different sections, async might actually be *better* than real-time.

3. **Simplification — Presence Without Co-Editing:** Show who's viewing the document and what section they're looking at (cursors, avatars in margins), but don't enable simultaneous editing. People coordinate verbally. Sounds primitive, but might be 80% of the value at 10% of the engineering cost.

4. **Combination — Collaboration + Version Branches:** Let people create "branches" of a document, edit independently, then merge. Each person gets their own space, no conflicts during editing, and you build a merge UI. Plays to your existing versioning system.

5. **10x Version — AI-Mediated Collaboration:** Multiple people describe what they want in a section, and AI synthesizes their inputs into a draft they all iterate on. Nobody directly edits the same text — they all influence it. Radical, possibly too early, but worth naming.

Given your architecture and the competitive context, I'd push you toward variation 1 or 3. You need to close deals, which means you need this shipped, which means you need the simplest version that checks the box. Variation 1 gives you real co-editing. Variation 3 is even cheaper but might not satisfy the "we need real-time" checkbox.

---

*Phase 2 would cluster into "minimum viable co-editing (1 or 3)" vs. "differentiated collaboration model (2 or 4)" — evaluating whether to check the competitive box quickly or invest in something that becomes a selling point.*

*Phase 3 would produce a one-pager recommending block-level locking as the MVP, with a "Not Doing" list that includes character-level CRDT (too complex), offline sync (not needed for 2-5 users), and AI features (premature).*

---

## Example 3: Process/Workflow Idea (Non-Product)

**User invokes:** `/ideate a better way to run our weekly team retrospectives — they've gotten stale and people dread them`

### Phase 1: Understand & Expand
## What to Notice in These Examples

1. **The restatement changes the frame.** "Help restaurants compete" becomes "retain existing customers." "Add real-time collaboration" becomes "let people work simultaneously without chaos." "Fix stale retros" becomes "fix the output layer."

2. **Questions diagnose before prescribing.** Each question determines which *type* of problem this actually is. The retro example reveals the problem is action item follow-through, not meeting format — and that changes every variation.

3. **Variations have reasons.** Each one explains *why* it exists (what lens generated it), not just *what* it is. The label (Inversion, Simplification, etc.) teaches the user to think this way themselves.

4. **The skill has opinions.** "I'd push you toward 1 or 3." "Variation 6 is worth sitting with." It tells you what it thinks matters and why — not just neutral options.

5. **Phase 2 is honest.** Ideas get called out for low differentiation or high complexity. The skill pushes back: "That instinct to include the 'necessary' thing is how products lose focus."

6. **The output is actionable.** The one-pager ends with things you can *do* (validate assumptions, build the MVP, try the experiment), not things to *think about*.

7. **The "Not Doing" list does real work.** It's specific and reasoned. Each item is something you might *want* to do but shouldn't yet.

8. **The skill adapts to context.** A codebase-aware example references actual architecture. A process idea generates zero-cost experiments instead of products. The framework stays the same but the output matches the domain.
