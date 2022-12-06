// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

//import prompt
const prompt = require('prompt-sync')();


// Ask user for public address 
const publicKey = prompt('Enter your public address: ');
//var publicKey = process.argv.slice(2);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key entered by the user: ", publicKey);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //console.log("Connection object is:", connection);
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        // Request amount and send to the wallet
        const airdropValue = prompt('Enter amount to airdrop: ');
        console.log("Airdropping ", airdropValue, " SOL to address: ", publicKey);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            parseInt(airdropValue) * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};


// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();
