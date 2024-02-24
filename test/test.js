    const { ethers } = require('ethers');

    const proxyAbi = require('./abis/proxy.json');
    const impliABI  = require('./abis/implimentation.json');


    const tokenaddress= "0xac77b589373d29D3A01D693e53Cae860122080fD"
    const proxyAddress = "0x3e3b1b5Aea3818ff7d3130082bAf0DB8a9873DC2"

    const RPC = "https://sepolia.infura.io/v3/c699d17f7200444c8ffa9c281ed20452"

    const provider  = new ethers.providers.JsonRpcProvider(RPC)
    const pk = "488b4c368013bbb3feb381d2795a316bd1d2d153d49d150596bded29de46d202" // just for testing purpose
    // code to create a ether signer using provider and private key
    const signer = new ethers.Wallet(pk, provider)


    const hit = async () => {

        // Replace these values with the actual function parameters
        // const amount = 10;
        // const recipient = '0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641';
        
        const contract = new ethers.Contract(proxyAddress, impliABI, signer)
        
        // balance before
        const bal = await contract.balanceOf("0x1cb0a69aA6201230aAc01528044537d0F9D718F3")
        console.log(parseInt(bal._hex,16).toString(), " -balance before- ")
        
        // minting
        const _mintRes = await contract.mint(10000);
        console.log(await _mintRes.wait(), " -mint- ")

        // balance after
        const bal2 = await contract.balanceOf("0x1cb0a69aA6201230aAc01528044537d0F9D718F3")
        console.log(parseInt(bal2._hex,16).toString(), " -balance after- ")

        // test token Transfer
        const _transferRes = await contract.transfer("0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641", 10);
        console.log(await _transferRes.wait(), " -transfer- ")

        const stk = await contract.stakeDetail("0x1cb0a69aA6201230aAc01528044537d0F9D718F3");
        console.log(stk , " -stake before- ")

        // stake
        const _stakeRes = await contract.stake(10);
        console.log(await _stakeRes.wait(), " -stake- ")
        
        // stake after
        const stk2 = await contract.stakeDetail("0x1cb0a69aA6201230aAc01528044537d0F9D718F3");
        console.log(stk2 , " -stake after- ")
    }

    hit()