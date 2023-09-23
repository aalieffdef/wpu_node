const fs = require("fs")
const validator = require("validator")
const chalk = require("chalk")

const dataDir = "./data"
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

const dataPath = "./data/contacts.json"
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8")
}

const loadKontak = () => {
  const fb = fs.readFileSync("data/contacts.json", 'utf-8')
  const contacts = JSON.parse(fb)

  return contacts
}

const simpanKontak = (nama, noHp, email) => {
  const contact = {
    nama,
    noHp,
    email
  }

  const contacts = loadKontak()


  // Cek nama yg duplikat 
  const cekNama = contacts.find((contact) => contact.nama === nama)
  if (cekNama) {
    console.log(chalk.red.inverse.bold(" Nama telah terdaftar, gunakan nama lain "))
    return false
  }
  // Cek noHp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold(" Nomor hp tidak valid "))
    return false
  }

  // Cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold(" Email tidak valid "))
      return false
    }
  }

  contacts.push(contact)
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

  console.log(chalk.green("Input kontak berhasil"))

}

const listKontak = () => {
  const contacts = loadKontak()

  console.log(chalk.blue.inverse.bold(" Daftar semua kontak: "))
  contacts.forEach((contact, i) => {
    console.log(`${i+1}. ${contact.nama} - ${contact.noHp}`)
  });
}

const detailKontak = (nama) => {
  const contacts = loadKontak()
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  )

  if (!contact) {
    console.log(chalk.red.inverse.bold(" Nama tidak ditemukan "))
    return false
  }

  console.log(chalk.blue(contact.nama))
  console.log(contact.noHp)
  if (contact.email)
    console.log(contact.email)
}

const deleteKontak = (nama) => {
  const contacts = loadKontak()
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  )

  if (contacts.length === newContact.length) {
    console.log("nama tidak ditemukan")
    return false
  }

  fs.writeFileSync("./data/contacts.json", JSON.stringify(newContact))
  console.log(chalk.bold.green.inverse(`Data ${nama} berhasil dihapus!`))
}

module.exports = {
  simpanKontak,
  listKontak,
  detailKontak,
  deleteKontak
}