import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CONTRACT_ADDRESS = "0x8732a30ED4219a2593017E008294Af33B1B706D8";
const MINT_FUNCTION = "0xa0712d68"; // mint() function selector
const CHAIN_ID = "8453"; // Base mainnet

// MiniApp metadata (for Farcaster)
app.get("/api/metadata", (req, res) => {
  res.json({
    title: "WolfNFT Mint",
    description: "Mint your Wolf NFT on Base for 0.1 USDC",
    image: "https://i.ibb.co/f1CHTGK/wolf-preview.gif", // optional preview
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
        ]
      }
    ]
  });
});

app.get("/", (req, res) => {
  res.send("WolfNFT Farcaster MiniApp is live 🐺");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`WolfNFT MiniApp running on http://localhost:${PORT}`)
);
