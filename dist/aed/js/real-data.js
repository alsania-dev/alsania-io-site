// Real contract data from AED deployment
// Contract: 0x9276f78c574b737d914704D9096777C1929ec1cB
// Network: Polygon Amoy

const REAL_TOKENS = [
  {
    id: 1,
    name: 'aegis',
    tld: 'aed',
    fullDomain: 'aegis.aed',
    owner: '0xC8D6AB0928F9A8bAbB77B739401504f3354580cD',
    isBadge: false,
    features: ['domain'],
    metadataURI: 'https://aed-metadata.vercel.app/api/domain/1'
  },
  {
    id: 2,
    name: 'echo',
    tld: 'aegis.aed',
    fullDomain: 'echo.aegis.aed',
    owner: '0xC8D6AB0928F9A8bAbB77B739401504f3354580cD',
    isBadge: true,
    model: 'claude-3.5-sonnet',
    capabilities: [],
    features: ['ai-badge'],
    metadataURI: 'https://aed-metadata.vercel.app/api/sub/2'
  },
  {
    id: 3,
    name: 'sigmasauer07',
    tld: 'aed',
    fullDomain: 'sigmasauer07.aed',
    owner: '0xC8D6AB0928F9A8bAbB77B739401504f3354580cD',
    isBadge: false,
    features: ['domain'],
    metadataURI: 'https://aed-metadata.vercel.app/api/domain/3'
  }
];

const REAL_STATS = {
  totalDomains: 3,
  totalRevenue: 0,
  activeTLDs: 6
};

const REAL_TLDS = [
  { name: 'aed', price: 0, isFree: true },
  { name: 'alsa', price: 0, isFree: true },
  { name: '07', price: 0, isFree: true },
  { name: 'alsania', price: 1, isFree: false },
  { name: 'fx', price: 1, isFree: false },
  { name: 'echo', price: 1, isFree: false }
];

console.log('Real data loaded:', REAL_TOKENS);
