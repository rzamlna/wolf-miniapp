import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CONTRACT_ADDRESS = "0x8732a30ED4219a2593017E008294Af33B1B706D8";
const CHAIN_ID = "8453"; // Base mainnet

app.get("/api/metadata", (req, res) => {
  res.json({
    title: "Wolfplet Mint",
    description: "Mint your Wolf NFT on Base for 0.1 USDC",
    image: "https://i.ibb.co/fGFG1Gz4/ezgif-com-animated-gif-maker.gif",
    actions: [
      {
        label: "Mint 0.1 USDC",
        action: "transaction",
        target: CONTRACT_ADDRESS,
        chainId: CHAIN_ID,
        abi: [
          {
            name: "mint",
            type: "function",
            stateMutability: "nonpayable",
            inputs: []
          }
        ],
        postUrl: "https://wolf-miniapp.vercel.app/api/success"
      }
    ]
  });
});

app.post("/api/success", (req, res) => {
  res.json({
    title: "Mint Successful 🎉",
    description: "You just minted your Wolfplet on Base 🐺",
    image: "https://i.ibb.co/fGFG1Gz4/ezgif-com-animated-gif-maker.gif",
    actions: [
      {
        label: "Share mint",
        action: "post",
        postUrl:
          "https://warpcast.com/~/compose?text=I%20just%20minted%20my%20Wolfplet%20NFT%20on%20Base%20%F0%9F%90%BA%20join%20the%20pack"
      }
    ]
  });
});

// ✅ Redirect farcaster.json ke hosted manifest
app.get("/.well-known/farcaster.json", (req, res) => {
  res.redirect(
    307,
    "https://api.farcaster.xyz/miniapps/hosted-manifest/019a650a-7277-b893-c179-bffea9b67359"
  );
});

app.get("/", (req, res) => {
  res.send("Wolfplet Farcaster MiniApp 🐺 interactive mint + share");
});

export default app;

