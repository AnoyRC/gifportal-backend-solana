const anchor = require('@project-serum/anchor')
const { AnchorProvider, web3 } =  require('@project-serum/anchor');
const {SystemProgram} = web3;

const main = async() => {
  console.log('Starting tests ...')
  const provider = AnchorProvider.local();
  anchor.setProvider(provider)
  const program = anchor.workspace.Gifportal

  const baseAccount = anchor.web3.Keypair.generate()
  const tx = await program.rpc.startStuffOff({
    accounts:{
      baseAccount: baseAccount.publicKey,
      user:provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers:[baseAccount]
  })
  console.log("Your transaction signature : ", tx)

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log("GIF Count", account.totalGifs.toString())

  await program.rpc.addGif("https://media.giphy.com/media/lJHHrtHIpL4qY3wCEy/giphy.gif", {
    accounts:{
      baseAccount: baseAccount.publicKey,
      user:provider.wallet.publicKey
    },
  })

  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log("GIF Count", account.totalGifs.toString())
  console.log("GIF List", account.gifList)
}

const runMain = async() => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain();
