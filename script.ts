import { Photon } from "@prisma/photon";

const photon = new Photon({});

async function main() {
  console.log("hello Karlsruhe!");

  await photon.connect();

  await photon.users.deleteMany({});
  await photon.dogs.deleteMany({});

  const tom = await photon.users.create({
    data: {
      email: "tom@example.com",
      name: "tom",
    },
  });

  const norbert = await photon.dogs.create({
    include: {
      likedBy: true,
    },
    data: {
      name: "norbert",
      likedBy: {
        connect: {
          email: tom.email,
        },
      },
    },
  });

  const oslo = await photon.dogs.create({
    select: {
      name: true,
      likedBy: {
        select: {
          email: true,
        },
      },
    },
    data: {
      name: "oslo",
      likedBy: {
        create: {
          email: "oslo-human@example.com",
          name: "oslo’s human",
        },
      },
    },
  });

  const recap = await photon.dogs.findMany({
    include: {
      likedBy: true,
    },
  });

  console.log(JSON.stringify(recap, undefined, 2));

  console.log(await photon.users.count(), " user in the database");
}

main()
  .catch(console.error)
  .finally(() => photon.disconnect());
