import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.song.create({
    data: {
      name: 'Doxology',
      arrangements: {
        create: {
          name: 'Simple',
          key: 'F',
          tempo: 85,
          tracks: {
            create: [
              {
                name: 'Melody',
                shortName: 'M',
                clef: 'bass',
                src: 'https://harmonious-tracks.s3.us-west-2.amazonaws.com/melody.mp3',
                notation:
                  '[L:1/4][M:4/4]zzzF,|F,E,D,C,F,G,|[M:4/4]A,3A,|\nw:Praise God from whom all bless-ings flow Praise\n[M:6/4]A,A,G,F,B,A,|[M:4/4]G,3F,|\nw:Him all crea-tures here be-low Praise\n[M:6/4]G,A,G,F,D,E,|[M:4/4]F,3C|\nw:Him a-bove ye Heaven-ly hosts Praise\n[M:6/4]A,F,G,B,A,G,|[M:4/4]F,4|\nw:Fa-ther, Son, and Ho-ly Ghost Praise\nF,4|F,4|]\nw:A-men'
              },
              {
                name: 'Harmony',
                shortName: 'H',
                clef: 'bass',
                src: 'https://harmonious-tracks.s3.us-west-2.amazonaws.com/harmony.mp3',
                notation:
                  '[L:1/4][M:4/4]zzzA,|A,G,F,F,A,B,|[M:4/4]C3C|\nw:Praise God from whom all bless-ings flow Praise\n[M:6/4]CCB,A,DC|[M:4/4]C3A,|\nw:Him all crea-tures here be-low Praise\n[M:6/4]B,CB,A,F,G,|[M:4/4]A,3F|\nw:Him a-bove ye Heaven-ly hosts Praise\n[M:6/4]CA,B,DCB,|[M:4/4]A,4|\nw:Fa-ther, Son, and Ho-ly Ghost Praise\nB,4|A,4|]\nw:A-men'
              }
            ]
          }
        }
      }
    }
  });
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
