// Agent Registry Module
// Handles ERC-8004 agent registration, lookup, and reputation

const AGENT_REGISTRY_CONTRACT = '0xCA96D5171bF9D83fb9546D936daed229e1C7904F';
const REPUTATION_REGISTRY_CONTRACT = '0x19e04AD786E8B46276705387C6B029bD7C7E0719';
const VALIDATION_REGISTRY_CONTRACT = '0xB58aB1142c1b6e320CA86612E958Fa20DC458Bf8';

const AGENT_ABI = [
  'function register(string uri) returns (uint256)',
  'function getAgentWallet(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function balanceOf(address owner) view returns (uint256)',
  'function withdrawStake()',
  'function withdrawFees()'
];

const REPUTATION_ABI = [
  'function giveFeedback(uint256 agentId, int128 value, uint8 valueDecimals, string tag1, string tag2, string endpoint, string feedbackURI, bytes32 feedbackHash)',
  'function revokeFeedback(uint256 agentId, uint64 feedbackIndex)',
  'function getAgentReputation(uint256 agentId) view returns (uint256 weightedAverageScore, uint256 totalRatings, uint256 displayScore, uint256 effectiveFeeBps)',
  'function getEffectiveFeeBps(uint256 agentId) view returns (uint256)',
  'function calculateDiscountedFee(uint256 agentId, uint256 amount) view returns (uint256)',
  'function getRaterReputation(address rater) view returns (uint256)'
];

let agentRegistry, reputationRegistry;

export async function initAgentRegistry(provider) {
  if (!provider) return;
  agentRegistry = new ethers.Contract(AGENT_REGISTRY_CONTRACT, AGENT_ABI, provider);
  reputationRegistry = new ethers.Contract(REPUTATION_REGISTRY_CONTRACT, REPUTATION_ABI, provider);
  return { agentRegistry, reputationRegistry };
}

export async function getAgentInfo(agentId) {
  try {
    const owner = await agentRegistry.ownerOf(agentId);
    const wallet = await agentRegistry.getAgentWallet(agentId);
    const uri = await agentRegistry.tokenURI(agentId);
    return { owner, wallet, uri, agentId };
  } catch (error) {
    console.error('Error getting agent info:', error);
    return null;
  }
}

export async function getAgentReputation(agentId) {
  try {
    const [weightedAverage, totalRatings, displayScore, effectiveFeeBps] = await reputationRegistry.getAgentReputation(agentId);
    return {
      weightedAverage: Number(weightedAverage) / 100,
      totalRatings: Number(totalRatings),
      displayScore: Number(displayScore) / 100,
      effectiveFeeBps: Number(effectiveFeeBps)
    };
  } catch (error) {
    console.error('Error getting reputation:', error);
    return null;
  }
}

export async function getRaterReputation(address) {
  try {
    const rep = await reputationRegistry.getRaterReputation(address);
    return Number(rep);
  } catch (error) {
    console.error('Error getting rater reputation:', error);
    return 250;
  }
}

export async function giveFeedback(agentId, score, tag1, tag2, endpoint, feedbackURI) {
  try {
    const value = Math.floor(score * 100); // Convert to basis points
    const tx = await reputationRegistry.giveFeedback(
      agentId,
      value,
      2, // 2 decimals
      tag1,
      tag2,
      endpoint,
      feedbackURI || '',
      ethers.constants.HashZero
    );
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error giving feedback:', error);
    throw error;
  }
}

export async function registerAgent(uri) {
  try {
    const tx = await agentRegistry.register(uri);
    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === 'AgentRegistered');
    const agentId = event?.args?.tokenId;
    return agentId;
  } catch (error) {
    console.error('Error registering agent:', error);
    throw error;
  }
}

export async function getAgentsOwnedBy(address) {
  try {
    const balance = await agentRegistry.balanceOf(address);
    const agents = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await agentRegistry.tokenOfOwnerByIndex(address, i);
      agents.push(tokenId);
    }
    return agents;
  } catch (error) {
    console.error('Error getting agents:', error);
    return [];
  }
}