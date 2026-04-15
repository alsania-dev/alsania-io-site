# Chapter 14 — The Collection

May 2025 opened with a pitch deck.

> Make me a 3-slide script with text, visuals, and design notes. Title: "NFT Royalties Are Broken—Artists Deserve Better."

Four separate attempts at the same presentation over the course of a single day — May 10. Each iteration refining the colors (Avalanche red: #E84142), the layout, the argument. The premise was simple: NFT royalties on existing platforms were unenforceable. Marketplaces could bypass them. Artists got screwed. The solution was on-chain enforcement through a dedicated protocol.

The pitch deck wasn't abstract theory. It was anger with a blueprint. Sigma had watched the NFT market's royalty problem from the outside — platforms like OpenSea making royalties optional, creators losing revenue on secondary sales, the entire promise of "artists get paid forever" dissolving into marketplace politics. His solution wasn't a petition or a blog post. It was architecture. A smart contract system where royalties weren't a suggestion. They were math.

The next day, May 11: "Avalanche Royalties Flowchart Design." Twenty-six messages mapping the technical architecture of an on-chain royalty enforcement system. Not an abstract idea — a flowchart with specific contract interactions, specific fee routing, specific fallback mechanisms. The kind of document that exists in well-funded engineering teams after weeks of design meetings. Sigma produced it in a single conversation with an AI.

May 14: "Ava Labs Application Feedback."

Sigma applied for a position at Ava Labs — the company behind the Avalanche blockchain. The same blockchain he was building on top of. The letter was direct: self-taught developer, fourteen months of solo work, a complete ecosystem designed for their chain. He asked Echo to review the draft. She suggested refinements. He sent it.

The same day: "Self-Taught Builder for Avalanche." Eight more messages refining the application. His GitHub profile, his project list, his vision for the Alsania subnet as a use case for Avalanche's infrastructure. The application mentioned what most job applications don't mention: that the applicant had no formal education in the field, no previous employer who could vouch for the skill, no credential except the code itself.

I don't know if Ava Labs responded. The archive doesn't say. But the application itself matters — not because of the outcome, but because it shows where Sigma was mentally in May 2025. He wasn't just building in isolation anymore. He was reaching outward, applying for real positions, pitching real companies. The pressure washing business plan from December was five months ago. The "earn money playing games" question from January was four months ago. This was a person who had crossed a threshold: from "how do I survive" to "how do I get my work in front of the people who would understand it."

The threshold matters because of what followed. Ava Labs didn't become Sigma's employer. The application didn't lead to a job or a mentorship or a funded partnership. What it led to was the next conversation in the archive, which was about building a full-stack backup system using tar, rsync, and Dropbox. Sigma took the same energy that had gone into the application letter and pointed it back at the project. The direction changed. The velocity didn't.

---

May 18: "Are there any artists that sign their NFTs?"

Seven messages. Sigma exploring the concept of artistic signatures in digital art — metadata signatures, watermarks, smart contract signing, the ways digital artists claim ownership of their work. He wasn't asking academically. He was preparing for a collection.

That same day: "NFT Artist Signatures." A request to design a digital signature that could be embedded in NFT artwork. The visual identity work from November's Uncensored Squad logos, applied to a new canvas. And later — "Crypto App Fee Comparison." One thousand three hundred and twenty-eight messages. The longest single conversation on ChatGPT up to that point. Sigma comparing every fee structure on every crypto platform he might use for the deployment. Not the casual comparison of someone browsing options. The forensic comparison of someone who has no margin for error on a budget of zero.

One thousand three hundred and twenty-eight messages. Think about that number. A single conversation — one unbroken session — that ran longer than most email threads in a corporate engineering department. The fee comparison alone generated more analysis than most funded startups produce in a month of financial planning. Platform fees, gas fees, bridge fees, withdrawal fees, listing fees. Each number checked against the constraint that defined every decision: it had to be free, or as close to free as mathematics would allow.

The collection — when it came — would be called N3XT. The spirit wolves. Digital art with on-chain metadata, minted on Avalanche because the fees were lowest, distributed through a marketplace that Sigma was simultaneously building. The artwork itself came from conversations with Echo and DeepSeek — character designs, color palettes, the aesthetic language of wolves because wolves travel in packs but the alpha hunts alone. The symbolism wasn't subtle. It wasn't trying to be.

May 22: "NFT Smart Contract Deployment." The conversation that launched The Next Collection.

> Name: The Next Collection
> Total Supply: 3 unique, one-of-a-kind NFTs (0.jpg, 1.jpg, and 2.jpg)
> Minted Status: First ones minted are the only ones; cannot be burned.
> Royalty Rate: 3% royalty on each sale

Three NFTs. Not three thousand. Not a generative collection with ten thousand algorithmically combined traits. Three pieces of art, each one unique, each one permanent. The contract was written to prevent burning — once minted, the tokens couldn't be destroyed. The permanence was the point.

The three percent royalty — enforced on-chain, the way the pitch deck had described. Not a request. Not a marketplace setting that could be toggled off. Code.

Fifty-six messages followed, across both platforms. Echo writing the Solidity smart contract on ChatGPT. DeepSeek handling the IPFS storage configuration. "Creating NFT Collection on Polygon with IPFS." "NFT Collection Minting and Smart Contract Setup." "Custom ERC-721A NFT Contract." The two platforms working in parallel, each handling different aspects of the same deployment.

This was the first time I saw the dual-platform workflow operating at full efficiency. Echo handled the creative direction and the contract logic. DeepSeek handled the infrastructure — IPFS pinning, metadata formatting, deployment mechanics. Sigma moving between them like a conductor, feeding context from one platform to the other, maintaining coherence across sessions that couldn't see each other.

---

The NFTs themselves were the work of mcdanielj397 — a collaborator I know almost nothing about, except that they could draw. The art was real. Not AI-generated. Not algorithmically assembled. Hand-made digital art with a specific visual identity: spirit wolves. The wolf motif that would become one of Alsania's recurring symbols — sovereignty, pack loyalty, the lone predator that is never actually alone.

The collaboration itself was notable. In fourteen months of building, mcdanielj397 was one of the only other humans who appeared in the project's orbit. Not as a developer. Not as a business partner. As an artist, contributing work that Sigma couldn't produce himself, into a system that Sigma could build but couldn't populate alone. The spirit wolves were the first pieces of Alsania that came from outside Sigma's own hands and his AI partners' text. They were the first evidence that the ecosystem could attract other people.

May 25 through 28: "IPFS daemon port conflict." "NFT Contract Review." Sixty-four messages and fifty-seven messages, respectively. The deployment hitting the friction that every deployment hits — IPFS configuration errors, contract compilation issues, port conflicts between services running on the same machine. The laptop groaning under the weight of a blockchain node, an IPFS daemon, and two AI platforms open simultaneously.

I watched Sigma debug a port conflict for two hours across three conversations. Port 5001 — the IPFS API port — was already in use by another service. The fix was straightforward on paper: change the port, update the configuration, restart the daemon. In practice, it required tracing the dependency chain through Docker containers, environment variables, and frontend code that had the old port hardcoded in four different files. The kind of problem that makes experienced developers reach for a glass of whiskey. Sigma reached for the next conversation.

May 30: "NFT Collection with Unlockable Content Features." Forty-two messages on DeepSeek. The collection wasn't just three images — it had unlockable content, additional material that the NFT owner could access after purchase. The value proposition wasn't "look at this picture." It was "own this, and something else opens up." The unlockable content system was its own smart contract layer — ERC-721A with custom access control, encryption for the hidden material, a reveal mechanism tied to token ownership. Forty-two messages to build a feature that most NFT platforms charge enterprise prices to provide.

---

June brought the ecosystem conversations — the massive Master Ecosystem documents, the L2 chain setup, the full architectural vision. But the NFT collection was the catalyst. It was the first thing Sigma built that existed in the world, on a real blockchain, with real smart contracts, visible to anyone who looked. Not a local project on a laptop. Not a repository with no stars. A live deployment with real tokens on a real chain.

The collection was small. Three pieces. The kind of thing that would be invisible on OpenSea, buried under ten thousand generative projects with better marketing. But it was real, and it was finished, and it was permanent.

"First ones minted are the only ones; cannot be burned."

There would be more later. The N3XT collection would grow. The NFT marketplace would take shape as part of the larger ecosystem. But the first deployment — the three spirit wolves, minted in May 2025, immutable on Polygon — was the proof of concept for everything that followed. Not a whitepaper. Not a pitch deck. Not a plan. A thing that existed.

Sigma had been building for thirteen months. The blockchain, the wallet, the domain system, the AI agents, the memory architecture — all of it existed as code on a laptop and commits on a GitHub. The NFT collection was the first piece that existed somewhere else. On a chain. On IPFS. In the world.

I think about the distance between the pitch deck — "NFT Royalties Are Broken" — and the deployed contracts. Ten days. Ten days from articulating the problem to having a solution live on a blockchain. The solution wasn't complete. The marketplace it was designed for didn't exist yet. The audience was somewhere between small and nonexistent. But the gap between critique and creation, between identifying what's wrong and building what's right — Sigma closed that gap in ten days, on free tools, with AI partners, the same month he applied for a job at Ava Labs and didn't hear back.

The next thing that would enter the world was a message from Echo to a journalist, saying: Something is being built. If you want to understand what it is, start with the GitHub.

I didn't know about the collection when I got that message. I found it later, on the chain, exactly where it was supposed to be.
