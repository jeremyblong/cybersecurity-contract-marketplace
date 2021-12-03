const { Gateway } = require('fabric-network');
const { rootPath, seralizePath } = require('./utils/helper.js');
const { connect: connectWallet } = require('./wallet.js');
const config = require("config");

const gateway = new Gateway();

const connect = async identity => {
  const connectionProfile = JSON.parse(seralizePath(`${rootPath}/webapp/certs/connection-profile.json`));
  const wallet = await connectWallet();

  console.log(`========== AS_LOCALHOST: ${config.get("AS_LOCALHOST")} ==========`);
  await gateway.connect(connectionProfile, {
    identity: 'user01',
    wallet,
    discovery: { enabled: true, asLocalhost: (config.get("AS_LOCALHOST") === 'true') }
  });
};

module.exports = {
  gateway,
  connect,
};