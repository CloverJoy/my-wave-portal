const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("contract deployed by: ", owner.address);

  let hydratedCount;
  hydratedCount = await waveContract.getTotalHydrated();

  let hydrateTxn = await waveContract.hydrate();
  await hydrateTxn.wait();
  hydratedCount = await waveContract.getTotalHydrated();

  hydrateTxn = await waveContract.connect(randomPerson).hydrate();
  await hydrateTxn.wait();
  hydratedCount = await waveContract.getTotalHydrated();

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
