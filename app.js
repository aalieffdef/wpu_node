const yargs = require("yargs");
const contact = require("./contacts");

yargs.command({
  command: 'add',
  describe: 'Menambah kontak baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      type: 'string',
      demandOption: true
    },
    noHp: {
      describe: "Nomor Hp",
      type: 'string',
      demandOption: true
    },
    email: {
      describe: "Email",
      type: 'string'
    }
  },
  handler(argv) {
    contact.simpanKontak(argv.nama, argv.noHp, argv.email)
  }
}).demandCommand()

// Menampilkan data nama dan no hp
yargs.command({
  command: "list",
  describe: "Menampilkan semua data nama & noHp",
  handler() {
    contact.listKontak()
  }
})

yargs.command({
  command: "detail",
  describe: "Menampilkan data detail",
  builder: {
    nama: {
      describe: 'Nama lengkap',
      type: 'string',
      demandOption: true
    }
  },
  handler(argv) {
    contact.detailKontak(argv.nama)
  }
})

yargs.command({
  command: "delete",
  describe: "Menampilkan data berdasarkan kontak",
  builder: {
    nama: {
      describe: 'Nama lengkap',
      type: 'string',
      demandOption: true
    }
  },
  handler(argv) {
    contact.deleteKontak(argv.nama)
  }
})

yargs.parse()