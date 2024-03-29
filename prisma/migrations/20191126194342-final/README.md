# Migration `20191126194342-final`

This migration has been generated by Tom Houlé at 11/26/2019, 7:43:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "lift"."_likes_AB_unique"

DROP TABLE "lift"."_likes";

CREATE TABLE "lift"."_DogToUser" (
  "A" INTEGER NOT NULL   REFERENCES "Dog"(id) ON DELETE CASCADE,
  "B" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX "lift"."_DogToUser_AB_unique" ON "_DogToUser"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191126193139-reunique..20191126194342-final
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 generator photon {
   provider = "photonjs"
@@ -10,13 +10,13 @@
 model User {
   id    String  @default(cuid()) @id @unique
   email String  @unique
   name  String?
-  likes Dog[]   @relation("likes")
+  likes Dog[]
 }
 model Dog {
   id      Int     @id
   name    String
   email   String?
-  likedBy User[]  @relation("likes")
+  likedBy User[]
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191126194342-final)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191126194342-final'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
