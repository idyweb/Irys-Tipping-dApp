// Minimal Irys browser helper with lazy import to avoid SSR issues

export type IrysClientLike = {
  account: {
    getBalance: (address: string) => Promise<string | number>;
  };
};

let cachedClient: IrysClientLike | null = null;

export async function getIrysClient(): Promise<IrysClientLike> {
  if (cachedClient) return cachedClient;
  // @ts-ignore - type defs may not ship; we guard at runtime
  const mod = await import("@irys/js");
  // Some SDKs export default, others named. Try both defensively.
  const IrysClient = (mod?.default ?? mod?.IrysClient) as any;
  if (!IrysClient) throw new Error("Irys client not found in @irys/js");
  const client = new IrysClient("https://testnet-rpc.irys.xyz/v1");
  cachedClient = client;
  return client as IrysClientLike;
}

export async function fetchIrysBalance(address: string): Promise<string> {
  if (!address) return "0";
  try {
    const client = await getIrysClient();
    const raw = await client.account.getBalance(address);
    // Raw is expected in mIrys (mini-IRYS). Return as string.
    return String(raw);
  } catch (err) {
    return "0";
  }
}


