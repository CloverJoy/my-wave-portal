const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let waveCount;
  hydratedCount = await waveContract.getTotalHydrated();

  let hydrateTxn = await waveContract.hydrate("A message!");
  await hydrateTxn.wait(); // Wait for the transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();
  hydrateTxn = await waveContract.connect(randomPerson).hydrate("Another message!");
  await hydrateTxn.wait(); // Wait for the transaction to be mined

  let allHydratees = await waveContract.getAllHydratees();
  console.log(allHydratees);

  await waveContract.getTotalHydrated();

};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
