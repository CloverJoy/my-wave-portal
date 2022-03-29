const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  hydratedCount = await waveContract.getTotalHydrated();

  let hydrateTxn = await waveContract.hydrate("A message!");
  await hydrateTxn.wait(); // Wait for the transaction to be mined

  const [_, randomPerson] = await hre.ethers.getSigners();
  hydrateTxn = await waveContract.connect(randomPerson).hydrate("Another message!");
  await hydrateTxn.wait(); // Wait for the transaction to be mined

  //spam check

  // let hydrateTxn2 = await waveContract.hydrate("second messasge!");
  // await hydrateTxn2.wait(); // Wait for the transaction to be mined


  let allHydratees = await waveContract.getAllHydratees();
  console.log(allHydratees);

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

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
