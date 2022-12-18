const anchor = require('@project-serum/anchor')

const main = async() => {
  console.log('Starting tests ...')
  anchor.setProvider(anchor.Provider.env())
  const program = anchor.workspace.Gifportal
  const tx = await program.rpc.startStuffOff()
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
