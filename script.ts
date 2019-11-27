import { Photon } from "@prisma/photon";

const photon = new Photon({});

async function main() {
  await photon.users.deleteMany({});
  await photon.dogs.deleteMany({});

  const tom = await photon.users.create({
    data: {
      name: "tom",
      email: "houle@prisma.io",
    },
  });

  const norbert = await photon.dogs.create({
    data: {
      email: "norbert@norberthood.com",
      name: "norbert",
      likedBy: {
        create: {
          name: "example",
          email: "a@example.com",
        },
        connect: [
          {
            email: tom.email,
          },
        ],
      },
    },
  });

  const oslo = await photon.dogs.create({
    data: {
      name: "oslo",
    },
  });

  await photon.users.update({
    where: { id: tom.id },
    data: {
      likes: {
        connect: {
          id: oslo.id,
        },
      },
    },
  });

  const dogs = await photon.dogs.findMany({
    where: {
      OR: [
        {
          name: "norbert",
        },
        {
          name: "oslo",
        },
      ],
    },
    select: {
      email: true,
      name: true,
      likedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(JSON.stringify(dogs, null, 2));
}

main()
  .catch(console.error)
  .finally(() => photon.disconnect());
