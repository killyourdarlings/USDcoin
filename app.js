ethereum.autoRefreshOnNetworkChang=false;
ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0xF6d70B1FF611f5beee433a59E191086a6ED7a87C";
const contractABI=[
    "function reward(uint256 amt) public"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);
tokenWithSigner.reward(10);