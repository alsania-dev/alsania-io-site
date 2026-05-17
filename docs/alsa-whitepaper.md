# ALSA Token Whitepaper v1.0

**The Sovereign Utility Token of the Alsania Ecosystem**

---

## Abstract

ALSA is the native utility token of the Alsania ecosystem, deployed on Polygon PoS. It powers staking rewards, gasless transactions through the Alsania Paymaster, human-verified faucet claims, and governance. With a fixed supply of 100 million tokens and built-in anti-sweeper protection, ALSA is designed for long-term ecosystem sustainability.

---

## 1. Introduction

### 1.1 The Alsania Ecosystem

Alsania is a sovereign technology ecosystem built on the principles of user ownership, transparency, and resistance to centralized control. The ecosystem includes:

- **ALSA Token** — Utility and governance token
- **SPIRIT Token** — Companion token powering the Spirit Wolf NFT collection
- **Alsania Paymaster** — ERC-4337 gas sponsorship infrastructure
- **Token Faucets** — Human-verified daily token claims
- **AED (Alsania Enhanced Domains)** — Sovereign on-chain identity system
- **Nyx Browser Extension** — MCP-powered AI agent integration
- **EME Memory System** — Persistent agent memory and knowledge graph

### 1.2 Purpose of ALSA

ALSA serves as the economic engine of the ecosystem. It is not a speculative asset or investment vehicle. It is a utility token designed to facilitate transactions, reward participation, and enable governance within the Alsania network.

---

## 2. Tokenomics

### 2.1 Supply

| Parameter | Value |
|---|---|
| Total Supply | 100,000,000 ALSA |
| Decimals | 18 |
| Network | Polygon PoS (Chain ID: 137) |
| Token Standard | ERC-20 (UUPS Upgradeable) |
| Mintable | No (fixed supply) |

### 2.2 Contract Address

```
0x1630fE468B414A964ed974b9F5Dd69d950E1Eb74
```

View on Polygonscan: https://polygonscan.com/token/0x1630fE468B414A964ed974b9F5Dd69d950E1Eb74

### 2.3 Distribution

ALSA tokens are distributed through the following mechanisms:

- **Faucet Claims** — 1 ALSA per day for verified humans
- **Staking Rewards** — 10% APY for staked ALSA
- **Paymaster Revenue** — 1% fee on gas-sponsored transactions collected in ALSA
- **Community Incentives** — Allocated for development, partnerships, and ecosystem growth

---

## 3. Token Utility

### 3.1 Staking

ALSA holders can stake their tokens to earn 10% annual percentage yield (APY). Staking rewards are distributed from the token contract's reward pool. Staking also contributes to network security by incentivizing long-term holding.

### 3.2 Gasless Transactions via Paymaster

The Alsania Paymaster (`0xE3EFB43f96b0738818780F96c3aF5F4bc4f86E56`) enables users to pay for Polygon gas fees using ALSA instead of POL. This removes the requirement for users to hold POL tokens for transactions. The paymaster charges a 1% fee on the gas cost, collected in ALSA or SPIRIT.

### 3.3 Human-Verified Faucet

Users can claim 1 ALSA per day from the Alsania Faucet after completing a one-time human verification. Verification requires a 0.01 POL stake (fully refundable after 7 days). This sybil-resistance mechanism ensures fair distribution while deterring automated abuse.

### 3.4 Governance

ALSA holders participate in ecosystem governance, including:
- Protocol parameter adjustments (staking rates, fee structures)
- Treasury allocation decisions
- Feature prioritization

### 3.5 Anti-Sweeper Protection

ALSA implements a built-in anti-sweeper protocol that monitors for unauthorized transfer patterns. This protection layer helps safeguard user funds against common wallet-draining attacks without requiring user intervention.

---

## 4. Technical Architecture

### 4.1 Smart Contract

The ALSA token is implemented as an ERC-20 contract using OpenZeppelin's upgradeable contract library with UUPS proxy pattern. Key features include:

- **AccessControl** — Role-based permissions for administrative functions
- **Pausable** — Emergency pause mechanism for security incidents
- **UUPS Upgradeable** — Upgradeable contract logic while preserving token state
- **Anti-Sweeper** — Transfer validation with human verification checks

### 4.2 Paymaster Integration

The Alsania Paymaster is an ERC-4337 compliant paymaster contract that sponsors user transactions. It accepts ALSA or SPIRIT as payment for gas fees and forwards the equivalent POL to the EntryPoint contract. The paymaster charges a 1% protocol fee on each sponsored transaction.

**Paymaster Address:** `0xE3EFB43f96b0738818780F96c3aF5F4bc4f86E56`

### 4.3 Security Features

- **Anti-Sweeper Protocol** — Detects and blocks unauthorized transfer patterns
- **Human Verification** — Sybil-resistant faucet claims
- **Upgradeable Security** — Contract can be upgraded to patch vulnerabilities
- **Pause Mechanism** — Emergency stop for all token transfers
- **Role-Based Access** — Separate roles for rate management, withdrawals, and upgrades

---

## 5. Team

Alsania is founded and developed by **Sigma**, a full-stack developer and blockchain architect.

- **X (Twitter):** [@SigmaSauer07](https://x.com/sigmasauer07)
- **GitHub:** [alsania-dev](https://github.com/alsania-dev)

---

## 6. Roadmap

### Completed
- ALSA token deployment on Polygon mainnet
- SPIRIT token deployment
- Alsania Paymaster deployment and verification
- ALSA and SPIRIT faucets (mainnet + Amoy testnet)
- Wolfpack NFT collection (625 ERC-721)
- Sigil NFT collection (1000 ERC-1155)

### In Progress
- Gasless faucet claims via paymaster integration
- Sequence wallet integration for embedded smart wallets
- Hi-Lo game mainnet deployment
- AED (Alsania Enhanced Domains) protocol launch

### Planned
- Cross-chain bridge support
- Governance DAO implementation
- Mobile wallet with native paymaster support
- Developer SDK for paymaster integration

---

## 7. Official Channels

| Channel | Link |
|---|---|
| Website | https://alsania-io.com |
| Token Page | https://alsania-io.com/token |
| X (Twitter) | https://x.com/alsania_io |
| Discord | https://discord.gg/SaCTgSHqdv |
| GitHub | https://github.com/alsania-dev |
| Telegram | https://t.me/Alsania_io |

### Contact
- **General:** admin@alsania-io.com
- **Security:** security@alsania-io.com

---

## 8. Disclaimer

ALSA is a utility token designed for use within the Alsania ecosystem. It is not intended as an investment, security, or speculative asset. Staking rewards are subject to change based on governance decisions. Users should always verify contract addresses before interacting with any smart contract. The Alsania team does not guarantee the value or future performance of ALSA tokens.

---

*Version 1.0 — May 2026*
*Built with sovereignty in mind.*
