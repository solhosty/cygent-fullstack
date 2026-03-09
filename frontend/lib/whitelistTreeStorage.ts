import type { MerkleTreeData } from "@/lib/merkle";

const STORAGE_KEY = "whitelistTreeData:v1";

type StoredTreeData = {
  version: 1;
  savedAt: string;
  data: MerkleTreeData;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function saveTreeData(data: MerkleTreeData): void {
  if (!isBrowser()) {
    return;
  }

  const payload: StoredTreeData = {
    version: 1,
    savedAt: new Date().toISOString(),
    data
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadTreeData(): MerkleTreeData | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StoredTreeData;
    if (parsed.version !== 1 || !parsed.data || typeof parsed.data.root !== "string") {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function clearTreeData(): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}

export function downloadTreeData(data: MerkleTreeData, filename: string): void {
  if (!isBrowser()) {
    return;
  }

  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], {
    type: "application/json"
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
