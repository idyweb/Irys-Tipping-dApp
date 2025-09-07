"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchIrysBalance } from "@/lib/irys";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletBar() {
  const [account, setAccount] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const connect = useCallback(async () => {
    setError("");
    if (!window.ethereum) {
      setError("MetaMask not found");
      return;
    }
    try {
      setIsConnecting(true);
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const next = accounts?.[0] ?? "";
      setAccount(next);
    } catch (e: any) {
      setError(e?.message || "Failed to connect");
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    const handler = (accounts: string[]) => setAccount(accounts?.[0] ?? "");
    window.ethereum?.on?.("accountsChanged", handler);
    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handler);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!account) {
        setBalance("");
        return;
      }
      const bal = await fetchIrysBalance(account);
      if (!cancelled) setBalance(bal);
    })();
    return () => {
      cancelled = true;
    };
  }, [account]);

  return (
    <div className="flex items-center justify-end gap-3">
      {account ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">{shortenAddress(account)}</span>
          {balance && (
            <span className="text-xs text-gray-500">{balance} mIRYS</span>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={connect}
          disabled={isConnecting}
          className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50 disabled:opacity-60"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  );
}


