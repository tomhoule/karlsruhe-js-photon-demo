import { Photon } from "@prisma/photon";

const photon = new Photon({});

async function main() {
  console.log("hello Karlsruhe!");
}

main()
  .catch(console.error)
  .finally(() => photon.disconnect());
