// Hash-chain audit utility.
//
// This is the part of the blockchain design that is real and working today:
// every finalized record gets a SHA-256 hash chained to the previous record's
// hash, the same mechanism a Hyperledger Fabric chaincode would perform
// on-chain (see docs on the consortium anchoring flow). This module produces
// that chain inside the existing audit_logs table so tampering with any past
// entry breaks the chain and is detectable, without requiring a live Fabric
// network for the hackathon prototype.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `crypto` module, because offline-store.ts runs client-side in the browser
// (page.tsx is a client component) — Web Crypto works in both the browser
// and in Next.js API routes (Node 19+), so this file is safe in either.
//
// Production upgrade path: replace `appendToChain()`'s local storage with a
// call to a Fabric chaincode invoke, and store the returned transaction ID
// instead of (or alongside) the local chain hash.

export interface ChainedAuditEntry {
  recordId: string;
  action: string;
  actor: string;
  role: string;
  timestamp: string;
  recordHash: string;
  prevHash: string;
  chainHash: string;
}

/**
 * Canonicalizes a record (stable key order) before hashing, so the same
 * logical data always produces the same hash regardless of property order.
 */
function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(',')}]`;
  }
  const keys = Object.keys(value as Record<string, unknown>).sort();
  const entries = keys.map((k) => `${JSON.stringify(k)}:${canonicalize((value as Record<string, unknown>)[k])}`);
  return `{${entries.join(',')}}`;
}

export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hashes a finalized record (e.g. an award, a DBT disbursement, a stage
 * closure) in a stable, order-independent way.
 */
export async function hashRecord(record: Record<string, unknown>): Promise<string> {
  return sha256(canonicalize(record));
}

/**
 * Appends a new entry to the hash chain, linking it to the previous entry's
 * chain hash (or a genesis value if this is the first entry). Mirrors what a
 * Fabric chaincode's endorsement + commit would produce as a transaction ID.
 */
export async function appendToChain(
  prevChainHash: string | null,
  entry: {
    recordId: string;
    action: string;
    actor: string;
    role: string;
    record: Record<string, unknown>;
  }
): Promise<ChainedAuditEntry> {
  const recordHash = await hashRecord(entry.record);
  const prevHash = prevChainHash ?? (await sha256('GENESIS:BHOOMI-GRID'));
  const timestamp = new Date().toISOString();
  const chainHash = await sha256(`${prevHash}:${recordHash}:${entry.recordId}:${timestamp}`);

  return {
    recordId: entry.recordId,
    action: entry.action,
    actor: entry.actor,
    role: entry.role,
    timestamp,
    recordHash,
    prevHash,
    chainHash,
  };
}

/**
 * Verifies a chain of entries in order: recomputes each chainHash from its
 * stored recordHash + the previous entry's chainHash, and checks it matches
 * what was stored. Returns the index of the first broken link, or null if
 * the whole chain is intact.
 */
export async function verifyChain(entries: ChainedAuditEntry[]): Promise<number | null> {
  let expectedPrev: string | null = null;
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const prevHash = expectedPrev ?? (await sha256('GENESIS:BHOOMI-GRID'));
    if (entry.prevHash !== prevHash) return i;
    const recomputed = await sha256(`${entry.prevHash}:${entry.recordHash}:${entry.recordId}:${entry.timestamp}`);
    if (recomputed !== entry.chainHash) return i;
    expectedPrev = entry.chainHash;
  }
  return null;
}
